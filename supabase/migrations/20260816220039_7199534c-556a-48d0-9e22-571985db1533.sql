GRANT SELECT ON public.analytics_events TO authenticated;
GRANT SELECT ON public.leads TO authenticated;

CREATE POLICY "Admins can view analytics events"
ON public.analytics_events FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can view leads"
ON public.leads FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));