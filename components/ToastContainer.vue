<script setup lang="ts">
import { useToast } from '~/composables/useToast'

const { toasts, removeToast } = useToast()
</script>

<template>
  <div class="fixed bottom-6 right-4 sm:right-6 z-50 flex flex-col gap-2 max-w-sm pointer-events-none" aria-live="polite">
    <TransitionGroup
      enter-active-class="transform transition ease-out duration-300"
      enter-from-class="translate-y-4 opacity-0 scale-95"
      enter-to-class="translate-y-0 opacity-100 scale-100"
      leave-active-class="transition ease-in duration-200"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="pointer-events-auto flex items-center justify-between gap-3 px-4 py-3 rounded-2xl shadow-warm-lg border text-sm font-medium backdrop-blur-md"
        :class="[
          toast.type === 'success'
            ? 'bg-amberGold-50/95 border-amberGold-300 text-warmStone-800'
            : toast.type === 'warning'
            ? 'bg-amber-50/95 border-amber-300 text-amber-900'
            : 'bg-white/95 border-warmStone-200 text-warmStone-800'
        ]"
      >
        <div class="flex items-center gap-2.5">
          <span v-if="toast.type === 'success'" class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span v-else class="w-2 h-2 rounded-full bg-amberGold-500 animate-pulse"></span>
          <span>{{ toast.text }}</span>
        </div>
        <button
          type="button"
          class="text-warmStone-400 hover:text-warmStone-600 p-1 rounded-lg transition-colors"
          aria-label="Dismiss toast"
          @click="removeToast(toast.id)"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
    </TransitionGroup>
  </div>
</template>
