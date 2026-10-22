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
  <section id="verse" class="py-24 sm:py-32 bg-navy-950 text-white relative overflow-hidden border-t border-white/10">
    <!-- Ambient subtle background glow -->
    <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div class="w-[600px] h-[350px] bg-accent-500/10 blur-[120px] rounded-full"></div>
    </div>

    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
      <!-- Section Label Pill -->
      <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-accent-400 text-xs font-black uppercase tracking-widest mb-10 shadow-soft">
        <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
        <span>Scripture Highlight</span>
      </div>

      <!-- Giant Uppercase Verse Quote -->
      <blockquote class="max-w-5xl mx-auto mb-10">
        <p class="font-sans font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl uppercase tracking-tight text-white leading-[1.08] drop-shadow-sm">
          {{ eventConfig.verse.text }}
        </p>
      </blockquote>

      <!-- Reference in Accent Color & Translation -->
      <div class="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-10">
        <span class="font-sans font-black text-2xl sm:text-3xl uppercase tracking-wider text-accent-400 drop-shadow-xs">
          {{ eventConfig.verse.reference }}
        </span>
        <span class="hidden sm:inline text-white/30">•</span>
        <span class="px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest bg-white/15 text-white/90 border border-white/20">
          {{ eventConfig.verse.translation }}
        </span>
      </div>

      <!-- Pastoral Reflection Note & Copy Button -->
      <div class="max-w-2xl mx-auto p-6 sm:p-7 rounded-3xl bg-navy-900/90 border border-white/15 shadow-soft flex flex-col sm:flex-row items-center justify-between gap-5 text-left">
        <div class="flex items-start gap-3">
          <span class="text-accent-400 text-lg leading-none mt-0.5">✦</span>
          <p class="text-xs sm:text-sm text-surface-200 leading-relaxed font-normal">
            {{ eventConfig.verse.reflectionNote }}
          </p>
        </div>

        <button
          type="button"
          class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider text-navy-950 bg-accent-500 hover:bg-accent-600 shadow-soft shrink-0 active:scale-95 transition-all"
          @click="copyVerse"
        >
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
          </svg>
          <span>Copy Scripture</span>
        </button>
      </div>
    </div>
  </section>
</template>
