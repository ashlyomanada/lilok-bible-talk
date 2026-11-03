// Database TypeScript types for Lilok Bible Talk CMS

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Profile {
  id: string
  email: string
  full_name: string | null
  role: 'admin' | 'editor'
  created_at: string
  updated_at: string
}

export interface SiteSettings {
  id: string
  group_name: string
  tagline: string
  hashtag: string
  logo_url: string
  logo_alt: string
  church_full_name: string
  parent_church_name: string
  parent_region: string
  sold_out_badge: string
  about_church: string
  footer_blessing: string | null
  seo_title: string
  seo_description: string
  seo_og_image: string
  canonical_url: string
  brand_colors: {
    primary: string
    accent: string
    [key: string]: string
  }
  updated_at: string
  updated_by: string | null
}

export interface EventData {
  id: string
  title: string
  subtitle: string
  one_line_welcome: string
  no_pressure_line: string
  reassurance_chips: string[]
  recurrence_weekday: number
  recurrence_hour: number
  recurrence_minute: number
  recurrence_duration_minutes: number
  recurrence_timezone: string
  doors_open_time: string
  special_date_override: string | null
  is_cancelled: boolean
  countdown_enabled: boolean
  venue_name: string
  venue_room: string
  venue_address: string
  venue_city_state_zip: string
  venue_map_url: string
  venue_notes: string
  speaker_name: string
  speaker_title: string
  speaker_bio: string
  updated_at: string
  updated_by: string | null
}

export interface ContactsSocial {
  id: string
  messenger_url: string
  facebook_url: string
  facebook_page_name: string
  instagram_url: string
  instagram_handle: string
  micc_instagram_url: string
  micc_instagram_handle: string
  youtube_url: string
  youtube_handle: string
  email: string
  phone: string
  display_phone: string
  connect_copy: string
  updated_at: string
  updated_by: string | null
}

export interface SundayService {
  id: string
  day_and_time: string
  title: string
  message: string
  note: string
  messenger_url: string
  updated_at: string
  updated_by: string | null
}

export interface SundayVenue {
  id: string
  city: string
  venue_name: string
  address: string
  status: 'TBA' | 'Confirmed'
  notes: string
  sort_order: number
  published: boolean
  updated_at: string
  updated_by: string | null
}

export interface SectionItem {
  id: string
  name: string
  title: string
  subtitle: string | null
  body_markdown: string | null
  image_url: string | null
  button_label: string | null
  button_url: string | null
  sort_order: number
  is_visible: boolean
  updated_at: string
  updated_by: string | null
}

export interface ExpectCard {
  id: string
  card_id: string
  title: string
  tagline: string
  description: string
  icon: string
  badge: string | null
  span: string
  sort_order: number
  published: boolean
  updated_at: string
  updated_by: string | null
}

export interface VerseData {
  id: string
  text: string
  reference: string
  translation: string
  reflection_note: string
  updated_at: string
  updated_by: string | null
}

export interface GalleryImage {
  id: string
  image_url: string
  alt_text: string
  title: string
  subtitle: string
  span: string
  sort_order: number
  published: boolean
  created_at: string
  updated_at: string
  updated_by: string | null
}

export interface Announcement {
  id: string
  message: string
  link_url: string | null
  link_text: string | null
  start_date: string | null
  end_date: string | null
  is_active: boolean
  created_at: string
  updated_at: string
  updated_by: string | null
}

export interface ActivityLog {
  id: string
  user_id: string | null
  user_email: string | null
  action: string
  entity_type: string
  entity_id: string | null
  details: Json | null
  created_at: string
}

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile
        Insert: Partial<Profile> & { id: string; email: string }
        Update: Partial<Profile>
      }
      site_settings: {
        Row: SiteSettings
        Insert: Partial<SiteSettings> & { id?: string }
        Update: Partial<SiteSettings>
      }
      events: {
        Row: EventData
        Insert: Partial<EventData> & { id?: string }
        Update: Partial<EventData>
      }
      contacts_social: {
        Row: ContactsSocial
        Insert: Partial<ContactsSocial> & { id?: string }
        Update: Partial<ContactsSocial>
      }
      sunday_services: {
        Row: SundayService
        Insert: Partial<SundayService> & { id?: string }
        Update: Partial<SundayService>
      }
      sunday_venues: {
        Row: SundayVenue
        Insert: Partial<SundayVenue>
        Update: Partial<SundayVenue>
      }
      sections: {
        Row: SectionItem
        Insert: Partial<SectionItem> & { id: string }
        Update: Partial<SectionItem>
      }
      expect_cards: {
        Row: ExpectCard
        Insert: Partial<ExpectCard> & { card_id: string }
        Update: Partial<ExpectCard>
      }
      verse: {
        Row: VerseData
        Insert: Partial<VerseData> & { id?: string }
        Update: Partial<VerseData>
      }
      gallery_images: {
        Row: GalleryImage
        Insert: Partial<GalleryImage>
        Update: Partial<GalleryImage>
      }
      announcements: {
        Row: Announcement
        Insert: Partial<Announcement>
        Update: Partial<Announcement>
      }
      activity_logs: {
        Row: ActivityLog
        Insert: Partial<ActivityLog> & { action: string; entity_type: string }
        Update: Partial<ActivityLog>
      }
    }
  }
}

