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

const { data: sectionsRes, refresh } = await useAsyncData('admin-sections-data', () => $fetch('/api/admin/sections'))

const sections = ref<Array<{
  id: string
  name: string
  title: string
  subtitle?: string | null
  sort_order: number
  is_visible: boolean
}>>(
  sectionsRes.value?.data ? JSON.parse(JSON.stringify(sectionsRes.value.data)) : []
)

watch(sections, () => markDirty(), { deep: true })

const isSaving = ref(false)

const moveUp = (idx: number) => {
  if (idx <= 0) return
  const temp = sections.value[idx]
  sections.value[idx] = sections.value[idx - 1]
  sections.value[idx - 1] = temp
  updateSortOrders()
}

const moveDown = (idx: number) => {
  if (idx >= sections.value.length - 1) return
  const temp = sections.value[idx]
  sections.value[idx] = sections.value[idx + 1]
  sections.value[idx + 1] = temp
  updateSortOrders()
}

const updateSortOrders = () => {
  sections.value.forEach((sec, i) => {
    sec.sort_order = i + 1
  })
}

const handleSave = async () => {
  isSaving.value = true
  try {
    await $fetch('/api/admin/sections', {
      method: 'PUT',
      body: sections.value
    })

    await $fetch('/api/revalidate', { method: 'POST' }).catch(() => {})
    markClean()
    showToast('Section order and visibility updated!', 'success')
    await refresh()
  } catch (err: any) {
    showToast(err?.statusMessage || 'Failed to update sections.', 'error')
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
          Homepage Sections Manager
        </h1>
        <p class="text-xs sm:text-sm text-surface-300">
          Reorder sections on the public site and toggle their visibility on or off.
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
          <span>{{ isSaving ? 'Saving...' : 'Save Order & Visibility' }}</span>
        </button>
      </div>
    </div>

    <!-- Sections Table / Cards -->
    <div class="space-y-3">
      <div
        v-for="(sec, idx) in sections"
        :key="sec.id"
        class="p-4 sm:p-5 rounded-2xl bg-navy-900 border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        :class="sec.is_visible ? 'border-white/15' : 'border-white/5 opacity-60 bg-navy-950'"
      >
        <div class="flex items-center gap-3.5 min-w-0">
          <!-- Reorder buttons -->
          <div class="flex flex-col gap-1 shrink-0">
            <button
              type="button"
              :disabled="idx === 0"
              class="p-1 rounded bg-white/5 hover:bg-white/15 disabled:opacity-20 text-white"
              title="Move Up"
              @click="moveUp(idx)"
            >
              ▲
            </button>
            <button
              type="button"
              :disabled="idx === sections.length - 1"
              class="p-1 rounded bg-white/5 hover:bg-white/15 disabled:opacity-20 text-white"
              title="Move Down"
              @click="moveDown(idx)"
            >
              ▼
            </button>
          </div>

          <div class="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center font-black text-xs text-accent-400 shrink-0">
            #{{ sec.sort_order }}
          </div>

          <div class="min-w-0">
            <div class="flex items-center gap-2">
              <span class="font-sans font-black text-base uppercase tracking-tight text-white truncate">
                {{ sec.name }}
              </span>
              <span class="text-[10px] font-mono text-surface-400">
                ({{ sec.id }})
              </span>
            </div>
            <p class="text-xs text-surface-300 truncate">
              Heading: "{{ sec.title }}"
            </p>
          </div>
        </div>

        <!-- Controls: Visibility Toggle & Title Edit -->
        <div class="flex items-center gap-4 shrink-0 sm:pl-4 sm:border-l border-white/10">
          <label class="flex items-center gap-2 cursor-pointer text-xs font-bold text-white select-none">
            <input
              v-model="sec.is_visible"
              type="checkbox"
              class="rounded text-accent-500 w-4 h-4"
            />
            <span>{{ sec.is_visible ? 'Visible' : 'Hidden' }}</span>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

