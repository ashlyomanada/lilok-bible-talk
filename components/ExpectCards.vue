<script setup lang="ts">
import { eventConfig } from '~/config/event'
</script>

<template>
  <section id="expect" class="py-16 sm:py-24 bg-white relative">
    <div class="max-w-6xl mx-auto px-4 sm:px-6">
      <!-- Section Header -->
      <div class="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
        <div class="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold-700 mb-3">
          <span class="w-6 h-px bg-gold-500"></span>
          <span>A Glimpse Into the Evening</span>
          <span class="w-6 h-px bg-gold-500"></span>
        </div>
        <h2 class="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-navy-950 tracking-tight mb-4">
          What to Expect
        </h2>
        <p class="text-navy-700 text-base sm:text-lg leading-relaxed">
          No awkward surprises, speeches, or solicitations. Here is what you can look forward to at Lilok Bible Talk:
        </p>
      </div>

      <!-- 4 Cards Row: Uplifting Message, Friendly Community, Open Bible Discussion, Food & Fellowship -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="item in eventConfig.whatToExpect"
          :key="item.id"
          class="group relative rounded-3xl p-6 bg-cream-50/80 hover:bg-white border border-cream-200 hover:border-gold-300 shadow-warm-sm hover:shadow-warm-lg transition-all duration-300 flex flex-col justify-between"
        >
          <div>
            <!-- Top Icon & Badge -->
            <div class="flex items-center justify-between mb-5">
              <div class="w-12 h-12 rounded-2xl bg-gold-100 text-gold-800 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:bg-gold-500 group-hover:text-white shadow-xs">
                <!-- Book / Message -->
                <svg v-if="item.icon === 'book-open'" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                </svg>
                <!-- Community / Fellowship -->
                <svg v-else-if="item.icon === 'heart-handshake'" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                </svg>
                <!-- Discussion / Q&A -->
                <svg v-else-if="item.icon === 'messages-square'" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                </svg>
                <!-- Coffee / Snacks -->
                <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8zM6 1v3M10 1v3M14 1v3"/>
                </svg>
              </div>

              <span
                v-if="item.badge"
                class="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-white border border-cream-300 text-navy-800 shadow-xs"
              >
                {{ item.badge }}
              </span>
            </div>

            <!-- Card Content -->
            <h3 class="font-serif text-xl font-bold text-navy-950 mb-2 group-hover:text-gold-700 transition-colors">
              {{ item.title }}
            </h3>
            <p class="text-sm text-navy-700 leading-relaxed">
              {{ item.description }}
            </p>
          </div>

          <!-- Bottom friendly indicator -->
          <div class="mt-6 pt-4 border-t border-cream-200 flex items-center gap-1.5 text-xs font-semibold text-gold-700 opacity-90 group-hover:opacity-100 transition-opacity">
            <span>Come as you are</span>
            <span class="text-sm">→</span>
          </div>
        </div>
      </div>

      <!-- Reassuring bottom pill -->
      <div class="mt-12 text-center">
        <div class="inline-flex flex-wrap items-center justify-center gap-2.5 px-6 py-3 rounded-full bg-cream-100 border border-gold-300 text-navy-900 text-xs sm:text-sm font-medium shadow-warm-sm">
          <span class="text-gold-600 font-bold">✨</span>
          <span>Everything is 100% free. No financial collections or tithes requested from guests.</span>
          <span class="text-coral-500 font-semibold">• {{ eventConfig.hashtag }}</span>
        </div>
      </div>
    </div>
  </section>
</template>
