<script setup lang="ts">
import { eventConfig } from '~/config/event'

const welcomePoints = [
  {
    title: 'Come As You Are',
    description: 'Wear whatever feels comfortable for you. No dress codes, no pretense.',
    icon: 'heart'
  },
  {
    title: 'Zero Pressure, Ever',
    description: 'Participate as much or as little as you like. You are always welcome to simply sit back and listen.',
    icon: 'smile'
  },
  {
    title: 'Genuine Friendship',
    description: 'More than a meeting — an authentic spiritual family doing life and faith together.',
    icon: 'sparkles'
  }
]
</script>

<template>
  <section id="about" class="py-20 sm:py-28 bg-surface-100 text-navy-900 relative overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <!-- Left Column: Editorial Content (7 cols) -->
        <div class="lg:col-span-7 flex flex-col text-left space-y-6">
          <!-- Soldout Movement Badge & Tag -->
          <div class="flex flex-wrap items-center gap-2.5">
            <span class="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-accent-700">
              <span class="w-5 h-0.5 bg-accent-500"></span>
              <span>About Lilok BT</span>
            </span>

            <span class="px-3.5 py-1 rounded-full text-xs font-bold bg-surface-200 border border-surface-300 text-navy-800 shadow-soft-sm">
              {{ eventConfig.soldOutBadge }}
            </span>
          </div>

          <!-- Large Editorial Headline -->
          <h2 class="font-sans font-black text-4xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-navy-900 leading-[1.05]">
            {{ eventConfig.tagline }}
            <span class="block text-accent-600 mt-1">You Have a Seat at Our Table.</span>
          </h2>

          <!-- Editorial Paragraphs -->
          <div class="space-y-4 text-base sm:text-lg text-navy-800/90 leading-relaxed font-normal">
            <p>
              Whether you’ve never opened a Bible before, haven't been to church in years, or are simply searching for purpose, connection, and answers in life: <strong class="font-extrabold text-navy-900">you are welcomed with open arms.</strong>
            </p>

            <!-- Church Identity Callout Card -->
            <div class="p-6 rounded-3xl bg-surface-50 border border-surface-300/80 shadow-soft-sm">
              <p class="font-medium text-navy-900 text-base leading-relaxed">
                "{{ eventConfig.aboutChurch }}"
              </p>
              <div class="mt-4 flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-surface-200 text-xs font-bold">
                <span class="text-navy-700 tracking-wide uppercase">{{ eventConfig.parentChurchName }} · {{ eventConfig.parentRegion }}</span>
                <span class="px-2.5 py-0.5 rounded-full bg-accent-500/15 text-accent-800 border border-accent-500/30 font-black">
                  {{ eventConfig.hashtag }}
                </span>
              </div>
            </div>

            <p class="text-navy-700 text-sm sm:text-base">
              Life in Metro Manila can feel fast-paced and overwhelming. Our Bible Talk gatherings are a safe, uplifting breath of fresh air — a space for real talk, thoughtful scripture insights, and true lifelong friends who stand with you.
            </p>
          </div>

          <!-- 3 Rounded Feature Pills / Cards -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div
              v-for="(point, idx) in welcomePoints"
              :key="idx"
              class="p-5 rounded-3xl bg-white border border-surface-300/70 shadow-soft-sm hover:shadow-soft transition-all duration-300"
            >
              <div class="w-10 h-10 rounded-2xl bg-accent-100 text-accent-800 flex items-center justify-center mb-3">
                <svg v-if="point.icon === 'heart'" class="w-5 h-5 text-accent-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                </svg>
                <svg v-else-if="point.icon === 'sparkles'" class="w-5 h-5 text-accent-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
                </svg>
                <svg v-else class="w-5 h-5 text-accent-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h3 class="font-sans font-black text-navy-900 text-sm uppercase tracking-wide mb-1">{{ point.title }}</h3>
              <p class="text-xs text-navy-700 leading-relaxed font-normal">{{ point.description }}</p>
            </div>
          </div>
        </div>

        <!-- Right Column: Tall Rounded Photography (5 cols) -->
        <div class="lg:col-span-5">
          <div class="relative group">
            <div class="relative rounded-4xl sm:rounded-5xl overflow-hidden shadow-soft-xl border-4 border-white bg-surface-200">
              <img
                src="/images/welcome.jpg"
                alt="Lilok Bible Talk community gathering"
                class="w-full h-[460px] sm:h-[540px] object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />

              <!-- Floating Modern Overlay Badge -->
              <div class="absolute bottom-5 inset-x-5 p-4 rounded-3xl bg-navy-900/90 backdrop-blur-xl border border-white/15 text-white shadow-soft">
                <div class="flex items-center gap-3.5">
                  <div class="w-10 h-10 rounded-2xl bg-accent-500 text-navy-950 flex items-center justify-center font-black text-base shrink-0 shadow-soft-sm">
                    ✦
                  </div>
                  <div>
                    <p class="text-xs font-black uppercase tracking-wider text-white">"Welcome to the Family"</p>
                    <p class="text-[11px] text-surface-300 font-medium">Lilok BT · Central Region Disciples</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
