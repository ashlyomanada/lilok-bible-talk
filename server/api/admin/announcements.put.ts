import { announcementSchema } from '~/shared/schemas/site'
import { getSupabaseAdmin, localContentOverrides, logActivity } from '~/server/utils/admin'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const parsed = announcementSchema.safeParse(body)
  if (!parsed.success) {
    throw createError({
      statusCode: 400,
      statusMessage: parsed.error.issues[0]?.message || 'Validation failed'
    })
  }

  const payload = {
    id: body.id || 'announcement-1',
    ...parsed.data,
    updated_at: new Date().toISOString()
  }

  const supabase = getSupabaseAdmin()
  if (supabase) {
    try {
      await supabase.from('announcements').upsert(payload)
    } catch {}
  }

  localContentOverrides['announcement'] = payload
  logActivity('admin', 'UPDATE', 'announcement', payload.id, { message: payload.message, active: payload.is_active })

  return { success: true, data: payload }
})

