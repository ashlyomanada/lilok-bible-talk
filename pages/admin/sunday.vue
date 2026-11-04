<script setup lang="ts">
import { ref, watch } from 'vue'
import { sundayServiceSchema } from '~/shared/schemas/site'
import { useToast } from '~/composables/useToast'
import { useUnsavedChanges } from '~/composables/useUnsavedChanges'

definePageMeta({
  layout: 'admin',
  middleware: 'admin-auth'
})

const { showToast } = useToast()
const { isDirty, markDirty, markClean } = useUnsavedChanges()

const { data: sundayRes, refresh } = await useAsyncData('admin-sunday-data', () => $fetch('/api/admin/sunday'))

const serviceForm = ref({
  day_and_time: sundayRes.value?.service?.day_and_time || 'Every Sunday at 10:00 AM',
  title: sundayRes.value?.service?.title || 'MICC Sunday Worship Service',
  message: sundayRes.value?.service?.message || '',
  note: sundayRes.value?.service?.note || '',
  messenger_url: sundayRes.value?.service?.messenger_url || 'https://m.me/manilaicc'
})

const venues = ref<Array<{
  id?: string
  city: string
  venue_name: string
  address: string
  status: 'TBA' | 'Confirmed'
  notes: string
  published: boolean
}>>(
  Array.isArray(sundayRes.value?.venues)
    ? JSON.parse(JSON.stringify(sundayRes.value.venues))
    : [
        {
          city: 'Makati',
          venue_name: 'Central Makati Service (TBA)',
          address: 'Makati Central Business District, Metro Manila',
          status: 'TBA',
          notes: 'Contact us via Messenger for current hall details and Sunday parking info.',
          published: true
        }
      ]
)

watch([serviceForm, venues], () => markDirty(), { deep: true })

const isSaving = ref(false)

const addVenue = () => {
  venues.value.push({
    city: 'New City',
    venue_name: 'Fellowship Hall (TBA)',
    address: 'Metro Manila, Philippines',
    status: 'TBA',
    notes: 'Message us on Messenger for hall directions.',
    published: true
  })
}

const removeVenue = (idx: number) => {
  venues.value.splice(idx, 1)
}

const handleSave = async () => {
  const serviceValidation = sundayServiceSchema.safeParse(serviceForm.value)
  if (!serviceValidation.success) {
    showToast(serviceValidation.error.issues[0]?.message || 'Please fill in service details', 'warning')
    return
  }

  isSaving.value = true
  try {
    await $fetch('/api/admin/sunday', {
      method: 'PUT',
      body: {
        service: serviceForm.value,
        venues: venues.value
      }
    })

    await $fetch('/api/revalidate', { method: 'POST' }).catch(() => {})
    markClean()
    showToast('Sunday service details and regional venues saved!', 'success')
    await refresh()
  } catch (err: any) {
    showToast(err?.statusMessage || 'Failed to save Sunday service.', 'error')
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
          Sunday Worship & Regional Venues
        </h1>
        <p class="text-xs sm:text-sm text-surface-300">
          Update the Sunday service schedule header and Central Region meetup locations.
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
          <span>{{ isSaving ? 'Saving...' : 'Save Sunday Service' }}</span>
        </button>
      </div>
    </div>

    <!-- 1. Service Header Settings -->
    <div class="p-6 sm:p-8 rounded-3xl bg-navy-900 border border-white/15 space-y-6">
      <div class="pb-4 border-b border-white/10">
        <h2 class="font-sans font-black text-lg uppercase tracking-tight text-white">
          1. Service Header Info
        </h2>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div class="space-y-1.5">
          <label class="block text-xs font-black uppercase tracking-wider text-surface-200">Day & Time</label>
          <input
            v-model="serviceForm.day_and_time"
            type="text"
            placeholder="Every Sunday at 10:00 AM"
            class="w-full px-4 py-2.5 rounded-xl bg-navy-950 border border-white/15 text-white text-xs font-semibold focus:border-accent-500 focus:outline-none"
          />
        </div>

        <div class="space-y-1.5">
          <label class="block text-xs font-black uppercase tracking-wider text-surface-200">Headline Title</label>
          <input
            v-model="serviceForm.title"
            type="text"
            class="w-full px-4 py-2.5 rounded-xl bg-navy-950 border border-white/15 text-white text-xs font-semibold focus:border-accent-500 focus:outline-none"
          />
        </div>

        <div class="space-y-1.5 sm:col-span-2">
          <label class="block text-xs font-black uppercase tracking-wider text-surface-200">Message & Invitation Text</label>
          <textarea
            v-model="serviceForm.message"
            rows="2"
            class="w-full px-4 py-2.5 rounded-xl bg-navy-950 border border-white/15 text-white text-xs font-medium focus:border-accent-500 focus:outline-none leading-relaxed"
          ></textarea>
        </div>

        <div class="space-y-1.5 sm:col-span-2">
          <label class="block text-xs font-black uppercase tracking-wider text-surface-200">Note (Italic footnote)</label>
          <input
            v-model="serviceForm.note"
            type="text"
            class="w-full px-4 py-2.5 rounded-xl bg-navy-950 border border-white/15 text-white text-xs font-medium focus:border-accent-500 focus:outline-none"
          />
        </div>

        <div class="space-y-1.5 sm:col-span-2">
          <label class="block text-xs font-black uppercase tracking-wider text-surface-200">Messenger Contact URL</label>
          <input
            v-model="serviceForm.messenger_url"
            type="url"
            class="w-full px-4 py-2.5 rounded-xl bg-navy-950 border border-white/15 text-white text-xs font-semibold focus:border-accent-500 focus:outline-none"
          />
        </div>
      </div>
    </div>

    <!-- 2. Regional Venues List -->
    <div class="p-6 sm:p-8 rounded-3xl bg-navy-900 border border-white/15 space-y-6">
      <div class="flex items-center justify-between pb-4 border-b border-white/10">
        <div>
          <h2 class="font-sans font-black text-lg uppercase tracking-tight text-white">
            2. Regional Sunday Venue Cards
          </h2>
          <p class="text-xs text-surface-400">Cards shown in the Sunday Worship section</p>
        </div>

        <button
          type="button"
          class="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-white/10 hover:bg-white/15 text-accent-400 border border-white/15"
          @click="addVenue"
        >
          <span>+ Add Venue</span>
        </button>
      </div>

      <div class="space-y-4">
        <div
          v-for="(venue, idx) in venues"
          :key="idx"
          class="p-5 rounded-2xl bg-navy-950 border border-white/10 space-y-4 relative"
        >
          <div class="flex items-center justify-between pb-3 border-b border-white/10">
            <span class="text-xs font-black uppercase tracking-wider text-accent-400">
              Venue #{{ idx + 1 }}: {{ venue.city || 'Untitled' }}
            </span>
            <button
              type="button"
              class="text-xs font-bold text-red-400 hover:text-red-300"
              @click="removeVenue(idx)"
            >
              Remove
            </button>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div class="space-y-1">
              <label class="block text-[11px] font-black uppercase tracking-wider text-surface-300">City / Region</label>
              <input
                v-model="venue.city"
                type="text"
                placeholder="Makati"
                class="w-full px-3 py-2 rounded-xl bg-navy-900 border border-white/15 text-white text-xs font-semibold focus:border-accent-500 focus:outline-none"
              />
            </div>

            <div class="space-y-1 sm:col-span-2">
              <label class="block text-[11px] font-black uppercase tracking-wider text-surface-300">Venue Name</label>
              <input
                v-model="venue.venue_name"
                type="text"
                placeholder="Central Makati Service (TBA)"
                class="w-full px-3 py-2 rounded-xl bg-navy-900 border border-white/15 text-white text-xs font-semibold focus:border-accent-500 focus:outline-none"
              />
            </div>

            <div class="space-y-1 sm:col-span-2">
              <label class="block text-[11px] font-black uppercase tracking-wider text-surface-300">Address</label>
              <input
                v-model="venue.address"
                type="text"
                class="w-full px-3 py-2 rounded-xl bg-navy-900 border border-white/15 text-white text-xs font-medium focus:border-accent-500 focus:outline-none"
              />
            </div>

            <div class="space-y-1">
              <label class="block text-[11px] font-black uppercase tracking-wider text-surface-300">Status</label>
              <select
                v-model="venue.status"
                class="w-full px-3 py-2 rounded-xl bg-navy-900 border border-white/15 text-white text-xs font-bold focus:border-accent-500 focus:outline-none"
              >
                <option value="TBA">TBA</option>
                <option value="Confirmed">Confirmed</option>
              </select>
            </div>

            <div class="space-y-1 sm:col-span-3">
              <label class="block text-[11px] font-black uppercase tracking-wider text-surface-300">Notes & Parking Instructions</label>
              <input
                v-model="venue.notes"
                type="text"
                class="w-full px-3 py-2 rounded-xl bg-navy-900 border border-white/15 text-white text-xs font-medium focus:border-accent-500 focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

