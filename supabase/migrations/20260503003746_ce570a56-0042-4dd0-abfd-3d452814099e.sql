CREATE TABLE public.email_preferences (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  spiritual_insights BOOLEAN NOT NULL DEFAULT TRUE,
  guide_releases BOOLEAN NOT NULL DEFAULT TRUE,
  reading_updates BOOLEAN NOT NULL DEFAULT TRUE,
  unsubscribed_all BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE INDEX idx_email_preferences_email ON public.email_preferences (email);

ALTER TABLE public.email_preferences ENABLE ROW LEVEL SECURITY;

-- Only service role (edge functions) can manage preferences.
-- Visitors interact through the handle-email-unsubscribe edge function.
CREATE POLICY "Service role can read preferences"
  ON public.email_preferences
  FOR SELECT
  TO public
  USING (auth.role() = 'service_role');

CREATE POLICY "Service role can insert preferences"
  ON public.email_preferences
  FOR INSERT
  TO public
  WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Service role can update preferences"
  ON public.email_preferences
  FOR UPDATE
  TO public
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION public.update_email_preferences_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_email_preferences_updated_at
BEFORE UPDATE ON public.email_preferences
FOR EACH ROW
EXECUTE FUNCTION public.update_email_preferences_updated_at();
