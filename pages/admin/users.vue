<script setup lang="ts">
import { ref } from 'vue'
import { useToast } from '~/composables/useToast'
import { useAdminAuth } from '~/composables/useAdminAuth'

definePageMeta({
  layout: 'admin',
  middleware: 'admin-auth'
})

const { showToast } = useToast()
const { adminUser } = useAdminAuth()

const { data: usersRes, refresh } = await useAsyncData('admin-users', () => $fetch('/api/admin/users'))

const users = computed(() => usersRes.value?.users || [])

const isCreating = ref(false)
const showCreateModal = ref(false)

const newForm = ref({
  email: '',
  password: '',
  full_name: '',
  role: 'admin'
})

const handleCreateUser = async () => {
  if (!newForm.value.email || !newForm.value.password) {
    showToast('Email and password are required.', 'error')
    return
  }

  if (newForm.value.password.length < 8) {
    showToast('Password must be at least 8 characters.', 'error')
    return
  }

  isCreating.value = true
  try {
    await $fetch('/api/admin/users', {
      method: 'POST',
      body: newForm.value
    })

    showToast(`User ${newForm.value.email} created successfully!`, 'success')
    newForm.value = { email: '', password: '', full_name: '', role: 'admin' }
    showCreateModal.value = false
    await refresh()
  } catch (err: any) {
    showToast(err?.statusMessage || 'Failed to provision admin user.', 'error')
  } finally {
    isCreating.value = false
  }
}
</script>

<template>
  <div class="space-y-8 text-left max-w-4xl">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
      <div>
        <h1 class="font-sans font-black text-2xl sm:text-3xl uppercase tracking-tight text-white">
          Admin Users & Roles
        </h1>
        <p class="text-xs sm:text-sm text-surface-300">
          Manage administrator profiles who have permissions to edit content, upload photos, and modify site configuration.
        </p>
      </div>

      <div class="flex items-center gap-3">
        <button
          type="button"
          class="px-5 py-2.5 rounded-xl font-sans font-black text-xs uppercase tracking-wider bg-accent-500 hover:bg-accent-400 text-navy-950 shadow-lg shadow-accent-500/20 transition-all flex items-center gap-2"
          @click="showCreateModal = true"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"/>
          </svg>
          <span>Add Admin User</span>
        </button>
      </div>
    </div>

    <!-- Security Note Alert -->
    <div class="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
      <svg class="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
      </svg>
      <div class="text-xs text-amber-200/90 leading-relaxed">
        <strong class="font-bold text-amber-300">Row Level Security Notice:</strong>
        Only users in the <code class="bg-navy-950 px-1.5 py-0.5 rounded text-amber-300 font-mono text-[11px]">profiles</code> table with <code class="bg-navy-950 px-1.5 py-0.5 rounded text-amber-300 font-mono text-[11px]">role = 'admin'</code> are granted write access to PostgreSQL tables and storage buckets. Public visitors are restricted to read-only access on published rows.
      </div>
    </div>

    <!-- Users Table -->
    <div class="bg-navy-900/60 border border-white/10 rounded-3xl overflow-hidden shadow-xl">
      <div class="px-6 py-4 border-b border-white/10 flex items-center justify-between">
        <h2 class="text-xs font-black uppercase tracking-wider text-accent-400">
          Authorized Accounts ({{ users.length }})
        </h2>
      </div>

      <div class="divide-y divide-white/5">
        <div
          v-for="u in users"
          :key="u.id"
          class="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors"
        >
          <div class="flex items-center gap-3.5">
            <div class="w-10 h-10 rounded-full bg-accent-500/20 border border-accent-500/30 flex items-center justify-center font-black text-accent-400 uppercase text-sm">
              {{ (u.full_name || u.email || 'A')[0] }}
            </div>
            <div>
              <div class="flex items-center gap-2">
                <span class="font-bold text-sm text-white">{{ u.full_name || u.email }}</span>
                <span
                  v-if="adminUser?.email === u.email"
                  class="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-accent-500/20 text-accent-400 border border-accent-500/30"
                >
                  You
                </span>
              </div>
              <span class="text-xs text-surface-400">{{ u.email }}</span>
            </div>
          </div>

          <div class="flex items-center gap-4">
            <span class="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-navy-950 border border-white/15 text-surface-200">
              {{ u.role || 'Admin' }}
            </span>
            <span class="text-[11px] text-surface-400">
              {{ u.created_at ? new Date(u.created_at).toLocaleDateString() : 'Active' }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Create User Modal -->
    <div
      v-if="showCreateModal"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-sm"
    >
      <div class="bg-navy-900 border border-white/20 rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 shadow-2xl relative">
        <div class="flex items-center justify-between pb-4 border-b border-white/10">
          <h3 class="font-sans font-black text-lg uppercase tracking-tight text-white">
            Provision Administrator
          </h3>
          <button
            type="button"
            class="text-surface-400 hover:text-white p-1 rounded-lg"
            @click="showCreateModal = false"
          >
            ✕
          </button>
        </div>

        <form @submit.prevent="handleCreateUser" class="space-y-4">
          <div>
            <label class="block text-xs font-black uppercase tracking-wider text-surface-300 mb-1.5">
              Full Name
            </label>
            <input
              v-model="newForm.full_name"
              type="text"
              required
              placeholder="e.g. John Doe"
              class="w-full bg-navy-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-accent-500"
            />
          </div>

          <div>
            <label class="block text-xs font-black uppercase tracking-wider text-surface-300 mb-1.5">
              Email Address <span class="text-red-400">*</span>
            </label>
            <input
              v-model="newForm.email"
              type="email"
              required
              placeholder="name@micc.church"
              class="w-full bg-navy-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-accent-500"
            />
          </div>

          <div>
            <label class="block text-xs font-black uppercase tracking-wider text-surface-300 mb-1.5">
              Password <span class="text-red-400">*</span>
            </label>
            <input
              v-model="newForm.password"
              type="password"
              required
              minlength="8"
              placeholder="Min. 8 characters"
              class="w-full bg-navy-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-accent-500"
            />
          </div>

          <div>
            <label class="block text-xs font-black uppercase tracking-wider text-surface-300 mb-1.5">
              Assigned Role
            </label>
            <select
              v-model="newForm.role"
              class="w-full bg-navy-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-accent-500"
            >
              <option value="admin">Admin (Full write & publish privileges)</option>
              <option value="editor">Editor (Content update privileges)</option>
            </select>
          </div>

          <div class="pt-4 flex items-center justify-end gap-3 border-t border-white/10">
            <button
              type="button"
              class="px-4 py-2 rounded-xl text-xs font-bold text-surface-300 hover:text-white"
              @click="showCreateModal = false"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-5 py-2 rounded-xl font-sans font-black text-xs uppercase tracking-wider bg-accent-500 hover:bg-accent-400 text-navy-950 transition-all flex items-center gap-2 disabled:opacity-50"
              :disabled="isCreating"
            >
              <svg v-if="isCreating" class="animate-spin h-3.5 w-3.5" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
              </svg>
              <span>{{ isCreating ? 'Creating...' : 'Create Account' }}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

