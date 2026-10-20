<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { eventConfig } from '~/config/event'
import { useToast } from '~/composables/useToast'
import { getGoogleCalendarUrl, downloadIcsFile } from '~/utils/calendar'

const { showToast } = useToast()

// Client-side countdown timer
const days = ref(0)
const hours = ref(0)
const minutes = ref(0)
const seconds = ref(0)
const isPast = ref(false)
let timer: ReturnType<typeof setInterval> | null = null

const calculateCountdown = () => {
  const target = new Date(eventConfig.countdownTargetISO).getTime()
  const now = new Date().getTime()
  const diff = target - now

  if (diff <= 0) {
    isPast.value = true
    days.value = 0
    hours.value = 0
    minutes.value = 0
    seconds.value = 0
    return
  }

  isPast.value = false
  days.value = Math.floor(diff / (1000 * 60 * 60 * 24))
  hours.value = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  minutes.value = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  seconds.value = Math.floor((diff % (1000 * 60)) / 1000)
}

onMounted(() => {
  calculateCountdown()
  timer = setInterval(calculateCountdown, 1000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})

const scrollTo = (selector: string) => {
  const target = document.querySelector(selector)
  if (target) {
    target.scrollIntoView({ behavior: 'smooth' })
  }
}

// Share invitation trigger
const handleShare = async () => {
  const url = typeof window !== 'undefined' ? window.location.href.split('#')[0] : eventConfig.seo.canonicalUrl
  const shareData = {
    title: "You're invited to Lilok Bible Talk",
    text: `You're warmly invited to Lilok Bible Talk (${eventConfig.parentChurchName} Central Region) on ${eventConfig.formattedDateTime}. ${eventConfig.tagline} Follow ${eventConfig.instagramHandle}!`,
    url
  }

  if (typeof navigator !== 'undefined' && navigator.share) {
    try {
      await navigator.share(shareData)
      showToast('Invitation shared!', 'success')
      return
    } catch (e: any) {
      if (e.name === 'AbortError') return
    }
  }

  try {
    if (navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(url)
      showToast('Invitation link copied! Ready to send to friends.', 'success')
    } else {
      scrollTo('#share')
    }
  } catch (err) {
    scrollTo('#share')
  }
}

const showCalendarMenu = ref(false)
const handleIcs = () => {
  downloadIcsFile()
  showCalendarMenu.value = false
  showToast('Calendar event downloaded (.ics)', 'success')
}
</script>

<template>
  <section
    id="hero"
    class="relative min-h-screen flex items-center justify-center overflow-hidden pt-28 pb-20 sm:pt-32 sm:pb-28 bg-navy-950 text-white"
  >
    <!-- Background Image with Moody Cinematic Overlay -->
    <div class="absolute inset-0 z-0 select-none pointer-events-none">
      <img
        src="/images/hero.jpg"
        alt="Atmospheric warm sunrise representing hope and fellowship"
        class="w-full h-full object-cover object-center scale-105 opacity-35 filter brightness-75"
        loading="eager"
      />
      <!-- Gradient mesh overlays -->
      <div class="absolute inset-0 bg-gradient-to-b from-navy-950/90 via-navy-900/85 to-navy-950"></div>
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gold-500/15 via-coral-500/10 to-transparent"></div>
    </div>

    <!-- Floating animated glowing ambient orbs -->
    <div class="absolute top-1/4 left-1/12 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-gold-400/20 blur-3xl pointer-events-none animate-float-slow"></div>
    <div class="absolute bottom-1/4 right-1/12 w-80 sm:w-[28rem] h-80 sm:h-[28rem] rounded-full bg-coral-500/15 blur-3xl pointer-events-none animate-pulse-glow"></div>
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-96 bg-gold-300/10 blur-[100px] pointer-events-none rounded-full"></div>

    <!-- Main Container -->
    <div class="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 w-full">
      <!-- CENTERED INVITATION POSTER CARD -->
      <div
        class="relative rounded-3xl sm:rounded-[2.5rem] bg-navy-900/85 backdrop-blur-2xl border border-white/20 p-6 sm:p-10 md:p-12 shadow-card text-center overflow-hidden transition-all duration-300"
      >
        <!-- Subtle inner gold border accent -->
        <div class="absolute inset-0 rounded-3xl sm:rounded-[2.5rem] border border-gold-400/20 pointer-events-none"></div>

        <!-- Decorative corner accents -->
        <div class="absolute top-4 left-4 text-gold-400/40 text-xs font-serif hidden sm:block">✦</div>
        <div class="absolute top-4 right-4 text-gold-400/40 text-xs font-serif hidden sm:block">✦</div>
        <div class="absolute bottom-4 left-4 text-gold-400/40 text-xs font-serif hidden sm:block">✦</div>
        <div class="absolute bottom-4 right-4 text-gold-400/40 text-xs font-serif hidden sm:block">✦</div>

        <!-- Top Row: MICC Logo Mark + Badges -->
        <div class="flex flex-col items-center justify-center gap-3 mb-6 sm:mb-8">
          <!-- MICC Logo in soft pill container -->
          <div
            class="px-4 py-2 rounded-2xl bg-white/95 backdrop-blur-md shadow-warm-sm border border-white/90 flex items-center justify-center transition-transform hover:scale-105"
          >
            <img
              :src="eventConfig.logo"
              :alt="eventConfig.logoAlt"
              class="h-10 sm:h-12 w-auto object-contain"
              loading="eager"
            />
          </div>

          <!-- Supporting Parent Church Badges -->
          <div class="flex flex-wrap items-center justify-center gap-2 text-xs">
            <span
              class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-cream-100 font-medium tracking-wide shadow-xs"
            >
              <span class="w-2 h-2 rounded-full bg-coral-400 animate-ping"></span>
              <span>Save the Date</span>
            </span>

            <span
              class="inline-flex items-center px-3 py-1 rounded-full bg-gold-400/15 border border-gold-400/30 text-gold-200 font-semibold tracking-wide"
            >
              {{ eventConfig.parentChurchName }} • {{ eventConfig.parentRegion }}
            </span>

            <span
              class="hidden md:inline-flex items-center px-3 py-1 rounded-full bg-white/5 border border-white/15 text-cream-300 text-[11px]"
            >
              {{ eventConfig.soldOutBadge }}
            </span>
          </div>
        </div>

        <!-- Big "You're Invited" Script Accent Line -->
        <div class="mb-2">
          <span
            class="font-script text-4xl sm:text-5xl md:text-6xl text-gold-300 tracking-wide block drop-shadow-md transform -rotate-1 select-none"
          >
            You're Invited
          </span>
        </div>

        <!-- Main Brand Headline: Lilok Bible Talk -->
        <h1 class="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08] mb-3 drop-shadow-lg">
          {{ eventConfig.groupName }}
        </h1>

        <!-- Event Title / Theme -->
        <div class="inline-block mb-4">
          <p class="font-serif italic text-lg sm:text-2xl md:text-3xl text-coral-300 font-normal">
            "{{ eventConfig.eventTitle }}"
          </p>
        </div>

        <!-- Tagline & Friendly Welcoming Copy -->
        <div class="max-w-xl mx-auto mb-6 sm:mb-8 space-y-2">
          <p class="text-sm sm:text-base text-cream-200 font-light leading-relaxed">
            <span class="font-semibold text-white">{{ eventConfig.tagline }}</span> {{ eventConfig.oneLineWelcome }}
          </p>
          <p class="text-xs sm:text-sm text-gold-200/90 font-medium italic">
            ✦ {{ eventConfig.noPressureLine }}
          </p>
        </div>

        <!-- Reassurance Chips: Free, All are welcome, Bring a friend, Come as you are -->
        <div class="flex flex-wrap items-center justify-center gap-2 mb-8">
          <span
            v-for="(chip, idx) in eventConfig.reassuranceChips"
            :key="idx"
            class="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 hover:bg-white/15 border border-white/20 text-cream-100 backdrop-blur-sm transition-all"
          >
            ✓ {{ chip }}
          </span>
          <span class="px-3 py-1 rounded-full text-xs font-semibold bg-coral-500/20 border border-coral-400/40 text-coral-200">
            {{ eventConfig.hashtag }}
          </span>
        </div>

        <!-- Date & Venue Chips (Glassmorphic Poster Blocks) -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5 max-w-2xl mx-auto mb-8 text-left">
          <!-- Date & Time Chip -->
          <div
            class="p-4 rounded-2xl bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/20 transition-all flex items-start gap-3.5 group cursor-pointer"
            @click="scrollTo('#details')"
          >
            <div class="w-10 h-10 rounded-xl bg-gold-400/20 border border-gold-400/30 text-gold-300 flex items-center justify-center shrink-0">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
            </div>
            <div>
              <span class="text-[11px] font-bold uppercase tracking-wider text-gold-300 block">Date & Time</span>
              <span class="font-serif font-bold text-white text-base sm:text-lg block leading-snug">{{ eventConfig.date }}</span>
              <span class="text-xs text-cream-200">{{ eventConfig.time }} (Doors open {{ eventConfig.doorsOpenTime }})</span>
            </div>
          </div>

          <!-- Venue Chip -->
          <div
            class="p-4 rounded-2xl bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/20 transition-all flex items-start gap-3.5 group cursor-pointer"
            @click="scrollTo('#details')"
          >
            <div class="w-10 h-10 rounded-xl bg-coral-400/20 border border-coral-400/30 text-coral-300 flex items-center justify-center shrink-0">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
            </div>
            <div>
              <span class="text-[11px] font-bold uppercase tracking-wider text-coral-300 block">Location</span>
              <span class="font-serif font-bold text-white text-base sm:text-lg block leading-snug">{{ eventConfig.venue.name }}</span>
              <span class="text-xs text-cream-200 line-clamp-1">{{ eventConfig.venue.address }}</span>
            </div>
          </div>
        </div>

        <!-- Live Countdown Timer -->
        <div class="max-w-md mx-auto mb-8 p-3.5 sm:p-4 rounded-2xl bg-white/5 border border-white/15 backdrop-blur-md">
          <div class="flex items-center justify-center gap-1.5 text-xs font-semibold text-gold-300 mb-2.5">
            <svg class="w-3.5 h-3.5 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <span>{{ isPast ? 'Event Happening Soon / In Progress' : 'Counting Down to Fellowship' }}</span>
          </div>

          <div class="grid grid-cols-4 gap-2 sm:gap-3 text-center">
            <div class="p-2 sm:p-2.5 rounded-xl bg-navy-950/60 border border-white/10">
              <span class="block font-serif text-xl sm:text-2xl font-bold text-white">{{ days }}</span>
              <span class="block text-[10px] uppercase tracking-wider text-cream-300">Days</span>
            </div>
            <div class="p-2 sm:p-2.5 rounded-xl bg-navy-950/60 border border-white/10">
              <span class="block font-serif text-xl sm:text-2xl font-bold text-white">{{ hours }}</span>
              <span class="block text-[10px] uppercase tracking-wider text-cream-300">Hours</span>
            </div>
            <div class="p-2 sm:p-2.5 rounded-xl bg-navy-950/60 border border-white/10">
              <span class="block font-serif text-xl sm:text-2xl font-bold text-white">{{ minutes }}</span>
              <span class="block text-[10px] uppercase tracking-wider text-cream-300">Mins</span>
            </div>
            <div class="p-2 sm:p-2.5 rounded-xl bg-navy-950/60 border border-white/10">
              <span class="block font-serif text-xl sm:text-2xl font-bold text-gold-300">{{ seconds }}</span>
              <span class="block text-[10px] uppercase tracking-wider text-cream-300">Secs</span>
            </div>
          </div>
        </div>

        <!-- Primary Action Buttons: RSVP & Share -->
        <div class="flex flex-col sm:flex-row items-center justify-center gap-3.5 max-w-xl mx-auto mb-8">
          <!-- RSVP via Messenger Button -->
          <a
            :href="eventConfig.contact.messengerUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 hover:from-gold-500 hover:to-gold-700 text-navy-950 font-bold text-sm sm:text-base shadow-glow hover:shadow-warm-xl transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-gold-300/50"
          >
            <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12 2C6.477 2 2 6.145 2 11.258c0 2.91 1.455 5.517 3.735 7.199V22l3.418-1.875c.91.252 1.873.39 2.847.39 5.523 0 10-4.145 10-9.257C22 6.145 17.523 2 12 2zm1.002 12.443l-2.56-2.73-5.002 2.73 5.498-5.836 2.624 2.73 4.938-2.73-5.498 5.836z"/>
            </svg>
            <span>RSVP / Message Us</span>
          </a>

          <!-- Share Invitation Button -->
          <button
            type="button"
            class="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/25 text-white font-semibold text-sm sm:text-base transition-all transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-white/40"
            @click="handleShare"
          >
            <svg class="w-4 h-4 text-coral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/>
            </svg>
            <span>Share Invitation</span>
          </button>
        </div>

        <!-- Bottom of Card: Instagram handle & Parent Church Footer Note -->
        <div class="pt-6 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-cream-200">
          <!-- Instagram Handle with link -->
          <a
            :href="eventConfig.instagramUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 hover:text-white transition-colors group"
          >
            <span class="w-7 h-7 rounded-full bg-gradient-to-tr from-coral-500 to-gold-400 flex items-center justify-center text-white shrink-0 group-hover:scale-110 transition-transform">
              <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </span>
            <span>Follow <strong class="text-white underline">{{ eventConfig.instagramHandle }}</strong> for updates</span>
          </a>

          <!-- Region info -->
          <span class="text-cream-300/80">
            {{ eventConfig.parentChurchName }} • {{ eventConfig.parentRegion }}
          </span>
        </div>
      </div>

      <!-- Subtle down arrow indicator -->
      <div class="text-center mt-8">
        <button
          type="button"
          class="text-cream-300 hover:text-white transition-colors motion-safe:animate-bounce focus:outline-none focus:ring-2 focus:ring-white/40 rounded-full p-2"
          aria-label="Scroll to Welcome Section"
          @click="scrollTo('#welcome')"
        >
          <svg class="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
          </svg>
        </button>
      </div>
    </div>
  </section>
</template>
