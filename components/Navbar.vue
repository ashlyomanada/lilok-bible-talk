<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { eventConfig } from '~/config/event'

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)

const handleScroll = () => {
  if (typeof window !== 'undefined') {
    isScrolled.value = window.scrollY > 40
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const scrollTo = (selector: string) => {
  isMobileMenuOpen.value = false
  if (typeof document !== 'undefined') {
    document.body.style.overflow = ''
  }
  const target = document.querySelector(selector)
  if (target) {
    target.scrollIntoView({ behavior: 'smooth' })
  }
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
  if (typeof document !== 'undefined') {
    document.body.style.overflow = isMobileMenuOpen.value ? 'hidden' : ''
  }
}
</script>

<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    :class="[
      isScrolled
        ? 'bg-navy-900/95 backdrop-blur-md border-b border-white/10 shadow-soft py-3 sm:py-3.5'
        : 'bg-gradient-to-b from-navy-950/80 via-navy-950/30 to-transparent py-4 sm:py-6'
    ]"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
      <!-- Logo & Brand on Left -->
      <a
        href="#hero"
        class="group flex items-center gap-3.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 rounded-full"
        @click.prevent="scrollTo('#hero')"
      >
        <div class="h-10 sm:h-12 flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105">
          <img
            src="/images/mnl-logo-white.png"
            :alt="eventConfig.logoAlt"
            class="h-8 sm:h-10 w-auto object-contain drop-shadow-sm"
            loading="eager"
          />
        </div>

        <div class="flex flex-col text-left">
          <div class="flex items-center gap-2">
            <span class="font-sans font-black text-base sm:text-lg tracking-wider uppercase text-white drop-shadow-sm">
              {{ eventConfig.groupName }}
            </span>
            <span class="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold tracking-widest uppercase bg-white/15 text-white/90 border border-white/20">
              Central
            </span>
          </div>
          <span class="text-[11px] font-medium tracking-wide text-surface-300/90 -mt-0.5">
            {{ eventConfig.parentChurchName }}
          </span>
        </div>
      </a>

      <!-- Minimal Links & RSVP on Right (Desktop) -->
      <nav class="hidden md:flex items-center gap-8">
        <div class="flex items-center gap-7 text-xs lg:text-sm font-bold tracking-wider uppercase">
          <button
            type="button"
            class="text-white/80 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 rounded px-1"
            @click="scrollTo('#details')"
          >
            Event
          </button>
          <button
            type="button"
            class="text-white/80 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 rounded px-1"
            @click="scrollTo('#sunday')"
          >
            Sunday Worship
          </button>
          <button
            type="button"
            class="text-white/80 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 rounded px-1"
            @click="scrollTo('#gallery')"
          >
            Gallery
          </button>
          <button
            type="button"
            class="text-white/80 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 rounded px-1"
            @click="scrollTo('#connect')"
          >
            Connect
          </button>
        </div>

        <!-- RSVP Pill Button -->
        <a
          :href="eventConfig.contact.messengerUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-accent-500 hover:bg-accent-600 text-navy-900 font-extrabold text-xs lg:text-sm tracking-wider uppercase shadow-soft hover:shadow-glow-gold hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-200"
        >
          RSVP
        </a>
      </nav>

      <!-- Mobile Hamburger Button -->
      <div class="flex items-center gap-2 md:hidden">
        <a
          :href="eventConfig.contact.messengerUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-accent-500 text-navy-900 font-extrabold text-xs tracking-wider uppercase shadow-xs active:scale-95 transition-transform"
        >
          RSVP
        </a>

        <button
          type="button"
          class="p-2.5 rounded-full text-white/90 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500"
          :aria-expanded="isMobileMenuOpen"
          aria-label="Toggle navigation menu"
          @click="toggleMobileMenu"
        >
          <svg v-if="!isMobileMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 6h16M4 12h16m-7 6h7"/>
          </svg>
          <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Full-Screen Mobile Menu Overlay -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-4"
    >
      <div
        v-if="isMobileMenuOpen"
        class="fixed inset-0 top-[60px] z-40 bg-navy-900/98 backdrop-blur-2xl px-6 py-10 flex flex-col justify-between md:hidden overflow-y-auto"
      >
        <div class="flex flex-col space-y-6">
          <div class="flex items-center gap-3 pb-6 border-b border-white/10">
            <img
              src="/images/mnl-logo-white.png"
              :alt="eventConfig.logoAlt"
              class="h-9 w-auto object-contain"
            />
            <div>
              <p class="font-extrabold text-white text-base tracking-wider uppercase">{{ eventConfig.groupName }}</p>
              <p class="text-xs text-surface-300">{{ eventConfig.parentChurchName }}</p>
            </div>
          </div>

          <div class="flex flex-col space-y-5 text-left pt-2">
            <button
              type="button"
              class="text-left font-black text-2xl uppercase tracking-tight text-white hover:text-accent-500 transition-colors"
              @click="scrollTo('#hero')"
            >
              Home
            </button>
            <button
              type="button"
              class="text-left font-black text-2xl uppercase tracking-tight text-white hover:text-accent-500 transition-colors"
              @click="scrollTo('#details')"
            >
              Event Details
            </button>
            <button
              type="button"
              class="text-left font-black text-2xl uppercase tracking-tight text-white hover:text-accent-500 transition-colors"
              @click="scrollTo('#about')"
            >
              About & Welcome
            </button>
            <button
              type="button"
              class="text-left font-black text-2xl uppercase tracking-tight text-white hover:text-accent-500 transition-colors"
              @click="scrollTo('#expect')"
            >
              What to Expect
            </button>
            <button
              type="button"
              class="text-left font-black text-2xl uppercase tracking-tight text-white hover:text-accent-500 transition-colors"
              @click="scrollTo('#sunday')"
            >
              Sunday Worship
            </button>
            <button
              type="button"
              class="text-left font-black text-2xl uppercase tracking-tight text-white hover:text-accent-500 transition-colors"
              @click="scrollTo('#gallery')"
            >
              Gallery
            </button>
            <button
              type="button"
              class="text-left font-black text-2xl uppercase tracking-tight text-white hover:text-accent-500 transition-colors"
              @click="scrollTo('#connect')"
            >
              Connect
            </button>
          </div>
        </div>

        <div class="pt-8 border-t border-white/10 flex flex-col gap-3">
          <a
            :href="eventConfig.contact.messengerUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="w-full py-4 rounded-full bg-accent-500 hover:bg-accent-600 text-navy-900 font-black text-center text-sm tracking-wider uppercase shadow-soft active:scale-95 transition-transform"
          >
            RSVP on Messenger
          </a>
          <p class="text-center text-xs text-surface-400">
            {{ eventConfig.hashtag }} · {{ eventConfig.tagline }}
          </p>
        </div>
      </div>
    </Transition>
  </header>
</template>
