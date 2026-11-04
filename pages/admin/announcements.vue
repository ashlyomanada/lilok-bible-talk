<script setup lang="ts">
import { ref, watch } from 'vue'
import { useToast } from '~/composables/useToast'
import { useUnsavedChanges } from '~/composables/useUnsavedChanges'

definePageMeta({
  layout: 'admin',
  middleware: 'admin-auth'
})

const { showToast } = useToast()
const { isDirty, markDirty, markClean } = useUnsavedChanges()

const { data: res, refresh } = await useAsyncData('admin-announcement', () => $fetch('/api/admin/announcements'))

const form = ref({
  id: res.value?.data?.id || 'announcement-1',
  message: res.value?.data?.message || 'Special gathering this Thursday! Invite your friends and join us for fellowship.',
  link_url: res.value?.data?.link_url || 'https://m.me/manilaicc',
  link_text: res.value?.data?.link_text || 'Message Us on Messenger',
  start_date: res.value?.data?.start_date || '',
  end_date: res.value?.data?.end_date || '',
  is_active: res.value?.data?.is_active ?? false
})

watch(form, () => markDirty(), { deep: true })

const isSaving = ref(false)

const handleSave = async () => {
  if (!form.value.message.trim()) {
    showToast('Banner message is required.', 'error')
    return
  }

  isSaving.value = true
  try {
    await $fetch('/api/admin/announcements', {
      method: 'PUT',
      body: {
        ...form.value,
        link_url: form.value.link_url?.trim() || null,
        link_text: form.value.link_text?.trim() || null,
        start_date: form.value.start_date || null,
        end_date: form.value.end_date || null
      }
    })

    await $fetch('/api/revalidate', { method: 'POST' }).catch(() => {})
    markClean()
    showToast('Announcement banner saved successfully!', 'success')
    await refresh()
  } catch (err: any) {
    showToast(err?.statusMessage || 'Failed to save announcement.', 'error')
  } finally {
    isSaving.value = false
  }
}
</script>

<template>
  <div class="space-y-8 text-left max-w-4xl">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
      <div>
        <h1 class="font-sans font-black text-2xl sm:text-3xl uppercase tracking-tight text-white">
          Announcement Banner
        </h1>
        <p class="text-xs sm:text-sm text-surface-300">
          Display a prominent alert bar pinned at the very top of the website for urgent notices, special venues, or holiday schedule changes.
        </p>
      </div>

      <div class="flex items-center gap-3">
        <button
          type="button"
          class="px-5 py-2.5 rounded-xl font-sans font-black text-xs uppercase tracking-wider bg-accent-500 hover:bg-accent-400 text-navy-950 shadow-lg shadow-accent-500/20 transition-all flex items-center gap-2 disabled:opacity-50"
          :disabled="isSaving"
          @click="handleSave"
        >
          <svg v-if="isSaving" class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
          </svg>
          <span v-if="isSaving">Saving...</span>
          <span v-else>Save Banner</span>
        </button>
      </div>
    </div>

    <!-- Live Preview Strip -->
    <div class="space-y-2">
      <div class="flex items-center justify-between">
        <span class="text-xs font-black uppercase tracking-wider text-accent-400">
          Live Top-Bar Preview
        </span>
        <span
          class="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded"
          :class="form.is_active ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-surface-800 text-surface-400 border border-white/10'"
        >
          {{ form.is_active ? 'Status: Active on Site' : 'Status: Inactive (Hidden)' }}
        </span>
      </div>

      <div class="rounded-2xl border border-white/15 overflow-hidden shadow-xl bg-navy-950">
        <div
          v-if="form.is_active"
          class="bg-gradient-to-r from-accent-600 via-accent-500 to-amber-500 text-navy-950 font-bold px-4 py-2.5 text-xs sm:text-sm text-center flex items-center justify-center gap-2 flex-wrap"
        >
          <span class="inline-block px-2 py-0.5 rounded-full bg-navy-950 text-accent-400 font-black text-[10px] uppercase tracking-wider">
            Notice
          </span>
          <span>{{ form.message || 'No announcement message entered yet.' }}</span>
          <span
            v-if="form.link_url"
            class="underline font-black inline-flex items-center gap-1 ml-1 cursor-pointer"
          >
            <span>{{ form.link_text || 'Learn more' }}</span>
            <span>→</span>
          </span>
        </div>
        <div v-else class="p-6 text-center text-surface-400 text-xs italic">
          Banner is currently inactive. Turn on the switch below to display this bar at the top of the public landing page.
        </div>
      </div>
    </div>

    <!-- Editor Form -->
    <div class="bg-navy-900/60 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
      <!-- Active Switch -->
      <div class="flex items-center justify-between pb-6 border-b border-white/10">
        <div>
          <h3 class="font-sans font-bold text-sm text-white">Enable Announcement Bar</h3>
          <p class="text-xs text-surface-300">When enabled, this notice is rendered above the primary navigation bar.</p>
        </div>
        <label class="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" v-model="form.is_active" class="sr-only peer">
          <div class="w-12 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-500"></div>
        </label>
      </div>

      <!-- Message Text -->
      <div>
        <label class="block text-xs font-black uppercase tracking-wider text-surface-300 mb-2">
          Announcement Message <span class="text-red-400">*</span>
        </label>
        <textarea
          v-model="form.message"
          rows="3"
          maxlength="250"
          placeholder="e.g. Venue change this week! We are meeting at the 2nd Floor Community Room."
          class="w-full bg-navy-950 border border-white/10 rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:border-accent-500 transition-colors"
        ></textarea>
        <div class="flex justify-between text-[11px] text-surface-400 mt-1">
          <span>Keep it concise (1-2 sentences) so it reads clearly on mobile devices.</span>
          <span>{{ form.message.length }} / 250</span>
        </div>
      </div>

      <!-- Optional Link -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label class="block text-xs font-black uppercase tracking-wider text-surface-300 mb-2">
            Action Button Label
          </label>
          <input
            v-model="form.link_text"
            type="text"
            placeholder="e.g. Message Us on Messenger"
            class="w-full bg-navy-950 border border-white/10 rounded-2xl px-4 py-2.5 text-xs font-semibold text-white focus:outline-none focus:border-accent-500 transition-colors"
          />
        </div>

        <div>
          <label class="block text-xs font-black uppercase tracking-wider text-surface-300 mb-2">
            Action Destination URL
          </label>
          <input
            v-model="form.link_url"
            type="url"
            placeholder="e.g. https://m.me/manilaicc"
            class="w-full bg-navy-950 border border-white/10 rounded-2xl px-4 py-2.5 text-xs font-semibold text-white focus:outline-none focus:border-accent-500 transition-colors"
          />
        </div>
      </div>

      <!-- Optional Schedule Dates -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/10">
        <div>
          <label class="block text-xs font-black uppercase tracking-wider text-surface-300 mb-2">
            Schedule Start (Optional)
          </label>
          <input
            v-model="form.start_date"
            type="datetime-local"
            class="w-full bg-navy-950 border border-white/10 rounded-2xl px-4 py-2.5 text-xs font-semibold text-white focus:outline-none focus:border-accent-500 transition-colors"
          />
          <p class="text-[10px] text-surface-400 mt-1">Leave empty to activate immediately when enabled.</p>
        </div>

        <div>
          <label class="block text-xs font-black uppercase tracking-wider text-surface-300 mb-2">
            Schedule Expiration (Optional)
          </label>
          <input
            v-model="form.end_date"
            type="datetime-local"
            class="w-full bg-navy-950 border border-white/10 rounded-2xl px-4 py-2.5 text-xs font-semibold text-white focus:outline-none focus:border-accent-500 transition-colors"
          />
          <p class="text-[10px] text-surface-400 mt-1">Leave empty to keep showing until manually disabled.</p>
        </div>
      </div>
    </div>
  </div>
</template>

