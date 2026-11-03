import { computed } from 'vue'
import { eventConfig, SCHEDULE } from '~/config/event'

const MANILA_OFFSET_MS = 8 * 60 * 60 * 1000 // Asia/Manila is UTC+8
const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]
const pad = (n: number) => String(n).padStart(2, '0')

export function useSiteContent() {
  const { data: rawContent, pending, refresh } = useAsyncData(
    'site-content',
    () => $fetch('/api/content'),
    {
      default: () => ({
        siteSettings: {
          groupName: eventConfig.groupName,
          tagline: eventConfig.tagline,
          hashtag: eventConfig.hashtag,
          logoUrl: eventConfig.logo,
          logoAlt: eventConfig.logoAlt,
          churchFullName: eventConfig.churchFullName,
          parentChurchName: eventConfig.parentChurchName,
          parentRegion: eventConfig.parentRegion,
          soldOutBadge: eventConfig.soldOutBadge,
          aboutChurch: eventConfig.aboutChurch,
          footerBlessing: 'May God bless and protect you and your loved ones this week. Wherever life finds you right now, remember that you have a seat at our table and brothers and sisters who care.',
          seoTitle: eventConfig.seo.title,
          seoDescription: eventConfig.seo.description,
          seoOgImage: eventConfig.seo.ogImage,
          canonicalUrl: eventConfig.seo.canonicalUrl,
          brandColors: { primary: '#0F1B26', accent: '#F59E0B' }
        },
        event: {
          title: eventConfig.eventTitle,
          subtitle: eventConfig.eventSubtitle,
          oneLineWelcome: eventConfig.oneLineWelcome,
          noPressureLine: eventConfig.noPressureLine,
          reassuranceChips: eventConfig.reassuranceChips,
          recurrenceWeekday: SCHEDULE.dayOfWeek,
          recurrenceHour: SCHEDULE.hour,
          recurrenceMinute: SCHEDULE.minute,
          recurrenceDurationMinutes: SCHEDULE.durationMinutes,
          recurrenceTimezone: 'Asia/Manila',
          doorsOpenTime: eventConfig.doorsOpenTime,
          specialDateOverride: null,
          isCancelled: false,
          countdownEnabled: true,
          venue: { ...eventConfig.venue },
          speaker: { ...eventConfig.speaker }
        },
        contacts: {
          ...eventConfig.contact,
          connectCopy: eventConfig.connectCopy
        },
        sunday: {
          dayAndTime: eventConfig.sundayService.dayAndTime,
          title: eventConfig.sundayService.title,
          message: eventConfig.sundayService.message,
          note: eventConfig.sundayService.note,
          messengerUrl: eventConfig.sundayService.messengerUrl,
          venues: [...eventConfig.sundayService.venues]
        },
        sections: [
          { id: 'hero', name: 'Hero Banner', title: 'Lilok Bible Talk', subtitle: 'Come as You Are', sortOrder: 1, isVisible: true },
          { id: 'countdown', name: 'Countdown Strip', title: 'Countdown', subtitle: 'Next Session Countdown', sortOrder: 2, isVisible: true },
          { id: 'welcome', name: 'Warm Welcome', title: 'Welcome to the Family', subtitle: 'About Lilok BT', sortOrder: 3, isVisible: true },
          { id: 'expect', name: 'What to Expect', title: 'What to Expect', subtitle: 'Practical & Warm', sortOrder: 4, isVisible: true },
          { id: 'verse', name: 'Scripture Highlight', title: 'Scripture Highlight', subtitle: 'Matthew 11:28–29', sortOrder: 5, isVisible: true },
          { id: 'details', name: 'Event Details', title: 'Event Details', subtitle: 'Ticket & Directions', sortOrder: 6, isVisible: true },
          { id: 'sunday', name: 'Sunday Worship', title: 'Join Us on Sunday', subtitle: '10AM Every Sunday', sortOrder: 7, isVisible: true },
          { id: 'gallery', name: 'Photo Gallery', title: 'Moments of Grace', subtitle: 'Austin Stone Editorial Grid', sortOrder: 8, isVisible: true },
          { id: 'share', name: 'Bring a Friend', title: 'Share the Invitation', subtitle: 'Bring a Friend Band', sortOrder: 9, isVisible: true },
          { id: 'upload', name: 'Share Your Moment', title: 'Share Your Moment', subtitle: 'Photo & Story Upload', sortOrder: 10, isVisible: true },
          { id: 'connect', name: 'Connect With Us', title: 'Connect With Us', subtitle: 'Big Stacked Link Rows', sortOrder: 11, isVisible: true }
        ],
        expectCards: [
          { id: 'come-as-you-are', cardId: 'come-as-you-are', title: 'Come As You Are', tagline: 'No dress codes, no expectations', description: 'Wear whatever you feel comfortable in. Whether it is casual t-shirts and jeans or work attire, you are welcomed warmly just the way you are.', icon: 'heart', badge: 'Everyone Welcome', span: 'col-span-1 md:col-span-2', sortOrder: 1, published: true },
          { id: 'free', cardId: 'free', title: '100% Free', tagline: 'Always our guest', description: 'No entrance fees, no hidden obligations, and no financial collections or tithes requested from our guests. Ever.', icon: 'sparkles', badge: 'Zero Cost', span: 'col-span-1', sortOrder: 2, published: true },
          { id: 'bring-friend', cardId: 'bring-friend', title: 'Bring a Friend', tagline: 'Faith is better together', description: 'Invite your friends, campus classmates, colleagues, or family. The more, the merrier at our table!', icon: 'users', badge: 'Plus Ones Encouraged', span: 'col-span-1', sortOrder: 3, published: true },
          { id: 'food-fellowship', cardId: 'food-fellowship', title: 'Food & Fellowship', tagline: 'Great food, great people', description: 'Enjoy delicious refreshments, light snacks, coffee, and plenty of laughs and genuine conversation after our discussion.', icon: 'coffee', badge: 'Complimentary Treats', span: 'col-span-1 md:col-span-2', sortOrder: 4, published: true },
          { id: 'uplifting-message', cardId: 'uplifting-message', title: 'Uplifting Message', tagline: 'Real answers for real life', description: 'A practical, encouraging look at God’s Word tailored for everyday struggles, healing, purpose, and peace.', icon: 'book-open', badge: 'Practical Scripture', span: 'col-span-1', sortOrder: 5, published: true },
          { id: 'open-discussion', cardId: 'open-discussion', title: 'Open Bible Discussion', tagline: 'Ask questions freely', description: 'A relaxed circle where curiosities, questions, and personal thoughts are valued and respectfully explored.', icon: 'messages-square', badge: 'Interactive', span: 'col-span-1', sortOrder: 6, published: true }
        ],
        verse: {
          text: eventConfig.verse.text,
          reference: eventConfig.verse.reference,
          translation: eventConfig.verse.translation,
          reflectionNote: eventConfig.verse.reflectionNote
        },
        gallery: [
          { id: '1', imageUrl: '/images/gallery-1.jpg', altText: 'Open Bible illuminated by gentle morning light', title: 'Truth & Direction', subtitle: 'Studying the scriptures together for real life guidance', span: 'col-span-1 md:col-span-2 aspect-[16/10]', sortOrder: 1, published: true },
          { id: '2', imageUrl: '/images/gallery-3.jpg', altText: 'Friends enjoying conversations over coffee and snacks', title: 'Table Fellowship', subtitle: 'Deep laughter, coffee, and authentic friendships', span: 'col-span-1 md:col-span-1 aspect-[4/5]', sortOrder: 2, published: true },
          { id: '3', imageUrl: '/images/gallery-4.jpg', altText: 'Hands held in prayer and mutual encouragement', title: 'Prayer & Brotherhood', subtitle: 'Standing together as disciples in every season', span: 'col-span-1 md:col-span-1 aspect-[4/5]', sortOrder: 3, published: true },
          { id: '4', imageUrl: '/images/gallery-2.jpg', altText: 'Acoustic worship and heartfelt praise', title: 'Acoustic Fellowship', subtitle: 'Heartfelt songs of praise and quiet reflection', span: 'col-span-1 md:col-span-2 aspect-[16/10]', sortOrder: 4, published: true },
          { id: '5', imageUrl: '/images/gallery-5.jpg', altText: 'Sunrise breaking over the horizon with hope', title: 'Fresh Hope', subtitle: 'Walking in the freedom and peace of Jesus', span: 'col-span-1 md:col-span-2 aspect-[16/10]', sortOrder: 5, published: true },
          { id: '6', imageUrl: '/images/gallery-6.jpg', altText: 'Warm discipleship gathering around a table', title: 'Family in Christ', subtitle: 'A place where you belong from day one', span: 'col-span-1 md:col-span-1 aspect-[4/5]', sortOrder: 6, published: true }
        ],
        announcement: null
      })
    }
  )

  const content = computed(() => rawContent.value)

  // Compute next session date & times
  const nextSession = computed(() => {
    const ev = content.value.event
    const now = new Date()
    const manilaNow = new Date(now.getTime() + MANILA_OFFSET_MS)

    const toManilaISO = (d: Date) =>
      `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}T${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}:00+08:00`

    if (ev.specialDateOverride) {
      const overrideDate = new Date(ev.specialDateOverride)
      const overrideEnd = new Date(overrideDate.getTime() + (ev.recurrenceDurationMinutes || 180) * 60000)
      return {
        startISO: toManilaISO(new Date(overrideDate.getTime() + MANILA_OFFSET_MS)),
        endISO: toManilaISO(new Date(overrideEnd.getTime() + MANILA_OFFSET_MS)),
        dateLabel: `${WEEKDAYS[overrideDate.getUTCDay()]}, ${MONTHS[overrideDate.getUTCMonth()]} ${overrideDate.getUTCDate()}, ${overrideDate.getUTCFullYear()}`,
        timeLabel: formatTimeRange(ev.recurrenceHour, ev.recurrenceMinute, ev.recurrenceDurationMinutes),
        formattedDateTime: `${WEEKDAYS[overrideDate.getUTCDay()]} · ${formatHour(ev.recurrenceHour, ev.recurrenceMinute)}`
      }
    }

    const weekday = typeof ev.recurrenceWeekday === 'number' ? ev.recurrenceWeekday : 4
    const hour = typeof ev.recurrenceHour === 'number' ? ev.recurrenceHour : 19
    const minute = typeof ev.recurrenceMinute === 'number' ? ev.recurrenceMinute : 0
    const duration = typeof ev.recurrenceDurationMinutes === 'number' ? ev.recurrenceDurationMinutes : 180

    const start = new Date(
      Date.UTC(
        manilaNow.getUTCFullYear(),
        manilaNow.getUTCMonth(),
        manilaNow.getUTCDate(),
        hour,
        minute
      )
    )
    start.setUTCDate(start.getUTCDate() + ((weekday - manilaNow.getUTCDay() + 7) % 7))

    let end = new Date(start.getTime() + duration * 60000)
    if (end.getTime() <= manilaNow.getTime()) {
      start.setUTCDate(start.getUTCDate() + 7)
      end = new Date(start.getTime() + duration * 60000)
    }

    return {
      startISO: toManilaISO(start),
      endISO: toManilaISO(end),
      dateLabel: `${WEEKDAYS[start.getUTCDay()]}, ${MONTHS[start.getUTCMonth()]} ${start.getUTCDate()}, ${start.getUTCFullYear()}`,
      timeLabel: formatTimeRange(hour, minute, duration),
      formattedDateTime: `Every ${WEEKDAYS[weekday]} · ${formatHour(hour, minute)}`
    }
  })

  function formatHour(h: number, m: number) {
    const period = h >= 12 ? 'PM' : 'AM'
    const displayHour = h % 12 === 0 ? 12 : h % 12
    return m === 0 ? `${displayHour}:00 ${period}` : `${displayHour}:${pad(m)} ${period}`
  }

  function formatTimeRange(startH: number, startM: number, durationMinutes: number) {
    const endTotalMinutes = startH * 60 + startM + durationMinutes
    const endH = Math.floor(endTotalMinutes / 60) % 24
    const endM = endTotalMinutes % 60
    return `${formatHour(startH, startM)} – ${formatHour(endH, endM)}`
  }

  // Google Calendar URL
  const googleCalendarUrl = computed(() => {
    const ev = content.value.event
    const cal = nextSession.value
    const formatUtc = (iso: string) => iso.replace(/[-:]/g, '')

    const start = formatUtc(cal.startISO)
    const end = formatUtc(cal.endISO)

    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: `${content.value.siteSettings.groupName}: ${ev.title}`,
      dates: `${start}/${end}`,
      details: `${ev.subtitle}\n\nInstagram: ${content.value.contacts.instagramUrl}\nMessenger: ${content.value.contacts.messengerUrl}`,
      location: `${ev.venue.name}, ${ev.venue.address}`
    })

    return `https://calendar.google.com/calendar/render?${params.toString()}`
  })

  // Download .ics file
  function downloadIcsFile() {
    if (typeof window === 'undefined') return
    const ev = content.value.event
    const cal = nextSession.value
    const formatIcsDate = (iso: string) => iso.replace(/[-:]/g, '')

    const start = formatIcsDate(cal.startISO)
    const end = formatIcsDate(cal.endISO)

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      `PRODID:-//${content.value.siteSettings.groupName}//EN`,
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `SUMMARY:${content.value.siteSettings.groupName}: ${ev.title}`,
      `DESCRIPTION:${ev.subtitle.replace(/\n/g, '\\n')}\\n\\nInstagram: ${content.value.contacts.instagramUrl}`,
      `LOCATION:${ev.venue.name}, ${ev.venue.address}`,
      `DTSTART:${start}`,
      `DTEND:${end}`,
      'STATUS:CONFIRMED',
      'SEQUENCE:0',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n')

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' })
    const link = document.createElement('a')
    link.href = window.URL.createObjectURL(blob)
    link.setAttribute('download', 'lilok-bible-talk-invitation.ics')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Helper to check section visibility
  function isSectionVisible(sectionId: string) {
    const sec = content.value.sections?.find((s: any) => s.id === sectionId)
    return sec ? sec.isVisible : true
  }

  // Event Schema.org JSON-LD
  const eventStructuredData = computed(() => {
    const ev = content.value.event
    const site = content.value.siteSettings
    const cal = nextSession.value

    return {
      '@context': 'https://schema.org',
      '@type': 'Event',
      name: `${site.groupName}: ${ev.title}`,
      startDate: cal.startISO,
      endDate: cal.endISO,
      eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
      eventStatus: ev.isCancelled
        ? 'https://schema.org/EventCancelled'
        : 'https://schema.org/EventScheduled',
      location: {
        '@type': 'Place',
        name: ev.venue.name,
        address: {
          '@type': 'PostalAddress',
          streetAddress: ev.venue.address,
          addressLocality: ev.venue.cityStateZip,
          addressCountry: 'PH'
        }
      },
      image: [site.seoOgImage],
      description: ev.subtitle,
      organizer: {
        '@type': 'Organization',
        name: site.churchFullName || site.groupName,
        url: site.canonicalUrl
      }
    }
  })

  return {
    content,
    pending,
    refresh,
    nextSession,
    googleCalendarUrl,
    downloadIcsFile,
    isSectionVisible,
    eventStructuredData
  }
}

