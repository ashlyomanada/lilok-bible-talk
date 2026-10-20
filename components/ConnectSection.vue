<script setup lang="ts">
import { eventConfig } from '~/config/event'
</script>

<template>
  <section id="connect" class="py-16 sm:py-24 bg-cream-50 relative overflow-hidden">
    <!-- Ambient subtle background glow -->
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-72 bg-gold-200/25 blur-3xl pointer-events-none rounded-full"></div>

    <div class="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
      <!-- Section Label -->
      <div class="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold-700 mb-3">
        <span class="w-6 h-px bg-gold-500"></span>
        <span>Get in Touch</span>
        <span class="w-6 h-px bg-gold-500"></span>
      </div>

      <h2 class="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-navy-950 tracking-tight mb-4">
        What's Next? Connect with Us
      </h2>

      <p class="text-navy-700 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-10">
        {{ eventConfig.connectCopy }}
      </p>

      <!-- 3 Prominent Connection Buttons -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
        <!-- 1. Chat with Us (Messenger) -->
        <a
          :href="eventConfig.contact.messengerUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="group p-6 rounded-3xl bg-white hover:bg-navy-950 border border-cream-300 hover:border-navy-900 shadow-warm-sm hover:shadow-warm-xl transition-all duration-300 flex flex-col items-center text-center active:scale-95"
        >
          <div class="w-14 h-14 rounded-2xl bg-blue-50 group-hover:bg-blue-600/30 text-blue-600 group-hover:text-white flex items-center justify-center mb-4 transition-colors">
            <svg class="w-7 h-7 fill-current" viewBox="0 0 24 24">
              <path d="M12 2C6.477 2 2 6.145 2 11.258c0 2.91 1.455 5.517 3.735 7.199V22l3.418-1.875c.91.252 1.873.39 2.847.39 5.523 0 10-4.145 10-9.257C22 6.145 17.523 2 12 2zm1.002 12.443l-2.56-2.73-5.002 2.73 5.498-5.836 2.624 2.73 4.938-2.73-5.498 5.836z"/>
            </svg>
          </div>
          <h3 class="font-serif text-lg font-bold text-navy-950 group-hover:text-white mb-1 transition-colors">
            Chat with us
          </h3>
          <p class="text-xs text-navy-600 group-hover:text-cream-200 transition-colors">
            Questions, studies, or personal prayer on Messenger
          </p>
          <span class="mt-4 text-xs font-bold text-blue-600 group-hover:text-gold-300 transition-colors inline-flex items-center gap-1">
            <span>Open Messenger</span>
            <span>→</span>
          </span>
        </a>

        <!-- 2. Follow @lilok.bt (Instagram) -->
        <a
          :href="eventConfig.instagramUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="group p-6 rounded-3xl bg-white hover:bg-navy-950 border border-cream-300 hover:border-navy-900 shadow-warm-sm hover:shadow-warm-xl transition-all duration-300 flex flex-col items-center text-center active:scale-95"
        >
          <div class="w-14 h-14 rounded-2xl bg-coral-50 group-hover:bg-coral-500/30 text-coral-600 group-hover:text-white flex items-center justify-center mb-4 transition-colors">
            <svg class="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </div>
          <h3 class="font-serif text-lg font-bold text-navy-950 group-hover:text-white mb-1 transition-colors">
            Follow {{ eventConfig.instagramHandle }}
          </h3>
          <p class="text-xs text-navy-600 group-hover:text-cream-200 transition-colors">
            Stories, weekly updates & Central Region memories
          </p>
          <span class="mt-4 text-xs font-bold text-coral-600 group-hover:text-gold-300 transition-colors inline-flex items-center gap-1">
            <span>View Profile</span>
            <span>→</span>
          </span>
        </a>

        <!-- 3. Watch Our Sermons (YouTube) -->
        <a
          :href="eventConfig.contact.youtubeUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="group p-6 rounded-3xl bg-white hover:bg-navy-950 border border-cream-300 hover:border-navy-900 shadow-warm-sm hover:shadow-warm-xl transition-all duration-300 flex flex-col items-center text-center active:scale-95"
        >
          <div class="w-14 h-14 rounded-2xl bg-red-50 group-hover:bg-red-600/30 text-red-600 group-hover:text-white flex items-center justify-center mb-4 transition-colors">
            <svg class="w-7 h-7 fill-current" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </div>
          <h3 class="font-serif text-lg font-bold text-navy-950 group-hover:text-white mb-1 transition-colors">
            Watch our sermons
          </h3>
          <p class="text-xs text-navy-600 group-hover:text-cream-200 transition-colors">
            MICC full worship services & powerful discipleship lessons
          </p>
          <span class="mt-4 text-xs font-bold text-red-600 group-hover:text-gold-300 transition-colors inline-flex items-center gap-1">
            <span>Watch on YouTube</span>
            <span>→</span>
          </span>
        </a>
      </div>
    </div>
  </section>
</template>
