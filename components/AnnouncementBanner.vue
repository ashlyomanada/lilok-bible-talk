<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useSiteContent } from '~/composables/useSiteContent'

const { content } = useSiteContent()
const banner = ref<HTMLElement | null>(null)
let resizeObserver: ResizeObserver | undefined

const syncBannerHeight = () => {
  if (!banner.value) return
  document.documentElement.style.setProperty(
    '--announcement-height',
    `${banner.value.getBoundingClientRect().height}px`
  )
}

onMounted(() => {
  if (!banner.value) return
  syncBannerHeight()
  resizeObserver = new ResizeObserver(syncBannerHeight)
  resizeObserver.observe(banner.value)
})

onBeforeUnmount(() => {
  resizeObserver?.disconnect()
  document.documentElement.style.removeProperty('--announcement-height')
})
</script>

<template>
  <aside
    ref="banner"
    v-if="content.announcement"
    aria-label="Important announcement"
    class="sticky top-0 min-h-10 bg-gradient-to-r from-accent-600 via-accent-500 to-amber-500 text-navy-950 font-bold px-4 py-2.5 text-xs sm:text-sm text-center z-50 shadow-md flex items-center justify-center gap-2"
  >
    <span class="inline-block px-2 py-0.5 rounded-full bg-navy-950 text-accent-400 font-black text-[10px] uppercase tracking-wider">
      Notice
    </span>
    <span>{{ content.announcement.message }}</span>
    <a
      v-if="content.announcement.linkUrl"
      :href="content.announcement.linkUrl"
      target="_blank"
      rel="noopener noreferrer"
      class="underline font-black hover:text-navy-800 transition-colors inline-flex items-center gap-1 ml-1"
    >
      <span>{{ content.announcement.linkText || 'Learn more' }}</span>
      <span>→</span>
    </a>
  </aside>
</template>

