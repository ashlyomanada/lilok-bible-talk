<script setup lang="ts">
import { ref, watch } from 'vue'
import { verseSchema } from '~/shared/schemas/site'
import { useToast } from '~/composables/useToast'
import { useUnsavedChanges } from '~/composables/useUnsavedChanges'

definePageMeta({
  layout: 'admin',
  middleware: 'admin-auth'
})

const { showToast } = useToast()
const { isDirty, markDirty, markClean } = useUnsavedChanges()

const { data: verseRes, refresh } = await useAsyncData('admin-verse-data', () => $fetch('/api/admin/verse'))

const form = ref({
  text: verseRes.value?.data?.text || '',
  reference: verseRes.value?.data?.reference || 'Matthew 11:28–29',
  translation: verseRes.value?.data?.translation || 'NIV',
  reflection_note: verseRes.value?.data?.reflection_note || ''
})

watch(form, () => markDirty(), { deep: true })

const isSaving = ref(false)

const handleSave = async () => {
  const validation = verseSchema.safeParse(form.value)
  if (!validation.success) {
    showToast(validation.error.issues[0]?.message || 'Please fill in all verse fields', 'warning')
    return
  }

  isSaving.value = true
  try {
    await $fetch('/api/admin/verse', {
      method: 'PUT',
      body: form.value
    })

    await $fetch('/api/revalidate', { method: 'POST' }).catch(() => {})
    markClean()
    showToast('Scripture highlight updated successfully!', 'success')
    await refresh()
  } catch (err: any) {
    showToast(err?.statusMessage || 'Failed to update scripture highlight.', 'error')
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
          Scripture Highlight Editor
        </h1>
        <p class="text-xs sm:text-sm text-surface-300">
          Manage the central scripture quote, book reference, translation, and pastoral reflection.
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
          <span>{{ isSaving ? 'Saving...' : 'Save Scripture' }}</span>
        </button>
      </div>
    </div>

    <!-- Verse Editor Card -->
    <div class="p-6 sm:p-8 rounded-3xl bg-navy-900 border border-white/15 space-y-6">
      <!-- Verse Text -->
      <div class="space-y-1.5">
        <label class="block text-xs font-black uppercase tracking-wider text-surface-200">
          Scripture Verse Text (Full Quote)
        </label>
        <textarea
          v-model="form.text"
          rows="5"
          placeholder="“Come to me, all you who are weary and burdened, and I will give you rest...”"
          class="w-full px-4 py-3 rounded-2xl bg-navy-950 border border-white/15 text-white text-sm font-medium focus:border-accent-500 focus:outline-none leading-relaxed"
        ></textarea>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <!-- Reference -->
        <div class="space-y-1.5">
          <label class="block text-xs font-black uppercase tracking-wider text-surface-200">
            Book & Verse Reference
          </label>
          <input
            v-model="form.reference"
            type="text"
            placeholder="Matthew 11:28–29"
            class="w-full px-4 py-2.5 rounded-xl bg-navy-950 border border-white/15 text-white text-xs font-semibold focus:border-accent-500 focus:outline-none"
          />
        </div>

        <!-- Translation -->
        <div class="space-y-1.5">
          <label class="block text-xs font-black uppercase tracking-wider text-surface-200">
            Translation
          </label>
          <input
            v-model="form.translation"
            type="text"
            placeholder="NIV / ESV / NLT"
            class="w-full px-4 py-2.5 rounded-xl bg-navy-950 border border-white/15 text-white text-xs font-semibold focus:border-accent-500 focus:outline-none"
          />
        </div>
      </div>

      <!-- Reflection Note -->
      <div class="space-y-1.5">
        <label class="block text-xs font-black uppercase tracking-wider text-surface-200">
          Pastoral Reflection Note
        </label>
        <textarea
          v-model="form.reflection_note"
          rows="3"
          placeholder="Encouraging commentary for disciples and guests..."
          class="w-full px-4 py-3 rounded-2xl bg-navy-950 border border-white/15 text-white text-xs font-medium focus:border-accent-500 focus:outline-none leading-relaxed"
        ></textarea>
      </div>

      <!-- Live Preview -->
      <div class="pt-6 border-t border-white/10 space-y-3">
        <span class="text-xs font-black uppercase tracking-widest text-accent-400">Live Preview</span>
        <div class="p-6 rounded-3xl bg-navy-950 border border-white/10 text-center space-y-4">
          <p class="font-sans font-black text-xl text-white uppercase leading-snug">
            {{ form.text || '“Verse text goes here...”' }}
          </p>
          <p class="text-sm font-bold text-accent-400">
            {{ form.reference }} ({{ form.translation }})
          </p>
          <p class="text-xs text-surface-300 italic max-w-lg mx-auto">
            ✦ {{ form.reflection_note }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

