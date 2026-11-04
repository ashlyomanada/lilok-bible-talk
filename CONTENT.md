# Lilok CMS — Content Guide & Reference

This guide details every editable content field across the Lilok Bible Talk CMS, its location in the `/admin` console, recommended formatting, character limits, and image specifications.

---

## 1. Event & Schedule (`/admin/event`)

Controls the core gathering details, recurring schedule engine, next session computation, countdown strip, and map links.

| Field | Type | Required | Recommended Format / Example | Description |
|---|---|---|---|---|
| **Event Title** | Text | Yes | `Lilok: Faith in the Real World` | Main title shown in Hero and event cards. |
| **Subtitle / Tagline** | Text | Yes | `A weekly conversation on Scripture, doubt, purpose, and following Jesus.` | Descriptive subtitle for the gathering. |
| **Weekday** | Dropdown | Yes | `Thursday` | Day of week for recurring session computation. |
| **Start Time** | Time | Yes | `19:00` (7:00 PM) | Start time in 24-hr format (Asia/Manila time). |
| **End Time** | Time | Yes | `20:30` (8:30 PM) | End time in 24-hr format (Asia/Manila time). |
| **Timezone** | Text | Yes | `Asia/Manila` (UTC+08:00) | Local timezone used for countdown calculation and .ics exports. |
| **Countdown Toggle** | Boolean | Yes | `true` / `false` | Shows/hides the live countdown strip under the hero. |
| **Special Date Override** | Date | No | `YYYY-MM-DD` | If set, overrides the calculated next recurring weekday with a specific date. |
| **Cancellation Notice** | Text | No | `Cancelled due to typhoon. Next session resuming next week!` | If entered, displays a prominent notice and pauses the countdown. |
| **Venue Name** | Text | Yes | `Kape Cinco / MICC Fellowship Room` | Name of the venue or establishment. |
| **Room / Suite** | Text | No | `2nd Floor Function Area` | Specific room or level. |
| **Street Address** | Text | Yes | `5th Ave, Bonifacio Global City, Taguig` | Full street address. |
| **Google Maps URL** | URL | Yes | `https://maps.google.com/?q=...` | Opens directions when users tap "Open in Google Maps". |
| **Venue Directions / Notes** | Text | No | `Free parking along the perimeter. Look for the Lilok banner near the entrance.` | Helpful commute or parking hints for visitors. |
| **RSVP / Messenger Link** | URL | Yes | `https://m.me/manilaicc` | Direct messaging link for registrations or questions. |

---

## 2. Brand Identity & SEO (`/admin/settings`)

Global website branding, church identity, social preview tags, and footer info.

| Field | Type | Required | Example | Notes |
|---|---|---|---|---|
| **Church / Group Name** | Text | Yes | `Manila International Christian Church` | Used across headers, copyrights, and metadata. |
| **Ministry Name** | Text | Yes | `Lilok Bible Talk` | Short ministry brand title. |
| **Tagline** | Text | Yes | `Shaping lives through authentic community & God's Word.` | Displayed under the footer logo and in search summaries. |
| **Logo URL** | Text / Image | Yes | `/images/mnl-logo-white.png` | Light-colored PNG or SVG with transparent background (height: 28-36px). |
| **SEO Meta Title** | Text | Yes | `Lilok Bible Talk · Manila International Christian Church` | Recommended length: 50–60 characters. |
| **SEO Meta Description** | Text | Yes | `Join Lilok Bible Talk every Thursday evening in Metro Manila. A welcoming community exploring faith, scripture, and real life.` | Recommended length: 140–160 characters. |
| **Open Graph (OG) Image** | URL / Upload | Yes | `https://lilok.micc.church/images/og-image.jpg` | Dimensions: 1200 × 630 px (JPEG or WebP, under 500 KB). |
| **Footer Copyright** | Text | Yes | `© 2026 Manila International Christian Church. All rights reserved.` | Displayed at the bottom of the footer. |

---

## 3. Home Page Sections (`/admin/sections`)

Allows reordering sections on the single-page layout and toggling their visibility.

| Section Key | Section Label | Default Order | Editable Fields |
|---|---|---|---|
| `hero` | Hero Welcome | 1 | Heading, subtitle, primary button label, RSVP link. |
| `countdown` | Next Session Countdown Strip | 2 | Visibility switch (also linked to event countdown toggle). |
| `welcome` | Warm Welcome & Purpose | 3 | Heading, body text, highlight badge. |
| `expect` | What to Expect (Bento Grid) | 4 | Heading, subtitle, bento cards. |
| `verse` | Scripture Highlight | 5 | Scripture passage, reference, translation, reflection note. |
| `details` | Gathering Details & Map | 6 | Heading, venue cards, calendar button. |
| `sunday` | Sunday Worship Services | 7 | Heading, region cards, service times. |
| `gallery` | Photo Moments | 8 | Heading, subtitle, photo grid. |
| `share` | Bring a Friend / Share Invite | 9 | Heading, share text, copy button. |
| `connect` | Connect & Social Links | 10 | Heading, subtitle, direct contact buttons. |

---

## 4. What to Expect Bento Cards (`/admin/expect-cards`)

Interactive grid cards showcasing the culture of the gathering to new guests.

| Field | Recommended Specification |
|---|---|
| **Card Title** | 2–4 words (e.g. `Authentic Conversations`, `No Judgment Zone`). |
| **Tagline** | Short punchy phrase (e.g. `Bring your questions and your real self`). |
| **Description** | 2–3 sentences describing what happens during that part of the evening. |
| **Icon Name** | Lucide / Iconify icon identifier (e.g. `heart`, `users`, `book-open`, `coffee`, `sparkles`). |
| **Badge (Optional)** | Pill tag such as `Free Coffee`, `Interactive`, `Casual`. |
| **Grid Column Span** | Standard (1 col) or Wide (2 cols) on desktop. |

---

## 5. Photo Gallery (`/admin/gallery`)

Visual snapshots of fellowship, coffee, worship, and Bible discussions.

| Specification | Recommendation |
|---|---|
| **File Formats** | JPEG, WebP, PNG. |
| **Max File Size** | 5 MB per file. |
| **Aspect Ratios** | `aspect-[4/5]` for portrait photos; `aspect-[16/10]` for wide group shots. |
| **Recommended Dimensions** | **Portrait**: 800 × 1000 px.<br>**Landscape**: 1200 × 750 px. |
| **Alt Text (Required)** | Descriptive text for search engines and screen readers (e.g. `Friends chatting over coffee at Lilok gathering`). |
| **Title & Subtitle** | Overlay caption displayed when hovering or viewing in lightbox. |

---

## 6. Sunday Worship Services (`/admin/sunday`)

Information about the main Sunday church services across Manila regions.

| Field | Description |
|---|---|
| **Service Day & Time** | e.g. `Every Sunday · 10:00 AM`. |
| **Welcome Message** | Invitation text to join Sunday service after attending Bible Talk. |
| **Region Venue Cards** | Add multiple regional locations (e.g. Metro Manila North, Metro Manila South, East Campus). |
| **Venue Details** | Venue name, full physical address, Google Maps link, and optional `TBA` flag if venue is rotating. |

---

## 7. Contacts & Social Media (`/admin/contacts`)

Direct communication channels displayed in the sticky mobile bar and Connect section.

| Channel | Input Format |
|---|---|
| **Facebook Messenger** | `https://m.me/yourchurchpage` (direct chat link). |
| **Instagram** | `https://instagram.com/yourhandle` or `@yourhandle`. |
| **Facebook Page** | `https://facebook.com/yourpage`. |
| **YouTube** | `https://youtube.com/@yourchannel`. |
| **Phone / WhatsApp** | `+63 917 123 4567` (international format). |
| **Email** | `hello@micc.church`. |
| **Event Hashtag** | `#LilokBibleTalk` or `#ManilaICC`. |

---

## 8. Announcement Banner (`/admin/announcements`)

Top notification banner for timely updates.

| Field | Description |
|---|---|
| **Enable Switch** | When on, displays above the navigation bar across the site. |
| **Banner Message** | Max 250 characters. Keep under 120 characters for clean single-line display on phones. |
| **Action Button** | Optional link label and target URL (e.g. `Message Us →` or `Directions →`). |
| **Start / End Dates** | Optional schedule window. Banner automatically hides after the end date expires. |

