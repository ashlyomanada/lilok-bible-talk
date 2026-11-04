import { getSupabaseAdmin, localContentOverrides } from '~/server/utils/admin'

const defaultSections = [
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

export default defineEventHandler(async (event) => {
  const supabase = getSupabaseAdmin(event)
  if (supabase) {
    try {
      const { data } = await supabase.from('sections').select('*').order('sort_order', { ascending: true })
      if (data && data.length > 0) {
        return { data }
      }
    } catch {}
  }

  const fallback = localContentOverrides['sections'] || defaultSections
  return { data: fallback }
})

