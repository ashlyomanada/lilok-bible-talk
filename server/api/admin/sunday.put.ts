import { sundayServiceSchema, sundayVenueSchema } from '~/shared/schemas/site'
import { getSupabaseAdmin, localContentOverrides, logActivity } from '~/server/utils/admin'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { service, venues } = body

  const parsedService = sundayServiceSchema.safeParse(service)
  if (!parsedService.success) {
    throw createError({
      statusCode: 400,
      statusMessage: parsedService.error.issues[0]?.message || 'Service validation failed'
    })
  }

  const payloadService = {
    id: 'default',
    ...parsedService.data,
    updated_at: new Date().toISOString()
  }

  const supabase = getSupabaseAdmin(event)
  if (!supabase) {
    throw createError({
      statusCode: 503,
      statusMessage: 'Sunday service cannot be saved: configure the server-only Supabase secret key.'
    })
  }

  const { error: serviceError } = await supabase.from('sunday_services').upsert(payloadService)
  if (serviceError) {
    console.error('Supabase Sunday service save failed:', serviceError.message)
    throw createError({ statusCode: 502, statusMessage: 'Could not save Sunday service details.' })
  }

  let savedVenues: any[] | undefined
  if (Array.isArray(venues)) {
    const { data: existingVenues, error: listError } = await supabase
      .from('sunday_venues')
      .select('id')
    if (listError) {
      console.error('Supabase Sunday venue lookup failed:', listError.message)
      throw createError({ statusCode: 502, statusMessage: 'Could not load the saved venue list.' })
    }

    const venueRows = venues.map((venue: any, idx: number) => {
      const id = typeof venue.id === 'string' && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(venue.id)
        ? venue.id
        : undefined
      const parsed = sundayVenueSchema.safeParse({
        ...(id ? { id } : {}),
        city: venue.city,
        venue_name: venue.venue_name,
        address: venue.address,
        status: venue.status || 'TBA',
        notes: venue.notes,
        sort_order: idx + 1,
        published: venue.published !== false
      })

      if (!parsed.success) {
        throw createError({
          statusCode: 400,
          statusMessage: parsed.error.issues[0]?.message || `Venue ${idx + 1} is invalid.`
        })
      }
      return parsed.data
    })

    const upsertedVenues: any[] = []
    for (const venue of venueRows) {
      const { data, error } = await supabase.from('sunday_venues').upsert(venue).select().single()
      if (error || !data) {
        console.error('Supabase Sunday venue save failed:', error?.message || 'No rows returned')
        throw createError({ statusCode: 502, statusMessage: 'Could not save the Sunday venues.' })
      }
      upsertedVenues.push(data)
    }

    const savedIds = new Set(upsertedVenues.map(venue => venue.id))
    const removedIds = (existingVenues || []).map(venue => venue.id).filter(id => !savedIds.has(id))
    if (removedIds.length) {
      const { error } = await supabase.from('sunday_venues').delete().in('id', removedIds)
      if (error) {
        console.error('Supabase Sunday venue removal failed:', error.message)
        throw createError({ statusCode: 502, statusMessage: 'Could not remove the deleted Sunday venues.' })
      }
    }

    savedVenues = upsertedVenues
  }

  const savedSunday = { service: payloadService, ...(savedVenues ? { venues: savedVenues } : {}) }
  localContentOverrides['sunday'] = savedSunday
  logActivity('admin', 'UPDATE', 'sunday', 'default', { title: payloadService.title, venueCount: savedVenues?.length })

  return { success: true, service: payloadService, venues: savedVenues ?? venues }
})

