import { createClient } from 'npm:@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type',
}

function jsonResponse(data: Record<string, unknown>, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
}

const DEFAULT_PREFS = {
  spiritual_insights: true,
  guide_releases: true,
  reading_updates: true,
  unsubscribed_all: false,
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  if (req.method !== 'GET' && req.method !== 'POST') {
    return jsonResponse({ error: 'Method not allowed' }, 405)
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL')
  const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

  if (!supabaseUrl || !supabaseServiceKey) {
    return jsonResponse({ error: 'Server configuration error' }, 500)
  }

  const url = new URL(req.url)
  let token: string | null = url.searchParams.get('token')
  let action: 'unsubscribe_all' | 'save_preferences' | null = null
  let preferences: Record<string, boolean> | null = null
  let isOneClick = false

  if (req.method === 'POST') {
    const contentType = req.headers.get('content-type') ?? ''
    if (contentType.includes('application/x-www-form-urlencoded')) {
      const formText = await req.text()
      const params = new URLSearchParams(formText)
      if (params.get('List-Unsubscribe') === 'One-Click') {
        isOneClick = true
        action = 'unsubscribe_all'
      } else {
        const formToken = params.get('token')
        if (formToken) token = formToken
        action = 'unsubscribe_all'
      }
    } else {
      // JSON body from the app
      try {
        const body = await req.json()
        if (body.token) token = body.token
        if (body.action === 'save_preferences') {
          action = 'save_preferences'
          preferences = body.preferences ?? {}
        } else {
          action = 'unsubscribe_all'
        }
      } catch {
        action = 'unsubscribe_all'
      }
    }
  }

  if (!token) {
    return jsonResponse({ error: 'Token is required' }, 400)
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey)

  const { data: tokenRecord, error: lookupError } = await supabase
    .from('email_unsubscribe_tokens')
    .select('*')
    .eq('token', token)
    .maybeSingle()

  if (lookupError || !tokenRecord) {
    return jsonResponse({ error: 'Invalid or expired token' }, 404)
  }

  const normalizedEmail = tokenRecord.email.toLowerCase()

  async function loadPreferences() {
    const { data } = await supabase
      .from('email_preferences')
      .select(
        'spiritual_insights, guide_releases, reading_updates, unsubscribed_all',
      )
      .eq('email', normalizedEmail)
      .maybeSingle()
    return data ?? { ...DEFAULT_PREFS, unsubscribed_all: !!tokenRecord.used_at }
  }

  // GET: Validate token + return current preferences
  if (req.method === 'GET') {
    const prefs = await loadPreferences()
    return jsonResponse({
      valid: true,
      already_unsubscribed: !!tokenRecord.used_at,
      preferences: prefs,
    })
  }

  // POST: save_preferences (granular)
  if (action === 'save_preferences') {
    const p = preferences ?? {}
    const { error: upsertError } = await supabase
      .from('email_preferences')
      .upsert(
        {
          email: normalizedEmail,
          spiritual_insights: p.spiritual_insights !== false,
          guide_releases: p.guide_releases !== false,
          reading_updates: p.reading_updates !== false,
          unsubscribed_all: false,
        },
        { onConflict: 'email' },
      )
    if (upsertError) {
      console.error('Failed to save preferences', { error: upsertError })
      return jsonResponse({ error: 'Failed to save preferences' }, 500)
    }
    return jsonResponse({ success: true, action: 'preferences_saved' })
  }

  // POST: full unsubscribe
  if (tokenRecord.used_at) {
    // Ensure preferences row reflects state
    await supabase.from('email_preferences').upsert(
      {
        email: normalizedEmail,
        spiritual_insights: false,
        guide_releases: false,
        reading_updates: false,
        unsubscribed_all: true,
      },
      { onConflict: 'email' },
    )
    return jsonResponse({ success: false, reason: 'already_unsubscribed' })
  }

  // Atomic mark-token-used
  const { data: updated, error: updateError } = await supabase
    .from('email_unsubscribe_tokens')
    .update({ used_at: new Date().toISOString() })
    .eq('token', token)
    .is('used_at', null)
    .select()
    .maybeSingle()

  if (updateError) {
    console.error('Failed to mark token as used', { error: updateError, token })
    return jsonResponse({ error: 'Failed to process unsubscribe' }, 500)
  }

  if (!updated) {
    return jsonResponse({ success: false, reason: 'already_unsubscribed' })
  }

  // Add to suppression list
  const { error: suppressError } = await supabase
    .from('suppressed_emails')
    .upsert(
      { email: normalizedEmail, reason: 'unsubscribe' },
      { onConflict: 'email' },
    )
  if (suppressError) {
    console.error('Failed to suppress email', { error: suppressError })
    return jsonResponse({ error: 'Failed to process unsubscribe' }, 500)
  }

  // Mirror to email_preferences
  await supabase.from('email_preferences').upsert(
    {
      email: normalizedEmail,
      spiritual_insights: false,
      guide_releases: false,
      reading_updates: false,
      unsubscribed_all: true,
    },
    { onConflict: 'email' },
  )

  console.log('Email unsubscribed', { email: normalizedEmail, isOneClick })

  return jsonResponse({ success: true })
})