<script setup lang="ts">
import { computed } from 'vue'
import { useSiteContent } from '~/composables/useSiteContent'

definePageMeta({
  layout: 'admin',
  middleware: 'admin-auth'
})

const { content, nextSession } = useSiteContent()
const { data: activityData } = await useAsyncData('admin-activity', () => $fetch('/api/admin/activity'))

// Content Audit Checklist
const auditChecklist = computed(() => {
  const ev = content.value.event
  const st = content.value.siteSettings
  const ct = content.value.contacts
  const sun = content.value.sunday

  return [
    {
      title: 'Event Venue Details',
      status: ev.venue.address && !ev.venue.address.includes('TBA') ? 'complete' : 'attention',
      note: ev.venue.address.includes('TBA') ? 'Venue address contains TBA' : 'Confirmed venue: ' + ev.venue.name
    },
    {
      title: 'Speaker & Discussion Leaders',
      status: ev.speaker.name ? 'complete' : 'attention',
      note: ev.speaker.name ? `${ev.speaker.name} (${ev.speaker.title})` : 'Speaker details needed'
    },
    {
      title: 'Contact Phone Number',
      status: ct.phone && !ct.displayPhone.includes('TBA') ? 'complete' : 'attention',
      note: ct.displayPhone.includes('TBA') ? 'Display phone is set to TBA' : ct.displayPhone
    },
    {
      title: 'Social & Messenger Links',
      status: ct.messengerUrl && ct.instagramUrl ? 'complete' : 'attention',
      note: ct.instagramHandle + ' active'
    },
    {
      title: 'Sunday Worship Venues',
      status: sun.venues && sun.venues.length > 0 ? 'complete' : 'attention',
      note: `${sun.venues?.length || 0} regional venues configured`
    },
    {
      title: 'SEO Meta & OG Image',
      status: st.seoTitle && st.seoOgImage ? 'complete' : 'attention',
      note: st.seoTitle ? 'Title & description set' : 'Missing SEO tags'
    }
  ]
})
</script>

<template>
  <div class="space-y-8 text-left">
    <!-- Top Greeting & Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
      <div>
        <h1 class="font-sans font-black text-2xl sm:text-3xl uppercase tracking-tight text-white">
          Admin Dashboard
        </h1>
        <p class="text-xs sm:text-sm text-surface-300">
          Overview of {{ content.siteSettings.groupName }} content, schedule, and activity.
        </p>
      </div>

      <div class="flex items-center gap-2">
        <NuxtLink
          to="/admin/event"
          class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-accent-500 hover:bg-accent-600 text-navy-950 font-black text-xs uppercase tracking-wider shadow-soft transition-all"
        >
          <span>Edit Event</span>
          <span>→</span>
        </NuxtLink>
      </div>
    </div>

    <!-- Top Bento Grid: Next Gathering Banner & Stat Cards -->
    <div class="grid grid-cols-1 md:grid-cols-12 gap-6">
      <!-- Next Event Card (8 cols) -->
      <div class="md:col-span-8 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-navy-900 to-navy-850 border border-white/15 shadow-soft-lg space-y-5 relative overflow-hidden">
        <div class="absolute -top-12 -right-12 w-48 h-48 bg-accent-500/10 rounded-full blur-2xl pointer-events-none"></div>

        <div class="flex items-center justify-between">
          <span class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest bg-accent-500/15 text-accent-400 border border-accent-500/30">
            <span class="w-2 h-2 rounded-full bg-accent-500 animate-pulse"></span>
            <span>Next Scheduled Session</span>
          </span>

          <span class="text-xs font-bold text-surface-400">
            Timezone: Asia/Manila (UTC+8)
          </span>
        </div>

        <div class="space-y-2">
          <h2 class="font-sans font-black text-3xl sm:text-4xl uppercase tracking-tight text-white">
            {{ nextSession.dateLabel }}
          </h2>
          <p class="text-accent-400 font-extrabold text-lg">
            {{ nextSession.timeLabel }}
          </p>
          <p class="text-sm text-surface-300">
            Venue: <strong class="text-white">{{ content.event.venue.name }}</strong> ({{ content.event.venue.room }}) · Doors open {{ content.event.doorsOpenTime }}
          </p>
        </div>

        <div class="pt-4 border-t border-white/10 flex flex-wrap items-center gap-3 text-xs">
          <span class="px-3 py-1 rounded-xl bg-white/5 border border-white/10 text-surface-200">
            Schedule: {{ content.event.doorsOpenTime }} Doors · 7:00 PM Start
          </span>
          <span class="px-3 py-1 rounded-xl bg-white/5 border border-white/10 text-surface-200">
            Countdown: {{ content.event.countdownEnabled ? 'Enabled' : 'Disabled' }}
          </span>
          <span v-if="content.event.specialDateOverride" class="px-3 py-1 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold">
            Date Override Active
          </span>
        </div>
      </div>

      <!-- Quick Metrics Summary (4 cols) -->
      <div class="md:col-span-4 grid grid-cols-2 gap-4">
        <div class="p-5 rounded-3xl bg-navy-900 border border-white/15 flex flex-col justify-between">
          <span class="text-xs font-bold uppercase tracking-wider text-surface-400">Sections</span>
          <p class="font-sans font-black text-3xl text-white my-2">
            {{ content.sections?.filter(s => s.isVisible).length || 11 }} / {{ content.sections?.length || 11 }}
          </p>
          <span class="text-[11px] text-accent-400 font-semibold">Active & Visible</span>
        </div>

        <div class="p-5 rounded-3xl bg-navy-900 border border-white/15 flex flex-col justify-between">
          <span class="text-xs font-bold uppercase tracking-wider text-surface-400">Gallery</span>
          <p class="font-sans font-black text-3xl text-white my-2">
            {{ content.gallery?.length || 6 }}
          </p>
          <span class="text-[11px] text-emerald-400 font-semibold">Curated Photos</span>
        </div>

        <div class="p-5 rounded-3xl bg-navy-900 border border-white/15 flex flex-col justify-between">
          <span class="text-xs font-bold uppercase tracking-wider text-surface-400">Sunday</span>
          <p class="font-sans font-black text-3xl text-white my-2">
            {{ content.sunday.venues?.length || 3 }}
          </p>
          <span class="text-[11px] text-coral-400 font-semibold">Regional Venues</span>
        </div>

        <div class="p-5 rounded-3xl bg-navy-900 border border-white/15 flex flex-col justify-between">
          <span class="text-xs font-bold uppercase tracking-wider text-surface-400">Notice</span>
          <p class="font-sans font-black text-lg text-white my-2 truncate">
            {{ content.announcement ? 'Active' : 'Off' }}
          </p>
          <span class="text-[11px] text-surface-400 font-semibold">Top Banner</span>
        </div>
      </div>
    </div>

    <!-- Content Readiness & Audit Checklist -->
    <div class="p-6 sm:p-8 rounded-3xl bg-navy-900 border border-white/15 space-y-6">
      <div class="flex items-center justify-between pb-4 border-b border-white/10">
        <div>
          <h3 class="font-sans font-black text-lg uppercase tracking-tight text-white">
            Content Audit & Organizer Checklist
          </h3>
          <p class="text-xs text-surface-300">
            Verify placeholder values and contact links before upcoming sessions.
          </p>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="(item, idx) in auditChecklist"
          :key="idx"
          class="p-4 rounded-2xl border transition-all"
          :class="item.status === 'complete'
            ? 'bg-white/5 border-white/10'
            : 'bg-amber-500/10 border-amber-500/30'"
        >
          <div class="flex items-center justify-between mb-1.5">
            <span class="font-sans font-black text-sm uppercase tracking-tight text-white">
              {{ item.title }}
            </span>
            <span
              class="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider"
              :class="item.status === 'complete'
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'"
            >
              {{ item.status === 'complete' ? 'Ready' : 'Check' }}
            </span>
          </div>
          <p class="text-xs text-surface-300">
            {{ item.note }}
          </p>
        </div>
      </div>
    </div>

    <!-- Recent Activity Log -->
    <div class="p-6 sm:p-8 rounded-3xl bg-navy-900 border border-white/15 space-y-4">
      <div class="flex items-center justify-between pb-3 border-b border-white/10">
        <h3 class="font-sans font-black text-lg uppercase tracking-tight text-white">
          Recent Activity Log
        </h3>
        <span class="text-xs text-surface-400">Who changed what & when</span>
      </div>

      <div v-if="activityData?.logs && activityData.logs.length > 0" class="divide-y divide-white/5 text-xs">
        <div
          v-for="log in activityData.logs.slice(0, 8)"
          :key="log.id"
          class="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
        >
          <div class="flex items-center gap-2.5">
            <span class="px-2 py-0.5 rounded-md font-mono text-[10px] uppercase font-black bg-white/10 text-accent-400">
              {{ log.action }}
            </span>
            <span class="text-white font-semibold uppercase">{{ log.entityType }}</span>
            <span v-if="log.details?.title || log.details?.message" class="text-surface-300">
              - {{ log.details.title || log.details.message }}
            </span>
          </div>
          <div class="flex items-center gap-3 text-surface-400 text-[11px]">
            <span>{{ log.userEmail }}</span>
            <span>•</span>
            <span>{{ new Date(log.createdAt).toLocaleString() }}</span>
          </div>
        </div>
      </div>
      <p v-else class="text-xs text-surface-400 py-4">No recent activity recorded.</p>
    </div>
  </div>
</template>

