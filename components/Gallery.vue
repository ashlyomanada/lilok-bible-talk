<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { eventConfig } from '~/config/event'

interface GalleryItem {
  src: string
  alt: string
  title: string
  subtitle: string
  span?: string
}

const galleryImages: GalleryItem[] = [
  {
    src: '/images/gallery-1.jpg',
    alt: 'Open Bible illuminated by gentle morning light',
    title: 'Truth & Direction',
    subtitle: 'Studying the scriptures together for real life guidance',
    span: 'col-span-1 md:col-span-2 aspect-[16/10]'
  },
  {
    src: '/images/gallery-3.jpg',
    alt: 'Friends enjoying conversations over coffee and snacks',
    title: 'Table Fellowship',
    subtitle: 'Deep laughter, coffee, and authentic friendships',
    span: 'col-span-1 md:col-span-1 aspect-[4/5]'
  },
  {
    src: '/images/gallery-4.jpg',
    alt: 'Hands held in prayer and mutual encouragement',
    title: 'Prayer & Brotherhood',
    subtitle: 'Standing together as disciples in every season',
    span: 'col-span-1 md:col-span-1 aspect-[4/5]'
  },
  {
    src: '/images/gallery-2.jpg',
    alt: 'Acoustic worship and heartfelt praise',
    title: 'Acoustic Fellowship',
    subtitle: 'Heartfelt songs of praise and quiet reflection',
    span: 'col-span-1 md:col-span-2 aspect-[16/10]'
  },
  {
    src: '/images/gallery-5.jpg',
    alt: 'Sunrise breaking over the horizon with hope',
    title: 'Fresh Hope',
    subtitle: 'Walking in the freedom and peace of Jesus',
    span: 'col-span-1 md:col-span-2 aspect-[16/10]'
  },
  {
    src: '/images/gallery-6.jpg',
    alt: 'Warm discipleship gathering around a table',
    title: 'Family in Christ',
    subtitle: 'A place where you belong from day one',
    span: 'col-span-1 md:col-span-1 aspect-[4/5]'
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
})
</script>

<template>
  <section id="gallery" class="py-20 sm:py-28 bg-surface-100 text-navy-900 relative">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="text-center max-w-2xl mx-auto mb-14 sm:mb-18">
        <div class="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-accent-700 mb-3">
          <span class="w-5 h-0.5 bg-accent-500"></span>
          <span>Community Memories</span>
          <span class="w-5 h-0.5 bg-accent-500"></span>
        </div>
        <h2 class="font-sans font-black text-4xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-navy-900 mb-4">
          Glimpses of Fellowship
        </h2>
        <p class="text-navy-700 text-base sm:text-lg font-normal leading-relaxed">
          Real people, real conversations, and genuine family. Tap any photo to expand.
        </p>
      </div>

      <!-- Austin Stone-style Editorial Grid with Big Rounded Images -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        <div
          v-for="(img, idx) in galleryImages"
          :key="idx"
          class="group relative rounded-3xl sm:rounded-4xl overflow-hidden cursor-pointer shadow-soft hover:shadow-soft-xl bg-surface-200 transition-all duration-300"
          :class="img.span"
          tabindex="0"
          role="button"
          :aria-label="`Open photo: ${img.title}`"
          @click="openLightbox(idx)"
          @keydown.enter="openLightbox(idx)"
          @keydown.space.prevent="openLightbox(idx)"
        >
          <img
            :src="img.src"
            :alt="img.alt"
            class="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />

          <!-- Editorial Gradient Overlay & Caption -->
          <div class="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300 flex flex-col justify-end p-6 sm:p-8 text-left text-white">
            <span class="text-[10px] font-black uppercase tracking-widest text-accent-400 mb-1">
              {{ eventConfig.groupName }}
            </span>
            <h3 class="font-sans font-black text-xl sm:text-2xl uppercase tracking-tight text-white mb-1">
              {{ img.title }}
            </h3>
            <p class="text-xs sm:text-sm text-surface-300 font-normal line-clamp-2">
              {{ img.subtitle }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Responsive Lightbox Modal -->
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
          class="fixed inset-0 z-50 bg-navy-950/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 select-none"
          role="dialog"
          aria-modal="true"
          @click.self="closeLightbox"
        >
          <!-- Close Button -->
          <button
            type="button"
            class="absolute top-5 right-5 sm:top-8 sm:right-8 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 z-10"
            aria-label="Close lightbox"
            @click="closeLightbox"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>

          <!-- Prev Button -->
          <button
            type="button"
            class="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-none z-10"
            aria-label="Previous photo"
            @click="prevImage"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"/>
            </svg>
          </button>

          <!-- Next Button -->
          <button
            type="button"
            class="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-none z-10"
            aria-label="Next photo"
            @click="nextImage"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/>
            </svg>
          </button>

          <!-- Lightbox Photo & Caption Container -->
          <div class="relative max-w-4xl max-h-[85vh] flex flex-col items-center">
            <img
              :src="galleryImages[selectedIndex].src"
              :alt="galleryImages[selectedIndex].alt"
              class="max-h-[70vh] w-auto max-w-full rounded-3xl object-contain shadow-soft-xl border border-white/15"
            />
            <div class="mt-4 text-center text-white max-w-xl">
              <h4 class="font-sans font-black text-xl sm:text-2xl uppercase tracking-tight">
                {{ galleryImages[selectedIndex].title }}
              </h4>
              <p class="text-xs sm:text-sm text-surface-300 mt-1 font-normal">
                {{ galleryImages[selectedIndex].subtitle }}
              </p>
              <span class="text-[11px] text-accent-400 font-bold block mt-2">
                {{ selectedIndex + 1 }} / {{ galleryImages.length }}
              </span>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>
