CREATE TABLE public.analytics_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_name TEXT NOT NULL,
  page TEXT,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  user_agent TEXT,
  referrer TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE INDEX idx_analytics_events_event_name ON public.analytics_events (event_name, created_at DESC);

ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;

-- Anyone (including anon visitors) can insert their own analytics events
CREATE POLICY "Anyone can log analytics events"
  ON public.analytics_events
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Reads are restricted (no policy = denied for non-service-role).
