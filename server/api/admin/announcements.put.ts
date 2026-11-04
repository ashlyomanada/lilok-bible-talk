import { announcementSchema } from '~/shared/schemas/site'
import { getSupabaseAdmin, localContentOverrides, logActivity } from '~/server/utils/admin'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const candidateId = typeof body?.id === 'string' ? body.id : undefined
  const parsedId = announcementSchema.shape.id.safeParse(candidateId)
  const input = { ...body }
  if (!parsedId.success) delete input.id

  const parsed = announcementSchema.safeParse(input)
  if (!parsed.success) {
    throw createError({
      statusCode: 400,
      statusMessage: parsed.error.issues[0]?.message || 'Validation failed'
    })
  }

  const payload = {
    ...parsed.data,
    updated_at: new Date().toISOString()
  }
  if (parsedId.success && parsedId.data) payload.id = parsedId.data

  const supabase = getSupabaseAdmin()
  if (!supabase) {
    throw createError({
      statusCode: 503,
      statusMessage: 'Announcement cannot be saved: configure the server-only Supabase secret key.'
    })
  }

  const { data, error } = await supabase.from('announcements').upsert(payload).select().single()
  if (error || !data) {
    console.error('Supabase announcement save failed:', error?.message || 'No saved row returned')
    throw createError({
      statusCode: 502,
      statusMessage: error?.message || 'Could not save the announcement.'
    })
  }

  localContentOverrides['announcement'] = data
  logActivity('admin', 'UPDATE', 'announcement', data.id, { message: data.message, active: data.is_active })

  return { success: true, data }
})

