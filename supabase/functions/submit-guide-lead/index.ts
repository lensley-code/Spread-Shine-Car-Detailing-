import { createClient } from 'npm:@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface Payload {
  email?: string
  name?: string
  website?: string // honeypot
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders })

  const url = Deno.env.get('SUPABASE_URL')!
  const key = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  const supabase = createClient(url, key)

  let body: Payload
  try {
    body = await req.json()
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  // Honeypot — silently accept without doing anything
  if (body.website && body.website.trim().length > 0) {
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  const email = (body.email ?? '').trim().toLowerCase()
  const name = (body.name ?? '').trim()

  if (!email || email.length > 255 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return new Response(JSON.stringify({ error: 'Invalid email' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
  if (name.length > 80) {
    return new Response(JSON.stringify({ error: 'Invalid name' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  // Basic abuse throttle: at most 3 guide requests per email per hour.
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString()
  const { count } = await supabase
    .from('leads')
    .select('id', { count: 'exact', head: true })
    .eq('email', email)
    .eq('source', 'guide')
    .gte('created_at', oneHourAgo)

  if ((count ?? 0) >= 3) {
    console.warn('[submit-guide-lead] throttled', { email })
    return new Response(JSON.stringify({ ok: true, throttled: true }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  const { error: insertError } = await supabase
    .from('leads')
    .insert({ email, name: name || null, source: 'guide' })

  if (insertError) {
    console.error('[submit-guide-lead] insert failed', insertError)
    return new Response(JSON.stringify({ error: 'Failed to save request' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  const { error: emailError } = await supabase.functions.invoke('send-transactional-email', {
    body: {
      templateName: 'guide-delivery',
      recipientEmail: email,
      idempotencyKey: `guide-delivery-${email}-${Date.now()}`,
      templateData: name ? { name } : {},
    },
  })

  if (emailError) {
    console.error('[submit-guide-lead] email enqueue failed', emailError)
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
})
