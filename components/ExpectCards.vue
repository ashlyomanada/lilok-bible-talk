<script setup lang="ts">
import { eventConfig } from '~/config/event'

const bentoItems = [
  {
    id: 'come-as-you-are',
    title: 'Come As You Are',
    tagline: 'No dress codes, no expectations',
    description: 'Wear whatever you feel comfortable in. Whether it is casual t-shirts and jeans or work attire, you are welcomed warmly just the way you are.',
    icon: 'heart',
    badge: 'Everyone Welcome',
    span: 'col-span-1 md:col-span-2'
  },
  {
    id: 'free',
    title: '100% Free',
    tagline: 'Always our guest',
    description: 'No entrance fees, no hidden obligations, and no financial collections or tithes requested from our guests. Ever.',
    icon: 'sparkles',
    badge: 'Zero Cost',
    span: 'col-span-1'
  },
  {
    id: 'bring-friend',
    title: 'Bring a Friend',
    tagline: 'Faith is better together',
    description: 'Invite your friends, campus classmates, colleagues, or family. The more, the merrier at our table!',
    icon: 'users',
    badge: 'Plus Ones Encouraged',
    span: 'col-span-1'
  },
  {
    id: 'food-fellowship',
    title: 'Food & Fellowship',
    tagline: 'Great food, great people',
    description: 'Enjoy delicious refreshments, light snacks, coffee, and plenty of laughs and genuine conversation after our discussion.',
    icon: 'coffee',
    badge: 'Complimentary Treats',
    span: 'col-span-1 md:col-span-2'
  },
  {
    id: 'uplifting-message',
    title: 'Uplifting Message',
    tagline: 'Real answers for real life',
    description: 'A practical, encouraging look at God’s Word tailored for everyday struggles, healing, purpose, and peace.',
    icon: 'book',
    badge: 'Practical Scripture',
    span: 'col-span-1'
  },
  {
    id: 'open-discussion',
    title: 'Open Bible Discussion',
    tagline: 'Ask questions freely',
    description: 'A relaxed circle where curiosities, questions, and personal thoughts are valued and respectfully explored.',
    icon: 'chat',
    badge: 'Interactive',
    span: 'col-span-1'
  }
]
</script>

<template>
  <section id="expect" class="py-20 sm:py-28 bg-navy-900 text-white relative overflow-hidden border-t border-white/10">
    <!-- Ambient subtle background glow -->
    <div class="absolute top-1/4 -right-28 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl pointer-events-none"></div>
    <div class="absolute bottom-1/4 -left-28 w-96 h-96 bg-coral-500/10 rounded-full blur-3xl pointer-events-none"></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <!-- Section Header -->
      <div class="text-center max-w-2xl mx-auto mb-14 sm:mb-18">
        <div class="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-accent-400 mb-3">
          <span class="w-5 h-0.5 bg-accent-500"></span>
          <span>A Glimpse Into the Evening</span>
          <span class="w-5 h-0.5 bg-accent-500"></span>
        </div>
        <h2 class="font-sans font-black text-4xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-white mb-4">
          What to Expect
        </h2>
        <p class="text-surface-300 text-base sm:text-lg font-normal leading-relaxed">
          No awkward surprises or speeches. Here is what you can look forward to at Lilok Bible Talk:
        </p>
      </div>

      <!-- Bento-style Grid in Navy & Gray Tones -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
        <div
          v-for="item in bentoItems"
          :key="item.id"
          class="group relative rounded-3xl p-7 sm:p-8 bg-navy-850/80 hover:bg-navy-800 border border-white/10 hover:border-accent-500/40 shadow-soft transition-all duration-300 flex flex-col justify-between"
          :class="item.span"
        >
          <div>
            <!-- Top Icon & Badge -->
            <div class="flex items-center justify-between mb-6">
              <div class="w-12 h-12 rounded-2xl bg-white/10 text-accent-400 group-hover:bg-accent-500 group-hover:text-navy-950 flex items-center justify-center transition-all duration-300 shadow-soft-sm">
                <!-- Heart -->
                <svg v-if="item.icon === 'heart'" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                </svg>
                <!-- Sparkles -->
                <svg v-else-if="item.icon === 'sparkles'" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
                </svg>
                <!-- Users -->
                <svg v-else-if="item.icon === 'users'" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
                </svg>
                <!-- Coffee -->
                <svg v-else-if="item.icon === 'coffee'" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8zM6 1v3M10 1v3M14 1v3"/>
                </svg>
                <!-- Book -->
                <svg v-else-if="item.icon === 'book'" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                </svg>
                <!-- Chat -->
                <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                </svg>
              </div>

              <span class="px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-white/10 text-surface-200 border border-white/15">
                {{ item.badge }}
              </span>
            </div>

            <!-- Content -->
            <p class="text-xs font-black uppercase tracking-wider text-accent-400 mb-1">
              {{ item.tagline }}
            </p>
            <h3 class="font-sans font-black text-2xl sm:text-3xl uppercase tracking-tight text-white mb-3 group-hover:text-accent-300 transition-colors">
              {{ item.title }}
            </h3>
            <p class="text-surface-300 text-sm sm:text-base leading-relaxed font-normal">
              {{ item.description }}
            </p>
          </div>

          <div class="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-black uppercase tracking-widest text-surface-400 group-hover:text-accent-400 transition-colors">
            <span>{{ eventConfig.groupName }}</span>
            <span class="transform group-hover:translate-x-1 transition-transform">→</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
