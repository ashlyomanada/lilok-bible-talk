<script setup lang="ts">
import { eventConfig } from '~/config/event'
</script>

<template>
  <section id="sunday" class="py-16 sm:py-24 bg-white relative overflow-hidden">
    <!-- Ambient subtle background blur -->
    <div class="absolute top-1/2 -left-20 w-80 h-80 bg-gold-200/30 rounded-full blur-3xl pointer-events-none"></div>
    <div class="absolute bottom-0 right-0 w-80 h-80 bg-navy-100/40 rounded-full blur-3xl pointer-events-none"></div>

    <div class="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
      <!-- Section Header -->
      <div class="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
        <div class="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold-700 mb-3">
          <span class="w-6 h-px bg-gold-500"></span>
          <span>The Next Step</span>
          <span class="w-6 h-px bg-gold-500"></span>
        </div>
        <h2 class="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-navy-950 tracking-tight mb-4">
          Join Us on Sunday
        </h2>
        <p class="text-navy-700 text-base sm:text-lg leading-relaxed">
          While {{ eventConfig.groupName }} is our intimate midweek gathering, you are also warmly invited to our Sunday Worship Services across Metro Manila!
        </p>
      </div>

      <!-- Main Sunday Card -->
      <div class="bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950 rounded-3xl p-6 sm:p-10 md:p-12 text-white border border-white/15 shadow-card relative overflow-hidden mb-8">
        <!-- Golden subtle rim -->
        <div class="absolute -right-24 -top-24 w-80 h-80 rounded-full bg-gold-500/15 blur-3xl pointer-events-none"></div>
        <div class="absolute -left-24 -bottom-24 w-80 h-80 rounded-full bg-coral-500/15 blur-3xl pointer-events-none"></div>

        <div class="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <!-- Left Details: Timing & Headline -->
          <div class="lg:col-span-7 space-y-5 text-left">
            <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-gold-300 text-xs font-semibold uppercase tracking-wider">
              <svg class="w-4 h-4 text-gold-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span>{{ eventConfig.sundayService.dayAndTime }}</span>
            </div>

            <h3 class="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-white leading-snug">
              {{ eventConfig.sundayService.title }}
            </h3>

            <p class="text-cream-200 text-base sm:text-lg leading-relaxed">
              {{ eventConfig.sundayService.message }}
            </p>

            <p class="text-xs sm:text-sm text-cream-300/80 italic">
              ✦ {{ eventConfig.sundayService.note }}
            </p>

            <div class="pt-2">
              <a
                :href="eventConfig.sundayService.messengerUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 hover:from-gold-500 hover:to-gold-700 text-navy-950 font-bold text-sm sm:text-base shadow-glow transition-all active:scale-95"
              >
                <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.145 2 11.258c0 2.91 1.455 5.517 3.735 7.199V22l3.418-1.875c.91.252 1.873.39 2.847.39 5.523 0 10-4.145 10-9.257C22 6.145 17.523 2 12 2zm1.002 12.443l-2.56-2.73-5.002 2.73 5.498-5.836 2.624 2.73 4.938-2.73-5.498 5.836z"/>
                </svg>
                <span>Message Us on Messenger</span>
              </a>
            </div>
          </div>

          <!-- Right: Central Region Sectors (Makati, Taguig, Muntinlupa) -->
          <div class="lg:col-span-5 space-y-3">
            <div class="text-xs font-bold uppercase tracking-wider text-gold-300 mb-2">
              Central Region Sunday Gatherings
            </div>

            <div
              v-for="(venue, idx) in eventConfig.sundayService.venues"
              :key="idx"
              class="p-4 rounded-2xl bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/15 text-left transition-all"
            >
              <div class="flex items-center justify-between mb-1">
                <span class="font-serif font-bold text-white text-base sm:text-lg">
                  {{ venue.city }}
                </span>
                <span class="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-gold-400/20 text-gold-300 border border-gold-400/30">
                  {{ venue.status }}
                </span>
              </div>
              <p class="text-xs text-cream-200 mb-1 font-medium">{{ venue.venueName }}</p>
              <p class="text-[11px] text-cream-300/80 leading-relaxed">{{ venue.notes }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
