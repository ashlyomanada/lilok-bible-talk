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

  const supabase = getSupabaseAdmin()
  if (supabase) {
    try {
      await supabase.from('sunday_services').upsert(payloadService)

      if (Array.isArray(venues)) {
        for (const [idx, v] of venues.entries()) {
          const vData = {
            city: v.city,
            venue_name: v.venue_name,
            address: v.address,
            status: v.status || 'TBA',
            notes: v.notes,
            sort_order: idx + 1,
            published: v.published !== false,
            updated_at: new Date().toISOString()
          }
          if (v.id && !v.id.startsWith('venue-')) {
            await supabase.from('sunday_venues').upsert({ id: v.id, ...vData })
          } else {
            await supabase.from('sunday_venues').insert(vData)
          }
        }
      }
    } catch {}
  }

  localContentOverrides['sunday'] = { service: payloadService, venues }
  logActivity('admin', 'UPDATE', 'sunday', 'default', { title: payloadService.title })

  return { success: true, service: payloadService, venues }
})

