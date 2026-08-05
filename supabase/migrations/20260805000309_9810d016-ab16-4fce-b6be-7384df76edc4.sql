-- Lock down SECURITY DEFINER helper functions
REVOKE ALL ON FUNCTION public.enqueue_email(text, jsonb) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.delete_email(text, bigint) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.read_email_batch(text, integer, integer) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.move_to_dlq(text, text, bigint, jsonb) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.enqueue_email(text, jsonb) TO service_role;
GRANT EXECUTE ON FUNCTION public.delete_email(text, bigint) TO service_role;
GRANT EXECUTE ON FUNCTION public.read_email_batch(text, integer, integer) TO service_role;
GRANT EXECUTE ON FUNCTION public.move_to_dlq(text, text, bigint, jsonb) TO service_role;

-- has_role is used inside RLS policies for signed-in users; anon never needs it
REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated, service_role;

-- Validate quote request submissions
DROP POLICY IF EXISTS "Anyone can submit a quote request" ON public.quote_requests;
CREATE POLICY "Anyone can submit a quote request"
ON public.quote_requests
FOR INSERT
TO anon, authenticated
WITH CHECK (
  length(full_name) > 0 AND length(full_name) <= 100
  AND length(phone) >= 7 AND length(phone) <= 30
  AND length(service_needed) > 0 AND length(service_needed) <= 100
  AND length(project_details) > 0 AND length(project_details) <= 2000
  AND (email IS NULL OR (length(email) <= 255 AND email ~* '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$'))
  AND (property_address IS NULL OR length(property_address) <= 200)
  AND status = 'new'
);