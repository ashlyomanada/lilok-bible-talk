<script setup lang="ts">
import Navbar from '~/components/Navbar.vue'
import Hero from '~/components/Hero.vue'
import CountdownStrip from '~/components/CountdownStrip.vue'
import WarmWelcome from '~/components/WarmWelcome.vue'
import ExpectCards from '~/components/ExpectCards.vue'
import VerseCard from '~/components/VerseCard.vue'
import EventDetails from '~/components/EventDetails.vue'
import SundayWorship from '~/components/SundayWorship.vue'
import Gallery from '~/components/Gallery.vue'
import ShareInvite from '~/components/ShareInvite.vue'
import UploadCard from '~/components/UploadCard.vue'
import ConnectSection from '~/components/ConnectSection.vue'
import Footer from '~/components/Footer.vue'
import MobileStickyBar from '~/components/MobileStickyBar.vue'
import ToastContainer from '~/components/ToastContainer.vue'
import { eventConfig } from '~/config/event'

// SEO and social meta tags
useSeoMeta({
  title: eventConfig.seo.title,
  ogTitle: eventConfig.eventTitle,
  description: eventConfig.seo.description,
  ogDescription: eventConfig.seo.description,
  ogImage: eventConfig.seo.ogImage,
  twitterCard: 'summary_large_image',
  twitterTitle: eventConfig.eventTitle,
  twitterDescription: eventConfig.seo.description,
  twitterImage: eventConfig.seo.ogImage
})
</script>

<template>
  <div class="min-h-screen bg-surface-100 text-navy-900 flex flex-col font-sans selection:bg-accent-500 selection:text-navy-950">
    <!-- 1. Navigation Bar (Transparent over hero, solid navy on scroll) -->
    <Navbar />

    <!-- Main Content Sections in Specified Rhythm -->
    <main class="flex-grow">
      <!-- 2. Hero (Full-bleed cinematic photo, huge uppercase headline, confident CTAs) -->
      <Hero />

      <!-- 3. Countdown Strip (Bold navy band with large rounded numerals) -->
      <CountdownStrip />

      <!-- 4. Welcome / About (Austin Stone editorial split layout, tall photo, Soldout badge) -->
      <WarmWelcome />

      <!-- 5. What to Expect (Bento-style grid in navy & gray tones) -->
      <ExpectCards />

      <!-- 6. Verse Highlight (Full-width dark section, giant uppercase quote, accent ref) -->
      <VerseCard />

      <!-- 7. Event Details (Clean ticket-style card with calendar & directions) -->
      <EventDetails />

      <!-- 8. Join Us on Sunday (Two-column layout, "10AM EVERY SUNDAY", Central Region card) -->
      <SundayWorship />

      <!-- 9. Gallery (Austin Stone editorial photo grid with interactive lightbox) -->
      <Gallery />

      <!-- 10. Bring a Friend / Share (Bold call-to-action band with Web Share) -->
      <ShareInvite />

      <!-- 11. Share Your Moment (Restyled upload card, UI only) -->
      <UploadCard />

      <!-- 12. Connect With Us (Elevation-style big stacked link rows with hover slide) -->
      <ConnectSection />
    </main>

    <!-- 13. Footer (Dark navy, large logo, hashtag, blessing line) -->
    <Footer />

    <!-- Mobile Sticky Action Bar (RSVP & Share) -->
    <MobileStickyBar />

    <!-- Global Toast Container -->
    <ToastContainer />
  </div>
</template>
