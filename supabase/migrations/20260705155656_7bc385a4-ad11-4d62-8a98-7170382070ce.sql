
REVOKE EXECUTE ON FUNCTION public.touch_contact_submissions_updated_at() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.update_email_preferences_updated_at() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.touch_contact_submissions_updated_at() TO service_role;
GRANT EXECUTE ON FUNCTION public.update_email_preferences_updated_at() TO service_role;
