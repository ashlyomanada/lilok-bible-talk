<script setup lang="ts">
import { useSiteContent } from '~/composables/useSiteContent'

const { content } = useSiteContent()
</script>

<template>
  <aside
    v-if="content.announcement"
    aria-label="Important announcement"
    class="bg-gradient-to-r from-accent-600 via-accent-500 to-amber-500 text-navy-950 font-bold px-4 py-2.5 text-xs sm:text-sm text-center relative z-50 shadow-md flex items-center justify-center gap-2"
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

