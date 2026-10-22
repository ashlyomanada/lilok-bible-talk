<script setup lang="ts">
import { ref } from 'vue'
import { eventConfig } from '~/config/event'
import { useToast } from '~/composables/useToast'

const { showToast } = useToast()
const copied = ref(false)

const getShareUrl = () => {
  if (typeof window !== 'undefined') {
    return window.location.href.split('#')[0]
  }
  return eventConfig.seo.canonicalUrl
}

const handleShare = async () => {
  const url = getShareUrl()
  const shareData = {
    title: "You're invited to Lilok Bible Talk",
    text: `Hey! You're warmly invited to Lilok Bible Talk (${eventConfig.parentChurchName} Central Region) on ${eventConfig.formattedDateTime}. ${eventConfig.tagline} Follow ${eventConfig.instagramHandle}! ${eventConfig.hashtag}`,
    url
  }

  if (typeof navigator !== 'undefined' && navigator.share) {
    try {
      await navigator.share(shareData)
      showToast('Invitation shared successfully!', 'success')
      return
    } catch (err: any) {
      if (err.name === 'AbortError') return
    }
  }

  copyToClipboard()
}

const copyToClipboard = async () => {
  const url = getShareUrl()
  try {
    if (navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(url)
    } else {
      const textArea = document.createElement('textarea')
      textArea.value = url
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
    }
    copied.value = true
    showToast('Invitation link copied to clipboard!', 'success')
    setTimeout(() => {
      copied.value = false
    }, 3000)
  } catch (err) {
    showToast('Could not copy link automatically', 'warning')
  }
}

const getWhatsAppLink = () => {
  const text = encodeURIComponent(
    `Hey! Check out this Bible Talk: "${eventConfig.groupName}: ${eventConfig.eventTitle}" (${eventConfig.parentChurchName} Central Region) on ${eventConfig.formattedDateTime}. Free & welcoming! ${eventConfig.tagline} ` + getShareUrl()
  )
  return `https://api.whatsapp.com/send?text=${text}`
}

const getSmsLink = () => {
  const text = encodeURIComponent(
    `Hey! You're invited to Lilok Bible Talk (${eventConfig.parentChurchName}): ${getShareUrl()}`
  )
  return `sms:?&body=${text}`
}
</script>

<template>
  <section id="share" class="py-20 sm:py-28 bg-navy-950 text-white relative overflow-hidden border-t border-white/10">
    <!-- Ambient subtle background glow -->
    <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div class="w-[500px] h-[300px] bg-accent-500/10 blur-[100px] rounded-full"></div>
    </div>

    <div class="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
      <!-- Section Tag Pill -->
      <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-accent-400 text-xs font-black uppercase tracking-widest mb-6 shadow-soft">
        <svg class="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/>
        </svg>
        <span>Bring Someone Special</span>
      </div>

      <!-- Headline -->
      <h2 class="font-sans font-black text-4xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-white mb-4">
        Bring a Friend
      </h2>

      <p class="text-surface-300 text-base sm:text-lg font-normal leading-relaxed max-w-2xl mx-auto mb-10">
        Know a classmate, colleague, family member, or friend who could use an encouraging word, genuine faith, and true brothers and sisters? Inviting someone takes just two taps.
      </p>

      <!-- Digital Pass Card Preview -->
      <div class="max-w-md mx-auto p-6 sm:p-7 rounded-4xl bg-navy-900 border border-white/15 shadow-soft-xl text-left mb-8 relative overflow-hidden">
        <div class="flex items-center justify-between pb-4 border-b border-white/10">
          <div class="flex items-center gap-2.5">
            <img
              src="/images/mnl-logo-white.png"
              :alt="eventConfig.logoAlt"
              class="h-6 w-auto object-contain"
            />
            <span class="font-black text-xs uppercase tracking-wider text-white">{{ eventConfig.groupName }}</span>
          </div>
          <span class="text-[10px] font-black uppercase tracking-wider text-accent-400 bg-white/10 px-2.5 py-0.5 rounded-full">
            VIP Invite
          </span>
        </div>

        <div class="py-4 space-y-1">
          <p class="text-xs font-black uppercase tracking-wider text-surface-400">You're Invited To</p>
          <p class="font-sans font-black text-xl text-white uppercase tracking-tight">"{{ eventConfig.eventTitle }}"</p>
          <p class="text-xs text-accent-400 font-semibold pt-1">{{ eventConfig.formattedDateTime }}</p>
          <p class="text-xs text-surface-300">{{ eventConfig.venue.name }}</p>
        </div>

        <div class="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-surface-400">
          <span>{{ eventConfig.hashtag }}</span>
          <span class="text-white font-bold">{{ eventConfig.instagramHandle }}</span>
        </div>
      </div>

      <!-- Bold Primary Web Share Button -->
      <div class="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-8">
        <button
          type="button"
          class="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-accent-500 hover:bg-accent-600 text-navy-950 font-black text-sm uppercase tracking-wider shadow-soft hover:shadow-glow-gold hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-200"
          @click="handleShare"
        >
          <svg class="w-5 h-5 fill-none stroke-current" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/>
          </svg>
          <span>Share Invitation</span>
        </button>

        <button
          type="button"
          class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-white/10 hover:bg-white/15 text-white font-black text-sm uppercase tracking-wider border border-white/20 active:scale-95 transition-all"
          @click="copyToClipboard"
        >
          <svg v-if="!copied" class="w-4 h-4 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"/>
          </svg>
          <svg v-else class="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
          </svg>
          <span>{{ copied ? 'Link Copied!' : 'Copy Link' }}</span>
        </button>
      </div>

      <!-- Quick Platform Shortcuts -->
      <div class="flex flex-wrap items-center justify-center gap-3">
        <!-- Messenger -->
        <a
          :href="eventConfig.contact.messengerUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-surface-200 hover:text-white border border-white/10 text-xs font-bold uppercase tracking-wider transition-colors"
        >
          <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M12 2C6.477 2 2 6.145 2 11.258c0 2.91 1.455 5.517 3.735 7.199V22l3.418-1.875c.91.252 1.873.39 2.847.39 5.523 0 10-4.145 10-9.257C22 6.145 17.523 2 12 2zm1.002 12.443l-2.56-2.73-5.002 2.73 5.498-5.836 2.624 2.73 4.938-2.73-5.498 5.836z"/>
          </svg>
          <span>Messenger</span>
        </a>

        <!-- WhatsApp -->
        <a
          :href="getWhatsAppLink()"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-surface-200 hover:text-white border border-white/10 text-xs font-bold uppercase tracking-wider transition-colors"
        >
          <span>WhatsApp</span>
        </a>

        <!-- SMS -->
        <a
          :href="getSmsLink()"
          class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-surface-200 hover:text-white border border-white/10 text-xs font-bold uppercase tracking-wider transition-colors"
        >
          <span>Text Message</span>
        </a>
      </div>
    </div>
  </section>
</template>
