/**
 * =============================================================================
 * LILOK BIBLE TALK & MICC EVENT CONFIGURATION
 * =============================================================================
 * Central configuration file for the Lilok Bible Talk invitation website.
 * Update any event details, venues, dates, or contact links below.
 * Everything on the site updates automatically from this file.
 */

export interface VenueInfo {
  name: string
  room: string
  address: string
  cityStateZip: string
  mapLink: string
  notes: string
}

export interface SundayVenue {
  city: string
  venueName: string
  address: string
  status: 'TBA' | 'Confirmed'
  notes: string
}

export interface EventConfig {
  // Primary brand
  groupName: string
  tagline: string
  hashtag: string
  instagramHandle: string
  instagramUrl: string

  // Parent church branding
  parentChurchName: string
  parentRegion: string
  churchFullName: string
  soldOutBadge: string
  aboutChurch: string
  logo: string
  logoAlt: string

  // Event details (Placeholders clearly marked for organizers to edit)
  eventTitle: string
  eventSubtitle: string
  oneLineWelcome: string
  noPressureLine: string
  reassuranceChips: string[]

  date: string
  time: string
  formattedDateTime: string
  doorsOpenTime: string
  countdownTargetISO: string // Client-side countdown (YYYY-MM-DDTHH:mm:ss)

  venue: VenueInfo

  speaker: {
    name: string
    title: string
    bio: string
  }

  // Social & contact channels
  contact: {
    messengerUrl: string
    facebookUrl: string
    facebookPageName: string
    instagramUrl: string
    miccInstagramUrl: string
    miccInstagramHandle: string
    youtubeUrl: string
    youtubeHandle: string
    email: string
    phone: string
    displayPhone: string
  }

  // What's Next / Connect block
  connectCopy: string

  // Sunday Service
  sundayService: {
    dayAndTime: string
    message: string
    messengerUrl: string
    note: string
    venues: SundayVenue[]
  }

  // What to Expect
  whatToExpect: Array<{
    id: string
    title: string
    description: string
    icon: string
    badge?: string
  }>

  // Scripture highlight
  verse: {
    text: string
    reference: string
    translation: string
    reflectionNote: string
  }

  // Calendar export
  calendar: {
    title: string
    description: string
    location: string
    startDateISO: string
    endDateISO: string
  }

  // SEO & Social share preview
  seo: {
    title: string
    description: string
    ogImage: string
    canonicalUrl: string
  }
}

export const eventConfig: EventConfig = {
  // 1. BRAND IDENTITY
  groupName: 'Lilok Bible Talk',
  tagline: 'Welcome to the family.',
  hashtag: '#AngSarapMagingDisciple',
  instagramHandle: '@lilok.bt',
  instagramUrl: 'https://instagram.com/lilok.bt',

  // 2. PARENT CHURCH (MICC / Central Region)
  parentChurchName: 'Manila International Christian Church (MICC)',
  parentRegion: 'Central Region',
  churchFullName: 'Metro Manila International Christian Church (MMICC)',
  soldOutBadge: 'A Member of the Soldout Family of Churches',
  aboutChurch:
    'Welcome to the Metro Manila International Christian Church. We are part of a worldwide movement of sold-out disciples with the vision to evangelize the nations in this generation.',
  logo: '/images/micc-logo.png',
  logoAlt: 'Manila International Christian Church logo',

  // 3. EVENT DETAILS (Edit event title, date, time & venue here)
  eventTitle: 'Come as You Are',
  eventSubtitle:
    'An open, heartwarming evening of real conversations, uplifting scripture, friendly community, and delicious treats.',
  oneLineWelcome: 'No matter who you are or where you are in life, you have a seat at our table.',
  noPressureLine: 'No pressure, just come as you are.',
  reassuranceChips: ['Free', 'All are welcome', 'Bring a friend', 'Come as you are'],

  // Upcoming Event Date & Time (Placeholders: update with your next scheduled session)
  date: 'Friday, November 20, 2026',
  time: '7:30 PM – 9:00 PM',
  formattedDateTime: 'Friday, Nov 20, 2026 · 7:30 PM',
  doorsOpenTime: '7:00 PM',
  countdownTargetISO: '2026-11-20T19:30:00',

  // Venue details (Placeholder: TBA / Central Region meetup spot)
  venue: {
    name: 'Central Region Hub (TBA)',
    room: 'Main Gathering Area',
    address: 'Bonifacio Global City / Makati area (Exact venue TBA)',
    cityStateZip: 'Metro Manila, Philippines',
    mapLink: 'https://maps.google.com/?q=Metro+Manila+Philippines',
    notes: 'Location announced in our group chat and Instagram stories. Message @lilok.bt or chat with us on Messenger for exact landmark and parking directions!'
  },

  speaker: {
    name: 'Lilok Bible Talk Leaders & Friends',
    title: 'Central Region Disciples',
    bio: 'Young professionals, students, and disciple leaders sharing real stories of life transformation, faith, and unconditional family.'
  },

  // 4. SOCIAL & CONTACT LINKS
  contact: {
    messengerUrl: 'https://m.me/manilaicc',
    facebookUrl: 'https://www.facebook.com/manilaicc',
    facebookPageName: 'facebook.com/manilaicc',
    instagramUrl: 'https://instagram.com/lilok.bt',
    miccInstagramUrl: 'https://instagram.com/manilaicc',
    miccInstagramHandle: '@manilaicc',
    youtubeUrl: 'https://youtube.com/@ManilaICC',
    youtubeHandle: '@ManilaICC',
    email: 'central@micc.church',
    phone: '+639000000000',
    displayPhone: '+63 (TBA)'
  },

  // 5. WHAT'S NEXT? CONNECT WITH US
  connectCopy:
    'Get in touch for worship services, Bible studies, baptism, or any questions you may have.',

  // 6. SUNDAY WORSHIP SERVICE (Central Region: Makati, Taguig, Muntinlupa)
  sundayService: {
    dayAndTime: 'Every Sunday at 10:00 AM',
    title: 'MICC Sunday Worship Service',
    message:
      'Worship with us every Sunday! Send us a message and we will connect you to the location nearest you.',
    messengerUrl: 'https://m.me/manilaicc',
    note: 'Locations change periodically as our ministries expand. Message us anytime for current Sunday service venues and rideshares!',
    venues: [
      {
        city: 'Makati',
        venueName: 'Central Makati Service (TBA)',
        address: 'Makati Central Business District, Metro Manila',
        status: 'TBA',
        notes: 'Contact us via Messenger for current hall details and Sunday parking info.'
      },
      {
        city: 'Taguig / BGC',
        venueName: 'Taguig & BGC Fellowship (TBA)',
        address: 'Bonifacio Global City, Taguig, Metro Manila',
        status: 'TBA',
        notes: 'Accessible by BGC Bus and ride-hailing services. Message for room number.'
      },
      {
        city: 'Muntinlupa',
        venueName: 'Muntinlupa / Alabang Gathering (TBA)',
        address: 'Alabang, Muntinlupa City, Metro Manila',
        status: 'TBA',
        notes: 'Serving South Metro Manila disciples and guests.'
      }
    ]
  },

  // 7. WHAT TO EXPECT
  whatToExpect: [
    {
      id: 'message',
      title: 'Uplifting Message',
      description: 'A practical, encouraging look at God’s Word tailored for everyday struggles, healing, and peace.',
      icon: 'book-open',
      badge: 'Biblical & Real'
    },
    {
      id: 'community',
      title: 'Friendly Community',
      description: 'A warm, genuine brotherhood and sisterhood where everyone is treated like family from day one.',
      icon: 'heart-handshake',
      badge: 'Family Feel'
    },
    {
      id: 'discussion',
      title: 'Open Bible Discussion',
      description: 'A relaxed space where questions, curiosities, and personal reflections are always valued and explored.',
      icon: 'messages-square',
      badge: 'Interactive'
    },
    {
      id: 'fellowship',
      title: 'Food & Fellowship',
      description: 'Great conversations, light bites, snacks, laughs, and new friendships after the talk.',
      icon: 'coffee',
      badge: 'Free Treats'
    }
  ],

  // 8. SCRIPTURE HIGHLIGHT
  verse: {
    text: '“Come to me, all you who are weary and burdened, and I will give you rest. Take my yoke upon you and learn from me, for I am gentle and humble in heart, and you will find rest for your souls.”',
    reference: 'Matthew 11:28–29',
    translation: 'NIV',
    reflectionNote: 'No matter how heavy your week has been, you can find genuine rest, true brothers and sisters, and peace in Christ.'
  },

  // 9. CALENDAR DATA
  calendar: {
    title: 'Lilok Bible Talk: Come as You Are (MICC Central Region)',
    description: 'Join Lilok Bible Talk under MICC Central Region for an uplifting evening of scripture, open conversation, and genuine fellowship. Free and welcoming to all! Follow @lilok.bt on Instagram.',
    location: 'Central Region, Metro Manila (Message @lilok.bt or https://m.me/manilaicc for exact venue)',
    startDateISO: '2026-11-20T19:30:00',
    endDateISO: '2026-11-20T21:00:00'
  },

  // 10. SEO & SOCIAL PREVIEWS
  seo: {
    title: "You're invited to Lilok Bible Talk | MICC Central Region",
    description: "You're warmly invited to Lilok Bible Talk! Friendly community, open Bible discussion, uplifting message, and food & fellowship. Manila International Christian Church (MICC) Central Region. Welcome to the family.",
    ogImage: '/images/micc-logo.png',
    canonicalUrl: 'https://micc.church'
  }
}
