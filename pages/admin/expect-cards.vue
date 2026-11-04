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

const { data: cardsRes, refresh } = await useAsyncData('admin-expect-cards', () => $fetch('/api/admin/expect-cards'))

const cards = ref<Array<{
  id?: string
  card_id: string
  title: string
  tagline: string
  description: string
  icon: string
  badge?: string | null
  span: string
  sort_order: number
  published: boolean
}>>(
  cardsRes.value?.data ? JSON.parse(JSON.stringify(cardsRes.value.data)) : []
)

watch(cards, () => markDirty(), { deep: true })

const isSaving = ref(false)

const moveUp = (idx: number) => {
  if (idx <= 0) return
  const temp = cards.value[idx]
  cards.value[idx] = cards.value[idx - 1]
  cards.value[idx - 1] = temp
  cards.value.forEach((c, i) => c.sort_order = i + 1)
}

const moveDown = (idx: number) => {
  if (idx >= cards.value.length - 1) return
  const temp = cards.value[idx]
  cards.value[idx] = cards.value[idx + 1]
  cards.value[idx + 1] = temp
  cards.value.forEach((c, i) => c.sort_order = i + 1)
}

const addCard = () => {
  cards.value.push({
    card_id: `custom-${Date.now()}`,
    title: 'New Expectation',
    tagline: 'Authentic fellowship',
    description: 'Describe what guests can look forward to.',
    icon: 'heart',
    badge: 'Welcome',
    span: 'col-span-1',
    sort_order: cards.value.length + 1,
    published: true
  })
}

const removeCard = (idx: number) => {
  cards.value.splice(idx, 1)
  cards.value.forEach((c, i) => c.sort_order = i + 1)
}

const handleSave = async () => {
  isSaving.value = true
  try {
    await $fetch('/api/admin/expect-cards', {
      method: 'PUT',
      body: cards.value
    })

    await $fetch('/api/revalidate', { method: 'POST' }).catch(() => {})
    markClean()
    showToast('Bento expectation cards updated!', 'success')
    await refresh()
  } catch (err: any) {
    showToast(err?.statusMessage || 'Failed to update cards.', 'error')
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
          What to Expect Cards (Bento Grid)
        </h1>
        <p class="text-xs sm:text-sm text-surface-300">
          Edit bento cards with custom icons, taglines, badges, descriptions, and grid column spans.
        </p>
      </div>

      <div class="flex items-center gap-3">
        <span v-if="isDirty" class="text-xs text-amber-400 font-bold uppercase tracking-wider">
          ● Unsaved changes
        </span>

        <button
          type="button"
          class="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider bg-white/10 hover:bg-white/15 text-accent-400 border border-white/20"
          @click="addCard"
        >
          <span>+ Add Card</span>
        </button>

        <button
          type="button"
          :disabled="isSaving"
          class="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-accent-500 hover:bg-accent-600 disabled:opacity-50 text-navy-950 font-black text-xs uppercase tracking-wider shadow-soft hover:shadow-glow-gold transition-all"
          @click="handleSave"
        >
          <span>{{ isSaving ? 'Saving...' : 'Save Cards' }}</span>
        </button>
      </div>
    </div>

    <!-- Cards Editor List -->
    <div class="space-y-4">
      <div
        v-for="(card, idx) in cards"
        :key="card.card_id"
        class="p-5 sm:p-6 rounded-3xl bg-navy-900 border border-white/15 space-y-4"
      >
        <div class="flex items-center justify-between pb-3 border-b border-white/10">
          <div class="flex items-center gap-3">
            <!-- Reorder buttons -->
            <div class="flex items-center gap-1">
              <button
                type="button"
                :disabled="idx === 0"
                class="p-1 rounded bg-white/5 hover:bg-white/15 disabled:opacity-20 text-white text-xs"
                @click="moveUp(idx)"
              >
                ▲
              </button>
              <button
                type="button"
                :disabled="idx === cards.length - 1"
                class="p-1 rounded bg-white/5 hover:bg-white/15 disabled:opacity-20 text-white text-xs"
                @click="moveDown(idx)"
              >
                ▼
              </button>
            </div>

            <span class="text-xs font-black uppercase tracking-wider text-accent-400">
              #{{ card.sort_order }}: {{ card.title || 'Untitled Card' }}
            </span>
          </div>

          <div class="flex items-center gap-4">
            <label class="flex items-center gap-2 cursor-pointer text-xs font-bold text-white">
              <input v-model="card.published" type="checkbox" class="rounded text-accent-500" />
              <span>Published</span>
            </label>
            <button
              type="button"
              class="text-xs font-bold text-red-400 hover:text-red-300"
              @click="removeCard(idx)"
            >
              Delete
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div class="space-y-1">
            <label class="block text-[11px] font-black uppercase tracking-wider text-surface-300">Title</label>
            <input
              v-model="card.title"
              type="text"
              class="w-full px-3 py-2 rounded-xl bg-navy-950 border border-white/15 text-white text-xs font-semibold focus:border-accent-500 focus:outline-none"
            />
          </div>

          <div class="space-y-1">
            <label class="block text-[11px] font-black uppercase tracking-wider text-surface-300">Tagline</label>
            <input
              v-model="card.tagline"
              type="text"
              class="w-full px-3 py-2 rounded-xl bg-navy-950 border border-white/15 text-white text-xs font-semibold focus:border-accent-500 focus:outline-none"
            />
          </div>

          <div class="space-y-1">
            <label class="block text-[11px] font-black uppercase tracking-wider text-surface-300">Badge</label>
            <input
              v-model="card.badge"
              type="text"
              placeholder="e.g. Free, Zero Cost"
              class="w-full px-3 py-2 rounded-xl bg-navy-950 border border-white/15 text-white text-xs font-semibold focus:border-accent-500 focus:outline-none"
            />
          </div>

          <div class="space-y-1">
            <label class="block text-[11px] font-black uppercase tracking-wider text-surface-300">Icon</label>
            <select
              v-model="card.icon"
              class="w-full px-3 py-2 rounded-xl bg-navy-950 border border-white/15 text-white text-xs font-semibold focus:border-accent-500 focus:outline-none"
            >
              <option value="heart">Heart</option>
              <option value="sparkles">Sparkles</option>
              <option value="users">Users / Friends</option>
              <option value="coffee">Coffee / Treats</option>
              <option value="book">Book / Scripture</option>
              <option value="chat">Chat / Open Discussion</option>
            </select>
          </div>

          <div class="space-y-1">
            <label class="block text-[11px] font-black uppercase tracking-wider text-surface-300">Layout Span</label>
            <select
              v-model="card.span"
              class="w-full px-3 py-2 rounded-xl bg-navy-950 border border-white/15 text-white text-xs font-semibold focus:border-accent-500 focus:outline-none"
            >
              <option value="col-span-1">Standard (1 column)</option>
              <option value="col-span-1 md:col-span-2">Wide (2 columns)</option>
            </select>
          </div>

          <div class="space-y-1 sm:col-span-3">
            <label class="block text-[11px] font-black uppercase tracking-wider text-surface-300">Description</label>
            <textarea
              v-model="card.description"
              rows="2"
              class="w-full px-3 py-2 rounded-xl bg-navy-950 border border-white/15 text-white text-xs font-medium focus:border-accent-500 focus:outline-none leading-relaxed"
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

