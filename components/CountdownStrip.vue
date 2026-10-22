<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { eventConfig } from '~/config/event'

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
</script>

<template>
  <section id="countdown" class="bg-navy-950 border-y border-white/10 py-10 sm:py-14 relative overflow-hidden">
    <!-- Subtle ambient glow in background -->
    <div class="absolute inset-x-0 top-1/2 -translate-y-1/2 mx-auto w-96 h-28 bg-accent-500/10 blur-3xl pointer-events-none rounded-full"></div>

    <div class="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
      <div class="flex flex-col lg:flex-row items-center justify-between gap-8">
        <!-- Left: Status & Event info -->
        <div class="text-center lg:text-left space-y-1.5">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-accent-400 text-xs font-black tracking-widest uppercase">
            <span class="w-2 h-2 rounded-full bg-accent-500 animate-pulse"></span>
            <span>Upcoming Gathering</span>
          </div>
          <h3 class="font-sans font-black text-2xl sm:text-3xl text-white tracking-tight uppercase">
            {{ isPast ? 'Event In Progress' : 'Counting Down to Lilok BT' }}
          </h3>
          <p class="text-xs sm:text-sm text-surface-300 font-medium">
            {{ eventConfig.formattedDateTime }} · Central Region
          </p>
        </div>

        <!-- Right: Rounded Numerals Bento Row -->
        <div class="grid grid-cols-4 gap-3 sm:gap-4 md:gap-6 w-full max-w-lg">
          <!-- Days -->
          <div class="flex flex-col items-center justify-center p-3.5 sm:p-5 rounded-3xl bg-navy-900 border border-white/15 shadow-soft">
            <span class="font-sans font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-none">
              {{ String(days).padStart(2, '0') }}
            </span>
            <span class="text-[10px] sm:text-xs font-black text-surface-400 uppercase tracking-widest mt-1.5">
              Days
            </span>
          </div>

          <!-- Hours -->
          <div class="flex flex-col items-center justify-center p-3.5 sm:p-5 rounded-3xl bg-navy-900 border border-white/15 shadow-soft">
            <span class="font-sans font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-none">
              {{ String(hours).padStart(2, '0') }}
            </span>
            <span class="text-[10px] sm:text-xs font-black text-surface-400 uppercase tracking-widest mt-1.5">
              Hours
            </span>
          </div>

          <!-- Minutes -->
          <div class="flex flex-col items-center justify-center p-3.5 sm:p-5 rounded-3xl bg-navy-900 border border-white/15 shadow-soft">
            <span class="font-sans font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-none">
              {{ String(minutes).padStart(2, '0') }}
            </span>
            <span class="text-[10px] sm:text-xs font-black text-surface-400 uppercase tracking-widest mt-1.5">
              Mins
            </span>
          </div>

          <!-- Seconds -->
          <div class="flex flex-col items-center justify-center p-3.5 sm:p-5 rounded-3xl bg-navy-900 border border-accent-500/40 shadow-glow-gold/30">
            <span class="font-sans font-black text-3xl sm:text-4xl md:text-5xl text-accent-400 tracking-tight leading-none">
              {{ String(seconds).padStart(2, '0') }}
            </span>
            <span class="text-[10px] sm:text-xs font-black text-accent-300 uppercase tracking-widest mt-1.5">
              Secs
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
