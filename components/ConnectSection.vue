<script setup lang="ts">
import { eventConfig } from '~/config/event'

const connectRows = [
  {
    title: 'Messenger',
    handle: 'm.me/manilaicc',
    description: 'Chat with us directly for personal Bible studies, prayer requests, or rideshares.',
    url: eventConfig.contact.messengerUrl,
    badge: 'Fastest Response',
    icon: 'messenger'
  },
  {
    title: 'Instagram',
    handle: eventConfig.instagramHandle,
    description: 'Stories, weekly discipleship moments, gathering spots, and photo recaps.',
    url: eventConfig.instagramUrl,
    badge: 'Community',
    icon: 'instagram'
  },
  {
    title: 'Facebook',
    handle: eventConfig.contact.facebookPageName,
    description: 'Metro Manila International Christian Church official community updates and announcements.',
    url: eventConfig.contact.facebookUrl,
    badge: 'Church Updates',
    icon: 'facebook'
  },
  {
    title: 'YouTube',
    handle: eventConfig.contact.youtubeHandle,
    description: 'Watch full Sunday worship sermons, life-changing baptisms, and discipleship teachings.',
    url: eventConfig.contact.youtubeUrl,
    badge: 'Sermons & Faith',
    icon: 'youtube'
  }
]
</script>

<template>
  <section id="connect" class="py-24 sm:py-32 bg-navy-900 text-white relative overflow-hidden border-t border-white/10">
    <!-- Ambient subtle background glow -->
    <div class="absolute inset-x-0 bottom-0 mx-auto w-full max-w-4xl h-80 bg-accent-500/10 blur-[130px] rounded-full pointer-events-none"></div>

    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <!-- Section Header -->
      <div class="text-left mb-12 sm:mb-16">
        <div class="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-accent-400 mb-3">
          <span class="w-5 h-0.5 bg-accent-500"></span>
          <span>Get in Touch</span>
        </div>
        <h2 class="font-sans font-black text-4xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-white mb-4">
          Connect With Us
        </h2>
        <p class="text-surface-300 text-base sm:text-lg font-normal leading-relaxed max-w-2xl">
          {{ eventConfig.connectCopy }}
        </p>
      </div>

      <!-- Elevation-Style Big Stacked Link Rows -->
      <div class="flex flex-col space-y-4">
        <a
          v-for="(row, idx) in connectRows"
          :key="idx"
          :href="row.url"
          target="_blank"
          rel="noopener noreferrer"
          class="group p-6 sm:p-8 rounded-3xl sm:rounded-4xl bg-navy-850/80 hover:bg-navy-800 border border-white/10 hover:border-accent-500/40 shadow-soft transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6"
        >
          <!-- Left: Row Identity -->
          <div class="flex items-start sm:items-center gap-5">
            <!-- Icon Pill -->
            <div class="w-14 h-14 rounded-2xl bg-white/10 text-white group-hover:bg-accent-500 group-hover:text-navy-950 flex items-center justify-center shrink-0 transition-all duration-300 shadow-soft-sm">
              <!-- Messenger -->
              <svg v-if="row.icon === 'messenger'" class="w-7 h-7 fill-current" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.145 2 11.258c0 2.91 1.455 5.517 3.735 7.199V22l3.418-1.875c.91.252 1.873.39 2.847.39 5.523 0 10-4.145 10-9.257C22 6.145 17.523 2 12 2zm1.002 12.443l-2.56-2.73-5.002 2.73 5.498-5.836 2.624 2.73 4.938-2.73-5.498 5.836z"/>
              </svg>
              <!-- Instagram -->
              <svg v-else-if="row.icon === 'instagram'" class="w-7 h-7 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              <!-- Facebook -->
              <svg v-else-if="row.icon === 'facebook'" class="w-7 h-7 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <!-- YouTube -->
              <svg v-else class="w-7 h-7 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </div>

            <!-- Titles -->
            <div>
              <div class="flex flex-wrap items-center gap-2 mb-1">
                <h3 class="font-sans font-black text-2xl sm:text-3xl uppercase tracking-tight text-white group-hover:text-accent-400 transition-colors">
                  {{ row.title }}
                </h3>
                <span class="text-xs font-black uppercase tracking-wider text-surface-400">
                  · {{ row.handle }}
                </span>
                <span class="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-white/10 text-accent-300 border border-white/15">
                  {{ row.badge }}
                </span>
              </div>
              <p class="text-xs sm:text-sm text-surface-300 font-normal leading-relaxed max-w-xl">
                {{ row.description }}
              </p>
            </div>
          </div>

          <!-- Right: Arrow with Hover Slide Effect -->
          <div class="flex items-center gap-2 shrink-0 self-end md:self-center">
            <span class="text-xs font-black uppercase tracking-wider text-surface-400 group-hover:text-accent-400 transition-colors">
              Connect
            </span>
            <div class="w-10 h-10 rounded-full bg-white/10 group-hover:bg-accent-500 group-hover:text-navy-950 flex items-center justify-center transition-all duration-300">
              <svg class="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
              </svg>
            </div>
          </div>
        </a>
      </div>
    </div>
  </section>
</template>
