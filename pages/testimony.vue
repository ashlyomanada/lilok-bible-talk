<script setup lang="ts">
import AnnouncementBanner from '~/components/AnnouncementBanner.vue'
import Footer from '~/components/Footer.vue'
import MobileStickyBar from '~/components/MobileStickyBar.vue'
import Navbar from '~/components/Navbar.vue'
import ToastContainer from '~/components/ToastContainer.vue'
import UploadCard from '~/components/UploadCard.vue'

interface Testimony {
  id: string
  name: string
  message: string
  image_url: string
  created_at: string
  published_at: string | null
}

const { data: response, pending, refresh } = useAsyncData('public-testimonies', async () => {
  try {
    return await $fetch<{ data: Testimony[] }>('/api/testimonies')
  } catch {
    return { data: [] }
  }
}, { default: () => ({ data: [] }) })

const testimonies = computed(() => response.value?.data || [])
const formatDate = (value: string) => new Intl.DateTimeFormat('en-PH', {
  dateStyle: 'medium',
  timeZone: 'Asia/Manila'
}).format(new Date(value))

useSeoMeta({
  title: 'Community Testimonies | Lilok Bible Talk',
  description: 'Stories and moments shared by the Lilok Bible Talk community.'
})

onMounted(() => refresh())
</script>

<template>
  <div class="min-h-screen bg-surface-100 text-navy-900 flex flex-col font-sans">
    <AnnouncementBanner />
    <Navbar />

    <main class="flex-grow">
      <section class="pt-28 pb-16 sm:pt-36 sm:pb-24 bg-navy-950 text-white">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p class="text-xs font-black uppercase tracking-[0.2em] text-accent-400 mb-3">Stories from our community</p>
          <h1 class="font-black text-4xl sm:text-6xl uppercase tracking-tight">Testimonies</h1>
          <p class="max-w-2xl mx-auto mt-5 text-surface-300 text-base sm:text-lg leading-relaxed">
            Encouragement, answered prayers, and moments of fellowship shared by our Bible Talk family.
          </p>
        </div>
      </section>

      <section class="py-14 sm:py-20">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <p class="text-xs font-black uppercase tracking-widest text-accent-800">Community wall</p>
              <h2 class="mt-2 text-2xl sm:text-3xl font-black uppercase tracking-tight">Shared moments</h2>
            </div>
            <p class="text-sm text-navy-600">Every story is reviewed before it appears here.</p>
          </div>

          <div v-if="pending && !testimonies.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" aria-label="Loading testimonies" aria-busy="true">
            <div v-for="item in 6" :key="item" class="overflow-hidden rounded-3xl bg-white border border-surface-300 shadow-soft animate-pulse">
              <div class="w-full aspect-[4/3] bg-surface-200" />
              <div class="p-5 sm:p-6 space-y-4">
                <div class="h-4 w-full rounded bg-surface-200" />
                <div class="h-4 w-4/5 rounded bg-surface-200" />
                <div class="flex items-center justify-between gap-3 mt-5 pt-4 border-t border-surface-200">
                  <div class="h-4 w-28 rounded bg-surface-200" />
                  <div class="h-3 w-20 rounded bg-surface-200" />
                </div>
              </div>
            </div>
            <span class="sr-only">Loading community testimonies</span>
          </div>

          <div v-else-if="testimonies.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <article v-for="item in testimonies" :key="item.id" class="overflow-hidden rounded-3xl bg-white border border-surface-300 shadow-soft">
              <img :src="item.image_url" :alt="`Photo shared by ${item.name}`" class="w-full aspect-[4/3] object-cover" loading="lazy">
              <div class="p-5 sm:p-6">
                <p v-if="item.message" class="text-navy-800 leading-relaxed whitespace-pre-wrap">“{{ item.message }}”</p>
                <div class="flex items-center justify-between gap-3 mt-5 pt-4 border-t border-surface-200">
                  <h3 class="font-black text-navy-950">{{ item.name }}</h3>
                  <time v-if="item.published_at" class="text-xs text-navy-500">{{ formatDate(item.published_at) }}</time>
                </div>
              </div>
            </article>
          </div>

          <div v-else class="rounded-3xl border border-surface-300 bg-white p-8 sm:p-12 text-center shadow-soft">
            <h3 class="font-black text-xl uppercase">Be the first to share</h3>
            <p class="mt-2 text-sm text-navy-600">Community stories will appear here after they are reviewed.</p>
          </div>
        </div>
      </section>

      <UploadCard />
    </main>

    <Footer />
    <MobileStickyBar />
    <ToastContainer />
  </div>
</template>
