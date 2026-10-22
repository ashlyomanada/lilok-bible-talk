<script setup lang="ts">
import { eventConfig } from '~/config/event'

const scrollToTop = () => {
  if (typeof window !== 'undefined') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}
</script>

<template>
  <footer class="bg-navy-950 text-white pt-20 pb-28 sm:pb-16 relative overflow-hidden border-t border-white/10">
    <!-- Ambient subtle glow -->
    <div class="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent-500/40 to-transparent"></div>
    <div class="absolute -top-20 left-1/2 -translate-x-1/2 w-96 h-40 bg-accent-500/10 blur-3xl pointer-events-none rounded-full"></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/10">
        <!-- Col 1: Large Logo, Tagline, & Blessing Line (6 cols) -->
        <div class="md:col-span-6 space-y-6 text-left">
          <!-- Large MNL Logo -->
          <div class="flex items-center gap-4">
            <img
              src="/images/mnl-logo-white.png"
              :alt="eventConfig.logoAlt"
              class="h-12 sm:h-16 w-auto object-contain"
              loading="lazy"
            />
            <div class="border-l border-white/20 pl-4">
              <span class="font-sans font-black text-2xl uppercase tracking-tight text-white block">
                {{ eventConfig.groupName }}
              </span>
              <span class="text-xs text-accent-400 font-extrabold uppercase tracking-wider block">
                {{ eventConfig.parentChurchName }}
              </span>
              <span class="text-[11px] text-surface-400 font-medium block">
                {{ eventConfig.parentRegion }} · {{ eventConfig.soldOutBadge }}
              </span>
            </div>
          </div>

          <!-- Blessing Line & Tagline -->
          <div class="p-6 rounded-3xl bg-navy-900/90 border border-white/10 text-surface-200 text-sm leading-relaxed max-w-lg space-y-3">
            <p class="font-sans font-black text-lg text-white uppercase tracking-tight">
              "{{ eventConfig.tagline }}"
            </p>
            <p class="text-xs text-surface-300 leading-relaxed font-normal">
              May God bless and protect you and your loved ones this week. Wherever life finds you right now, remember that you have a seat at our table and brothers and sisters who care.
            </p>
            <div class="pt-2 flex items-center gap-2">
              <span class="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-accent-500/15 text-accent-400 border border-accent-500/30">
                {{ eventConfig.hashtag }}
              </span>
            </div>
          </div>
        </div>

        <!-- Col 2: Social Channels & Direct Links (3 cols) -->
        <div class="md:col-span-3 space-y-4 text-left">
          <h4 class="text-xs font-black uppercase tracking-widest text-accent-400">
            Follow & Connect
          </h4>
          <ul class="space-y-3 text-sm text-surface-300">
            <li>
              <a
                :href="eventConfig.instagramUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="hover:text-accent-400 transition-colors inline-flex items-center gap-2.5 font-bold"
              >
                <span class="text-coral-400">✦</span>
                <span>Instagram: {{ eventConfig.instagramHandle }}</span>
              </a>
            </li>
            <li>
              <a
                :href="eventConfig.contact.messengerUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="hover:text-accent-400 transition-colors inline-flex items-center gap-2.5 font-bold"
              >
                <span class="text-accent-400">✦</span>
                <span>Messenger Chat</span>
              </a>
            </li>
            <li>
              <a
                :href="eventConfig.contact.facebookUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="hover:text-accent-400 transition-colors inline-flex items-center gap-2.5 font-bold"
              >
                <span class="text-surface-400">✦</span>
                <span>Facebook Page</span>
              </a>
            </li>
            <li>
              <a
                :href="eventConfig.contact.youtubeUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="hover:text-accent-400 transition-colors inline-flex items-center gap-2.5 font-bold"
              >
                <span class="text-coral-400">✦</span>
                <span>YouTube Channel</span>
              </a>
            </li>
          </ul>
        </div>

        <!-- Col 3: Sunday Service & Back to Top (3 cols) -->
        <div class="md:col-span-3 flex flex-col justify-between text-left space-y-4">
          <div class="p-5 rounded-3xl bg-navy-900/90 border border-white/10">
            <span class="text-[10px] font-black uppercase tracking-widest text-accent-400 block mb-1">
              {{ eventConfig.sundayService.dayAndTime }}
            </span>
            <p class="font-sans font-black text-lg text-white uppercase tracking-tight mb-2">
              Sunday Worship
            </p>
            <p class="text-xs text-surface-300 leading-relaxed font-normal mb-3">
              {{ eventConfig.sundayService.message }}
            </p>
            <a
              :href="eventConfig.sundayService.messengerUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-accent-400 hover:text-white transition-colors"
            >
              <span>Connect on Messenger</span>
              <span>→</span>
            </a>
          </div>

          <button
            type="button"
            class="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-surface-400 hover:text-white transition-colors self-start"
            @click="scrollToTop"
          >
            <span>Back to top</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 10l7-7m0 0l7 7m-7-7v18"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-surface-400 font-medium">
        <p>© 2026 {{ eventConfig.groupName }} · {{ eventConfig.parentChurchName }} ({{ eventConfig.parentRegion }})</p>
        <p class="text-center sm:text-right">
          {{ eventConfig.hashtag }} · {{ eventConfig.soldOutBadge }}
        </p>
      </div>
    </div>
  </footer>
</template>
