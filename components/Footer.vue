<script setup lang="ts">
import { eventConfig } from '~/config/event'

const scrollToTop = () => {
  if (typeof window !== 'undefined') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}
</script>

<template>
  <footer class="bg-navy-950 text-white pt-16 pb-24 sm:pb-14 relative overflow-hidden border-t border-navy-800">
    <!-- Golden subtle line and ambient glow -->
    <div class="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent"></div>
    <div class="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-48 bg-gold-500/10 blur-3xl pointer-events-none rounded-full"></div>

    <div class="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
      <div class="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-navy-800">
        <!-- Col 1: Lilok BT, MICC Logo & Tagline (5 cols) -->
        <div class="md:col-span-5 space-y-4 text-left">
          <div class="flex items-center gap-3">
            <!-- MICC Logo in soft pill -->
            <div class="px-3 py-1.5 rounded-2xl bg-white/95 backdrop-blur-md shadow-warm-sm border border-white/90 flex items-center justify-center shrink-0">
              <img
                :src="eventConfig.logo"
                :alt="eventConfig.logoAlt"
                class="h-10 sm:h-12 w-auto object-contain"
                loading="lazy"
              />
            </div>
            <div>
              <span class="font-serif text-2xl font-bold tracking-tight block text-white">
                {{ eventConfig.groupName }}
              </span>
              <span class="text-xs text-gold-300 font-semibold block">
                {{ eventConfig.parentChurchName }}
              </span>
              <span class="text-[11px] text-cream-300/80 block">
                {{ eventConfig.parentRegion }} • {{ eventConfig.soldOutBadge }}
              </span>
            </div>
          </div>

          <!-- Tagline & Hashtag -->
          <div class="p-4 rounded-2xl bg-white/5 border border-white/10 text-cream-200 text-sm leading-relaxed max-w-md">
            <p class="font-serif italic text-lg text-gold-200 mb-1">
              "{{ eventConfig.tagline }}"
            </p>
            <p class="text-xs text-coral-300 font-semibold mb-2">
              {{ eventConfig.hashtag }}
            </p>
            <span class="text-[11px] text-cream-300/70 block">
              A community of sold-out disciples walking together in genuine faith, love, and purpose.
            </span>
          </div>
        </div>

        <!-- Col 2: Social & Ministry Channels (4 cols) -->
        <div class="md:col-span-4 space-y-3 text-left">
          <h4 class="text-xs font-bold uppercase tracking-wider text-gold-400">
            Follow & Connect
          </h4>
          <ul class="space-y-2.5 text-sm text-cream-200">
            <!-- Lilok BT Instagram -->
            <li>
              <a
                :href="eventConfig.instagramUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="hover:text-gold-300 transition-colors inline-flex items-center gap-2.5 font-medium"
              >
                <svg class="w-4 h-4 text-coral-400 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <span>Instagram: <strong>{{ eventConfig.instagramHandle }}</strong></span>
              </a>
            </li>

            <!-- Messenger -->
            <li>
              <a
                :href="eventConfig.contact.messengerUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="hover:text-gold-300 transition-colors inline-flex items-center gap-2.5 font-medium"
              >
                <svg class="w-4 h-4 text-blue-400 shrink-0 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.145 2 11.258c0 2.91 1.455 5.517 3.735 7.199V22l3.418-1.875c.91.252 1.873.39 2.847.39 5.523 0 10-4.145 10-9.257C22 6.145 17.523 2 12 2zm1.002 12.443l-2.56-2.73-5.002 2.73 5.498-5.836 2.624 2.73 4.938-2.73-5.498 5.836z"/>
                </svg>
                <span>Messenger: m.me/manilaicc</span>
              </a>
            </li>

            <!-- MICC Facebook -->
            <li>
              <a
                :href="eventConfig.contact.facebookUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="hover:text-gold-300 transition-colors inline-flex items-center gap-2.5"
              >
                <svg class="w-4 h-4 text-blue-400 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span>Facebook: {{ eventConfig.contact.facebookPageName }}</span>
              </a>
            </li>

            <!-- MICC Instagram -->
            <li>
              <a
                :href="eventConfig.contact.miccInstagramUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="hover:text-gold-300 transition-colors inline-flex items-center gap-2.5"
              >
                <svg class="w-4 h-4 text-coral-400 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <span>MICC Instagram: {{ eventConfig.contact.miccInstagramHandle }}</span>
              </a>
            </li>

            <!-- MICC YouTube -->
            <li>
              <a
                :href="eventConfig.contact.youtubeUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="hover:text-gold-300 transition-colors inline-flex items-center gap-2.5"
              >
                <svg class="w-4 h-4 text-red-500 shrink-0 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                <span>YouTube: {{ eventConfig.contact.youtubeHandle }}</span>
              </a>
            </li>
          </ul>
        </div>

        <!-- Col 3: Welcome Card & Back to Top (3 cols) -->
        <div class="md:col-span-3 flex flex-col justify-between text-left">
          <div class="p-5 rounded-2xl bg-gradient-to-br from-gold-950/70 to-navy-900 border border-gold-500/30">
            <span class="text-xs font-bold uppercase tracking-wider text-gold-300 block mb-1">
              {{ eventConfig.sundayService.dayAndTime }}
            </span>
            <p class="font-serif text-xl font-bold text-white mb-2">
              Sunday Worship
            </p>
            <p class="text-xs text-cream-200 leading-relaxed mb-3">
              {{ eventConfig.sundayService.message }}
            </p>
            <a
              :href="eventConfig.contact.messengerUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-1.5 text-xs font-bold text-gold-300 hover:text-white transition-colors"
            >
              <span>Connect with Central Region</span>
              <span>→</span>
            </a>
          </div>

          <div class="mt-4">
            <button
              type="button"
              class="inline-flex items-center gap-2 text-xs text-cream-300/80 hover:text-white transition-colors"
              @click="scrollToTop"
            >
              <span>Back to top</span>
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
        <p>© 2026 {{ eventConfig.groupName }} · {{ eventConfig.parentChurchName }} (Central Region)</p>
        <p class="text-center sm:text-right">
          {{ eventConfig.hashtag }} · Welcome to the family.
        </p>
      </div>
    </div>
  </footer>
</template>
