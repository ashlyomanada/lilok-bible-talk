-- Grant Data API table privileges separately from row-level security policies.
-- RLS policies restrict the rows each role can access after these grants.

GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;

GRANT SELECT ON TABLE
  public.site_settings,
  public.events,
  public.contacts_social,
  public.sunday_services,
  public.sections,
  public.sunday_venues,
  public.expect_cards,
  public.verse,
  public.gallery_images,
  public.announcements
TO anon;

GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE
  public.profiles,
  public.site_settings,
  public.events,
  public.contacts_social,
  public.sunday_services,
  public.sunday_venues,
  public.sections,
  public.expect_cards,
  public.verse,
  public.gallery_images,
  public.announcements
TO authenticated;

GRANT SELECT, INSERT ON TABLE public.activity_logs TO authenticated;

GRANT ALL PRIVILEGES ON TABLE
  public.profiles,
  public.site_settings,
  public.events,
  public.contacts_social,
  public.sunday_services,
  public.sunday_venues,
  public.sections,
  public.expect_cards,
  public.verse,
  public.gallery_images,
  public.announcements,
  public.activity_logs
TO service_role;

GRANT EXECUTE ON FUNCTION public.is_admin() TO anon, authenticated, service_role;

DO $$
DECLARE
  uuid_function regprocedure;
  uuid_schema NAME;
BEGIN
  SELECT p.oid::regprocedure, n.nspname
  INTO uuid_function, uuid_schema
  FROM pg_proc AS p
  JOIN pg_namespace AS n ON n.oid = p.pronamespace
  WHERE p.proname = 'uuid_generate_v4'
    AND p.pronargs = 0
    AND p.prorettype = 'uuid'::regtype
  ORDER BY (n.nspname = 'public') DESC
  LIMIT 1;

  IF uuid_function IS NOT NULL THEN
    EXECUTE format('GRANT USAGE ON SCHEMA %I TO authenticated, service_role', uuid_schema);
    EXECUTE format('GRANT EXECUTE ON FUNCTION %s TO authenticated, service_role', uuid_function);
  END IF;
END $$;
