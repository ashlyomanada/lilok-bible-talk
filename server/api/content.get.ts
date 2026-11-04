import { createClient } from '@supabase/supabase-js'
import { eventConfig, SCHEDULE, getNextSession } from '~/config/event'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const supabaseUrl = process.env.SUPABASE_URL || config.public.supabase?.url || process.env.NUXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_KEY || config.public.supabase?.key || process.env.NUXT_PUBLIC_SUPABASE_KEY

  // Default fallback data directly from config/event.ts
  const fallbackData = {
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
      specialDateOverride: null as string | null,
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
    announcement: null as any
  }

  // If Supabase credentials are missing, return fallback immediately
  if (!supabaseUrl || !supabaseKey) {
    return fallbackData
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Parallel fetch from Supabase
    let timeout: ReturnType<typeof setTimeout>
    const queryResults = await Promise.race([
      Promise.allSettled([
      supabase.from('site_settings').select('*').eq('id', 'default').maybeSingle(),
      supabase.from('events').select('*').eq('id', 'current').maybeSingle(),
      supabase.from('contacts_social').select('*').eq('id', 'default').maybeSingle(),
      supabase.from('sunday_services').select('*').eq('id', 'default').maybeSingle(),
      supabase.from('sunday_venues').select('*').eq('published', true).order('sort_order', { ascending: true }),
      supabase.from('sections').select('*').order('sort_order', { ascending: true }),
      supabase.from('expect_cards').select('*').eq('published', true).order('sort_order', { ascending: true }),
      supabase.from('verse').select('*').eq('id', 'default').maybeSingle(),
      supabase.from('gallery_images').select('*').eq('published', true).order('sort_order', { ascending: true }),
      supabase.from('announcements').select('*').eq('is_active', true).maybeSingle()
      ]),
      new Promise<never>((_, reject) => {
        timeout = setTimeout(() => reject(new Error('Supabase content request timed out')), 8000)
      })
    ]).finally(() => clearTimeout(timeout))
    const [
      settingsRes, eventRes, contactsRes, sundayRes, venuesRes,
      sectionsRes, cardsRes, verseRes, galleryRes, announcementRes
    ] = queryResults

    const failedQueries = [
      'site_settings', 'events', 'contacts_social', 'sunday_services', 'sunday_venues',
      'sections', 'expect_cards', 'verse', 'gallery_images', 'announcements'
    ].filter((table, index) => {
      const result = [
        settingsRes, eventRes, contactsRes, sundayRes, venuesRes,
        sectionsRes, cardsRes, verseRes, galleryRes, announcementRes
      ][index]
      if (result.status === 'rejected') {
        console.warn(`[site-content] ${table} query failed:`, result.reason)
        return true
      }
      if (result.value.error) {
        console.warn(`[site-content] ${table} query failed:`, result.value.error.message)
        return true
      }
      return false
    })

    if (failedQueries.length) {
      console.warn(`[site-content] Using local defaults because ${failedQueries.join(', ')} could not be read`)
      return fallbackData
    }

    const data = { ...fallbackData }

    // Merge Site Settings
    if (settingsRes.status === 'fulfilled' && settingsRes.value.data) {
      const s = settingsRes.value.data
      data.siteSettings = {
        groupName: s.group_name || data.siteSettings.groupName,
        tagline: s.tagline || data.siteSettings.tagline,
        hashtag: s.hashtag || data.siteSettings.hashtag,
        logoUrl: s.logo_url || data.siteSettings.logoUrl,
        logoAlt: s.logo_alt || data.siteSettings.logoAlt,
        churchFullName: s.church_full_name || data.siteSettings.churchFullName,
        parentChurchName: s.parent_church_name || data.siteSettings.parentChurchName,
        parentRegion: s.parent_region || data.siteSettings.parentRegion,
        soldOutBadge: s.sold_out_badge || data.siteSettings.soldOutBadge,
        aboutChurch: s.about_church || data.siteSettings.aboutChurch,
        footerBlessing: s.footer_blessing || data.siteSettings.footerBlessing,
        seoTitle: s.seo_title || data.siteSettings.seoTitle,
        seoDescription: s.seo_description || data.siteSettings.seoDescription,
        seoOgImage: s.seo_og_image || data.siteSettings.seoOgImage,
        canonicalUrl: s.canonical_url || data.siteSettings.canonicalUrl,
        brandColors: s.brand_colors || data.siteSettings.brandColors
      }
    }

    // Merge Event
    if (eventRes.status === 'fulfilled' && eventRes.value.data) {
      const e = eventRes.value.data
      data.event = {
        title: e.title || data.event.title,
        subtitle: e.subtitle || data.event.subtitle,
        oneLineWelcome: e.one_line_welcome || data.event.oneLineWelcome,
        noPressureLine: e.no_pressure_line || data.event.noPressureLine,
        reassuranceChips: Array.isArray(e.reassurance_chips) && e.reassurance_chips.length > 0 ? e.reassurance_chips : data.event.reassuranceChips,
        recurrenceWeekday: typeof e.recurrence_weekday === 'number' ? e.recurrence_weekday : data.event.recurrenceWeekday,
        recurrenceHour: typeof e.recurrence_hour === 'number' ? e.recurrence_hour : data.event.recurrenceHour,
        recurrenceMinute: typeof e.recurrence_minute === 'number' ? e.recurrence_minute : data.event.recurrenceMinute,
        recurrenceDurationMinutes: typeof e.recurrence_duration_minutes === 'number' ? e.recurrence_duration_minutes : data.event.recurrenceDurationMinutes,
        recurrenceTimezone: e.recurrence_timezone || data.event.recurrenceTimezone,
        doorsOpenTime: e.doors_open_time || data.event.doorsOpenTime,
        specialDateOverride: e.special_date_override || null,
        isCancelled: Boolean(e.is_cancelled),
        countdownEnabled: e.countdown_enabled !== false,
        venue: {
          name: e.venue_name || data.event.venue.name,
          room: e.venue_room || data.event.venue.room,
          address: e.venue_address || data.event.venue.address,
          cityStateZip: e.venue_city_state_zip || data.event.venue.cityStateZip,
          mapLink: e.venue_map_url || data.event.venue.mapLink,
          notes: e.venue_notes || data.event.venue.notes
        },
        speaker: {
          name: e.speaker_name || data.event.speaker.name,
          title: e.speaker_title || data.event.speaker.title,
          bio: e.speaker_bio || data.event.speaker.bio
        }
      }
    }

    // Merge Contacts
    if (contactsRes.status === 'fulfilled' && contactsRes.value.data) {
      const c = contactsRes.value.data
      data.contacts = {
        messengerUrl: c.messenger_url || data.contacts.messengerUrl,
        facebookUrl: c.facebook_url || data.contacts.facebookUrl,
        facebookPageName: c.facebook_page_name || data.contacts.facebookPageName,
        instagramUrl: c.instagram_url || data.contacts.instagramUrl,
        instagramHandle: c.instagram_handle || data.contacts.instagramHandle,
        miccInstagramUrl: c.micc_instagram_url || data.contacts.miccInstagramUrl,
        miccInstagramHandle: c.micc_instagram_handle || data.contacts.miccInstagramHandle,
        youtubeUrl: c.youtube_url || data.contacts.youtubeUrl,
        youtubeHandle: c.youtube_handle || data.contacts.youtubeHandle,
        email: c.email || data.contacts.email,
        phone: c.phone || data.contacts.phone,
        displayPhone: c.display_phone || data.contacts.displayPhone,
        connectCopy: c.connect_copy || data.contacts.connectCopy
      }
    }

    // Merge Sunday Service & Venues
    if (sundayRes.status === 'fulfilled' && sundayRes.value.data) {
      const s = sundayRes.value.data
      data.sunday.dayAndTime = s.day_and_time || data.sunday.dayAndTime
      data.sunday.title = s.title || data.sunday.title
      data.sunday.message = s.message || data.sunday.message
      data.sunday.note = s.note || data.sunday.note
      data.sunday.messengerUrl = s.messenger_url || data.sunday.messengerUrl
    }
    if (venuesRes.status === 'fulfilled' && venuesRes.value.data && venuesRes.value.data.length > 0) {
      data.sunday.venues = venuesRes.value.data.map(v => ({
        city: v.city,
        venueName: v.venue_name,
        address: v.address,
        status: v.status as 'TBA' | 'Confirmed',
        notes: v.notes
      }))
    }

    // Merge Sections
    if (sectionsRes.status === 'fulfilled' && sectionsRes.value.data && sectionsRes.value.data.length > 0) {
      data.sections = sectionsRes.value.data.map(sec => ({
        id: sec.id,
        name: sec.name,
        title: sec.title,
        subtitle: sec.subtitle,
        sortOrder: sec.sort_order,
        isVisible: sec.is_visible
      }))
    }

    // Merge Expect Cards
    if (cardsRes.status === 'fulfilled' && cardsRes.value.data && cardsRes.value.data.length > 0) {
      data.expectCards = cardsRes.value.data.map(c => ({
        id: c.id,
        cardId: c.card_id,
        title: c.title,
        tagline: c.tagline,
        description: c.description,
        icon: c.icon,
        badge: c.badge,
        span: c.span,
        sortOrder: c.sort_order,
        published: c.published
      }))
    }

    // Merge Verse
    if (verseRes.status === 'fulfilled' && verseRes.value.data) {
      const v = verseRes.value.data
      data.verse = {
        text: v.text || data.verse.text,
        reference: v.reference || data.verse.reference,
        translation: v.translation || data.verse.translation,
        reflectionNote: v.reflection_note || data.verse.reflectionNote
      }
    }

    // Merge Gallery
    if (galleryRes.status === 'fulfilled' && galleryRes.value.data && galleryRes.value.data.length > 0) {
      data.gallery = galleryRes.value.data.map(g => ({
        id: g.id,
        imageUrl: g.image_url,
        altText: g.alt_text,
        title: g.title,
        subtitle: g.subtitle,
        span: g.span,
        sortOrder: g.sort_order,
        published: g.published
      }))
    }

    // Merge Announcement
    if (announcementRes.status === 'fulfilled' && announcementRes.value.data) {
      const a = announcementRes.value.data
      const now = new Date()
      const isStartValid = !a.start_date || new Date(a.start_date) <= now
      const isEndValid = !a.end_date || new Date(a.end_date) >= now
      if (isStartValid && isEndValid) {
        data.announcement = {
          id: a.id,
          message: a.message,
          linkUrl: a.link_url,
          linkText: a.link_text
        }
      }
    }

    return data
  } catch (err: any) {
    console.error('Error in /api/content, falling back to local config:', err.message)
    return fallbackData
  }
})

