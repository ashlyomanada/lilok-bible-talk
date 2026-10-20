<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { eventConfig } from '~/config/event'

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)

const handleScroll = () => {
  if (typeof window !== 'undefined') {
    isScrolled.value = window.scrollY > 30
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
  const target = document.querySelector(selector)
  if (target) {
    target.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<template>
  <header
    class="fixed top-0 left-0 right-0 z-40 transition-all duration-300"
    :class="[
      isScrolled
        ? 'bg-cream-50/95 backdrop-blur-md border-b border-cream-300/60 shadow-warm-sm py-2.5 sm:py-3'
        : 'bg-gradient-to-b from-navy-950/80 via-navy-950/40 to-transparent py-3 sm:py-5'
    ]"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
      <!-- Brand & MICC Logo Mark -->
      <a
        href="#"
        class="group flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 rounded-xl"
        @click.prevent="scrollTo('#hero')"
      >
        <!-- MICC Logo Pill -->
        <div
          class="h-12 sm:h-14 px-2.5 py-1 rounded-2xl bg-white/95 backdrop-blur-md border border-white/80 shadow-warm-sm flex items-center justify-center transition-transform group-hover:scale-105 shrink-0"
        >
          <img
            :src="eventConfig.logo"
            :alt="eventConfig.logoAlt"
            class="h-8 sm:h-10 w-auto object-contain"
            loading="eager"
          />
        </div>

        <!-- Main Identity Text -->
        <div class="flex flex-col text-left">
          <div class="flex items-center gap-2">
            <span
              class="font-serif text-lg sm:text-xl font-bold tracking-tight transition-colors"
              :class="isScrolled ? 'text-navy-950' : 'text-white drop-shadow-sm'"
            >
              {{ eventConfig.groupName }}
            </span>
            <span
              class="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide uppercase transition-colors"
              :class="isScrolled ? 'bg-gold-100 text-gold-900 border border-gold-200' : 'bg-white/20 text-gold-200 border border-white/30'"
            >
              Central
            </span>
          </div>
          <span
            class="text-[11px] sm:text-xs font-medium tracking-wide transition-colors -mt-0.5 line-clamp-1"
            :class="isScrolled ? 'text-navy-700/80' : 'text-cream-200/90 drop-shadow-sm'"
          >
            {{ eventConfig.parentChurchName }}
          </span>
        </div>
      </a>

      <!-- Desktop Navigation Links -->
      <nav class="hidden lg:flex items-center gap-6 text-sm font-medium">
        <button
          type="button"
          class="transition-colors hover:text-gold-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 rounded px-1"
          :class="isScrolled ? 'text-navy-800' : 'text-white/90 drop-shadow-sm hover:text-white'"
          @click="scrollTo('#welcome')"
        >
          About
        </button>
        <button
          type="button"
          class="transition-colors hover:text-gold-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 rounded px-1"
          :class="isScrolled ? 'text-navy-800' : 'text-white/90 drop-shadow-sm hover:text-white'"
          @click="scrollTo('#expect')"
        >
          What to Expect
        </button>
        <button
          type="button"
          class="transition-colors hover:text-gold-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 rounded px-1"
          :class="isScrolled ? 'text-navy-800' : 'text-white/90 drop-shadow-sm hover:text-white'"
          @click="scrollTo('#details')"
        >
          When & Where
        </button>
        <button
          type="button"
          class="transition-colors hover:text-gold-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 rounded px-1"
          :class="isScrolled ? 'text-navy-800' : 'text-white/90 drop-shadow-sm hover:text-white'"
          @click="scrollTo('#sunday')"
        >
          Sunday Worship
        </button>
        <button
          type="button"
          class="transition-colors hover:text-gold-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 rounded px-1"
          :class="isScrolled ? 'text-navy-800' : 'text-white/90 drop-shadow-sm hover:text-white'"
          @click="scrollTo('#connect')"
        >
          Connect
        </button>
        <button
          type="button"
          class="transition-colors hover:text-gold-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 rounded px-1"
          :class="isScrolled ? 'text-navy-800' : 'text-white/90 drop-shadow-sm hover:text-white'"
          @click="scrollTo('#gallery')"
        >
          Moments
        </button>
      </nav>

      <!-- Desktop Right Actions: Instagram Link + RSVP Button -->
      <div class="hidden sm:flex items-center gap-3">
        <!-- Instagram Link -->
        <a
          :href="eventConfig.instagramUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200 border"
          :class="[
            isScrolled
              ? 'bg-cream-100 hover:bg-cream-200 text-navy-900 border-cream-300'
              : 'bg-white/15 hover:bg-white/25 text-white border-white/30 backdrop-blur-md'
          ]"
          :aria-label="'Visit ' + eventConfig.instagramHandle + ' on Instagram'"
        >
          <svg class="w-4 h-4 text-coral-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
          <span>{{ eventConfig.instagramHandle }}</span>
        </a>

        <!-- RSVP via Messenger Button -->
        <a
          :href="eventConfig.contact.messengerUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 shadow-warm-sm active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 bg-gradient-to-r from-gold-500 via-gold-600 to-gold-700 hover:from-gold-600 hover:to-gold-800 text-white"
        >
          <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M12 2C6.477 2 2 6.145 2 11.258c0 2.91 1.455 5.517 3.735 7.199V22l3.418-1.875c.91.252 1.873.39 2.847.39 5.523 0 10-4.145 10-9.257C22 6.145 17.523 2 12 2zm1.002 12.443l-2.56-2.73-5.002 2.73 5.498-5.836 2.624 2.73 4.938-2.73-5.498 5.836z"/>
          </svg>
          <span>RSVP on Messenger</span>
        </a>
      </div>

      <!-- Mobile Hamburger Button -->
      <div class="flex items-center gap-2 lg:hidden">
        <a
          :href="eventConfig.contact.messengerUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="sm:hidden inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-gold-500 text-white shadow-xs"
        >
          <span>RSVP</span>
        </a>

        <button
          type="button"
          class="p-2 rounded-xl transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
          :class="[
            isScrolled
              ? 'text-navy-900 hover:bg-cream-200'
              : 'text-white bg-white/20 hover:bg-white/30 backdrop-blur-md'
          ]"
          aria-label="Toggle navigation menu"
          :aria-expanded="isMobileMenuOpen"
          @click="isMobileMenuOpen = !isMobileMenuOpen"
        >
          <svg v-if="!isMobileMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
          <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Dropdown Menu -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="isMobileMenuOpen"
        class="lg:hidden mt-2 mx-4 p-4 rounded-2xl bg-cream-50/98 backdrop-blur-xl border border-cream-300 shadow-warm-xl flex flex-col gap-2"
      >
        <button
          type="button"
          class="text-left px-3 py-2.5 rounded-xl text-navy-900 hover:bg-gold-50 font-medium text-sm transition-colors"
          @click="scrollTo('#hero')"
        >
          Invitation Poster
        </button>
        <button
          type="button"
          class="text-left px-3 py-2.5 rounded-xl text-navy-900 hover:bg-gold-50 font-medium text-sm transition-colors"
          @click="scrollTo('#welcome')"
        >
          About Our Family & Church
        </button>
        <button
          type="button"
          class="text-left px-3 py-2.5 rounded-xl text-navy-900 hover:bg-gold-50 font-medium text-sm transition-colors"
          @click="scrollTo('#expect')"
        >
          What to Expect
        </button>
        <button
          type="button"
          class="text-left px-3 py-2.5 rounded-xl text-navy-900 hover:bg-gold-50 font-medium text-sm transition-colors"
          @click="scrollTo('#details')"
        >
          When & Where (Event Details)
        </button>
        <button
          type="button"
          class="text-left px-3 py-2.5 rounded-xl text-navy-900 hover:bg-gold-50 font-medium text-sm transition-colors"
          @click="scrollTo('#sunday')"
        >
          Join Us on Sunday (Worship)
        </button>
        <button
          type="button"
          class="text-left px-3 py-2.5 rounded-xl text-navy-900 hover:bg-gold-50 font-medium text-sm transition-colors"
          @click="scrollTo('#connect')"
        >
          What's Next? Connect with Us
        </button>
        <button
          type="button"
          class="text-left px-3 py-2.5 rounded-xl text-navy-900 hover:bg-gold-50 font-medium text-sm transition-colors"
          @click="scrollTo('#gallery')"
        >
          Moments & Fellowship
        </button>
        <button
          type="button"
          class="text-left px-3 py-2.5 rounded-xl text-navy-900 hover:bg-gold-50 font-medium text-sm transition-colors"
          @click="scrollTo('#share')"
        >
          Bring a Friend (Share)
        </button>

        <div class="pt-3 border-t border-cream-300 flex flex-col gap-2">
          <!-- Instagram Direct -->
          <a
            :href="eventConfig.instagramUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white border border-cream-300 text-navy-900 text-xs font-semibold"
          >
            <svg class="w-4 h-4 text-coral-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            <span>Follow {{ eventConfig.instagramHandle }}</span>
          </a>

          <!-- Messenger RSVP -->
          <a
            :href="eventConfig.contact.messengerUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="w-full text-center py-2.5 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 text-white font-semibold text-sm shadow-warm active:scale-[0.98]"
          >
            RSVP on Messenger
          </a>
        </div>
      </div>
    </Transition>
  </header>
</template>
