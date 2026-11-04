CREATE TABLE IF NOT EXISTS public.testimonies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  message TEXT NOT NULL DEFAULT '',
  image_url TEXT NOT NULL,
  image_path TEXT NOT NULL,
  is_published BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  published_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS testimonies_published_idx
  ON public.testimonies (is_published, published_at DESC);

ALTER TABLE public.testimonies ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can read published testimonies" ON public.testimonies;
CREATE POLICY "Public can read published testimonies"
  ON public.testimonies FOR SELECT TO anon, authenticated
  USING (is_published = TRUE);

GRANT SELECT ON TABLE public.testimonies TO anon, authenticated;
GRANT ALL PRIVILEGES ON TABLE public.testimonies TO service_role;

UPDATE storage.buckets
SET file_size_limit = 10485760
WHERE id = 'site-media';
