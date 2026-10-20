<script setup lang="ts">
import { eventConfig } from '~/config/event'
import { useToast } from '~/composables/useToast'

const { showToast } = useToast()

const copyVerse = async () => {
  const fullText = `${eventConfig.verse.text} — ${eventConfig.verse.reference} (${eventConfig.verse.translation})`
  try {
    if (navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(fullText)
      showToast('Scripture copied to clipboard!', 'success')
    } else {
      showToast('Verse text ready to share', 'info')
    }
  } catch (err) {
    showToast('Verse text ready to share', 'info')
  }
}
</script>

<template>
  <section id="verse" class="py-14 sm:py-20 bg-cream-100/70 relative overflow-hidden">
    <!-- Ambient glow circle -->
    <div class="absolute inset-x-0 top-1/2 -translate-y-1/2 mx-auto w-full max-w-3xl h-64 bg-gold-200/30 blur-3xl pointer-events-none rounded-full"></div>

    <div class="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
      <div class="relative rounded-3xl bg-gradient-to-br from-white via-cream-50 to-gold-50/50 p-8 sm:p-14 border border-gold-200/80 shadow-warm-lg text-center overflow-hidden">
        <!-- Giant decorative quotation mark in background -->
        <div class="absolute -top-8 -left-2 text-gold-200/35 select-none font-serif text-[180px] leading-none pointer-events-none" aria-hidden="true">
          “
        </div>
        <div class="absolute -bottom-20 -right-2 text-gold-200/25 select-none font-serif text-[180px] leading-none pointer-events-none" aria-hidden="true">
          ”
        </div>

        <!-- Section Label -->
        <div class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-100 text-gold-800 text-xs font-semibold uppercase tracking-wider mb-6">
          <svg class="w-3.5 h-3.5 text-gold-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
          <span>Scripture Highlight</span>
        </div>

        <!-- Scripture Quote -->
        <blockquote class="relative z-10">
          <p class="font-serif text-2xl sm:text-3xl md:text-4xl text-navy-950 font-medium leading-[1.35] tracking-tight mb-6">
            {{ eventConfig.verse.text }}
          </p>

          <!-- Citation -->
          <footer class="flex flex-col sm:flex-row items-center justify-center gap-2 text-sm font-semibold text-gold-800">
            <span class="tracking-wide text-base font-serif italic">{{ eventConfig.verse.reference }}</span>
            <span class="hidden sm:inline text-gold-400">•</span>
            <span class="text-xs font-sans uppercase tracking-widest text-navy-700 bg-navy-100/70 px-2.5 py-0.5 rounded-md">
              {{ eventConfig.verse.translation }}
            </span>
          </footer>
        </blockquote>

        <!-- Pastoral Reflection Note -->
        <div class="mt-8 pt-6 border-t border-gold-200/60 max-w-xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p class="text-xs sm:text-sm text-navy-800 italic">
            ✦ {{ eventConfig.verse.reflectionNote }}
          </p>

          <button
            type="button"
            class="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-navy-900 bg-white hover:bg-gold-50 border border-gold-200 transition-colors shadow-xs shrink-0 active:scale-95"
            @click="copyVerse"
          >
            <svg class="w-3.5 h-3.5 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
            </svg>
            <span>Copy Scripture</span>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
