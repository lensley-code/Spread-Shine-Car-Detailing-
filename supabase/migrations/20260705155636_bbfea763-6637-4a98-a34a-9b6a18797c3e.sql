
-- 1. Harden analytics_events INSERT policy (replace WITH CHECK true with validation)
DROP POLICY IF EXISTS "Anyone can log analytics events" ON public.analytics_events;
CREATE POLICY "Anyone can log analytics events"
  ON public.analytics_events
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    length(event_name) > 0
    AND length(event_name) <= 100
    AND (page IS NULL OR length(page) <= 500)
    AND (user_agent IS NULL OR length(user_agent) <= 1000)
    AND (referrer IS NULL OR length(referrer) <= 1000)
    AND pg_column_size(metadata) <= 8192
  );

-- 2. Harden leads INSERT policy (replace WITH CHECK true with validation)
DROP POLICY IF EXISTS "Anyone can submit a lead" ON public.leads;
CREATE POLICY "Anyone can submit a lead"
  ON public.leads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    length(email) > 0
    AND length(email) <= 255
    AND email ~* '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$'
    AND (name IS NULL OR (length(name) > 0 AND length(name) <= 100))
    AND length(source) > 0
    AND length(source) <= 50
  );

-- 3. Set fixed search_path on all SECURITY DEFINER / trigger functions that lack one
ALTER FUNCTION public.enqueue_email(text, jsonb) SET search_path = public, pgmq, pg_temp;
ALTER FUNCTION public.delete_email(text, bigint) SET search_path = public, pgmq, pg_temp;
ALTER FUNCTION public.move_to_dlq(text, text, bigint, jsonb) SET search_path = public, pgmq, pg_temp;
ALTER FUNCTION public.read_email_batch(text, integer, integer) SET search_path = public, pgmq, pg_temp;
ALTER FUNCTION public.touch_contact_submissions_updated_at() SET search_path = public, pg_temp;

-- 4. Revoke EXECUTE on internal SECURITY DEFINER wrappers from anon/authenticated.
--    These are only meant to be called by edge functions via service_role.
--    has_role() is intentionally kept executable because RLS policies reference it.
REVOKE EXECUTE ON FUNCTION public.enqueue_email(text, jsonb) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.delete_email(text, bigint) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.move_to_dlq(text, text, bigint, jsonb) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.read_email_batch(text, integer, integer) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.enqueue_email(text, jsonb) TO service_role;
GRANT EXECUTE ON FUNCTION public.delete_email(text, bigint) TO service_role;
GRANT EXECUTE ON FUNCTION public.move_to_dlq(text, text, bigint, jsonb) TO service_role;
GRANT EXECUTE ON FUNCTION public.read_email_batch(text, integer, integer) TO service_role;

-- 5. Restrict storage.objects listing on the email-assets bucket.
--    The bucket stays public so direct file URLs continue to work; only LIST is locked down.
DROP POLICY IF EXISTS "Public read email-assets" ON storage.objects;
CREATE POLICY "Service role can list email-assets"
  ON storage.objects
  FOR SELECT
  TO service_role
  USING (bucket_id = 'email-assets');
