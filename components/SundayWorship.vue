<script setup lang="ts">
import { eventConfig } from '~/config/event'
</script>

<template>
  <section id="sunday" class="py-20 sm:py-28 bg-navy-900 text-white relative overflow-hidden border-t border-white/10">
    <!-- Ambient subtle background glow -->
    <div class="absolute -top-24 -left-24 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl pointer-events-none"></div>
    <div class="absolute -bottom-24 -right-24 w-96 h-96 bg-coral-500/10 rounded-full blur-3xl pointer-events-none"></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <!-- Two-Column Layout -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <!-- Left Column: Large "10AM EVERY SUNDAY" Statement & CTA (6 cols) -->
        <div class="lg:col-span-6 space-y-6 text-left">
          <!-- Tag Pill -->
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-accent-400 text-xs font-black uppercase tracking-widest">
            <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
            </svg>
            <span>Sunday Worship Experience</span>
          </div>

          <!-- Large Statement: "10AM EVERY SUNDAY" -->
          <h2 class="font-sans font-black text-5xl sm:text-6xl lg:text-7xl uppercase tracking-tight text-white leading-[0.95]">
            10AM EVERY SUNDAY
          </h2>

          <h3 class="font-sans font-bold text-xl sm:text-2xl text-accent-400 uppercase tracking-wide">
            {{ eventConfig.sundayService.title }}
          </h3>

          <p class="text-surface-200 text-base sm:text-lg leading-relaxed font-normal">
            {{ eventConfig.sundayService.message }}
          </p>

          <p class="text-xs sm:text-sm text-surface-400 italic">
            ✦ {{ eventConfig.sundayService.note }}
          </p>

          <!-- Confident Accent Pill Button: "Message Us" -->
          <div class="pt-4">
            <a
              :href="eventConfig.sundayService.messengerUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-accent-500 hover:bg-accent-600 text-navy-950 font-black text-sm uppercase tracking-wider shadow-soft hover:shadow-glow-gold hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-200"
            >
              <svg class="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.145 2 11.258c0 2.91 1.455 5.517 3.735 7.199V22l3.418-1.875c.91.252 1.873.39 2.847.39 5.523 0 10-4.145 10-9.257C22 6.145 17.523 2 12 2zm1.002 12.443l-2.56-2.73-5.002 2.73 5.498-5.836 2.624 2.73 4.938-2.73-5.498 5.836z"/>
              </svg>
              <span>Message Us on Messenger</span>
            </a>
          </div>
        </div>

        <!-- Right Column: Central Region Card (6 cols) -->
        <div class="lg:col-span-6">
          <div class="p-6 sm:p-8 rounded-4xl bg-navy-850 border border-white/15 shadow-soft-xl space-y-4">
            <div class="flex items-center justify-between pb-4 border-b border-white/10">
              <div class="flex items-center gap-3">
                <img
                  src="/images/mnl-logo-white.png"
                  :alt="eventConfig.logoAlt"
                  class="h-7 w-auto object-contain"
                />
                <div>
                  <h4 class="font-sans font-black text-lg uppercase tracking-tight text-white">
                    Central Region Gatherings
                  </h4>
                  <p class="text-xs text-surface-400">Metro Manila International Christian Church</p>
                </div>
              </div>
              <span class="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-accent-500/15 text-accent-400 border border-accent-500/30">
                Weekly
              </span>
            </div>

            <!-- Venue Cards Stack -->
            <div class="space-y-3">
              <div
                v-for="(venue, idx) in eventConfig.sundayService.venues"
                :key="idx"
                class="p-4 sm:p-5 rounded-3xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-left"
              >
                <div class="flex items-center justify-between mb-1.5">
                  <span class="font-sans font-black text-base sm:text-lg uppercase tracking-tight text-white">
                    {{ venue.city }}
                  </span>
                  <span class="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-white/10 text-accent-300 border border-white/15">
                    {{ venue.status }}
                  </span>
                </div>
                <p class="text-xs font-semibold text-surface-200 mb-1">{{ venue.venueName }}</p>
                <p class="text-[11px] text-surface-400 leading-relaxed font-normal">{{ venue.notes }}</p>
              </div>
            </div>

            <div class="pt-2 text-center">
              <p class="text-xs text-surface-400">
                Need a ride or current Sunday room hall? <strong class="text-accent-400 font-bold">Message us anytime!</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
