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

const getMessengerShare = () => {
  return `https://m.me/manilaicc`
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
  <section id="share" class="py-16 sm:py-24 bg-gradient-to-b from-white via-cream-50 to-cream-100/70 relative overflow-hidden">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
      <!-- Section Label -->
      <div class="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold-700 mb-3">
        <span class="w-6 h-px bg-gold-500"></span>
        <span>Bring Someone Special</span>
        <span class="w-6 h-px bg-gold-500"></span>
      </div>

      <h2 class="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-navy-950 tracking-tight mb-4">
        Bring a Friend
      </h2>

      <p class="text-navy-700 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-8 sm:mb-10">
        Know a friend, classmate, colleague, or family member who could use an encouraging message, friendly disciples, or peace in their life? Inviting someone takes just two taps.
      </p>

      <!-- Invitation Card Preview Box (Digital Share Card) -->
      <div class="max-w-xl mx-auto bg-gradient-to-br from-navy-950 to-navy-900 text-white rounded-3xl p-6 sm:p-8 border border-white/20 shadow-card mb-8 text-left relative overflow-hidden">
        <!-- Golden glow corner -->
        <div class="absolute -right-12 -bottom-12 w-48 h-48 rounded-full bg-gold-500/20 blur-2xl pointer-events-none"></div>

        <div class="flex items-center justify-between gap-3 mb-5">
          <div class="flex items-center gap-3">
            <!-- MICC Logo mini pill -->
            <div class="px-2.5 py-1 rounded-xl bg-white/95 border border-white/80 flex items-center justify-center">
              <img :src="eventConfig.logo" :alt="eventConfig.logoAlt" class="h-6 w-auto object-contain" />
            </div>
            <div>
              <span class="text-[10px] font-bold uppercase tracking-wider text-gold-300 block">Digital Invitation</span>
              <span class="text-sm font-serif font-bold text-white">{{ eventConfig.groupName }}</span>
            </div>
          </div>

          <span class="text-xs text-coral-300 font-semibold">
            {{ eventConfig.hashtag }}
          </span>
        </div>

        <p class="font-script text-2xl sm:text-3xl text-gold-300 mb-1">
          You're Invited!
        </p>

        <p class="font-serif text-xl sm:text-2xl text-white font-bold mb-2">
          "{{ eventConfig.eventTitle }}"
        </p>

        <p class="text-xs sm:text-sm text-cream-200 leading-relaxed mb-4">
          {{ eventConfig.formattedDateTime }} • {{ eventConfig.venue.name }}
        </p>

        <p class="text-xs text-cream-300/80 italic mb-6">
          {{ eventConfig.tagline }} {{ eventConfig.noPressureLine }}
        </p>

        <!-- Main Share Action Button -->
        <button
          type="button"
          class="w-full inline-flex items-center justify-center gap-3 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 hover:from-gold-500 hover:to-gold-700 text-navy-950 font-bold text-sm sm:text-base shadow-glow active:scale-[0.98] transition-all"
          @click="handleShare"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/>
          </svg>
          <span>Share This Invitation Card</span>
        </button>

        <!-- Instagram Tag in Share Card -->
        <div class="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-cream-300">
          <a
            :href="eventConfig.instagramUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <svg class="w-3.5 h-3.5 text-coral-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            <span>Instagram: {{ eventConfig.instagramHandle }}</span>
          </a>
          <span>{{ eventConfig.parentRegion }}</span>
        </div>
      </div>

      <!-- Quick Platform Shortcuts -->
      <div class="flex flex-wrap items-center justify-center gap-3 text-xs font-semibold text-navy-800">
        <!-- Copy Link button -->
        <button
          type="button"
          class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-gold-50 border border-cream-300 shadow-xs transition-colors"
          @click="copyToClipboard"
        >
          <svg class="w-4 h-4 text-gold-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"/>
          </svg>
          <span>{{ copied ? 'Link Copied!' : 'Copy Link' }}</span>
        </button>

        <!-- Messenger Link -->
        <a
          :href="getMessengerShare()"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-blue-50 border border-cream-300 shadow-xs transition-colors"
        >
          <span class="w-2 h-2 rounded-full bg-blue-500"></span>
          <span>Messenger</span>
        </a>

        <!-- Instagram -->
        <a
          :href="eventConfig.instagramUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-coral-50 border border-cream-300 shadow-xs transition-colors"
        >
          <span class="w-2 h-2 rounded-full bg-coral-500"></span>
          <span>Instagram ({{ eventConfig.instagramHandle }})</span>
        </a>

        <!-- WhatsApp -->
        <a
          :href="getWhatsAppLink()"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-emerald-50 border border-cream-300 shadow-xs transition-colors"
        >
          <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span>WhatsApp</span>
        </a>

        <!-- SMS -->
        <a
          :href="getSmsLink()"
          class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-sky-50 border border-cream-300 shadow-xs transition-colors"
        >
          <span class="w-2 h-2 rounded-full bg-sky-500"></span>
          <span>Text / SMS</span>
        </a>
      </div>
    </div>
  </section>
</template>
