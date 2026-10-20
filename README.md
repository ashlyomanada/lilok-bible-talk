# 🕊️ Bible Talk Event Invitation Website

A warm, uplifting, mobile-first single-page invitation website for a church Bible Talk event. Built with **Nuxt 3 (Vue 3, `<script setup>`)** and **Tailwind CSS**. Fully static with zero backend dependencies, designed to load fast and look stunning when opened from shared links on mobile devices and desktop browsers.

---

## ✨ Features & Highlights

- **Aesthetic**: Warm ivory, gold, sunrise gradients, and Cormorant Garamond serif headings paired with clean sans-serif typography.
- **Mobile-First & Fully Responsive**: Optimized for phones (cleanly stacking chips, tap targets, mobile drawer menu).
- **Subtle Motion & Accessibility**: Smooth scroll transitions, hover micro-interactions, and respects `prefers-reduced-motion`.
- **Single Config File**: Edit church name, title, date, time, venue, speaker, contact, and scripture in one place (`config/event.ts`).
- **Interactive Calendar Actions**: One-click Google Calendar integration and native `.ics` file generation for Apple Calendar & Outlook.
- **Photo Gallery & Lightbox**: 6 curated photo placeholders with full keyboard and touch-friendly lightbox modal.
- **Social Sharing**: Native Web Share API integration (`navigator.share`) with automatic clipboard fallback and copy notifications.
- **Upload Component (UI-ready)**: Drag-and-drop zone with instant local photo preview, name/testimony inputs, and friendly "Coming soon" notice with clean `TODO` hooks for future backend integration.
- **Static Generation (`nuxt generate`)**: Compiles to pure static HTML/CSS/JS in `.output/public/`, deployable anywhere (Vercel, Netlify, Cloudflare Pages, GitHub Pages).

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install --legacy-peer-deps
```

### 2. Start Local Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Generate Static Production Build
```bash
npm run generate
```
The production-ready static files are placed in `.output/public`.

### 4. Preview the Static Build
```bash
npx serve .output/public
# or
npm run preview
```

---

## 📝 How to Customize Event Details

All event data is centralized in [`config/event.ts`](file:///Users/ccci/Desktop/Project/config/event.ts). 

Open [`config/event.ts`](file:///Users/ccci/Desktop/Project/config/event.ts) and modify any of the constants:

```typescript
export const eventConfig = {
  churchName: 'Grace Community Church',
  churchTagline: 'A community where grace is found and hope is renewed',

  eventTitle: 'Bible Talk: Finding Hope in Hard Times',
  eventSubtitle: 'An evening of warm fellowship, uplifting scripture...',
  oneLineWelcome: 'No matter where you are in your journey, you are warmly invited.',

  date: 'Saturday, November 14, 2026',
  time: '6:30 PM – 8:30 PM (Doors open 6:00 PM)',

  venue: {
    name: 'Grace Fellowship Hall (Main Campus)',
    room: 'The Garden Room (Ground Floor)',
    address: '742 Evergreen Terrace',
    cityStateZip: 'Springfield, OR 97477',
    mapLink: 'https://maps.google.com/?q=...',
    notes: 'Free on-site parking available behind the building.'
  },

  speaker: {
    name: 'Pastor David Vance & Guest Panel',
    title: 'Teaching Pastor & Community Chaplain',
    bio: '...'
  },

  contact: {
    phone: '+15552345678',
    displayPhone: '(555) 234-5678',
    email: 'hello@gracecommunity.org',
    facebookPageUrl: 'https://facebook.com/...',
    facebookPageName: 'facebook.com/GraceCommunityTalk'
  },

  verse: {
    text: '“Come to me, all you who are weary and burdened, and I will give you rest...”',
    reference: 'Matthew 11:28–29',
    translation: 'NIV',
    reflectionNote: 'Whatever weight you have been carrying this week...'
  }
}
```

Updating this file automatically updates the Hero, Navigation, Verse Card, Event Details, Calendar files, Share text, and Footer.

---

## 🖼️ How to Swap Images with Your Own Church Photos

All static photos reside in [`public/images/`](file:///Users/ccci/Desktop/Project/public/images/):

| File Path | Description | Recommended Dimensions |
| :--- | :--- | :--- |
| `public/images/hero.jpg` | Background image for Hero section | 1920 × 1080 px |
| `public/images/welcome.jpg` | Warm welcoming community photo | 1200 × 800 px |
| `public/images/gallery-1.jpg` | Open Bible / scripture study | 1000 × 750 px |
| `public/images/gallery-2.jpg` | Acoustic worship / singing | 1000 × 750 px |
| `public/images/gallery-3.jpg` | Friends enjoying coffee & fellowship | 1000 × 750 px |
| `public/images/gallery-4.jpg` | Prayer & encouragement | 1000 × 750 px |
| `public/images/gallery-5.jpg` | Sunrise / inspirational landscape | 1000 × 750 px |
| `public/images/gallery-6.jpg` | Community dinner table gathering | 1000 × 750 px |
| `public/images/og-image.jpg` | Social share preview card (Facebook/Messenger) | 1200 × 630 px |

To replace any photo, simply drop your church's JPG image into `public/images/` with the corresponding filename.

---

## 🧩 Component Architecture

- [`components/Navbar.vue`](file:///Users/ccci/Desktop/Project/components/Navbar.vue): Sticky navigation header with mobile drawer and smooth scrolling
- [`components/Hero.vue`](file:///Users/ccci/Desktop/Project/components/Hero.vue): Full-screen hero with ambient warm gradient overlays, date/venue chips, and CTA
- [`components/WarmWelcome.vue`](file:///Users/ccci/Desktop/Project/components/WarmWelcome.vue): Welcoming copy, reassurance badges, and warm photography
- [`components/VerseCard.vue`](file:///Users/ccci/Desktop/Project/components/VerseCard.vue): Highlighted scripture quote card with large typography and copy action
- [`components/ExpectCards.vue`](file:///Users/ccci/Desktop/Project/components/ExpectCards.vue): 4 cards detailing what to expect during the evening
- [`components/EventDetails.vue`](file:///Users/ccci/Desktop/Project/components/EventDetails.vue): Date, time, venue, speaker bio, Google Calendar + .ics download, and Google Maps directions
- [`components/Gallery.vue`](file:///Users/ccci/Desktop/Project/components/Gallery.vue): Responsive photo gallery with interactive, accessible Lightbox modal
- [`components/ShareInvite.vue`](file:///Users/ccci/Desktop/Project/components/ShareInvite.vue): Web Share API invitation with clipboard copy fallback and direct WhatsApp / SMS buttons
- [`components/UploadCard.vue`](file:///Users/ccci/Desktop/Project/components/UploadCard.vue): Polished drag-and-drop file upload UI with live photo preview and `TODO` comment for backend integration
- [`components/Footer.vue`](file:///Users/ccci/Desktop/Project/components/Footer.vue): Church info, contact links, Romans 15:13 blessing line, and "See you there!" banner
- [`components/ToastContainer.vue`](file:///Users/ccci/Desktop/Project/components/ToastContainer.vue): Global feedback toasts
- [`utils/calendar.ts`](file:///Users/ccci/Desktop/Project/utils/calendar.ts): Google Calendar URL and native `.ics` generator
- [`composables/useToast.ts`](file:///Users/ccci/Desktop/Project/composables/useToast.ts): Reactive toast notification manager

---

## 🌐 Deploying to Static Hosting

### Netlify
1. Connect repository or run `netlify deploy --dir=.output/public --prod`.
2. Build command: `npm run generate`
3. Publish directory: `.output/public`

### Vercel
1. Set Framework Preset to **Nuxt.js**.
2. Build command: `npm run generate`
3. Output directory: `.output/public`

### GitHub Pages
1. Push `.output/public` to `gh-pages` branch or configure GitHub Actions.
