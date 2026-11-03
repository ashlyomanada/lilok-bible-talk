<script setup lang="ts">
import { ref, watch } from 'vue'
import { contactsSocialSchema } from '~/shared/schemas/site'
import { useToast } from '~/composables/useToast'
import { useUnsavedChanges } from '~/composables/useUnsavedChanges'

definePageMeta({
  layout: 'admin',
  middleware: 'admin-auth'
})

const { showToast } = useToast()
const { isDirty, markDirty, markClean } = useUnsavedChanges()

const { data: contactsRes, refresh } = await useAsyncData('admin-contacts-data', () => $fetch('/api/admin/contacts'))

const form = ref({
  messenger_url: contactsRes.value?.data?.messenger_url || '',
  facebook_url: contactsRes.value?.data?.facebook_url || '',
  facebook_page_name: contactsRes.value?.data?.facebook_page_name || '',
  instagram_url: contactsRes.value?.data?.instagram_url || '',
  instagram_handle: contactsRes.value?.data?.instagram_handle || '',
  micc_instagram_url: contactsRes.value?.data?.micc_instagram_url || '',
  micc_instagram_handle: contactsRes.value?.data?.micc_instagram_handle || '',
  youtube_url: contactsRes.value?.data?.youtube_url || '',
  youtube_handle: contactsRes.value?.data?.youtube_handle || '',
  email: contactsRes.value?.data?.email || '',
  phone: contactsRes.value?.data?.phone || '',
  display_phone: contactsRes.value?.data?.display_phone || '',
  connect_copy: contactsRes.value?.data?.connect_copy || ''
})

watch(form, () => markDirty(), { deep: true })

const isSaving = ref(false)
const errors = ref<Record<string, string>>({})

const handleSave = async () => {
  errors.value = {}
  const validation = contactsSocialSchema.safeParse(form.value)
  if (!validation.success) {
    for (const issue of validation.error.issues) {
      const field = issue.path[0] as string
      errors.value[field] = issue.message
    }
    showToast('Please fix the highlighted errors.', 'warning')
    return
  }

  isSaving.value = true
  try {
    await $fetch('/api/admin/contacts', {
      method: 'PUT',
      body: form.value
    })

    await $fetch('/api/revalidate', { method: 'POST' }).catch(() => {})
    markClean()
    showToast('Contacts and social channels saved!', 'success')
    await refresh()
  } catch (err: any) {
    showToast(err?.statusMessage || 'Failed to save contacts.', 'error')
  } finally {
    isSaving.value = false
  }
}
</script>

<template>
  <div class="space-y-8 text-left max-w-5xl">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
      <div>
        <h1 class="font-sans font-black text-2xl sm:text-3xl uppercase tracking-tight text-white">
          Contacts & Social Channels
        </h1>
        <p class="text-xs sm:text-sm text-surface-300">
          Edit direct chat links, social profiles, email, phone number, and connect copy.
        </p>
      </div>

      <div class="flex items-center gap-3">
        <span v-if="isDirty" class="text-xs text-amber-400 font-bold uppercase tracking-wider">
          ● Unsaved changes
        </span>

        <button
          type="button"
          :disabled="isSaving"
          class="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-accent-500 hover:bg-accent-600 disabled:opacity-50 text-navy-950 font-black text-xs uppercase tracking-wider shadow-soft hover:shadow-glow-gold transition-all"
          @click="handleSave"
        >
          <span>{{ isSaving ? 'Saving...' : 'Save Channels' }}</span>
        </button>
      </div>
    </div>

    <!-- 1. Direct Messaging & Socials -->
    <div class="p-6 sm:p-8 rounded-3xl bg-navy-900 border border-white/15 space-y-6">
      <div class="pb-4 border-b border-white/10">
        <h2 class="font-sans font-black text-lg uppercase tracking-tight text-white">
          1. Direct Messaging & Social Links
        </h2>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <!-- Messenger -->
        <div class="space-y-1.5 sm:col-span-2">
          <label class="block text-xs font-black uppercase tracking-wider text-surface-200">Messenger RSVP Link</label>
          <input
            v-model="form.messenger_url"
            type="url"
            class="w-full px-4 py-2.5 rounded-xl bg-navy-950 border border-white/15 text-white text-xs font-semibold focus:border-accent-500 focus:outline-none"
          />
          <p v-if="errors.messenger_url" class="text-xs text-red-400">{{ errors.messenger_url }}</p>
        </div>

        <!-- Lilok Instagram -->
        <div class="space-y-1.5">
          <label class="block text-xs font-black uppercase tracking-wider text-surface-200">Lilok Instagram Handle</label>
          <input
            v-model="form.instagram_handle"
            type="text"
            class="w-full px-4 py-2.5 rounded-xl bg-navy-950 border border-white/15 text-white text-xs font-semibold focus:border-accent-500 focus:outline-none"
          />
        </div>

        <div class="space-y-1.5">
          <label class="block text-xs font-black uppercase tracking-wider text-surface-200">Lilok Instagram URL</label>
          <input
            v-model="form.instagram_url"
            type="url"
            class="w-full px-4 py-2.5 rounded-xl bg-navy-950 border border-white/15 text-white text-xs font-semibold focus:border-accent-500 focus:outline-none"
          />
        </div>

        <!-- Facebook -->
        <div class="space-y-1.5">
          <label class="block text-xs font-black uppercase tracking-wider text-surface-200">Facebook Page Name</label>
          <input
            v-model="form.facebook_page_name"
            type="text"
            class="w-full px-4 py-2.5 rounded-xl bg-navy-950 border border-white/15 text-white text-xs font-semibold focus:border-accent-500 focus:outline-none"
          />
        </div>

        <div class="space-y-1.5">
          <label class="block text-xs font-black uppercase tracking-wider text-surface-200">Facebook URL</label>
          <input
            v-model="form.facebook_url"
            type="url"
            class="w-full px-4 py-2.5 rounded-xl bg-navy-950 border border-white/15 text-white text-xs font-semibold focus:border-accent-500 focus:outline-none"
          />
        </div>

        <!-- YouTube -->
        <div class="space-y-1.5">
          <label class="block text-xs font-black uppercase tracking-wider text-surface-200">YouTube Channel Handle</label>
          <input
            v-model="form.youtube_handle"
            type="text"
            class="w-full px-4 py-2.5 rounded-xl bg-navy-950 border border-white/15 text-white text-xs font-semibold focus:border-accent-500 focus:outline-none"
          />
        </div>

        <div class="space-y-1.5">
          <label class="block text-xs font-black uppercase tracking-wider text-surface-200">YouTube URL</label>
          <input
            v-model="form.youtube_url"
            type="url"
            class="w-full px-4 py-2.5 rounded-xl bg-navy-950 border border-white/15 text-white text-xs font-semibold focus:border-accent-500 focus:outline-none"
          />
        </div>
      </div>
    </div>

    <!-- 2. Phone, Email & Connect Section Copy -->
    <div class="p-6 sm:p-8 rounded-3xl bg-navy-900 border border-white/15 space-y-6">
      <div class="pb-4 border-b border-white/10">
        <h2 class="font-sans font-black text-lg uppercase tracking-tight text-white">
          2. Direct Phone, Email & Connect Copy
        </h2>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div class="space-y-1.5">
          <label class="block text-xs font-black uppercase tracking-wider text-surface-200">Contact Email</label>
          <input
            v-model="form.email"
            type="email"
            class="w-full px-4 py-2.5 rounded-xl bg-navy-950 border border-white/15 text-white text-xs font-semibold focus:border-accent-500 focus:outline-none"
          />
        </div>

        <div class="space-y-1.5">
          <label class="block text-xs font-black uppercase tracking-wider text-surface-200">Phone (E.164 format)</label>
          <input
            v-model="form.phone"
            type="text"
            placeholder="+639000000000"
            class="w-full px-4 py-2.5 rounded-xl bg-navy-950 border border-white/15 text-white text-xs font-semibold focus:border-accent-500 focus:outline-none"
          />
        </div>

        <div class="space-y-1.5">
          <label class="block text-xs font-black uppercase tracking-wider text-surface-200">Display Phone Text</label>
          <input
            v-model="form.display_phone"
            type="text"
            placeholder="+63 (TBA)"
            class="w-full px-4 py-2.5 rounded-xl bg-navy-950 border border-white/15 text-white text-xs font-semibold focus:border-accent-500 focus:outline-none"
          />
        </div>

        <div class="space-y-1.5 sm:col-span-3">
          <label class="block text-xs font-black uppercase tracking-wider text-surface-200">Connect Section Introduction Copy</label>
          <textarea
            v-model="form.connect_copy"
            rows="2"
            class="w-full px-4 py-2.5 rounded-xl bg-navy-950 border border-white/15 text-white text-xs font-medium focus:border-accent-500 focus:outline-none leading-relaxed"
          ></textarea>
        </div>
      </div>
    </div>
  </div>
</template>

