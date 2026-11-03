<script setup lang="ts">
import { ref, watch } from 'vue'
import { eventDataSchema } from '~/shared/schemas/site'
import { useToast } from '~/composables/useToast'
import { useUnsavedChanges } from '~/composables/useUnsavedChanges'

definePageMeta({
  layout: 'admin',
  middleware: 'admin-auth'
})

const { showToast } = useToast()
const { isDirty, markDirty, markClean } = useUnsavedChanges()

const { data: eventRes, refresh } = await useAsyncData('admin-event-data', () => $fetch('/api/admin/event'))

const form = ref({
  title: eventRes.value?.data?.title || 'Come as You Are',
  subtitle: eventRes.value?.data?.subtitle || '',
  one_line_welcome: eventRes.value?.data?.one_line_welcome || '',
  no_pressure_line: eventRes.value?.data?.no_pressure_line || '',
  reassurance_chips_text: Array.isArray(eventRes.value?.data?.reassurance_chips)
    ? eventRes.value.data.reassurance_chips.join(', ')
    : 'Free, All are welcome, Bring a friend, Come as you are',
  recurrence_weekday: eventRes.value?.data?.recurrence_weekday ?? 4,
  recurrence_hour: eventRes.value?.data?.recurrence_hour ?? 19,
  recurrence_minute: eventRes.value?.data?.recurrence_minute ?? 0,
  recurrence_duration_minutes: eventRes.value?.data?.recurrence_duration_minutes ?? 180,
  recurrence_timezone: eventRes.value?.data?.recurrence_timezone || 'Asia/Manila',
  doors_open_time: eventRes.value?.data?.doors_open_time || '6:30 PM',
  special_date_override: eventRes.value?.data?.special_date_override || '',
  is_cancelled: Boolean(eventRes.value?.data?.is_cancelled),
  countdown_enabled: eventRes.value?.data?.countdown_enabled !== false,
  venue_name: eventRes.value?.data?.venue_name || '',
  venue_room: eventRes.value?.data?.venue_room || '',
  venue_address: eventRes.value?.data?.venue_address || '',
  venue_city_state_zip: eventRes.value?.data?.venue_city_state_zip || '',
  venue_map_url: eventRes.value?.data?.venue_map_url || '',
  venue_notes: eventRes.value?.data?.venue_notes || '',
  speaker_name: eventRes.value?.data?.speaker_name || '',
  speaker_title: eventRes.value?.data?.speaker_title || '',
  speaker_bio: eventRes.value?.data?.speaker_bio || ''
})

watch(form, () => markDirty(), { deep: true })

const isSaving = ref(false)
const errors = ref<Record<string, string>>({})

const weekdays = [
  { value: 0, label: 'Sunday' },
  { value: 1, label: 'Monday' },
  { value: 2, label: 'Tuesday' },
  { value: 3, label: 'Wednesday' },
  { value: 4, label: 'Thursday' },
  { value: 5, label: 'Friday' },
  { value: 6, label: 'Saturday' }
]

const handleSave = async () => {
  errors.value = {}

  const chips = form.value.reassurance_chips_text
    .split(',')
    .map(s => s.trim())
    .filter(Boolean)

  const payload = {
    title: form.value.title,
    subtitle: form.value.subtitle,
    one_line_welcome: form.value.one_line_welcome,
    no_pressure_line: form.value.no_pressure_line,
    reassurance_chips: chips,
    recurrence_weekday: Number(form.value.recurrence_weekday),
    recurrence_hour: Number(form.value.recurrence_hour),
    recurrence_minute: Number(form.value.recurrence_minute),
    recurrence_duration_minutes: Number(form.value.recurrence_duration_minutes),
    recurrence_timezone: form.value.recurrence_timezone,
    doors_open_time: form.value.doors_open_time,
    special_date_override: form.value.special_date_override ? form.value.special_date_override : null,
    is_cancelled: Boolean(form.value.is_cancelled),
    countdown_enabled: Boolean(form.value.countdown_enabled),
    venue_name: form.value.venue_name,
    venue_room: form.value.venue_room,
    venue_address: form.value.venue_address,
    venue_city_state_zip: form.value.venue_city_state_zip,
    venue_map_url: form.value.venue_map_url,
    venue_notes: form.value.venue_notes,
    speaker_name: form.value.speaker_name,
    speaker_title: form.value.speaker_title,
    speaker_bio: form.value.speaker_bio
  }

  const validation = eventDataSchema.safeParse(payload)
  if (!validation.success) {
    for (const issue of validation.error.issues) {
      const field = issue.path[0] as string
      errors.value[field] = issue.message
    }
    showToast('Please correct the highlighted form errors.', 'warning')
    return
  }

  isSaving.value = true
  try {
    await $fetch('/api/admin/event', {
      method: 'PUT',
      body: payload
    })

    // Revalidate public cache
    await $fetch('/api/revalidate', { method: 'POST' }).catch(() => {})

    markClean()
    showToast('Event details and schedule saved successfully!', 'success')
    await refresh()
  } catch (err: any) {
    showToast(err?.statusMessage || 'Failed to save event details.', 'error')
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
          Event & Schedule Editor
        </h1>
        <p class="text-xs sm:text-sm text-surface-300">
          Configure the recurring gathering time, venue location, speaker info, and countdown.
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
          <svg v-if="isSaving" class="animate-spin h-3.5 w-3.5" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>{{ isSaving ? 'Saving...' : 'Save Changes' }}</span>
        </button>
      </div>
    </div>

    <!-- Section 1: Recurring Schedule & Date Overrides -->
    <div class="p-6 sm:p-8 rounded-3xl bg-navy-900 border border-white/15 space-y-6">
      <div class="pb-4 border-b border-white/10 flex items-center justify-between">
        <div>
          <h2 class="font-sans font-black text-lg uppercase tracking-tight text-white">
            1. Recurring Schedule & Overrides
          </h2>
          <p class="text-xs text-surface-400">Public site computes the next occurrence automatically</p>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <!-- Day of Week -->
        <div class="space-y-1.5">
          <label class="block text-xs font-black uppercase tracking-wider text-surface-200">
            Day of Week
          </label>
          <select
            v-model.number="form.recurrence_weekday"
            class="w-full px-4 py-2.5 rounded-xl bg-navy-950 border border-white/15 text-white text-xs font-semibold focus:border-accent-500 focus:outline-none"
          >
            <option v-for="d in weekdays" :key="d.value" :value="d.value">{{ d.label }}</option>
          </select>
        </div>

        <!-- Start Hour (24h) -->
        <div class="space-y-1.5">
          <label class="block text-xs font-black uppercase tracking-wider text-surface-200">
            Start Time Hour (24h)
          </label>
          <input
            v-model.number="form.recurrence_hour"
            type="number"
            min="0"
            max="23"
            class="w-full px-4 py-2.5 rounded-xl bg-navy-950 border border-white/15 text-white text-xs font-semibold focus:border-accent-500 focus:outline-none"
          />
        </div>

        <!-- Start Minute -->
        <div class="space-y-1.5">
          <label class="block text-xs font-black uppercase tracking-wider text-surface-200">
            Start Minute
          </label>
          <input
            v-model.number="form.recurrence_minute"
            type="number"
            min="0"
            max="59"
            class="w-full px-4 py-2.5 rounded-xl bg-navy-950 border border-white/15 text-white text-xs font-semibold focus:border-accent-500 focus:outline-none"
          />
        </div>

        <!-- Duration in Minutes -->
        <div class="space-y-1.5">
          <label class="block text-xs font-black uppercase tracking-wider text-surface-200">
            Duration (Minutes)
          </label>
          <input
            v-model.number="form.recurrence_duration_minutes"
            type="number"
            min="30"
            step="15"
            class="w-full px-4 py-2.5 rounded-xl bg-navy-950 border border-white/15 text-white text-xs font-semibold focus:border-accent-500 focus:outline-none"
          />
        </div>

        <!-- Doors Open Label -->
        <div class="space-y-1.5">
          <label class="block text-xs font-black uppercase tracking-wider text-surface-200">
            Doors Open Time Text
          </label>
          <input
            v-model="form.doors_open_time"
            type="text"
            placeholder="6:30 PM"
            class="w-full px-4 py-2.5 rounded-xl bg-navy-950 border border-white/15 text-white text-xs font-semibold focus:border-accent-500 focus:outline-none"
          />
        </div>

        <!-- One-Off Special Date Override -->
        <div class="space-y-1.5 lg:col-span-2">
          <label class="block text-xs font-black uppercase tracking-wider text-surface-200">
            Special Date Override (Optional ISO / YYYY-MM-DD)
          </label>
          <input
            v-model="form.special_date_override"
            type="text"
            placeholder="e.g. 2026-11-20T19:00:00 (Leave empty for normal weekly)"
            class="w-full px-4 py-2.5 rounded-xl bg-navy-950 border border-white/15 text-white text-xs font-semibold focus:border-accent-500 focus:outline-none"
          />
        </div>

        <!-- Toggles -->
        <div class="space-y-3 pt-6">
          <label class="flex items-center gap-2 cursor-pointer">
            <input v-model="form.countdown_enabled" type="checkbox" class="rounded text-accent-500" />
            <span class="text-xs font-bold text-white">Enable Countdown Strip</span>
          </label>
          <label class="flex items-center gap-2 cursor-pointer">
            <input v-model="form.is_cancelled" type="checkbox" class="rounded text-red-500" />
            <span class="text-xs font-bold text-red-400">Cancel Next Gathering</span>
          </label>
        </div>
      </div>
    </div>

    <!-- Section 2: Event Copy & Chips -->
    <div class="p-6 sm:p-8 rounded-3xl bg-navy-900 border border-white/15 space-y-6">
      <div class="pb-4 border-b border-white/10">
        <h2 class="font-sans font-black text-lg uppercase tracking-tight text-white">
          2. Event Title & Reassurance Copy
        </h2>
      </div>

      <div class="space-y-4">
        <div class="space-y-1.5">
          <label class="block text-xs font-black uppercase tracking-wider text-surface-200">Event Title</label>
          <input
            v-model="form.title"
            type="text"
            class="w-full px-4 py-2.5 rounded-xl bg-navy-950 border border-white/15 text-white text-sm font-bold focus:border-accent-500 focus:outline-none"
          />
          <p v-if="errors.title" class="text-xs text-red-400">{{ errors.title }}</p>
        </div>

        <div class="space-y-1.5">
          <label class="block text-xs font-black uppercase tracking-wider text-surface-200">Event Subtitle</label>
          <textarea
            v-model="form.subtitle"
            rows="2"
            class="w-full px-4 py-2.5 rounded-xl bg-navy-950 border border-white/15 text-white text-xs font-medium focus:border-accent-500 focus:outline-none leading-relaxed"
          ></textarea>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div class="space-y-1.5">
            <label class="block text-xs font-black uppercase tracking-wider text-surface-200">One-Line Welcome</label>
            <input
              v-model="form.one_line_welcome"
              type="text"
              class="w-full px-4 py-2.5 rounded-xl bg-navy-950 border border-white/15 text-white text-xs font-medium focus:border-accent-500 focus:outline-none"
            />
          </div>

          <div class="space-y-1.5">
            <label class="block text-xs font-black uppercase tracking-wider text-surface-200">No Pressure Line</label>
            <input
              v-model="form.no_pressure_line"
              type="text"
              class="w-full px-4 py-2.5 rounded-xl bg-navy-950 border border-white/15 text-white text-xs font-medium focus:border-accent-500 focus:outline-none"
            />
          </div>
        </div>

        <div class="space-y-1.5">
          <label class="block text-xs font-black uppercase tracking-wider text-surface-200">
            Reassurance Chips (comma-separated)
          </label>
          <input
            v-model="form.reassurance_chips_text"
            type="text"
            placeholder="Free, All are welcome, Bring a friend, Come as you are"
            class="w-full px-4 py-2.5 rounded-xl bg-navy-950 border border-white/15 text-white text-xs font-medium focus:border-accent-500 focus:outline-none"
          />
        </div>
      </div>
    </div>

    <!-- Section 3: Venue Details -->
    <div class="p-6 sm:p-8 rounded-3xl bg-navy-900 border border-white/15 space-y-6">
      <div class="pb-4 border-b border-white/10">
        <h2 class="font-sans font-black text-lg uppercase tracking-tight text-white">
          3. Venue & Directions
        </h2>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div class="space-y-1.5">
          <label class="block text-xs font-black uppercase tracking-wider text-surface-200">Venue Name</label>
          <input
            v-model="form.venue_name"
            type="text"
            class="w-full px-4 py-2.5 rounded-xl bg-navy-950 border border-white/15 text-white text-xs font-semibold focus:border-accent-500 focus:outline-none"
          />
        </div>

        <div class="space-y-1.5">
          <label class="block text-xs font-black uppercase tracking-wider text-surface-200">Room / Hall</label>
          <input
            v-model="form.venue_room"
            type="text"
            class="w-full px-4 py-2.5 rounded-xl bg-navy-950 border border-white/15 text-white text-xs font-semibold focus:border-accent-500 focus:outline-none"
          />
        </div>

        <div class="space-y-1.5 sm:col-span-2">
          <label class="block text-xs font-black uppercase tracking-wider text-surface-200">Address</label>
          <input
            v-model="form.venue_address"
            type="text"
            class="w-full px-4 py-2.5 rounded-xl bg-navy-950 border border-white/15 text-white text-xs font-semibold focus:border-accent-500 focus:outline-none"
          />
        </div>

        <div class="space-y-1.5">
          <label class="block text-xs font-black uppercase tracking-wider text-surface-200">City / State / Zip</label>
          <input
            v-model="form.venue_city_state_zip"
            type="text"
            class="w-full px-4 py-2.5 rounded-xl bg-navy-950 border border-white/15 text-white text-xs font-semibold focus:border-accent-500 focus:outline-none"
          />
        </div>

        <div class="space-y-1.5">
          <label class="block text-xs font-black uppercase tracking-wider text-surface-200">Google Maps URL</label>
          <input
            v-model="form.venue_map_url"
            type="url"
            class="w-full px-4 py-2.5 rounded-xl bg-navy-950 border border-white/15 text-white text-xs font-semibold focus:border-accent-500 focus:outline-none"
          />
          <p v-if="errors.venue_map_url" class="text-xs text-red-400">{{ errors.venue_map_url }}</p>
        </div>

        <div class="space-y-1.5 sm:col-span-2">
          <label class="block text-xs font-black uppercase tracking-wider text-surface-200">
            Landmark & Parking Directions Note
          </label>
          <textarea
            v-model="form.venue_notes"
            rows="2"
            class="w-full px-4 py-2.5 rounded-xl bg-navy-950 border border-white/15 text-white text-xs font-medium focus:border-accent-500 focus:outline-none"
          ></textarea>
        </div>
      </div>
    </div>

    <!-- Section 4: Speaker Information -->
    <div class="p-6 sm:p-8 rounded-3xl bg-navy-900 border border-white/15 space-y-6">
      <div class="pb-4 border-b border-white/10">
        <h2 class="font-sans font-black text-lg uppercase tracking-tight text-white">
          4. Speaker / Leaders Profile
        </h2>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div class="space-y-1.5">
          <label class="block text-xs font-black uppercase tracking-wider text-surface-200">Speaker Name</label>
          <input
            v-model="form.speaker_name"
            type="text"
            class="w-full px-4 py-2.5 rounded-xl bg-navy-950 border border-white/15 text-white text-xs font-semibold focus:border-accent-500 focus:outline-none"
          />
        </div>

        <div class="space-y-1.5">
          <label class="block text-xs font-black uppercase tracking-wider text-surface-200">Speaker Title</label>
          <input
            v-model="form.speaker_title"
            type="text"
            class="w-full px-4 py-2.5 rounded-xl bg-navy-950 border border-white/15 text-white text-xs font-semibold focus:border-accent-500 focus:outline-none"
          />
        </div>

        <div class="space-y-1.5 sm:col-span-2">
          <label class="block text-xs font-black uppercase tracking-wider text-surface-200">Bio</label>
          <textarea
            v-model="form.speaker_bio"
            rows="3"
            class="w-full px-4 py-2.5 rounded-xl bg-navy-950 border border-white/15 text-white text-xs font-medium focus:border-accent-500 focus:outline-none"
          ></textarea>
        </div>
      </div>
    </div>
  </div>
</template>

