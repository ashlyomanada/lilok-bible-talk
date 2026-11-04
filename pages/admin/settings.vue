<script setup lang="ts">
import { ref, watch } from 'vue'
import { siteSettingsSchema } from '~/shared/schemas/site'
import { useToast } from '~/composables/useToast'
import { useUnsavedChanges } from '~/composables/useUnsavedChanges'

definePageMeta({
  layout: 'admin',
  middleware: 'admin-auth'
})

const { showToast } = useToast()
const { isDirty, markDirty, markClean } = useUnsavedChanges()

const { data: settingsRes, refresh } = await useAsyncData('admin-settings-data', () => $fetch('/api/admin/settings'))

const form = ref({
  group_name: settingsRes.value?.data?.group_name || 'Lilok Bible Talk',
  tagline: settingsRes.value?.data?.tagline || 'Welcome to the family.',
  hashtag: settingsRes.value?.data?.hashtag || '#AngSarapMagingDisciple',
  logo_url: settingsRes.value?.data?.logo_url || '/images/mnl-logo.png',
  logo_alt: settingsRes.value?.data?.logo_alt || 'Manila International Christian Church MNL logo',
  church_full_name: settingsRes.value?.data?.church_full_name || 'Metro Manila International Christian Church (MMICC)',
  parent_church_name: settingsRes.value?.data?.parent_church_name || 'Manila International Christian Church (MICC)',
  parent_region: settingsRes.value?.data?.parent_region || 'Central Region',
  sold_out_badge: settingsRes.value?.data?.sold_out_badge || 'A Member of the Soldout Family of Churches',
  about_church: settingsRes.value?.data?.about_church || '',
  footer_blessing: settingsRes.value?.data?.footer_blessing || '',
  seo_title: settingsRes.value?.data?.seo_title || "You're invited to Lilok Bible Talk | MICC Central Region",
  seo_description: settingsRes.value?.data?.seo_description || '',
  seo_og_image: settingsRes.value?.data?.seo_og_image || '/images/mnl-logo.png',
  canonical_url: settingsRes.value?.data?.canonical_url || 'https://micc.church'
})

watch(form, () => markDirty(), { deep: true })

const isSaving = ref(false)
const errors = ref<Record<string, string>>({})

const handleSave = async () => {
  errors.value = {}
  const validation = siteSettingsSchema.safeParse(form.value)
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
    await $fetch('/api/admin/settings', {
      method: 'PUT',
      body: form.value
    })

    await $fetch('/api/revalidate', { method: 'POST' }).catch(() => {})
    markClean()
    showToast('Site settings & SEO updated successfully!', 'success')
    await refresh()
  } catch (err: any) {
    showToast(err?.statusMessage || 'Failed to update settings.', 'error')
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
          Site Identity & SEO Settings
        </h1>
        <p class="text-xs sm:text-sm text-surface-300">
          Manage brand identity, logos, parent church details, and default search meta tags.
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
          <span>{{ isSaving ? 'Saving...' : 'Save Settings' }}</span>
        </button>
      </div>
    </div>

    <!-- 1. Brand Identity -->
    <div class="p-6 sm:p-8 rounded-3xl bg-navy-900 border border-white/15 space-y-6">
      <div class="pb-4 border-b border-white/10">
        <h2 class="font-sans font-black text-lg uppercase tracking-tight text-white">
          1. Brand Identity
        </h2>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div class="space-y-1.5">
          <label class="block text-xs font-black uppercase tracking-wider text-surface-200">Group Name</label>
          <input
            v-model="form.group_name"
            type="text"
            class="w-full px-4 py-2.5 rounded-xl bg-navy-950 border border-white/15 text-white text-xs font-semibold focus:border-accent-500 focus:outline-none"
          />
        </div>

        <div class="space-y-1.5">
          <label class="block text-xs font-black uppercase tracking-wider text-surface-200">Tagline</label>
          <input
            v-model="form.tagline"
            type="text"
            class="w-full px-4 py-2.5 rounded-xl bg-navy-950 border border-white/15 text-white text-xs font-semibold focus:border-accent-500 focus:outline-none"
          />
        </div>

        <div class="space-y-1.5">
          <label class="block text-xs font-black uppercase tracking-wider text-surface-200">Hashtag</label>
          <input
            v-model="form.hashtag"
            type="text"
            class="w-full px-4 py-2.5 rounded-xl bg-navy-950 border border-white/15 text-white text-xs font-semibold focus:border-accent-500 focus:outline-none"
          />
        </div>
      </div>
    </div>

    <!-- 2. Parent Church Details -->
    <div class="p-6 sm:p-8 rounded-3xl bg-navy-900 border border-white/15 space-y-6">
      <div class="pb-4 border-b border-white/10">
        <h2 class="font-sans font-black text-lg uppercase tracking-tight text-white">
          2. Movement & Parent Church Info
        </h2>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div class="space-y-1.5">
          <label class="block text-xs font-black uppercase tracking-wider text-surface-200">Parent Church Name</label>
          <input
            v-model="form.parent_church_name"
            type="text"
            class="w-full px-4 py-2.5 rounded-xl bg-navy-950 border border-white/15 text-white text-xs font-semibold focus:border-accent-500 focus:outline-none"
          />
        </div>

        <div class="space-y-1.5">
          <label class="block text-xs font-black uppercase tracking-wider text-surface-200">Region Name</label>
          <input
            v-model="form.parent_region"
            type="text"
            class="w-full px-4 py-2.5 rounded-xl bg-navy-950 border border-white/15 text-white text-xs font-semibold focus:border-accent-500 focus:outline-none"
          />
        </div>

        <div class="space-y-1.5">
          <label class="block text-xs font-black uppercase tracking-wider text-surface-200">Church Full Name</label>
          <input
            v-model="form.church_full_name"
            type="text"
            class="w-full px-4 py-2.5 rounded-xl bg-navy-950 border border-white/15 text-white text-xs font-semibold focus:border-accent-500 focus:outline-none"
          />
        </div>

        <div class="space-y-1.5">
          <label class="block text-xs font-black uppercase tracking-wider text-surface-200">Sold-Out Movement Badge</label>
          <input
            v-model="form.sold_out_badge"
            type="text"
            class="w-full px-4 py-2.5 rounded-xl bg-navy-950 border border-white/15 text-white text-xs font-semibold focus:border-accent-500 focus:outline-none"
          />
        </div>

        <div class="space-y-1.5 sm:col-span-2">
          <label class="block text-xs font-black uppercase tracking-wider text-surface-200">About Church Mission</label>
          <textarea
            v-model="form.about_church"
            rows="3"
            class="w-full px-4 py-2.5 rounded-xl bg-navy-950 border border-white/15 text-white text-xs font-medium focus:border-accent-500 focus:outline-none leading-relaxed"
          ></textarea>
        </div>

        <div class="space-y-1.5 sm:col-span-2">
          <label class="block text-xs font-black uppercase tracking-wider text-surface-200">Footer Blessing Line</label>
          <textarea
            v-model="form.footer_blessing"
            rows="2"
            class="w-full px-4 py-2.5 rounded-xl bg-navy-950 border border-white/15 text-white text-xs font-medium focus:border-accent-500 focus:outline-none leading-relaxed"
          ></textarea>
        </div>
      </div>
    </div>

    <!-- 3. SEO & Open Graph Meta -->
    <div class="p-6 sm:p-8 rounded-3xl bg-navy-900 border border-white/15 space-y-6">
      <div class="pb-4 border-b border-white/10">
        <h2 class="font-sans font-black text-lg uppercase tracking-tight text-white">
          3. SEO & Open Graph Previews
        </h2>
      </div>

      <div class="space-y-4">
        <div class="space-y-1.5">
          <label class="block text-xs font-black uppercase tracking-wider text-surface-200">SEO Meta Title</label>
          <input
            v-model="form.seo_title"
            type="text"
            class="w-full px-4 py-2.5 rounded-xl bg-navy-950 border border-white/15 text-white text-xs font-semibold focus:border-accent-500 focus:outline-none"
          />
        </div>

        <div class="space-y-1.5">
          <label class="block text-xs font-black uppercase tracking-wider text-surface-200">SEO Meta Description</label>
          <textarea
            v-model="form.seo_description"
            rows="3"
            class="w-full px-4 py-2.5 rounded-xl bg-navy-950 border border-white/15 text-white text-xs font-medium focus:border-accent-500 focus:outline-none leading-relaxed"
          ></textarea>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div class="space-y-1.5">
            <label class="block text-xs font-black uppercase tracking-wider text-surface-200">OG / Social Preview Image URL</label>
            <input
              v-model="form.seo_og_image"
              type="text"
              class="w-full px-4 py-2.5 rounded-xl bg-navy-950 border border-white/15 text-white text-xs font-semibold focus:border-accent-500 focus:outline-none"
            />
          </div>

          <div class="space-y-1.5">
            <label class="block text-xs font-black uppercase tracking-wider text-surface-200">Canonical Website URL</label>
            <input
              v-model="form.canonical_url"
              type="url"
              class="w-full px-4 py-2.5 rounded-xl bg-navy-950 border border-white/15 text-white text-xs font-semibold focus:border-accent-500 focus:outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

