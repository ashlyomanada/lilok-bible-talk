<script setup lang="ts">
import { eventConfig } from '~/config/event'
import { useToast } from '~/composables/useToast'

const { showToast } = useToast()

const handleShare = async () => {
  const url = typeof window !== 'undefined' ? window.location.href.split('#')[0] : eventConfig.seo.canonicalUrl
  const shareData = {
    title: "You're invited to Lilok Bible Talk",
    text: `You're warmly invited to Lilok Bible Talk (${eventConfig.parentChurchName} Central Region) on ${eventConfig.formattedDateTime}. ${eventConfig.tagline} Follow ${eventConfig.instagramHandle}! ${eventConfig.hashtag}`,
    url
  }

  if (typeof navigator !== 'undefined' && navigator.share) {
    try {
      await navigator.share(shareData)
      showToast('Invitation shared successfully!', 'success')
      return
    } catch (e: any) {
      if (e.name === 'AbortError') return
    }
  }

  try {
    if (navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(url)
      showToast('Invitation link copied to clipboard!', 'success')
    } else {
      const target = document.querySelector('#share')
      target?.scrollIntoView({ behavior: 'smooth' })
    }
  } catch (err) {
    const target = document.querySelector('#share')
    target?.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<template>
  <aside
    class="fixed bottom-0 inset-x-0 z-40 md:hidden bg-navy-950/92 backdrop-blur-xl border-t border-white/15 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-card"
    aria-label="Quick Actions"
  >
    <div class="flex items-center gap-2.5 max-w-md mx-auto">
      <!-- RSVP / Message Us -->
      <a
        :href="eventConfig.contact.messengerUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="flex-1 inline-flex items-center justify-center gap-2 py-3 px-3 rounded-2xl bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 active:scale-[0.98] text-navy-950 font-bold text-xs sm:text-sm shadow-warm transition-transform"
      >
        <svg class="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
          <path d="M12 2C6.477 2 2 6.145 2 11.258c0 2.91 1.455 5.517 3.735 7.199V22l3.418-1.875c.91.252 1.873.39 2.847.39 5.523 0 10-4.145 10-9.257C22 6.145 17.523 2 12 2zm1.002 12.443l-2.56-2.73-5.002 2.73 5.498-5.836 2.624 2.73 4.938-2.73-5.498 5.836z"/>
        </svg>
        <span class="truncate">RSVP / Message Us</span>
      </a>

      <!-- Share Invitation -->
      <button
        type="button"
        class="flex-1 inline-flex items-center justify-center gap-2 py-3 px-3 rounded-2xl bg-white/15 hover:bg-white/25 active:scale-[0.98] text-white font-semibold text-xs sm:text-sm border border-white/25 backdrop-blur-md transition-transform"
        @click="handleShare"
      >
        <svg class="w-4 h-4 text-coral-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/>
        </svg>
        <span class="truncate">Share Invitation</span>
      </button>
    </div>
  </aside>
</template>
