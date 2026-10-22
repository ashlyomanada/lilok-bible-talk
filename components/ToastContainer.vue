<script setup lang="ts">
import { useToast } from '~/composables/useToast'

const { toasts, removeToast } = useToast()
</script>

<template>
  <div class="fixed bottom-20 md:bottom-6 right-4 sm:right-6 z-50 flex flex-col gap-2 max-w-sm pointer-events-none" aria-live="polite">
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
        class="pointer-events-auto flex items-center justify-between gap-3 px-4 py-3 rounded-2xl shadow-soft-xl border text-sm font-semibold backdrop-blur-xl transition-all"
        :class="[
          toast.type === 'success'
            ? 'bg-navy-900/95 border-accent-500/40 text-white'
            : toast.type === 'warning'
            ? 'bg-coral-900/95 border-coral-500/40 text-white'
            : 'bg-navy-900/95 border-white/20 text-white'
        ]"
      >
        <div class="flex items-center gap-2.5">
          <span v-if="toast.type === 'success'" class="w-2 h-2 rounded-full bg-accent-400 animate-pulse"></span>
          <span v-else-if="toast.type === 'warning'" class="w-2 h-2 rounded-full bg-coral-400 animate-pulse"></span>
          <span v-else class="w-2 h-2 rounded-full bg-white animate-pulse"></span>
          <span>{{ toast.text }}</span>
        </div>
        <button
          type="button"
          class="text-surface-400 hover:text-white p-1 rounded-lg transition-colors ml-2"
          aria-label="Dismiss toast"
          @click="removeToast(toast.id)"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
    </TransitionGroup>
  </div>
</template>
