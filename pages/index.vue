<script setup lang="ts">
import { useSiteContent } from '~/composables/useSiteContent'
import AnnouncementBanner from '~/components/AnnouncementBanner.vue'
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

const { content, isSectionVisible, eventStructuredData } = useSiteContent()

// Dynamic SEO and social meta tags
useSeoMeta({
  title: () => content.value.siteSettings.seoTitle,
  ogTitle: () => content.value.event.title,
  description: () => content.value.siteSettings.seoDescription,
  ogDescription: () => content.value.siteSettings.seoDescription,
  ogImage: () => content.value.siteSettings.seoOgImage,
  twitterCard: 'summary_large_image',
  twitterTitle: () => content.value.event.title,
  twitterDescription: () => content.value.siteSettings.seoDescription,
  twitterImage: () => content.value.siteSettings.seoOgImage
})

// Schema.org Event Structured Data
useHead({
  script: [
    {
      type: 'application/ld+json',
      children: () => JSON.stringify(eventStructuredData.value)
    }
  ]
})
</script>

<template>
  <div class="min-h-screen bg-surface-100 text-navy-900 flex flex-col font-sans selection:bg-accent-500 selection:text-navy-950">
    <!-- Optional Announcement Banner -->
    <AnnouncementBanner />

    <!-- 1. Navigation Bar -->
    <Navbar />

    <!-- Main Content Sections with Admin Visibility Control -->
    <main class="flex-grow">
      <!-- 2. Hero -->
      <Hero v-if="isSectionVisible('hero')" />

      <!-- 3. Countdown Strip -->
      <CountdownStrip v-if="isSectionVisible('countdown')" />

      <!-- 4. Welcome / About -->
      <WarmWelcome v-if="isSectionVisible('welcome')" />

      <!-- 5. What to Expect -->
      <ExpectCards v-if="isSectionVisible('expect')" />

      <!-- 6. Verse Highlight -->
      <VerseCard v-if="isSectionVisible('verse')" />

      <!-- 7. Event Details -->
      <EventDetails v-if="isSectionVisible('details')" />

      <!-- 8. Join Us on Sunday -->
      <SundayWorship v-if="isSectionVisible('sunday')" />

      <!-- 9. Gallery -->
      <Gallery v-if="isSectionVisible('gallery')" />

      <!-- 10. Bring a Friend / Share -->
      <ShareInvite v-if="isSectionVisible('share')" />

      <!-- 11. Share Your Moment -->
      <UploadCard v-if="isSectionVisible('upload')" />

      <!-- 12. Connect With Us -->
      <ConnectSection v-if="isSectionVisible('connect')" />
    </main>

    <!-- 13. Footer -->
    <Footer />

    <!-- Mobile Sticky Action Bar -->
    <MobileStickyBar />

    <!-- Global Toast Container -->
    <ToastContainer />
  </div>
</template>

