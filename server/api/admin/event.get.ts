import { getSupabaseAdmin, localContentOverrides, logActivity } from '~/server/utils/admin'
import { eventConfig, SCHEDULE } from '~/config/event'

export default defineEventHandler(async () => {
  const supabase = getSupabaseAdmin(event)
  if (supabase) {
    try {
      const { data } = await supabase.from('events').select('*').eq('id', 'current').maybeSingle()
      if (data) {
        return { data }
      }
    } catch {}
  }

  // Fallback / memory overrides
  const fallback = localContentOverrides['event'] || {
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
    special_date_override: null,
    is_cancelled: false,
    countdown_enabled: true,
    venue_name: eventConfig.venue.name,
    venue_room: eventConfig.venue.room,
    venue_address: eventConfig.venue.address,
    venue_city_state_zip: eventConfig.venue.cityStateZip,
    venue_map_url: eventConfig.venue.mapLink,
    venue_notes: eventConfig.venue.notes,
    speaker_name: eventConfig.speaker.name,
    speaker_title: eventConfig.speaker.title,
    speaker_bio: eventConfig.speaker.bio
  }

  return { data: fallback }
})

