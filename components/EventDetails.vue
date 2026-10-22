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
  <section id="details" class="py-20 sm:py-28 bg-surface-100 text-navy-900 relative">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="text-center max-w-2xl mx-auto mb-14 sm:mb-18">
        <div class="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-accent-700 mb-3">
          <span class="w-5 h-0.5 bg-accent-500"></span>
          <span>Event Information</span>
          <span class="w-5 h-0.5 bg-accent-500"></span>
        </div>
        <h2 class="font-sans font-black text-4xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-navy-900 mb-4">
          When & Where
        </h2>
        <p class="text-navy-700 text-base sm:text-lg font-normal leading-relaxed">
          We have a seat saved for you. Save the date and feel free to bring along your friends, family, or colleagues!
        </p>
      </div>

      <!-- Clean Ticket-Style Pass Card -->
      <div class="relative bg-white rounded-4xl sm:rounded-5xl border border-surface-300 shadow-soft-xl overflow-hidden max-w-4xl mx-auto">
        <!-- Top Ticket Header Bar -->
        <div class="bg-navy-900 px-6 sm:px-10 py-5 text-white flex flex-wrap items-center justify-between gap-3">
          <div class="flex items-center gap-3">
            <img
              src="/images/mnl-logo-white.png"
              :alt="eventConfig.logoAlt"
              class="h-7 w-auto object-contain"
            />
            <div>
              <p class="font-black text-sm uppercase tracking-wider text-white">{{ eventConfig.groupName }}</p>
              <p class="text-[11px] text-surface-300">{{ eventConfig.parentChurchName }} · {{ eventConfig.parentRegion }}</p>
            </div>
          </div>
          <span class="px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-widest bg-accent-500 text-navy-950 shadow-soft-sm">
            Admit All · Free
          </span>
        </div>

        <!-- Main Ticket Content Body -->
        <div class="p-6 sm:p-10 md:p-12 space-y-8">
          <!-- Event Theme & Subtitle -->
          <div class="border-b border-surface-200 pb-6">
            <span class="text-xs font-black uppercase tracking-wider text-accent-600 block mb-1">
              Bible Talk Theme
            </span>
            <h3 class="font-sans font-black text-3xl sm:text-4xl uppercase tracking-tight text-navy-900">
              "{{ eventConfig.eventTitle }}"
            </h3>
            <p class="text-sm text-navy-700 mt-2 font-normal leading-relaxed">
              {{ eventConfig.oneLineWelcome }} Doors open at {{ eventConfig.doorsOpenTime }}.
            </p>
          </div>

          <!-- 2 Columns: Date/Time + Venue -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- Date & Time Row -->
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 rounded-2xl bg-accent-100 text-accent-800 flex items-center justify-center shrink-0">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
              </div>
              <div>
                <span class="text-xs font-black uppercase tracking-wider text-accent-700 block mb-1">When</span>
                <h4 class="font-sans font-black text-xl sm:text-2xl uppercase tracking-tight text-navy-900 mb-1">
                  {{ eventConfig.date }}
                </h4>
                <p class="text-sm text-navy-700 font-semibold">
                  {{ eventConfig.time }}
                </p>
                <p class="text-xs text-navy-500 mt-1">Doors open {{ eventConfig.doorsOpenTime }} for snacks</p>
              </div>
            </div>

            <!-- Venue Row -->
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 rounded-2xl bg-coral-100 text-coral-600 flex items-center justify-center shrink-0">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
              </div>
              <div>
                <span class="text-xs font-black uppercase tracking-wider text-coral-600 block mb-1">Where</span>
                <h4 class="font-sans font-black text-xl sm:text-2xl uppercase tracking-tight text-navy-900 mb-1">
                  {{ eventConfig.venue.name }}
                </h4>
                <p class="text-sm text-navy-800 font-semibold mb-1">
                  {{ eventConfig.venue.room }}
                </p>
                <p class="text-xs text-navy-600">
                  {{ eventConfig.venue.address }} · {{ eventConfig.venue.cityStateZip }}
                </p>
              </div>
            </div>
          </div>

          <!-- Speaker Card -->
          <div class="p-5 rounded-3xl bg-surface-50 border border-surface-300/80 flex items-start gap-4">
            <div class="w-10 h-10 rounded-2xl bg-navy-900 text-white flex items-center justify-center font-black text-sm shrink-0">
              🎤
            </div>
            <div>
              <span class="text-xs font-black uppercase tracking-wider text-navy-500 block mb-0.5">Speaker / Discussion Leaders</span>
              <p class="font-black text-navy-900 text-base uppercase">{{ eventConfig.speaker.name }}</p>
              <p class="text-xs text-accent-700 font-bold mb-1">{{ eventConfig.speaker.title }}</p>
              <p class="text-xs text-navy-700 leading-relaxed font-normal">{{ eventConfig.speaker.bio }}</p>
            </div>
          </div>

          <!-- Directions Note -->
          <div class="p-4 rounded-2xl bg-surface-100 border border-surface-200 text-xs text-navy-800 leading-relaxed">
            <strong class="font-black text-navy-900 uppercase tracking-wide">Landmark & Directions:</strong> {{ eventConfig.venue.notes }}
          </div>
        </div>

        <!-- Ticket Dashed Perforation Line & Notches -->
        <div class="relative py-1 flex items-center">
          <div class="absolute -left-4 w-8 h-8 rounded-full bg-surface-100 border-r border-surface-300"></div>
          <div class="w-full border-t-2 border-dashed border-surface-300"></div>
          <div class="absolute -right-4 w-8 h-8 rounded-full bg-surface-100 border-l border-surface-300"></div>
        </div>

        <!-- Ticket Bottom Action Footer -->
        <div class="p-6 sm:p-10 bg-surface-50 flex flex-wrap items-center justify-between gap-4">
          <!-- Calendar Dropdown / Export -->
          <div class="relative">
            <div class="flex items-center gap-2">
              <!-- Add to Google Calendar -->
              <a
                :href="getGoogleCalendarUrl()"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-navy-900 hover:bg-navy-800 text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-soft active:scale-95 transition-all"
              >
                <svg class="w-4 h-4 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"/>
                </svg>
                <span>Add to Calendar</span>
              </a>

              <!-- ICS Download Button -->
              <button
                type="button"
                class="p-3 rounded-full bg-white hover:bg-surface-200 text-navy-900 border border-surface-300 shadow-soft-sm active:scale-95 transition-all"
                title="Download .ics file for Apple Calendar / Outlook"
                @click="handleIcsDownload"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                </svg>
              </button>
            </div>
          </div>

          <!-- Get Directions Button -->
          <div class="flex items-center gap-3">
            <a
              :href="eventConfig.venue.mapLink"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-surface-100 text-navy-900 font-black text-xs sm:text-sm uppercase tracking-wider border border-surface-300 shadow-soft-sm active:scale-95 transition-all"
            >
              <svg class="w-4 h-4 text-coral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              <span>Get Directions</span>
            </a>

            <!-- RSVP Quick Messenger Link -->
            <a
              :href="eventConfig.contact.messengerUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent-500 hover:bg-accent-600 text-navy-950 font-black text-xs sm:text-sm uppercase tracking-wider shadow-soft hover:shadow-glow-gold active:scale-95 transition-all"
            >
              <span>RSVP</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
