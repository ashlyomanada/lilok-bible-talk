# 🕊️ Lilok Bible Talk — CMS & Invitation Website

A warm, uplifting, mobile-first single-page invitation website and Content Management System (CMS) for **Lilok Bible Talk** (Manila International Christian Church).

Built with **Nuxt 4 (Vue 3, `<script setup>`)**, **Tailwind CSS**, and **Supabase (PostgreSQL, Auth, Storage)**. Hybrid-rendered with 60-second SWR caching for ultra-fast global load times and instantaneous live updates via the secure `/admin` console.

---

## 🌟 Highlights & Architecture

- **Full In-Place CMS (`/admin`)**: Edit event schedule, title, venue, countdown, Scripture highlight, bento expectation cards, photo gallery, Sunday worship regional locations, contact channels, announcements, and global SEO meta tags without modifying code or redeploying.
- **Instant Fallback Guarantee**: If Supabase is unconfigured, unreachable, or in development mode, the site seamlessly renders using `config/event.ts` seed defaults. It **never** displays a blank or broken page.
- **Hybrid Rendering (`swr: 60`)**: The public landing page (`/`) serves lightning-fast cached HTML regenerated every 60 seconds (or immediately purged on demand via `/api/revalidate`), while the admin portal (`/admin/**`) runs as a protected Single-Page App with `X-Robots-Tag: noindex, nofollow`.
- **Row Level Security (RLS)**: Public anonymous visitors can only read published rows. All mutations and storage management require authenticated administrative credentials (`profiles.role = 'admin'`).
- **Dynamic Recurring Schedule**: Automatically computes the upcoming Thursday gathering in `Asia/Manila` (UTC+08:00) with countdown clocks, Google Calendar links, and native `.ics` file generation.
- **Direct Media Storage**: Drag-and-drop image uploads with automatic MIME verification, 5 MB file size checks, and unique UUID naming stored directly in the `site-media` bucket.

---

## 🚀 Quick Setup & Local Development

### 1. Prerequisites
- **Bun** (recommended) or **Node.js** (v22+)
- A **Supabase** account (Free tier or higher)

### 2. Install Dependencies
```bash
bun install
```

### 3. Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Fill in your Supabase project keys in `.env`:
```ini
# Supabase Public Configuration (Accessible to client)
SUPABASE_URL="https://your-project.supabase.co"
SUPABASE_KEY="your-anon-public-key"

# Server-Only Configuration (Never leaked to client bundle)
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"

# Local Admin Fallback (Optional, for offline development)
ADMIN_DEFAULT_EMAIL="admin@micc.church"
ADMIN_DEFAULT_PASSWORD="YourSecurePasswordHere!"
```

> [!CAUTION]
> Never commit `.env` or your `SUPABASE_SERVICE_ROLE_KEY` to GitHub. The service role key bypasses PostgreSQL Row Level Security and must only be stored in your server environment variables or hosting dashboard.

---

## 🗄️ Database Setup & Migration

### 1. Run Database Migrations
You can apply the complete database schema and storage policies via the Supabase Dashboard SQL Editor or Supabase CLI:

**Option A — Supabase SQL Editor:**
1. Open your Supabase Dashboard -> **SQL Editor**.
2. Open [`supabase/migrations/20261103000001_initial_schema.sql`](file:///Users/ccci/Project/lilok-bible-talk/supabase/migrations/20261103000001_initial_schema.sql).
3. Paste the contents and click **Run**. This creates:
   - 12 PostgreSQL tables (`site_settings`, `event_data`, `sections`, `expect_cards`, `verse`, `gallery_images`, `sunday_service`, `sunday_venues`, `contacts_social`, `announcements`, `profiles`, `activity_logs`).
   - Row Level Security policies for read-only anon access and full admin access.
   - The public storage bucket `site-media` for photo uploads.

### 2. Seed Initial Content
Load the existing church event details, photos, and configurations into the database:
```bash
bun run seed
```

### 3. Create the First Admin Account
Provision your first authorized administrator:
```bash
bun run create-admin admin@micc.church "YourSecurePassword!" "Lilok Administrator"
```
Or run interactively:
```bash
bun run create-admin
```

---

## 💻 Running the App

### Start Development Server
```bash
bun run dev
```
- Public Landing Page: [http://localhost:3000](http://localhost:3000)
- Admin Console: [http://localhost:3000/admin](http://localhost:3000/admin)

### Production Build
```bash
bun run build
```

### Test Production Server Locally
```bash
bun run preview
# or
node .output/server/index.mjs
```

---

## ☁️ Deployment Guide

### Vercel Deployment
1. Connect your GitHub repository to [Vercel](https://vercel.com).
2. Framework Preset: **Nuxt.js** (automatically detected).
3. Build Command: `bun run build` (or `npm run build`).
4. Output Directory: Default (`.output`).
5. Configure Environment Variables in the Vercel Project Settings:
   - `SUPABASE_URL`
   - `SUPABASE_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `ADMIN_DEFAULT_EMAIL`
   - `ADMIN_DEFAULT_PASSWORD`
6. Deploy. Vercel automatically deploys Nitro serverless functions for hybrid rendering and API routes.

### Netlify Deployment
1. Connect repository in [Netlify](https://netlify.com).
2. Build command: `bun run build`.
3. Publish directory: `.output/public`.
4. Add Netlify Nuxt plugin or set `NITRO_PRESET=netlify`.
5. Add the same Environment Variables under **Site configuration > Environment variables**.

---

## 📖 Content Editor Guide (For Church Staff & Leaders)

Non-technical volunteers and church staff can update all content from any browser or phone:

1. **Accessing the Console**: Navigate to `/admin` and log in with your credentials.
2. **Event & Schedule (`/admin/event`)**:
   - Change start or end times, venue address, or directions.
   - Enter a special date override or cancellation notice if plans change due to weather or venue availability.
   - The next session date and countdown timer automatically compute and update on the home page.
3. **Photo Gallery (`/admin/gallery`)**:
   - Drag and drop photos directly onto the upload zone (under 5 MB).
   - Enter a descriptive alt text (e.g. "Warm welcome over coffee") and captions.
   - Reorder images using the **↑** and **↓** arrows, or unpublish photos to hide them.
4. **Top Announcement Bar (`/admin/announcements`)**:
   - Switch on the announcement bar to show a banner across the top of the site.
   - Set an optional button link (e.g. direct Messenger link or map directions).
   - Set start and expiration dates for automated scheduling.
5. **What to Expect (`/admin/expect-cards`)**:
   - Add, edit, or reorder the bento grid cards explaining the gathering flow.
6. **Publishing Changes**:
   - Tap **Save** in the top-right corner of any editor page.
   - Tap the **Preview Site** button at any time to open the public site in a new tab.

For complete field specifications, character counts, and image dimensions, refer to [`CONTENT.md`](file:///Users/ccci/Project/lilok-bible-talk/CONTENT.md).

---

## 🛡️ Security Features

- **Row Level Security (RLS)**: Enforced directly at the Postgres engine level.
- **CSRF & Rate Limiting**: In-memory rate limiting throttles brute-force attempts on `/api/admin/auth/login`.
- **Strict Disallow in Search Engines**: `/admin` and `/api/` are disallowed in `robots.txt` and protected by HTTP headers `X-Robots-Tag: noindex, nofollow`.
- **Upload Restrictions**: Server-side MIME validation allows only safe image formats (JPEG, PNG, WebP, GIF, SVG) up to 5 MB.
- **Audit Logging**: All admin modifications, uploads, and deletions are recorded in `activity_logs`.
