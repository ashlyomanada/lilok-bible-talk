<script setup lang="ts">
import { ref } from 'vue'
import { eventConfig } from '~/config/event'
import { getGoogleCalendarUrl, downloadIcsFile } from '~/utils/calendar'
import { useToast } from '~/composables/useToast'

const { showToast } = useToast()
const showCalendarMenu = ref(false)

const handleIcsDownload = () => {
  downloadIcsFile()
  showCalendarMenu.value = false
  showToast('Calendar event downloaded (.ics)', 'success')
}
</script>

<template>
  <section id="details" class="py-16 sm:py-24 bg-cream-100/60 relative">
    <div class="max-w-6xl mx-auto px-4 sm:px-6">
      <!-- Section Header -->
      <div class="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
        <div class="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold-700 mb-3">
          <span class="w-6 h-px bg-gold-500"></span>
          <span>Mark Your Calendar</span>
          <span class="w-6 h-px bg-gold-500"></span>
        </div>
        <h2 class="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-navy-950 tracking-tight mb-4">
          When & Where
        </h2>
        <p class="text-navy-700 text-base sm:text-lg leading-relaxed">
          We have a seat saved for you at {{ eventConfig.groupName }}. Save the date and feel free to invite your friends, colleagues, or loved ones!
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <!-- Main Details Card (Left 7 cols) -->
        <div class="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-cream-300 shadow-warm-lg flex flex-col justify-between">
          <div class="space-y-8">
            <!-- Event Title & Host Sub-header -->
            <div class="pb-6 border-b border-cream-200">
              <span class="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-gold-100 text-gold-900 border border-gold-200 mb-2">
                {{ eventConfig.parentChurchName }} • {{ eventConfig.parentRegion }}
              </span>
              <h3 class="font-serif text-2xl sm:text-3xl font-bold text-navy-950">
                {{ eventConfig.groupName }}: "{{ eventConfig.eventTitle }}"
              </h3>
              <p class="text-xs sm:text-sm text-navy-700 mt-1">
                Hosted with joy by Central Region disciples. Doors open at {{ eventConfig.doorsOpenTime }}.
              </p>
            </div>

            <!-- Date & Time Row -->
            <div class="flex items-start gap-4 sm:gap-5">
              <div class="w-12 h-12 rounded-2xl bg-gold-100 flex items-center justify-center text-gold-700 shrink-0 shadow-xs">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
              </div>
              <div class="flex-1">
                <span class="text-xs font-bold uppercase tracking-wider text-gold-700 block mb-1">When</span>
                <h4 class="font-serif text-2xl font-bold text-navy-950 mb-1">
                  {{ eventConfig.date }}
                </h4>
                <p class="text-sm sm:text-base text-navy-700 font-medium">
                  {{ eventConfig.time }}
                </p>
              </div>
            </div>

            <!-- Venue Row -->
            <div class="flex items-start gap-4 sm:gap-5">
              <div class="w-12 h-12 rounded-2xl bg-coral-100 flex items-center justify-center text-coral-600 shrink-0 shadow-xs">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
              </div>
              <div class="flex-1">
                <span class="text-xs font-bold uppercase tracking-wider text-coral-600 block mb-1">Where</span>
                <h4 class="font-serif text-2xl font-bold text-navy-950 mb-1">
                  {{ eventConfig.venue.name }}
                </h4>
                <p class="text-sm font-semibold text-navy-800 mb-1">
                  {{ eventConfig.venue.room }}
                </p>
                <p class="text-sm text-navy-700">
                  {{ eventConfig.venue.address }} • {{ eventConfig.venue.cityStateZip }}
                </p>
                <!-- Location note -->
                <div class="mt-3 p-3.5 rounded-xl bg-cream-100 border border-cream-300 text-xs text-navy-800 leading-relaxed">
                  <strong class="font-semibold text-navy-950">Directions & Landmark:</strong> {{ eventConfig.venue.notes }}
                </div>
              </div>
            </div>
          </div>

          <!-- Action Buttons: RSVP, Add to Calendar & Directions -->
          <div class="mt-10 pt-6 border-t border-cream-300 flex flex-col sm:flex-row items-center gap-3">
            <!-- RSVP on Messenger Button -->
            <a
              :href="eventConfig.contact.messengerUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-white font-bold text-sm shadow-warm transition-all duration-200 active:scale-95"
            >
              <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.145 2 11.258c0 2.91 1.455 5.517 3.735 7.199V22l3.418-1.875c.91.252 1.873.39 2.847.39 5.523 0 10-4.145 10-9.257C22 6.145 17.523 2 12 2zm1.002 12.443l-2.56-2.73-5.002 2.73 5.498-5.836 2.624 2.73 4.938-2.73-5.498 5.836z"/>
              </svg>
              <span>RSVP on Messenger</span>
            </a>

            <!-- Add to Calendar with Dropdown -->
            <div class="relative w-full sm:w-auto flex-1">
              <button
                type="button"
                class="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-cream-100 hover:bg-cream-200 text-navy-900 font-semibold text-sm transition-all duration-200 border border-cream-300 active:scale-95"
                @click="showCalendarMenu = !showCalendarMenu"
              >
                <svg class="w-4 h-4 text-gold-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                </svg>
                <span>Add to Calendar</span>
                <svg class="w-3.5 h-3.5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"/>
                </svg>
              </button>

              <!-- Dropdown Menu -->
              <div
                v-if="showCalendarMenu"
                class="absolute left-0 right-0 sm:right-auto sm:w-60 mt-2 p-2 bg-white rounded-2xl shadow-warm-xl border border-cream-300 z-30 flex flex-col gap-1 text-sm animate-in fade-in"
              >
                <a
                  :href="getGoogleCalendarUrl()"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex items-center gap-2.5 px-3 py-2 rounded-xl text-navy-900 hover:bg-gold-50 transition-colors font-medium"
                  @click="showCalendarMenu = false"
                >
                  <span class="w-2 h-2 rounded-full bg-blue-500"></span>
                  <span>Google Calendar</span>
                </a>
                <button
                  type="button"
                  class="flex items-center gap-2.5 px-3 py-2 rounded-xl text-navy-900 hover:bg-gold-50 transition-colors font-medium text-left w-full"
                  @click="handleIcsDownload"
                >
                  <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span>Apple / Outlook (.ics)</span>
                </button>
              </div>
            </div>

            <!-- Get Directions Button -->
            <a
              :href="eventConfig.venue.mapLink"
              target="_blank"
              rel="noopener noreferrer"
              class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-white hover:bg-cream-100 text-navy-900 font-semibold text-sm transition-colors border border-cream-300 active:scale-95"
            >
              <svg class="w-4 h-4 text-navy-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
              </svg>
              <span>Map & Directions</span>
            </a>
          </div>
        </div>

        <!-- Right 5 cols: Speaker & Instagram Connect -->
        <div class="lg:col-span-5 space-y-6">
          <!-- Hosts / Speaker Card -->
          <div class="bg-white rounded-3xl p-6 sm:p-8 border border-cream-300 shadow-warm-lg">
            <div class="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gold-700 mb-4">
              <span>✦</span>
              <span>Your Hosts</span>
            </div>

            <div class="flex items-center gap-4 mb-4">
              <div class="w-14 h-14 rounded-2xl bg-gradient-to-tr from-navy-900 to-navy-800 text-gold-300 border border-gold-400/30 flex items-center justify-center font-serif text-xl font-bold shadow-sm">
                BT
              </div>
              <div>
                <h4 class="font-serif text-xl font-bold text-navy-950">
                  {{ eventConfig.speaker.name }}
                </h4>
                <p class="text-xs text-gold-700 font-semibold">
                  {{ eventConfig.speaker.title }}
                </p>
              </div>
            </div>

            <p class="text-sm text-navy-700 leading-relaxed">
              {{ eventConfig.speaker.bio }}
            </p>

            <div class="mt-4 pt-4 border-t border-cream-200">
              <a
                :href="eventConfig.instagramUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 text-xs font-bold text-coral-600 hover:text-coral-700 transition-colors"
              >
                <span>Follow {{ eventConfig.instagramHandle }} on Instagram</span>
                <span>→</span>
              </a>
            </div>
          </div>

          <!-- Have Questions / Need a Ride Card -->
          <div class="bg-gradient-to-br from-cream-100 via-white to-gold-50 rounded-3xl p-6 sm:p-8 border border-gold-300 shadow-warm">
            <h4 class="font-serif text-lg font-bold text-navy-950 mb-2">
              Have Questions or Need a Rideshare?
            </h4>
            <p class="text-xs sm:text-sm text-navy-700 mb-4 leading-relaxed">
              First time visiting? Feel free to message us on Instagram or Facebook Messenger. We can answer any questions, connect you with rides, or save you a seat!
            </p>

            <div class="flex flex-col gap-2.5 text-xs font-semibold">
              <a
                :href="eventConfig.contact.messengerUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-navy-950 text-white hover:bg-navy-900 shadow-xs transition-colors"
              >
                <svg class="w-4 h-4 fill-current text-gold-400" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.145 2 11.258c0 2.91 1.455 5.517 3.735 7.199V22l3.418-1.875c.91.252 1.873.39 2.847.39 5.523 0 10-4.145 10-9.257C22 6.145 17.523 2 12 2zm1.002 12.443l-2.56-2.73-5.002 2.73 5.498-5.836 2.624 2.73 4.938-2.73-5.498 5.836z"/>
                </svg>
                <span>Chat via Facebook Messenger</span>
              </a>

              <a
                :href="eventConfig.instagramUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white text-navy-900 hover:text-gold-700 border border-cream-300 shadow-xs transition-colors"
              >
                <svg class="w-3.5 h-3.5 text-coral-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <span>Direct Message @lilok.bt</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
