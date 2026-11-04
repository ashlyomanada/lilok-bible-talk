# Diagnosis report

## Reproduction

- `bun install` initially stopped in Nuxt's postinstall because Node could not read the host OpenSSL config (`Operation not permitted`). `OPENSSL_CONF=/dev/null bun install` completed with no dependency changes.
- Nuxt dev and production build/preview start. Node 22.19.0 is below Nuxt's supported patch range. The Supabase key deprecation warning was fixed by renaming the local ignored variable and updating `.env.example`.
- The shared browser showed the page rendering, two WhatsApp/SMS hydration attribute mismatches, and `Your project has layouts but the <NuxtLayout /> component has not been used.` After fixes, a fresh navigation showed no console events; the page remained present at 375px and 1280px.
- Server logs showed all ten Supabase table reads failing with `Could not find the table 'public.<table>' in the schema cache`. The API returned HTTP 200 with defaults, concealing the missing remote schema from a status-only check.

## Causes and checks

| Finding | Evidence | Action |
| --- | --- | --- |
| Supabase CMS tables were created without Data API table grants, so the seed and public reads are denied before RLS can evaluate rows. | Seed requests return `permission denied for table ...`; the first grants migration attempt also assumed `uuid_generate_v4()` was in `public`, while this project's extension installs it elsewhere. | Added `20261104000001_cms_table_grants.sql` with role-appropriate table grants and dynamic discovery of the UUID function's schema. Apply this updated migration, then rerun the seed. |
| Supabase failures were silently hidden and could partially mix CMS content with defaults. | `server/api/content.get.ts` used `Promise.allSettled`, ignored Supabase `{ error }` results, and had no timeout. | Now logs table failures, times out after 8 seconds, and returns the complete defaults if any read fails. |
| Share links differed during hydration. | `ShareInvite.vue` used `window.location.href` in the browser and the canonical URL on the server; browser logs showed mismatched WhatsApp/SMS `href`s. | Both server render and client interactions now use the configured canonical URL. |
| Nuxt layout setup was incomplete. | Browser warned that layouts existed but `<NuxtLayout />` was not used; `layouts/admin.vue` provides the admin shell. | `app.vue` now mounts `<NuxtLayout>` around `<NuxtPage>`, with a minimal default layout for the public page. Fresh browser navigation has no hydration warnings. |
| Redirect and route rules are not the cause. | `nuxt.config.ts` sets `supabase.redirect: false`; SWR applies only to `/`, and `ssr: false` only to `/admin/**`. Build uses Nitro `node-server`. | No changes. |
| The checked-in RLS migration and public bucket policies are present. | `supabase/migrations/20261103000001_initial_schema.sql` enables RLS, creates public read policies (published-only for card/gallery/venue tables), and creates `site-media`. | No RLS changes. Deployed state will be created when the existing migration is applied. |
| Service key remains server-only. | Public content uses the anon/publishable key; admin helpers and seed script use the secret server-side. | Renamed the local ignored key and example to `NUXT_SUPABASE_SECRET_KEY`; seed script accepts it. Never expose it via a `NUXT_PUBLIC_` variable. |
| Tailwind utilities were missing from the public page. | Runtime CSS showed `py-20` produced `0px`, the hero title stayed at `32px` instead of its responsive `128px`, and custom backgrounds were transparent. Nuxt UI 4 uses Tailwind 4, while `main.css` still used Tailwind 3 directives and the direct Tailwind dependency was v3. | Switched to Tailwind 4 imports, explicitly loaded the existing `tailwind.config.js`, and updated the direct Tailwind dependency to v4. |

The public site now renders from defaults when Supabase is unavailable. CMS-managed content will remain on defaults until the existing migration and seed are applied to the connected Supabase project.
