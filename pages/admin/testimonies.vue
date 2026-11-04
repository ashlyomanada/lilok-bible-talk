<script setup lang="ts">
import { computed, ref } from 'vue'
import { useToast } from '~/composables/useToast'

definePageMeta({
  layout: 'admin',
  middleware: 'admin-auth'
})

interface Testimony {
  id: string
  name: string
  message: string
  image_url: string
  image_path: string
  is_published: boolean
  created_at: string
}

const { showToast } = useToast()
const requestFetch = useRequestFetch()
const { data: response, refresh, error } = await useAsyncData('admin-testimonies', () =>
  requestFetch<{ data: Testimony[] }>('/api/admin/testimonies'),
  { default: () => ({ data: [] }) }
)

const testimonies = ref<Testimony[]>(response.value?.data || [])
const filter = ref<'all' | 'pending' | 'published'>('pending')
const busyId = ref<string | null>(null)
const filteredTestimonies = computed(() => testimonies.value.filter((item) => {
  if (filter.value === 'pending') return !item.is_published
  if (filter.value === 'published') return item.is_published
  return true
}))
const pendingCount = computed(() => testimonies.value.filter(item => !item.is_published).length)
const filterOptions = computed(() => [
  { key: 'pending' as const, label: 'Pending', count: pendingCount.value },
  { key: 'published' as const, label: 'Published', count: testimonies.value.filter(item => item.is_published).length },
  { key: 'all' as const, label: 'All', count: testimonies.value.length }
])

const formatDate = (value: string) => new Intl.DateTimeFormat('en-PH', {
  dateStyle: 'medium',
  timeStyle: 'short',
  timeZone: 'Asia/Manila'
}).format(new Date(value))

const setPublished = async (item: Testimony) => {
  busyId.value = item.id
  try {
    const result = await $fetch<{ data: Testimony }>('/api/admin/testimonies', {
      method: 'PUT',
      body: { id: item.id, is_published: !item.is_published }
    })
    const index = testimonies.value.findIndex(row => row.id === item.id)
    if (index !== -1) testimonies.value[index] = result.data
    await $fetch('/api/revalidate', { method: 'POST' }).catch(() => {})
    showToast(result.data.is_published ? 'Testimony published.' : 'Testimony hidden from the public page.', 'success')
  } catch (err: any) {
    showToast(err?.data?.statusMessage || err?.statusMessage || 'Could not update this testimony.', 'error')
  } finally {
    busyId.value = null
  }
}

const deleteTestimony = async (item: Testimony) => {
  if (!confirm(`Permanently delete the testimony from ${item.name}?`)) return

  busyId.value = item.id
  try {
    await $fetch(`/api/admin/testimonies?id=${encodeURIComponent(item.id)}`, { method: 'DELETE' })
    testimonies.value = testimonies.value.filter(row => row.id !== item.id)
    showToast('Testimony and uploaded photo deleted.', 'success')
  } catch (err: any) {
    showToast(err?.data?.statusMessage || err?.statusMessage || 'Could not delete this testimony.', 'error')
  } finally {
    busyId.value = null
  }
}

watch(response, (value) => {
  if (value?.data) testimonies.value = value.data
})

watch(error, (value) => {
  if (value) showToast('Could not load testimonies. Check the Supabase migration and server key.', 'error', 5000)
})
</script>

<template>
  <div class="space-y-8 text-left max-w-6xl">
    <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-white/10">
      <div>
        <h1 class="font-sans font-black text-2xl sm:text-3xl uppercase tracking-tight text-white">Testimonies</h1>
        <p class="text-sm text-surface-300 mt-1">Review submitted photos and stories before publishing them to the community page.</p>
      </div>
      <NuxtLink to="/testimony" target="_blank" class="inline-flex items-center justify-center px-4 py-2 rounded-xl border border-white/15 text-xs font-bold uppercase tracking-wide text-white hover:bg-white/5">
        View public page ↗
      </NuxtLink>
    </div>

    <div class="grid grid-cols-3 gap-3 max-w-xl">
      <button v-for="option in filterOptions" :key="option.key" type="button" class="rounded-2xl p-4 text-left border transition-colors" :class="filter === option.key ? 'bg-accent-500/15 border-accent-400/40' : 'bg-white/5 border-white/10 hover:bg-white/10'" @click="filter = option.key">
        <span class="block text-2xl font-black text-white">{{ option.count }}</span>
        <span class="text-[10px] font-black uppercase tracking-widest text-surface-300">{{ option.label }}</span>
      </button>
    </div>

    <div v-if="error" class="rounded-2xl border border-red-400/30 bg-red-950/30 p-5 text-sm text-red-200">
      The testimony list could not be loaded. Confirm the testimony migration has been applied and the server Supabase key is configured.
      <button class="ml-2 underline font-bold" @click="refresh()">Retry</button>
    </div>

    <div v-else-if="filteredTestimonies.length" class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <article v-for="item in filteredTestimonies" :key="item.id" class="overflow-hidden rounded-3xl border border-white/10 bg-navy-900/70">
        <img :src="item.image_url" :alt="`Submitted photo from ${item.name}`" class="w-full aspect-[16/9] object-cover bg-navy-950">
        <div class="p-5 space-y-4">
          <div class="flex items-start justify-between gap-4">
            <div>
              <h2 class="text-lg font-black text-white">{{ item.name }}</h2>
              <time class="block text-xs text-surface-400 mt-1">Submitted {{ formatDate(item.created_at) }}</time>
            </div>
            <span class="shrink-0 rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wider" :class="item.is_published ? 'bg-emerald-500/15 text-emerald-300' : 'bg-amber-500/15 text-amber-300'">
              {{ item.is_published ? 'Published' : 'Pending review' }}
            </span>
          </div>

          <p v-if="item.message" class="text-sm leading-relaxed text-surface-200 whitespace-pre-wrap">{{ item.message }}</p>
          <p v-else class="text-sm italic text-surface-400">No note provided.</p>

          <div class="flex flex-wrap gap-2 pt-2 border-t border-white/10">
            <button type="button" :disabled="busyId === item.id" class="rounded-xl px-4 py-2 text-xs font-black uppercase tracking-wide disabled:opacity-50" :class="item.is_published ? 'bg-white/10 text-white hover:bg-white/15' : 'bg-accent-500 text-navy-950 hover:bg-accent-400'" @click="setPublished(item)">
              {{ busyId === item.id ? 'Saving…' : item.is_published ? 'Hide from page' : 'Approve & publish' }}
            </button>
            <button type="button" :disabled="busyId === item.id" class="rounded-xl px-4 py-2 text-xs font-black uppercase tracking-wide text-red-300 border border-red-400/20 hover:bg-red-500/10 disabled:opacity-50" @click="deleteTestimony(item)">
              Delete
            </button>
          </div>
        </div>
      </article>
    </div>

    <div v-else class="rounded-3xl border border-white/10 bg-navy-900/50 p-10 text-center">
      <h2 class="font-black text-white uppercase tracking-wide">Nothing to review</h2>
      <p class="mt-2 text-sm text-surface-400">New submissions will appear here for moderation.</p>
    </div>
  </div>
</template>
