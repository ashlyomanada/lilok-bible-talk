import { getSupabaseAdmin, localContentOverrides } from '~/server/utils/admin'
import { eventConfig } from '~/config/event'

export default defineEventHandler(async () => {
  const supabase = getSupabaseAdmin(event)
  if (supabase) {
    try {
      const [serviceRes, venuesRes] = await Promise.all([
        supabase.from('sunday_services').select('*').eq('id', 'default').maybeSingle(),
        supabase.from('sunday_venues').select('*').order('sort_order', { ascending: true })
      ])

      if (serviceRes.data || venuesRes.data) {
        return {
          service: serviceRes.data || {
            day_and_time: eventConfig.sundayService.dayAndTime,
            title: eventConfig.sundayService.title,
            message: eventConfig.sundayService.message,
            note: eventConfig.sundayService.note,
            messenger_url: eventConfig.sundayService.messengerUrl
          },
          venues: venuesRes.data || eventConfig.sundayService.venues.map((v, i) => ({
            id: `venue-${i}`,
            city: v.city,
            venue_name: v.venueName,
            address: v.address,
            status: v.status,
            notes: v.notes,
            sort_order: i + 1,
            published: true
          }))
        }
      }
    } catch {}
  }

  const fallback = localContentOverrides['sunday'] || {
    service: {
      day_and_time: eventConfig.sundayService.dayAndTime,
      title: eventConfig.sundayService.title,
      message: eventConfig.sundayService.message,
      note: eventConfig.sundayService.note,
      messenger_url: eventConfig.sundayService.messengerUrl
    },
    venues: eventConfig.sundayService.venues.map((v, i) => ({
      id: `venue-${i}`,
      city: v.city,
      venue_name: v.venueName,
      address: v.address,
      status: v.status,
      notes: v.notes,
      sort_order: i + 1,
      published: true
    }))
  }

  return fallback
})

