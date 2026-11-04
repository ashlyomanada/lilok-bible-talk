<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useAdminAuth } from '~/composables/useAdminAuth'
import ToastContainer from '~/components/ToastContainer.vue'

useHead({
  titleTemplate: '%s · Lilok Admin',
  meta: [
    { name: 'robots', content: 'noindex, nofollow' }
  ]
})

const route = useRoute()
const { adminUser, logout } = useAdminAuth()
const isMobileMenuOpen = ref(false)

const navItems = [
  { label: 'Dashboard', to: '/admin', icon: 'layout-dashboard' },
  { label: 'Event & Schedule', to: '/admin/event', icon: 'calendar-clock' },
  { label: 'Sections', to: '/admin/sections', icon: 'layers' },
  { label: 'What to Expect', to: '/admin/expect-cards', icon: 'sparkles' },
  { label: 'Photo Gallery', to: '/admin/gallery', icon: 'image' },
  { label: 'Testimonies', to: '/admin/testimonies', icon: 'book-open' },
  { label: 'Sunday Worship', to: '/admin/sunday', icon: 'church' },
  { label: 'Scripture Highlight', to: '/admin/verse', icon: 'book-open' },
  { label: 'Contacts & Social', to: '/admin/contacts', icon: 'share-2' },
  { label: 'Announcements', to: '/admin/announcements', icon: 'megaphone' },
  { label: 'SEO & Settings', to: '/admin/settings', icon: 'settings' },
  { label: 'Admin Users', to: '/admin/users', icon: 'users' }
]

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

const previewSite = () => {
  if (typeof window !== 'undefined') {
    window.open('/', '_blank')
  }
}
</script>

<template>
  <div class="min-h-screen bg-navy-950 text-surface-100 flex flex-col antialiased font-sans">
    <!-- Top Mobile / Desktop Header -->
    <header class="h-16 bg-navy-900 border-b border-white/10 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-40">
      <div class="flex items-center gap-3">
        <!-- Mobile hamburger button -->
        <button
          type="button"
          class="lg:hidden p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white"
          aria-label="Toggle navigation"
          @click="toggleMobileMenu"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>

        <!-- Brand logo -->
        <NuxtLink to="/admin" class="flex items-center gap-2.5">
          <img src="/images/mnl-logo-white.png" alt="Lilok Logo" class="h-7 w-auto object-contain" />
          <div class="flex flex-col">
            <span class="font-sans font-black text-sm uppercase tracking-wider text-white">Lilok CMS</span>
            <span class="text-[10px] text-accent-400 font-bold uppercase tracking-widest -mt-0.5">Admin Console</span>
          </div>
        </NuxtLink>
      </div>

      <!-- Right Header Actions -->
      <div class="flex items-center gap-3">
        <!-- Preview Site Button -->
        <button
          type="button"
          class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 hover:bg-white/15 text-white border border-white/20 transition-all hover:border-accent-500/50"
          @click="previewSite"
        >
          <svg class="w-3.5 h-3.5 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
          </svg>
          <span class="hidden sm:inline">Preview Site</span>
          <span class="sm:hidden">Preview</span>
        </button>

        <!-- User profile badge & logout -->
        <div class="flex items-center gap-2.5 pl-2 border-l border-white/15">
          <div class="hidden md:flex flex-col text-right">
            <span class="text-xs font-bold text-white leading-tight truncate max-w-[140px]">
              {{ adminUser?.email || 'admin@micc.church' }}
            </span>
            <span class="text-[10px] font-black uppercase tracking-wider text-accent-400">
              Administrator
            </span>
          </div>

          <button
            type="button"
            class="p-2 rounded-xl bg-white/5 hover:bg-red-500/20 hover:text-red-400 text-surface-300 transition-colors"
            title="Log out"
            @click="logout"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
            </svg>
          </button>
        </div>
      </div>
    </header>

    <!-- Main Body: Sidebar + Page Container -->
    <div class="flex-grow flex">
      <!-- Desktop Sidebar -->
      <aside class="hidden lg:flex w-64 flex-col bg-navy-900 border-r border-white/10 shrink-0 select-none">
        <nav class="p-3 space-y-1">
          <NuxtLink
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            class="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all"
            :class="route.path === item.to
              ? 'bg-accent-500 text-navy-950 shadow-soft font-black'
              : 'text-surface-300 hover:text-white hover:bg-white/5'"
          >
            <!-- Dashboard Icon -->
            <svg v-if="item.icon === 'layout-dashboard'" class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
            </svg>
            <!-- Calendar Clock -->
            <svg v-else-if="item.icon === 'calendar-clock'" class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
            <!-- Layers -->
            <svg v-else-if="item.icon === 'layers'" class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
            </svg>
            <!-- Sparkles -->
            <svg v-else-if="item.icon === 'sparkles'" class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
            </svg>
            <!-- Image -->
            <svg v-else-if="item.icon === 'image'" class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
            <!-- Church -->
            <svg v-else-if="item.icon === 'church'" class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
            </svg>
            <!-- Book Open -->
            <svg v-else-if="item.icon === 'book-open'" class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
            </svg>
            <!-- Share 2 -->
            <svg v-else-if="item.icon === 'share-2'" class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/>
            </svg>
            <!-- Megaphone -->
            <svg v-else-if="item.icon === 'megaphone'" class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"/>
            </svg>
            <!-- Settings -->
            <svg v-else-if="item.icon === 'settings'" class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
            <!-- Users -->
            <svg v-else class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
            </svg>

            <span>{{ item.label }}</span>
          </NuxtLink>
        </nav>
      </aside>

      <!-- Mobile Slide-Over Menu -->
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="-translate-x-full"
        enter-to-class="translate-x-0"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="translate-x-0"
        leave-to-class="-translate-x-full"
      >
        <div
          v-if="isMobileMenuOpen"
          class="fixed inset-0 z-50 lg:hidden flex"
        >
          <!-- Backdrop -->
          <div class="fixed inset-0 bg-navy-950/80 backdrop-blur-sm" @click="closeMobileMenu"></div>

          <!-- Drawer Panel -->
          <div class="relative w-72 max-w-[80vw] bg-navy-900 border-r border-white/10 p-4 flex flex-col justify-between z-10">
            <div class="space-y-4">
              <div class="flex items-center justify-between pb-3 border-b border-white/10">
                <span class="font-sans font-black text-sm uppercase tracking-wider text-white">Menu</span>
                <button type="button" class="p-1.5 rounded-lg text-surface-400 hover:text-white" @click="closeMobileMenu">
                  ✕
                </button>
              </div>

              <nav class="space-y-1">
                <NuxtLink
                  v-for="item in navItems"
                  :key="item.to"
                  :to="item.to"
                  class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all"
                  :class="route.path === item.to ? 'bg-accent-500 text-navy-950 font-black' : 'text-surface-300 hover:text-white hover:bg-white/5'"
                  @click="closeMobileMenu"
                >
                  <span>{{ item.label }}</span>
                </NuxtLink>
              </nav>
            </div>

            <div class="pt-4 border-t border-white/10 flex items-center justify-between">
              <span class="text-xs text-surface-400 truncate">{{ adminUser?.email }}</span>
              <button type="button" class="text-xs font-bold text-red-400 hover:underline" @click="logout">
                Logout
              </button>
            </div>
          </div>
        </div>
      </Transition>

      <!-- Page Content View -->
      <main class="flex-grow p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
        <slot />
      </main>
    </div>
    <ToastContainer />
  </div>
</template>

