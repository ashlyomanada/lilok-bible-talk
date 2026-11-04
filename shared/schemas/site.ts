import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters')
})

export const siteSettingsSchema = z.object({
  group_name: z.string().min(1, 'Group name is required'),
  tagline: z.string().min(1, 'Tagline is required'),
  hashtag: z.string().min(1, 'Hashtag is required'),
  logo_url: z.string().min(1, 'Logo URL is required'),
  logo_alt: z.string().min(1, 'Logo alt text is required'),
  church_full_name: z.string().min(1, 'Church full name is required'),
  parent_church_name: z.string().min(1, 'Parent church name is required'),
  parent_region: z.string().min(1, 'Parent region is required'),
  sold_out_badge: z.string().min(1, 'Badge text is required'),
  about_church: z.string().min(1, 'About church text is required'),
  footer_blessing: z.string().optional().nullable(),
  seo_title: z.string().min(1, 'SEO title is required'),
  seo_description: z.string().min(1, 'SEO description is required'),
  seo_og_image: z.string().min(1, 'OG image is required'),
  canonical_url: z.string().url('Must be a valid URL'),
  brand_colors: z.record(z.string(), z.string()).optional()
})

export const eventDataSchema = z.object({
  title: z.string().min(1, 'Event title is required'),
  subtitle: z.string().min(1, 'Event subtitle is required'),
  one_line_welcome: z.string().min(1, 'Welcome line is required'),
  no_pressure_line: z.string().min(1, 'No pressure line is required'),
  reassurance_chips: z.array(z.string()).default([]),
  recurrence_weekday: z.number().int().min(0).max(6),
  recurrence_hour: z.number().int().min(0).max(23),
  recurrence_minute: z.number().int().min(0).max(59),
  recurrence_duration_minutes: z.number().int().positive(),
  recurrence_timezone: z.string().default('Asia/Manila'),
  doors_open_time: z.string().min(1, 'Doors open time is required'),
  special_date_override: z.string().optional().nullable(),
  is_cancelled: z.boolean().default(false),
  countdown_enabled: z.boolean().default(true),
  venue_name: z.string().min(1, 'Venue name is required'),
  venue_room: z.string().min(1, 'Room/area is required'),
  venue_address: z.string().min(1, 'Venue address is required'),
  venue_city_state_zip: z.string().min(1, 'City/State is required'),
  venue_map_url: z.string().url('Must be a valid map URL'),
  venue_notes: z.string().min(1, 'Landmark/directions are required'),
  speaker_name: z.string().min(1, 'Speaker name is required'),
  speaker_title: z.string().min(1, 'Speaker title is required'),
  speaker_bio: z.string().min(1, 'Speaker bio is required')
})

export const contactsSocialSchema = z.object({
  messenger_url: z.string().url('Must be a valid URL'),
  facebook_url: z.string().url('Must be a valid URL'),
  facebook_page_name: z.string().min(1, 'Facebook page name is required'),
  instagram_url: z.string().url('Must be a valid URL'),
  instagram_handle: z.string().min(1, 'Instagram handle is required'),
  micc_instagram_url: z.string().url('Must be a valid URL'),
  micc_instagram_handle: z.string().min(1, 'MICC IG handle is required'),
  youtube_url: z.string().url('Must be a valid URL'),
  youtube_handle: z.string().min(1, 'YouTube handle is required'),
  email: z.string().email('Must be a valid email'),
  phone: z.string().min(1, 'Phone number is required'),
  display_phone: z.string().min(1, 'Display phone is required'),
  connect_copy: z.string().min(1, 'Connect copy is required')
})

export const sundayServiceSchema = z.object({
  day_and_time: z.string().min(1, 'Day & time is required'),
  title: z.string().min(1, 'Title is required'),
  message: z.string().min(1, 'Message is required'),
  note: z.string().min(1, 'Note is required'),
  messenger_url: z.string().url('Must be a valid URL')
})

export const sundayVenueSchema = z.object({
  id: z.string().uuid().optional(),
  city: z.string().min(1, 'City name is required'),
  venue_name: z.string().min(1, 'Venue name is required'),
  address: z.string().min(1, 'Address is required'),
  status: z.enum(['TBA', 'Confirmed']).default('TBA'),
  notes: z.string().min(1, 'Notes are required'),
  sort_order: z.number().int().default(0),
  published: z.boolean().default(true)
})

export const sectionSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  title: z.string().min(1),
  subtitle: z.string().optional().nullable(),
  body_markdown: z.string().optional().nullable(),
  image_url: z.string().optional().nullable(),
  button_label: z.string().optional().nullable(),
  button_url: z.string().optional().nullable(),
  sort_order: z.number().int().default(0),
  is_visible: z.boolean().default(true)
})

export const expectCardSchema = z.object({
  id: z.string().uuid().optional(),
  card_id: z.string().min(1, 'Card ID is required'),
  title: z.string().min(1, 'Title is required'),
  tagline: z.string().min(1, 'Tagline is required'),
  description: z.string().min(1, 'Description is required'),
  icon: z.string().min(1, 'Icon name is required'),
  badge: z.string().optional().nullable(),
  span: z.string().default('col-span-1'),
  sort_order: z.number().int().default(0),
  published: z.boolean().default(true)
})

export const verseSchema = z.object({
  text: z.string().min(1, 'Verse text is required'),
  reference: z.string().min(1, 'Reference is required'),
  translation: z.string().min(1, 'Translation is required'),
  reflection_note: z.string().min(1, 'Reflection note is required')
})

export const galleryImageSchema = z.object({
  id: z.string().uuid().optional(),
  image_url: z.string().min(1, 'Image URL is required'),
  alt_text: z.string().min(1, 'Alt text is required'),
  title: z.string().min(1, 'Title is required'),
  subtitle: z.string().min(1, 'Subtitle is required'),
  span: z.string().default('col-span-1 md:col-span-1 aspect-[4/5]'),
  sort_order: z.number().int().default(0),
  published: z.boolean().default(true)
})

export const announcementSchema = z.object({
  id: z.string().uuid().optional(),
  message: z.string().min(1, 'Message is required'),
  link_url: z.string().url('Must be a valid URL').optional().nullable(),
  link_text: z.string().optional().nullable(),
  start_date: z.string().optional().nullable(),
  end_date: z.string().optional().nullable(),
  is_active: z.boolean().default(false)
})

export type SiteSettingsInput = z.infer<typeof siteSettingsSchema>
export type EventDataInput = z.infer<typeof eventDataSchema>
export type ContactsSocialInput = z.infer<typeof contactsSocialSchema>
export type SundayServiceInput = z.infer<typeof sundayServiceSchema>
export type SundayVenueInput = z.infer<typeof sundayVenueSchema>
export type SectionInput = z.infer<typeof sectionSchema>
export type ExpectCardInput = z.infer<typeof expectCardSchema>
export type VerseInput = z.infer<typeof verseSchema>
export type GalleryImageInput = z.infer<typeof galleryImageSchema>
export type AnnouncementInput = z.infer<typeof announcementSchema>
export type LoginInput = z.infer<typeof loginSchema>

