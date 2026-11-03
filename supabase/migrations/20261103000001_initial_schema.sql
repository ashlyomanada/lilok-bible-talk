-- Supabase Migration: 20261103000001_initial_schema.sql
-- Description: Complete schema for Lilok Bible Talk CMS

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. PROFILES TABLE (linked to auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  role TEXT NOT NULL DEFAULT 'editor' CHECK (role IN ('admin', 'editor')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_profiles_updated
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Helper function to check admin role
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. SITE SETTINGS TABLE (Singleton)
CREATE TABLE IF NOT EXISTS public.site_settings (
  id TEXT PRIMARY KEY DEFAULT 'default',
  group_name TEXT NOT NULL,
  tagline TEXT NOT NULL,
  hashtag TEXT NOT NULL,
  logo_url TEXT NOT NULL,
  logo_alt TEXT NOT NULL,
  church_full_name TEXT NOT NULL,
  parent_church_name TEXT NOT NULL,
  parent_region TEXT NOT NULL,
  sold_out_badge TEXT NOT NULL,
  about_church TEXT NOT NULL,
  footer_blessing TEXT,
  seo_title TEXT NOT NULL,
  seo_description TEXT NOT NULL,
  seo_og_image TEXT NOT NULL,
  canonical_url TEXT NOT NULL,
  brand_colors JSONB DEFAULT '{"primary": "#0F1B26", "accent": "#F59E0B"}'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_by UUID REFERENCES public.profiles(id)
);

CREATE TRIGGER on_site_settings_updated
  BEFORE UPDATE ON public.site_settings
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- 4. EVENTS TABLE (Singleton for recurring schedule & current talk)
CREATE TABLE IF NOT EXISTS public.events (
  id TEXT PRIMARY KEY DEFAULT 'current',
  title TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  one_line_welcome TEXT NOT NULL,
  no_pressure_line TEXT NOT NULL,
  reassurance_chips JSONB NOT NULL DEFAULT '["Free", "All are welcome", "Bring a friend", "Come as you are"]'::jsonb,
  recurrence_weekday INT NOT NULL DEFAULT 4, -- 0=Sun, 4=Thu
  recurrence_hour INT NOT NULL DEFAULT 19,    -- 7:00 PM
  recurrence_minute INT NOT NULL DEFAULT 0,
  recurrence_duration_minutes INT NOT NULL DEFAULT 180,
  recurrence_timezone TEXT NOT NULL DEFAULT 'Asia/Manila',
  doors_open_time TEXT NOT NULL DEFAULT '6:30 PM',
  special_date_override TIMESTAMPTZ,
  is_cancelled BOOLEAN NOT NULL DEFAULT FALSE,
  countdown_enabled BOOLEAN NOT NULL DEFAULT TRUE,
  venue_name TEXT NOT NULL,
  venue_room TEXT NOT NULL,
  venue_address TEXT NOT NULL,
  venue_city_state_zip TEXT NOT NULL,
  venue_map_url TEXT NOT NULL,
  venue_notes TEXT NOT NULL,
  speaker_name TEXT NOT NULL,
  speaker_title TEXT NOT NULL,
  speaker_bio TEXT NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_by UUID REFERENCES public.profiles(id)
);

CREATE TRIGGER on_events_updated
  BEFORE UPDATE ON public.events
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- 5. CONTACTS & SOCIAL TABLE (Singleton)
CREATE TABLE IF NOT EXISTS public.contacts_social (
  id TEXT PRIMARY KEY DEFAULT 'default',
  messenger_url TEXT NOT NULL,
  facebook_url TEXT NOT NULL,
  facebook_page_name TEXT NOT NULL,
  instagram_url TEXT NOT NULL,
  instagram_handle TEXT NOT NULL,
  micc_instagram_url TEXT NOT NULL,
  micc_instagram_handle TEXT NOT NULL,
  youtube_url TEXT NOT NULL,
  youtube_handle TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  display_phone TEXT NOT NULL,
  connect_copy TEXT NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_by UUID REFERENCES public.profiles(id)
);

CREATE TRIGGER on_contacts_social_updated
  BEFORE UPDATE ON public.contacts_social
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- 6. SUNDAY SERVICES TABLE (Singleton header)
CREATE TABLE IF NOT EXISTS public.sunday_services (
  id TEXT PRIMARY KEY DEFAULT 'default',
  day_and_time TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  note TEXT NOT NULL,
  messenger_url TEXT NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_by UUID REFERENCES public.profiles(id)
);

CREATE TRIGGER on_sunday_services_updated
  BEFORE UPDATE ON public.sunday_services
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- 7. SUNDAY VENUES TABLE
CREATE TABLE IF NOT EXISTS public.sunday_venues (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  city TEXT NOT NULL,
  venue_name TEXT NOT NULL,
  address TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'TBA',
  notes TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  published BOOLEAN NOT NULL DEFAULT TRUE,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_by UUID REFERENCES public.profiles(id)
);

CREATE TRIGGER on_sunday_venues_updated
  BEFORE UPDATE ON public.sunday_venues
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- 8. HOMEPAGE SECTIONS TABLE
CREATE TABLE IF NOT EXISTS public.sections (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT,
  body_markdown TEXT,
  image_url TEXT,
  button_label TEXT,
  button_url TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  is_visible BOOLEAN NOT NULL DEFAULT TRUE,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_by UUID REFERENCES public.profiles(id)
);

CREATE TRIGGER on_sections_updated
  BEFORE UPDATE ON public.sections
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- 9. EXPECT CARDS TABLE (What to Expect Bento)
CREATE TABLE IF NOT EXISTS public.expect_cards (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  card_id TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  tagline TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  badge TEXT,
  span TEXT NOT NULL DEFAULT 'col-span-1',
  sort_order INT NOT NULL DEFAULT 0,
  published BOOLEAN NOT NULL DEFAULT TRUE,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_by UUID REFERENCES public.profiles(id)
);

CREATE TRIGGER on_expect_cards_updated
  BEFORE UPDATE ON public.expect_cards
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- 10. VERSE TABLE (Singleton)
CREATE TABLE IF NOT EXISTS public.verse (
  id TEXT PRIMARY KEY DEFAULT 'default',
  text TEXT NOT NULL,
  reference TEXT NOT NULL,
  translation TEXT NOT NULL DEFAULT 'NIV',
  reflection_note TEXT NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_by UUID REFERENCES public.profiles(id)
);

CREATE TRIGGER on_verse_updated
  BEFORE UPDATE ON public.verse
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- 11. GALLERY IMAGES TABLE
CREATE TABLE IF NOT EXISTS public.gallery_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  image_url TEXT NOT NULL,
  alt_text TEXT NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  span TEXT NOT NULL DEFAULT 'col-span-1 md:col-span-1 aspect-[4/5]',
  sort_order INT NOT NULL DEFAULT 0,
  published BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_by UUID REFERENCES public.profiles(id)
);

CREATE TRIGGER on_gallery_images_updated
  BEFORE UPDATE ON public.gallery_images
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- 12. ANNOUNCEMENTS TABLE
CREATE TABLE IF NOT EXISTS public.announcements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  message TEXT NOT NULL,
  link_url TEXT,
  link_text TEXT,
  start_date TIMESTAMPTZ,
  end_date TIMESTAMPTZ,
  is_active BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_by UUID REFERENCES public.profiles(id)
);

CREATE TRIGGER on_announcements_updated
  BEFORE UPDATE ON public.announcements
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- 13. ACTIVITY LOGS TABLE
CREATE TABLE IF NOT EXISTS public.activity_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id),
  user_email TEXT,
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id TEXT,
  details JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =============================================================================

-- Enable RLS on every table
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contacts_social ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sunday_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sunday_venues ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.expect_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.verse ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

-- 1. PROFILES POLICIES
CREATE POLICY "Admins can view all profiles"
  ON public.profiles FOR SELECT
  USING (public.is_admin() OR auth.uid() = id);

CREATE POLICY "Admins can insert profiles"
  ON public.profiles FOR INSERT
  WITH CHECK (public.is_admin() OR auth.uid() = id);

CREATE POLICY "Admins can update profiles"
  ON public.profiles FOR UPDATE
  USING (public.is_admin());

CREATE POLICY "Admins can delete profiles"
  ON public.profiles FOR DELETE
  USING (public.is_admin());

-- 2. SINGLETON CONTENT TABLES (site_settings, events, contacts_social, sunday_services, verse)
-- Public read, Admin write
DO $$
DECLARE
  t TEXT;
BEGIN
  FOR t IN SELECT unnest(ARRAY['site_settings', 'events', 'contacts_social', 'sunday_services', 'verse']) LOOP
    EXECUTE format('
      CREATE POLICY "Public read for %I" ON public.%I FOR SELECT USING (true);
      CREATE POLICY "Admin insert for %I" ON public.%I FOR INSERT WITH CHECK (public.is_admin());
      CREATE POLICY "Admin update for %I" ON public.%I FOR UPDATE USING (public.is_admin());
      CREATE POLICY "Admin delete for %I" ON public.%I FOR DELETE USING (public.is_admin());
    ', t, t, t, t, t);
  END LOOP;
END $$;

-- 3. SECTIONS POLICIES (Public read visible sections, Admin full access)
CREATE POLICY "Public read visible sections"
  ON public.sections FOR SELECT
  USING (is_visible = true OR public.is_admin());

CREATE POLICY "Admin insert sections"
  ON public.sections FOR INSERT
  WITH CHECK (public.is_admin());

CREATE POLICY "Admin update sections"
  ON public.sections FOR UPDATE
  USING (public.is_admin());

CREATE POLICY "Admin delete sections"
  ON public.sections FOR DELETE
  USING (public.is_admin());

-- 4. SUNDAY VENUES, EXPECT CARDS, GALLERY IMAGES (Public read published only)
DO $$
DECLARE
  t TEXT;
BEGIN
  FOR t IN SELECT unnest(ARRAY['sunday_venues', 'expect_cards', 'gallery_images']) LOOP
    EXECUTE format('
      CREATE POLICY "Public read published for %I" ON public.%I FOR SELECT USING (published = true OR public.is_admin());
      CREATE POLICY "Admin insert for %I" ON public.%I FOR INSERT WITH CHECK (public.is_admin());
      CREATE POLICY "Admin update for %I" ON public.%I FOR UPDATE USING (public.is_admin());
      CREATE POLICY "Admin delete for %I" ON public.%I FOR DELETE USING (public.is_admin());
    ', t, t, t, t, t);
  END LOOP;
END $$;

-- 5. ANNOUNCEMENTS POLICIES
CREATE POLICY "Public read active announcements"
  ON public.announcements FOR SELECT
  USING (
    (is_active = true AND
     (start_date IS NULL OR start_date <= NOW()) AND
     (end_date IS NULL OR end_date >= NOW()))
    OR public.is_admin()
  );

CREATE POLICY "Admin insert announcements"
  ON public.announcements FOR INSERT
  WITH CHECK (public.is_admin());

CREATE POLICY "Admin update announcements"
  ON public.announcements FOR UPDATE
  USING (public.is_admin());

CREATE POLICY "Admin delete announcements"
  ON public.announcements FOR DELETE
  USING (public.is_admin());

-- 6. ACTIVITY LOGS POLICIES
CREATE POLICY "Admin read activity logs"
  ON public.activity_logs FOR SELECT
  USING (public.is_admin());

CREATE POLICY "Admin insert activity logs"
  ON public.activity_logs FOR INSERT
  WITH CHECK (public.is_admin() OR auth.role() = 'authenticated');

-- =============================================================================
-- STORAGE BUCKET & STORAGE POLICIES
-- =============================================================================
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'site-media',
  'site-media',
  true,
  5242880, -- 5 MB
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml', 'image/gif']
)
ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = 5242880,
  allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml', 'image/gif'];

-- Storage RLS: Public read
CREATE POLICY "Public read for site-media bucket"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'site-media');

-- Storage RLS: Admin insert/update/delete
CREATE POLICY "Admin write for site-media bucket"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'site-media' AND public.is_admin());

CREATE POLICY "Admin update for site-media bucket"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'site-media' AND public.is_admin());

CREATE POLICY "Admin delete for site-media bucket"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'site-media' AND public.is_admin());

