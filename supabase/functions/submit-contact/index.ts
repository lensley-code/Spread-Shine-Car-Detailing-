import { createClient } from 'npm:@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface Payload {
  name?: string
  email?: string
  topic?: string
  message?: string
}

function validate(p: Payload): string | null {
  if (!p.name || p.name.trim().length === 0 || p.name.length > 100) return 'Invalid name'
  if (!p.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(p.email) || p.email.length > 255) return 'Invalid email'
  if (!p.topic || p.topic.trim().length === 0 || p.topic.length > 200) return 'Invalid topic'
  if (!p.message || p.message.trim().length === 0 || p.message.length > 5000) return 'Invalid message'
  return null
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders })

  const url = Deno.env.get('SUPABASE_URL')!
  const key = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  const supabase = createClient(url, key)

  let body: Payload
  try { body = await req.json() } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
  }

  const err = validate(body)
  if (err) {
    console.warn('[submit-contact] validation failed', { err })
    return new Response(JSON.stringify({ error: err }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
  }

  const name = body.name!.trim()
  const email = body.email!.trim().toLowerCase()
  const topic = body.topic!.trim()
  const message = body.message!.trim()

  // 1. Persist
  const { data: row, error: insertError } = await supabase
    .from('contact_submissions')
    .insert({ name, email, topic, message })
    .select('id, created_at')
    .single()

  if (insertError) {
    console.error('[submit-contact] insert failed', insertError)
    return new Response(JSON.stringify({ error: 'Failed to save submission' }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
  }

  console.log('[submit-contact] saved', { id: row.id, email })

  // 2. Trigger admin notification email (best-effort)
  try {
    const { error: emailError } = await supabase.functions.invoke('send-transactional-email', {
      body: {
        templateName: 'contact-notification',
        templateData: {
          name, email, topic, message,
          submittedAt: new Date(row.created_at).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' }),
        },
      },
    })
    if (emailError) {
      console.error('[submit-contact] notification email failed', emailError)
    } else {
      console.log('[submit-contact] notification email queued', { id: row.id })
    }
  } catch (e) {
    console.error('[submit-contact] notification email exception', e)
  }

  return new Response(JSON.stringify({ success: true, id: row.id }), {
    status: 200,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
})