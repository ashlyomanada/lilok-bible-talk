<script setup lang="ts">
import Navbar from '~/components/Navbar.vue'
import Hero from '~/components/Hero.vue'
import WarmWelcome from '~/components/WarmWelcome.vue'
import VerseCard from '~/components/VerseCard.vue'
import ExpectCards from '~/components/ExpectCards.vue'
import EventDetails from '~/components/EventDetails.vue'
import Gallery from '~/components/Gallery.vue'
import ShareInvite from '~/components/ShareInvite.vue'
import UploadCard from '~/components/UploadCard.vue'
import Footer from '~/components/Footer.vue'
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
  <div class="min-h-screen bg-warmStone-50 text-warmStone-800 flex flex-col font-sans selection:bg-amberGold-200 selection:text-amberGold-900">
    <!-- Sticky / Glassmorphic Navigation -->
    <Navbar />

    <!-- Main Content Sections in Ordered Flow -->
    <main class="flex-grow">
      <!-- 1. Hero Section -->
      <Hero />

      <!-- 2. A Warm Welcome -->
      <WarmWelcome />

      <!-- 3. Verse Highlight -->
      <VerseCard />

      <!-- 4. What to Expect -->
      <ExpectCards />

      <!-- 5. Event Details (Calendar + Directions + Speaker) -->
      <EventDetails />

      <!-- 6. Photo Gallery (with Responsive Lightbox) -->
      <Gallery />

      <!-- 7. Bring a Friend (Web Share API & Links) -->
      <ShareInvite />

      <!-- 8. Upload Section (UI Only, No Real Backend) -->
      <UploadCard />
    </main>

    <!-- 9. Footer (Church Name, Contacts, Blessing, See You There!) -->
    <Footer />

    <!-- Global Toast Container -->
    <ToastContainer />
  </div>
</template>
