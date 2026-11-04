import { createClient } from '@supabase/supabase-js'
import { eventConfig, SCHEDULE } from '../config/event'

const supabaseUrl = process.env.SUPABASE_URL || process.env.NUXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.NUXT_SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY

function isServiceKey(key: string) {
  if (key.startsWith('sb_secret_')) return true

  const [, payload] = key.split('.')
  if (!payload) return false

  try {
    const claims = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'))
    return claims.role === 'service_role'
  } catch {
    return false
  }
}

let seedFailed = false

function reportError(label: string, error: { message: string } | null) {
  if (!error) return
  seedFailed = true
  console.error(`Error seeding ${label}:`, error.message)
}

async function main() {
  console.log('🌱 Starting database seed...')

  if (!supabaseUrl || !supabaseServiceKey) {
    console.error('⚠️  SUPABASE_URL and NUXT_SUPABASE_SECRET_KEY (or a service-role key) must be set in .env.')
    process.exitCode = 1
    return
  }

  if (!isServiceKey(supabaseServiceKey)) {
    console.error('⚠️  The seed key is not a valid Supabase service-role JWT or sb_secret_ key. Use the project secret/service-role key, never the publishable/anon key.')
    process.exitCode = 1
    return
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey)

  console.log('1. Seeding site_settings...')
  const { error: settingsError } = await supabase.from('site_settings').upsert({
    id: 'default',
    group_name: eventConfig.groupName,
    tagline: eventConfig.tagline,
    hashtag: eventConfig.hashtag,
    logo_url: eventConfig.logo,
    logo_alt: eventConfig.logoAlt,
    church_full_name: eventConfig.churchFullName,
    parent_church_name: eventConfig.parentChurchName,
    parent_region: eventConfig.parentRegion,
    sold_out_badge: eventConfig.soldOutBadge,
    about_church: eventConfig.aboutChurch,
    footer_blessing: 'May God bless and protect you and your loved ones this week. Wherever life finds you right now, remember that you have a seat at our table and brothers and sisters who care.',
    seo_title: eventConfig.seo.title,
    seo_description: eventConfig.seo.description,
    seo_og_image: eventConfig.seo.ogImage,
    canonical_url: eventConfig.seo.canonicalUrl,
    brand_colors: { primary: '#0F1B26', accent: '#F59E0B' }
  })
  reportError('site_settings', settingsError)

  console.log('2. Seeding events...')
  const { error: eventsError } = await supabase.from('events').upsert({
    id: 'current',
    title: eventConfig.eventTitle,
    subtitle: eventConfig.eventSubtitle,
    one_line_welcome: eventConfig.oneLineWelcome,
    no_pressure_line: eventConfig.noPressureLine,
    reassurance_chips: eventConfig.reassuranceChips,
    recurrence_weekday: SCHEDULE.dayOfWeek,
    recurrence_hour: SCHEDULE.hour,
    recurrence_minute: SCHEDULE.minute,
    recurrence_duration_minutes: SCHEDULE.durationMinutes,
    recurrence_timezone: 'Asia/Manila',
    doors_open_time: eventConfig.doorsOpenTime,
    venue_name: eventConfig.venue.name,
    venue_room: eventConfig.venue.room,
    venue_address: eventConfig.venue.address,
    venue_city_state_zip: eventConfig.venue.cityStateZip,
    venue_map_url: eventConfig.venue.mapLink,
    venue_notes: eventConfig.venue.notes,
    speaker_name: eventConfig.speaker.name,
    speaker_title: eventConfig.speaker.title,
    speaker_bio: eventConfig.speaker.bio,
    countdown_enabled: true
  })
  reportError('events', eventsError)

  console.log('3. Seeding contacts_social...')
  const { error: contactsError } = await supabase.from('contacts_social').upsert({
    id: 'default',
    messenger_url: eventConfig.contact.messengerUrl,
    facebook_url: eventConfig.contact.facebookUrl,
    facebook_page_name: eventConfig.contact.facebookPageName,
    instagram_url: eventConfig.contact.instagramUrl,
    instagram_handle: eventConfig.instagramHandle,
    micc_instagram_url: eventConfig.contact.miccInstagramUrl,
    micc_instagram_handle: eventConfig.contact.miccInstagramHandle,
    youtube_url: eventConfig.contact.youtubeUrl,
    youtube_handle: eventConfig.contact.youtubeHandle,
    email: eventConfig.contact.email,
    phone: eventConfig.contact.phone,
    display_phone: eventConfig.contact.displayPhone,
    connect_copy: eventConfig.connectCopy
  })
  reportError('contacts_social', contactsError)

  console.log('4. Seeding sunday_services...')
  const { error: sundayError } = await supabase.from('sunday_services').upsert({
    id: 'default',
    day_and_time: eventConfig.sundayService.dayAndTime,
    title: eventConfig.sundayService.title,
    message: eventConfig.sundayService.message,
    note: eventConfig.sundayService.note,
    messenger_url: eventConfig.sundayService.messengerUrl
  })
  reportError('sunday_services', sundayError)

  console.log('5. Seeding sunday_venues...')
  const { error: clearVenuesError } = await supabase.from('sunday_venues').delete().neq('city', '')
  reportError('sunday_venues cleanup', clearVenuesError)
  const { error: sundayVenuesError } = await supabase.from('sunday_venues').insert(
    eventConfig.sundayService.venues.map((venue, idx) => ({
      city: venue.city,
      venue_name: venue.venueName,
      address: venue.address,
      status: venue.status,
      notes: venue.notes,
      sort_order: idx + 1,
      published: true
    }))
  )
  reportError('sunday_venues', sundayVenuesError)

  console.log('6. Seeding sections...')
  const sections = [
    { id: 'hero', name: 'Hero Banner', title: 'Lilok Bible Talk', subtitle: 'Come as You Are', sort_order: 1, is_visible: true },
    { id: 'countdown', name: 'Countdown Strip', title: 'Countdown', subtitle: 'Next Session Countdown', sort_order: 2, is_visible: true },
    { id: 'welcome', name: 'Warm Welcome', title: 'Welcome to the Family', subtitle: 'About Lilok BT', sort_order: 3, is_visible: true },
    { id: 'expect', name: 'What to Expect', title: 'What to Expect', subtitle: 'Practical & Warm', sort_order: 4, is_visible: true },
    { id: 'verse', name: 'Scripture Highlight', title: 'Scripture Highlight', subtitle: 'Matthew 11:28–29', sort_order: 5, is_visible: true },
    { id: 'details', name: 'Event Details', title: 'Event Details', subtitle: 'Ticket & Directions', sort_order: 6, is_visible: true },
    { id: 'sunday', name: 'Sunday Worship', title: 'Join Us on Sunday', subtitle: '10AM Every Sunday', sort_order: 7, is_visible: true },
    { id: 'gallery', name: 'Photo Gallery', title: 'Moments of Grace', subtitle: 'Austin Stone Editorial Grid', sort_order: 8, is_visible: true },
    { id: 'share', name: 'Bring a Friend', title: 'Share the Invitation', subtitle: 'Bring a Friend Band', sort_order: 9, is_visible: true },
    { id: 'upload', name: 'Share Your Moment', title: 'Share Your Moment', subtitle: 'Photo & Story Upload', sort_order: 10, is_visible: true },
    { id: 'connect', name: 'Connect With Us', title: 'Connect With Us', subtitle: 'Big Stacked Link Rows', sort_order: 11, is_visible: true }
  ]
  for (const sec of sections) {
    const { error: secError } = await supabase.from('sections').upsert(sec)
    reportError(`section ${sec.id}`, secError)
  }

  console.log('7. Seeding expect_cards...')
  const { error: clearCardsError } = await supabase.from('expect_cards').delete().neq('title', '')
  reportError('expect_cards cleanup', clearCardsError)
  const bentoCards = [
    { card_id: 'come-as-you-are', title: 'Come As You Are', tagline: 'No dress codes, no expectations', description: 'Wear whatever you feel comfortable in. Whether it is casual t-shirts and jeans or work attire, you are welcomed warmly just the way you are.', icon: 'heart', badge: 'Everyone Welcome', span: 'col-span-1 md:col-span-2', sort_order: 1, published: true },
    { card_id: 'free', title: '100% Free', tagline: 'Always our guest', description: 'No entrance fees, no hidden obligations, and no financial collections or tithes requested from our guests. Ever.', icon: 'sparkles', badge: 'Zero Cost', span: 'col-span-1', sort_order: 2, published: true },
    { card_id: 'bring-friend', title: 'Bring a Friend', tagline: 'Faith is better together', description: 'Invite your friends, campus classmates, colleagues, or family. The more, the merrier at our table!', icon: 'users', badge: 'Plus Ones Encouraged', span: 'col-span-1', sort_order: 3, published: true },
    { card_id: 'food-fellowship', title: 'Food & Fellowship', tagline: 'Great food, great people', description: 'Enjoy delicious refreshments, light snacks, coffee, and plenty of laughs and genuine conversation after our discussion.', icon: 'coffee', badge: 'Complimentary Treats', span: 'col-span-1 md:col-span-2', sort_order: 4, published: true },
    { card_id: 'uplifting-message', title: 'Uplifting Message', tagline: 'Real answers for real life', description: 'A practical, encouraging look at God’s Word tailored for everyday struggles, healing, purpose, and peace.', icon: 'book-open', badge: 'Practical Scripture', span: 'col-span-1', sort_order: 5, published: true },
    { card_id: 'open-discussion', title: 'Open Bible Discussion', tagline: 'Ask questions freely', description: 'A relaxed circle where curiosities, questions, and personal thoughts are valued and respectfully explored.', icon: 'messages-square', badge: 'Interactive', span: 'col-span-1', sort_order: 6, published: true }
  ]
  const { error: cardsError } = await supabase.from('expect_cards').insert(bentoCards)
  reportError('expect_cards', cardsError)

  console.log('8. Seeding verse...')
  const { error: verseError } = await supabase.from('verse').upsert({
    id: 'default',
    text: eventConfig.verse.text,
    reference: eventConfig.verse.reference,
    translation: eventConfig.verse.translation,
    reflection_note: eventConfig.verse.reflectionNote
  })
  reportError('verse', verseError)

  console.log('9. Seeding gallery_images...')
  const { error: clearGalleryError } = await supabase.from('gallery_images').delete().neq('title', '')
  reportError('gallery_images cleanup', clearGalleryError)
  const gallery = [
    { image_url: '/images/gallery-1.jpg', alt_text: 'Open Bible illuminated by gentle morning light', title: 'Truth & Direction', subtitle: 'Studying the scriptures together for real life guidance', span: 'col-span-1 md:col-span-2 aspect-[16/10]', sort_order: 1, published: true },
    { image_url: '/images/gallery-3.jpg', alt_text: 'Friends enjoying conversations over coffee and snacks', title: 'Table Fellowship', subtitle: 'Deep laughter, coffee, and authentic friendships', span: 'col-span-1 md:col-span-1 aspect-[4/5]', sort_order: 2, published: true },
    { image_url: '/images/gallery-4.jpg', alt_text: 'Hands held in prayer and mutual encouragement', title: 'Prayer & Brotherhood', subtitle: 'Standing together as disciples in every season', span: 'col-span-1 md:col-span-1 aspect-[4/5]', sort_order: 3, published: true },
    { image_url: '/images/gallery-2.jpg', alt_text: 'Acoustic worship and heartfelt praise', title: 'Acoustic Fellowship', subtitle: 'Heartfelt songs of praise and quiet reflection', span: 'col-span-1 md:col-span-2 aspect-[16/10]', sort_order: 4, published: true },
    { image_url: '/images/gallery-5.jpg', alt_text: 'Sunrise breaking over the horizon with hope', title: 'Fresh Hope', subtitle: 'Walking in the freedom and peace of Jesus', span: 'col-span-1 md:col-span-2 aspect-[16/10]', sort_order: 5, published: true },
    { image_url: '/images/gallery-6.jpg', alt_text: 'Warm discipleship gathering around a table', title: 'Family in Christ', subtitle: 'A place where you belong from day one', span: 'col-span-1 md:col-span-1 aspect-[4/5]', sort_order: 6, published: true }
  ]
  const { error: galleryError } = await supabase.from('gallery_images').insert(gallery)
  reportError('gallery_images', galleryError)

  if (seedFailed) {
    console.error('❌ Seed failed. Resolve the errors above before relying on the CMS content.')
    process.exitCode = 1
    return
  }

  console.log('✨ Seed completed successfully!')
}

main().catch((error) => {
  console.error('❌ Seed failed:', error instanceof Error ? error.message : error)
  process.exitCode = 1
})

