<script setup lang="ts">
import { eventConfig } from '~/config/event'

const scrollTo = (selector: string) => {
  const target = document.querySelector(selector)
  if (target) {
    target.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<template>
  <section
    id="hero"
    class="relative min-h-[100dvh] w-full flex flex-col justify-between overflow-hidden bg-navy-950 text-white select-none"
  >
    <!-- Background Full-Bleed Image with Subtle Zoom Animation -->
    <div class="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      <img
        src="/images/hero.jpg"
        alt="Lilok Bible Talk fellowship gathering background"
        class="w-full h-full object-cover object-center animate-hero-zoom opacity-45 brightness-75 filter"
        loading="eager"
      />
      <!-- Dramatic Cinematic Gradient Overlays -->
      <div class="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-900/75 to-navy-950/80"></div>
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-transparent via-navy-950/50 to-navy-950/90"></div>
    </div>

    <!-- Top Spacing for Navbar -->
    <div class="pt-24 sm:pt-28"></div>

    <!-- Center Hero Content -->
    <div class="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-center flex flex-col items-center justify-center flex-grow">
      <!-- "You're Invited" Line -->
      <div class="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-accent-400 text-xs sm:text-sm font-extrabold uppercase tracking-widest mb-6 shadow-soft">
        <span class="w-2 h-2 rounded-full bg-accent-500 animate-pulse"></span>
        <span>You're Invited</span>
        <span class="text-white/40">•</span>
        <span class="text-white/90">{{ eventConfig.hashtag }}</span>
      </div>

      <!-- Huge Uppercase Headline: "LILOK BIBLE TALK" -->
      <h1 class="font-sans font-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl uppercase tracking-tight text-white leading-[0.9] max-w-5xl mb-6 drop-shadow-md">
        LILOK BIBLE TALK
      </h1>

      <!-- Event Subtitle / Welcome Line -->
      <p class="font-sans text-base sm:text-xl md:text-2xl font-medium text-surface-200/95 max-w-2xl mx-auto mb-8 leading-relaxed">
        {{ eventConfig.eventSubtitle }}
      </p>

      <!-- Chips Row: Date, Time, Venue, @lilok.bt -->
      <div class="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 max-w-3xl mb-10">
        <!-- Date Chip -->
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-navy-900/85 backdrop-blur-md border border-white/15 text-xs sm:text-sm font-bold text-white shadow-soft">
          <svg class="w-4 h-4 text-accent-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
          </svg>
          <span>{{ eventConfig.date }}</span>
        </div>

        <!-- Time Chip -->
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-navy-900/85 backdrop-blur-md border border-white/15 text-xs sm:text-sm font-bold text-white shadow-soft">
          <svg class="w-4 h-4 text-accent-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <span>{{ eventConfig.time }}</span>
        </div>

        <!-- Venue Chip -->
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-navy-900/85 backdrop-blur-md border border-white/15 text-xs sm:text-sm font-bold text-white shadow-soft">
          <svg class="w-4 h-4 text-coral-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
          </svg>
          <span>{{ eventConfig.venue.name }}</span>
        </div>

        <!-- Instagram Handle Chip -->
        <a
          :href="eventConfig.instagramUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-500/15 hover:bg-accent-500/25 backdrop-blur-md border border-accent-500/40 text-xs sm:text-sm font-extrabold text-accent-300 transition-colors shadow-soft"
        >
          <svg class="w-4 h-4 shrink-0 fill-current" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
          <span>{{ eventConfig.instagramHandle }}</span>
        </a>
      </div>

      <!-- Two Big Confident CTA Buttons -->
      <div class="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md">
        <!-- RSVP on Messenger Button -->
        <a
          :href="eventConfig.contact.messengerUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-accent-500 hover:bg-accent-600 text-navy-950 font-black text-sm uppercase tracking-wider shadow-glow-gold hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-200"
        >
          <svg class="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24">
            <path d="M12 2C6.477 2 2 6.145 2 11.258c0 2.91 1.455 5.517 3.735 7.199V22l3.418-1.875c.91.252 1.873.39 2.847.39 5.523 0 10-4.145 10-9.257C22 6.145 17.523 2 12 2zm1.002 12.443l-2.56-2.73-5.002 2.73 5.498-5.836 2.624 2.73 4.938-2.73-5.498 5.836z"/>
          </svg>
          <span>RSVP on Messenger</span>
        </a>

        <!-- Learn More Outline Button -->
        <button
          type="button"
          class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-black text-sm uppercase tracking-wider border border-white/30 backdrop-blur-sm hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-200"
          @click="scrollTo('#about')"
        >
          <span>Learn More</span>
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Slow Scroll-Down Indicator -->
    <div class="relative z-10 pb-6 pt-2 flex flex-col items-center justify-center">
      <button
        type="button"
        class="group flex flex-col items-center gap-2 text-surface-400 hover:text-white transition-colors focus:outline-none"
        aria-label="Scroll down to details"
        @click="scrollTo('#countdown')"
      >
        <span class="text-[10px] font-black tracking-widest uppercase text-surface-400 group-hover:text-white transition-colors">
          Scroll Down
        </span>
        <div class="w-7 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-1.5 animate-bounce-slow">
          <div class="w-1.5 h-2 rounded-full bg-accent-400"></div>
        </div>
      </button>
    </div>
  </section>
</template>
