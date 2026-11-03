<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAdminAuth } from '~/composables/useAdminAuth'
import { loginSchema } from '~/shared/schemas/site'

definePageMeta({
  layout: false
})

const route = useRoute()
const router = useRouter()
const { login } = useAdminAuth()

const email = ref('admin@micc.church')
const password = ref('')
const isLoading = ref(false)
const errorMessage = ref('')

const handleLogin = async (e?: Event) => {
  if (e) e.preventDefault()
  errorMessage.value = ''

  const validation = loginSchema.safeParse({ email: email.value, password: password.value })
  if (!validation.success) {
    errorMessage.value = validation.error.issues[0]?.message || 'Please fill in all fields'
    return
  }

  isLoading.value = true
  try {
    const res = await login(email.value, password.value)
    if (res.success) {
      const redirectPath = (route.query.redirect as string) || '/admin'
      router.push(redirectPath)
    } else {
      errorMessage.value = res.error || 'Invalid email or password'
    }
  } catch (err: any) {
    errorMessage.value = 'An unexpected error occurred during sign in.'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-navy-950 text-white flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden select-none">
    <!-- Ambient background glow -->
    <div class="absolute -top-32 -left-32 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl pointer-events-none"></div>
    <div class="absolute -bottom-32 -right-32 w-96 h-96 bg-coral-500/10 rounded-full blur-3xl pointer-events-none"></div>

    <div class="w-full max-w-md relative z-10">
      <!-- Brand Header -->
      <div class="text-center mb-8 space-y-3">
        <NuxtLink to="/" class="inline-flex items-center gap-3 justify-center mb-2">
          <img src="/images/mnl-logo-white.png" alt="Lilok Logo" class="h-12 w-auto object-contain" />
        </NuxtLink>
        <h1 class="font-sans font-black text-3xl uppercase tracking-tight text-white">
          Admin Portal
        </h1>
        <p class="text-surface-300 text-xs sm:text-sm font-medium">
          Sign in to manage Lilok Bible Talk content & schedule
        </p>
      </div>

      <!-- Login Card -->
      <div class="bg-navy-900 border border-white/15 rounded-3xl p-6 sm:p-8 shadow-soft-xl space-y-6">
        <!-- Error Alert -->
        <div
          v-if="errorMessage"
          class="p-4 rounded-2xl bg-red-500/15 border border-red-500/30 text-red-300 text-xs font-semibold flex items-start gap-2.5"
          role="alert"
        >
          <span class="text-red-400 font-bold shrink-0">✕</span>
          <span>{{ errorMessage }}</span>
        </div>

        <form class="space-y-5" @submit.prevent="handleLogin">
          <!-- Email Field -->
          <div class="space-y-1.5 text-left">
            <label for="admin-email" class="block text-xs font-black uppercase tracking-wider text-surface-200">
              Email Address
            </label>
            <input
              id="admin-email"
              v-model="email"
              type="email"
              required
              autocomplete="email"
              placeholder="admin@micc.church"
              class="w-full px-4 py-3 rounded-2xl bg-navy-950/80 border border-white/15 text-white text-sm placeholder-surface-500 focus:outline-none focus:border-accent-500 focus:ring-1 focus:ring-accent-500 transition-colors"
            />
          </div>

          <!-- Password Field -->
          <div class="space-y-1.5 text-left">
            <div class="flex items-center justify-between">
              <label for="admin-password" class="block text-xs font-black uppercase tracking-wider text-surface-200">
                Password
              </label>
            </div>
            <input
              id="admin-password"
              v-model="password"
              type="password"
              required
              autocomplete="current-password"
              placeholder="••••••••"
              class="w-full px-4 py-3 rounded-2xl bg-navy-950/80 border border-white/15 text-white text-sm placeholder-surface-500 focus:outline-none focus:border-accent-500 focus:ring-1 focus:ring-accent-500 transition-colors"
            />
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="isLoading"
            class="w-full py-3.5 px-6 rounded-2xl bg-accent-500 hover:bg-accent-600 disabled:opacity-50 text-navy-950 font-black text-xs sm:text-sm uppercase tracking-wider shadow-soft hover:shadow-glow-gold active:scale-[0.99] transition-all flex items-center justify-center gap-2"
          >
            <svg
              v-if="isLoading"
              class="animate-spin h-4 w-4 text-navy-950"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>{{ isLoading ? 'Verifying Credentials...' : 'Sign In to Dashboard' }}</span>
          </button>
        </form>

        <div class="pt-4 border-t border-white/10 text-center text-xs text-surface-400">
          <NuxtLink to="/" class="hover:text-accent-400 transition-colors inline-flex items-center gap-1">
            <span>← Return to Public Website</span>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

