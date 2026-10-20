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
    description: 'Participate as much or as little as you like. You are welcome to simply sit back and listen.',
    icon: 'smile'
  },
  {
    title: 'Genuine Friendship',
    description: 'More than a meeting — we are an authentic family doing life and faith together.',
    icon: 'sparkles'
  }
]
</script>

<template>
  <section id="welcome" class="py-16 sm:py-24 bg-cream-50 relative overflow-hidden text-navy-950">
    <!-- Ambient glowing graphics -->
    <div class="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-gold-200/40 blur-3xl pointer-events-none"></div>
    <div class="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-coral-200/30 blur-3xl pointer-events-none"></div>

    <div class="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        <!-- Left Column: Friendly Text -->
        <div class="lg:col-span-7 flex flex-col text-left">
          <!-- Section Tag with Badges -->
          <div class="flex flex-wrap items-center gap-2 mb-4">
            <span class="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold-700">
              <span class="w-6 h-px bg-gold-500"></span>
              <span>A Warm Welcome</span>
            </span>

            <span class="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-white border border-gold-300 text-gold-800 shadow-xs">
              {{ eventConfig.soldOutBadge }}
            </span>
          </div>

          <!-- Main Heading -->
          <h2 class="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-navy-950 tracking-tight leading-[1.18] mb-4">
            {{ eventConfig.tagline }} <br class="hidden sm:inline" />
            <span class="font-serif italic font-normal text-gold-700">
              You Have a Seat at {{ eventConfig.groupName }}.
            </span>
          </h2>

          <!-- Approachable Copy -->
          <div class="space-y-4 text-navy-800/90 text-base sm:text-lg leading-relaxed">
            <p>
              Whether you’ve never picked up a Bible before, haven't been to church in years, or are simply searching for answers in life: <strong class="text-navy-950 font-semibold">you are welcomed with open arms.</strong>
            </p>
            <div class="p-4 sm:p-5 rounded-2xl bg-white/90 border border-cream-300 shadow-warm-sm">
              <p class="text-navy-900 font-medium text-sm sm:text-base leading-relaxed">
                "{{ eventConfig.aboutChurch }}"
              </p>
              <div class="mt-2.5 flex items-center justify-between text-xs text-navy-700">
                <span class="font-semibold text-gold-700">{{ eventConfig.parentChurchName }} • {{ eventConfig.parentRegion }}</span>
                <span class="text-coral-600 font-medium">{{ eventConfig.hashtag }}</span>
              </div>
            </div>
            <p class="text-navy-700 text-sm sm:text-base">
              Life can get noisy and overwhelming. Our Bible Talk gatherings are a cozy breath of fresh air — a safe place for genuine conversations, thoughtful scripture insights, and finding lifelong disciples who walk with you in love and truth.
            </p>
          </div>

          <!-- Feature Bullets -->
          <div class="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-cream-300">
            <div
              v-for="(point, idx) in welcomePoints"
              :key="idx"
              class="p-4 rounded-2xl bg-white border border-cream-200 shadow-warm-sm hover:shadow-warm transition-shadow"
            >
              <div class="w-8 h-8 rounded-xl bg-gold-100 flex items-center justify-center text-gold-700 mb-2.5">
                <svg v-if="point.icon === 'heart'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                </svg>
                <svg v-else-if="point.icon === 'sparkles'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
                </svg>
                <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h3 class="font-semibold text-navy-950 text-sm mb-1">{{ point.title }}</h3>
              <p class="text-xs text-navy-700 leading-relaxed">{{ point.description }}</p>
            </div>
          </div>
        </div>

        <!-- Right Column: Photography & Family Card -->
        <div class="lg:col-span-5">
          <div class="relative group">
            <!-- Decorative offset frame -->
            <div class="absolute -inset-3 bg-gradient-to-tr from-gold-300 via-coral-200 to-gold-100 rounded-3xl transform -rotate-1 group-hover:rotate-0 transition-transform duration-300 opacity-80"></div>

            <div class="relative rounded-2xl overflow-hidden shadow-warm-lg border border-white bg-white">
              <img
                src="/images/welcome.jpg"
                alt="Lilok Bible Talk fellowship and welcoming smiles"
                class="w-full h-[380px] sm:h-[440px] object-cover object-center transform transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />

              <!-- Floating Glass Badge -->
              <div class="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-white/95 backdrop-blur-md border border-white/80 shadow-warm text-left">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-full bg-gold-500 flex items-center justify-center text-white shrink-0 shadow-sm font-serif font-bold text-lg">
                    ✦
                  </div>
                  <div>
                    <p class="text-xs font-semibold text-navy-950">"Welcome to the family!"</p>
                    <p class="text-[11px] text-navy-600">Lilok Bible Talk • Central Region disciples</p>
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
