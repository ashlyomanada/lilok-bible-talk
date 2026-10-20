<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { eventConfig } from '~/config/event'

interface GalleryItem {
  src: string
  alt: string
  title: string
  subtitle: string
}

/**
 * =============================================================================
 * PHOTO GALLERY
 * =============================================================================
 * To swap real photos of Lilok Bible Talk:
 * 1. Place your images in `/public/images/` (e.g. photo-1.jpg, photo-2.jpg)
 * 2. Update the `src` and caption strings below.
 * =============================================================================
 */
const galleryImages: GalleryItem[] = [
  {
    src: '/images/gallery-1.jpg',
    alt: 'Open Bible illuminated by gentle morning light',
    title: 'Truth & Direction',
    subtitle: 'Studying the scriptures together for real life guidance'
  },
  {
    src: '/images/gallery-2.jpg',
    alt: 'Acoustic worship and heartfelt praise',
    title: 'Acoustic Fellowship',
    subtitle: 'Heartfelt songs of praise and quiet reflection'
  },
  {
    src: '/images/gallery-3.jpg',
    alt: 'Friends enjoying conversations over coffee and snacks',
    title: 'Table Fellowship',
    subtitle: 'Deep laughter, coffee, and authentic friendships'
  },
  {
    src: '/images/gallery-4.jpg',
    alt: 'Hands held in prayer and mutual encouragement',
    title: 'Prayer & Brotherhood',
    subtitle: 'Standing together as disciples in every season'
  },
  {
    src: '/images/gallery-5.jpg',
    alt: 'Sunrise breaking over the horizon with hope',
    title: 'Fresh Hope',
    subtitle: 'Walking in the freedom and peace of Jesus'
  },
  {
    src: '/images/gallery-6.jpg',
    alt: 'Warm discipleship gathering around a table',
    title: 'Family in Christ',
    subtitle: 'A place where you belong from day one'
  }
]

const selectedIndex = ref<number | null>(null)

const openLightbox = (index: number) => {
  selectedIndex.value = index
  if (typeof document !== 'undefined') {
    document.body.style.overflow = 'hidden'
  }
}

const closeLightbox = () => {
  selectedIndex.value = null
  if (typeof document !== 'undefined') {
    document.body.style.overflow = ''
  }
}

const nextImage = () => {
  if (selectedIndex.value !== null) {
    selectedIndex.value = (selectedIndex.value + 1) % galleryImages.length
  }
}

const prevImage = () => {
  if (selectedIndex.value !== null) {
    selectedIndex.value = (selectedIndex.value - 1 + galleryImages.length) % galleryImages.length
  }
}

const handleKeydown = (e: KeyboardEvent) => {
  if (selectedIndex.value === null) return
  if (e.key === 'Escape') closeLightbox()
  if (e.key === 'ArrowRight') nextImage()
  if (e.key === 'ArrowLeft') prevImage()
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
  if (typeof document !== 'undefined') {
    document.body.style.overflow = ''
  }
})
</script>

<template>
  <section id="gallery" class="py-16 sm:py-24 bg-white relative">
    <div class="max-w-6xl mx-auto px-4 sm:px-6">
      <!-- Section Header -->
      <div class="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
        <div class="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold-700 mb-3">
          <span class="w-6 h-px bg-gold-500"></span>
          <span>Community Moments</span>
          <span class="w-6 h-px bg-gold-500"></span>
        </div>
        <h2 class="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-navy-950 tracking-tight mb-4">
          Life in {{ eventConfig.groupName }}
        </h2>
        <p class="text-navy-700 text-base sm:text-lg leading-relaxed">
          A glimpse into the warmth, fellowship, and family atmosphere that await you. Tap any photo to enlarge.
        </p>
      </div>

      <!-- Refreshed Rounded Masonry-style Grid -->
      <div class="grid grid-cols-2 md:grid-cols-3 gap-3.5 sm:gap-6">
        <div
          v-for="(item, idx) in galleryImages"
          :key="idx"
          class="group relative rounded-2xl sm:rounded-3xl overflow-hidden aspect-[4/3] bg-navy-950/5 shadow-warm-sm hover:shadow-warm-xl cursor-pointer transition-all duration-300 transform hover:-translate-y-1 border border-cream-200"
          role="button"
          tabindex="0"
          :aria-label="'View ' + item.title + ' in lightbox'"
          @click="openLightbox(idx)"
          @keydown.enter="openLightbox(idx)"
          @keydown.space.prevent="openLightbox(idx)"
        >
          <img
            :src="item.src"
            :alt="item.alt"
            class="w-full h-full object-cover object-center transform transition-transform duration-500 group-hover:scale-108"
            loading="lazy"
          />

          <!-- Gradient Overlay on Hover -->
          <div class="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3.5 sm:p-5 text-white">
            <span class="font-serif text-sm sm:text-lg font-bold drop-shadow-sm text-gold-200">{{ item.title }}</span>
            <span class="text-[11px] sm:text-xs text-cream-200 line-clamp-1 hidden sm:block">{{ item.subtitle }}</span>
            <div class="mt-2 inline-flex items-center gap-1 text-[11px] text-gold-300 font-medium">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"/>
              </svg>
              <span>Click to view</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Instagram Callout below gallery -->
      <div class="mt-10 text-center">
        <a
          :href="eventConfig.instagramUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-cream-100 hover:bg-gold-50 border border-gold-300 text-navy-900 text-xs sm:text-sm font-semibold transition-colors"
        >
          <svg class="w-4 h-4 text-coral-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
          <span>See more photos and stories on {{ eventConfig.instagramHandle }}</span>
        </a>
      </div>
    </div>

    <!-- Lightbox Modal -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="selectedIndex !== null"
          class="fixed inset-0 z-50 bg-navy-950/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          :aria-label="galleryImages[selectedIndex].title"
          @click.self="closeLightbox"
        >
          <!-- Close Button -->
          <button
            type="button"
            class="absolute top-5 right-5 z-20 text-white/80 hover:text-white p-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Close lightbox"
            @click="closeLightbox"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>

          <!-- Prev Button -->
          <button
            type="button"
            class="absolute left-4 top-1/2 -translate-y-1/2 z-20 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Previous photo"
            @click.stop="prevImage"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"/>
            </svg>
          </button>

          <!-- Next Button -->
          <button
            type="button"
            class="absolute right-4 top-1/2 -translate-y-1/2 z-20 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Next photo"
            @click.stop="nextImage"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/>
            </svg>
          </button>

          <!-- Image & Caption Box -->
          <div class="relative max-w-4xl max-h-[88vh] flex flex-col items-center select-none" @click.stop>
            <img
              :src="galleryImages[selectedIndex].src"
              :alt="galleryImages[selectedIndex].alt"
              class="max-w-full max-h-[75vh] object-contain rounded-2xl shadow-2xl border border-white/20"
            />

            <div class="mt-4 text-center text-white px-4">
              <h3 class="font-serif text-lg sm:text-xl font-bold text-gold-300">{{ galleryImages[selectedIndex].title }}</h3>
              <p class="text-xs sm:text-sm text-cream-200 mt-1">{{ galleryImages[selectedIndex].subtitle }}</p>
              <span class="inline-block mt-2 text-[11px] text-white/60">
                Photo {{ selectedIndex + 1 }} of {{ galleryImages.length }}
              </span>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>
