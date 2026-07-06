import { createClient } from 'npm:@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface Payload {
  full_name?: string
  phone?: string
  email?: string
  service_needed?: string
  property_address?: string
  project_details?: string
}

function validate(p: Payload): string | null {
  if (!p.full_name || !p.full_name.trim() || p.full_name.length > 100) return 'Invalid name'
  if (!p.phone || !p.phone.trim() || p.phone.length > 30) return 'Invalid phone'
  if (!p.service_needed || !p.service_needed.trim() || p.service_needed.length > 100) return 'Invalid service'
  if (!p.project_details || !p.project_details.trim() || p.project_details.length > 2000) return 'Invalid project details'
  if (p.email && (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(p.email) || p.email.length > 255)) return 'Invalid email'
  if (p.property_address && p.property_address.length > 300) return 'Invalid address'
  return null
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders })

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
  )

  let body: Payload
  try { body = await req.json() } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
      status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  const err = validate(body)
  if (err) {
    return new Response(JSON.stringify({ error: err }), {
      status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  const record = {
    full_name: body.full_name!.trim(),
    phone: body.phone!.trim(),
    email: body.email?.trim().toLowerCase() || null,
    service_needed: body.service_needed!.trim(),
    property_address: body.property_address?.trim() || null,
    project_details: body.project_details!.trim(),
  }

  const { data: row, error: insertError } = await supabase
    .from('quote_requests')
    .insert(record)
    .select('id, created_at')
    .single()

  if (insertError) {
    console.error('[submit-quote-request] insert failed', insertError)
    return new Response(JSON.stringify({ error: 'Failed to save request' }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  console.log('[submit-quote-request] saved', { id: row.id })

  try {
    const { error: emailError } = await supabase.functions.invoke('send-transactional-email', {
      body: {
        templateName: 'quote-request-notification',
        idempotencyKey: `quote-${row.id}`,
        templateData: {
          fullName: record.full_name,
          phone: record.phone,
          email: record.email || 'Not provided',
          serviceNeeded: record.service_needed,
          propertyAddress: record.property_address || 'Not provided',
          projectDetails: record.project_details,
          submittedAt: new Date(row.created_at).toLocaleString('en-US', {
            dateStyle: 'medium', timeStyle: 'short', timeZone: 'America/New_York',
          }) + ' ET',
        },
      },
    })
    if (emailError) console.error('[submit-quote-request] email failed', emailError)
  } catch (e) {
    console.error('[submit-quote-request] email exception', e)
  }

  return new Response(JSON.stringify({ success: true, id: row.id }), {
    status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
})
