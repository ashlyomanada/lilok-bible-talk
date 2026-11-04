<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'

const route = useRoute()
const progress = ref(0)
let frame = 0

const progressStyle = computed(() => ({
  transform: `scaleX(${progress.value / 100})`
}))

const updateProgress = () => {
  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight
  progress.value = scrollableHeight > 0
    ? Math.min(100, Math.max(0, (window.scrollY / scrollableHeight) * 100))
    : 0
}

const scheduleUpdate = () => {
  if (frame) cancelAnimationFrame(frame)
  frame = requestAnimationFrame(() => {
    frame = 0
    updateProgress()
  })
}

onMounted(() => {
  updateProgress()
  window.addEventListener('scroll', scheduleUpdate, { passive: true })
  window.addEventListener('resize', scheduleUpdate, { passive: true })
})

watch(() => route.fullPath, () => {
  progress.value = 0
  nextTick(scheduleUpdate)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', scheduleUpdate)
  window.removeEventListener('resize', scheduleUpdate)
  if (frame) cancelAnimationFrame(frame)
})
</script>

<template>
  <div
    class="pointer-events-none fixed inset-x-0 top-0 z-[9999] h-[3px] origin-left bg-gradient-to-r from-accent-500 via-amber-300 to-accent-500 shadow-[0_0_8px_rgba(245,158,11,0.55)] transition-transform duration-100 ease-out motion-reduce:transition-none"
    :style="progressStyle"
    role="progressbar"
    aria-label="Page scroll progress"
    aria-valuemin="0"
    aria-valuemax="100"
    :aria-valuenow="Math.round(progress)"
  />
</template>
