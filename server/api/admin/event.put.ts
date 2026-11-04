import { eventDataSchema } from '~/shared/schemas/site'
import { getSupabaseAdmin, localContentOverrides, logActivity } from '~/server/utils/admin'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const parsed = eventDataSchema.safeParse(body)
  if (!parsed.success) {
    throw createError({
      statusCode: 400,
      statusMessage: parsed.error.issues[0]?.message || 'Validation failed'
    })
  }

  const payload = {
    id: 'current',
    ...parsed.data,
    updated_at: new Date().toISOString()
  }

  const supabase = getSupabaseAdmin()
  if (supabase) {
    try {
      await supabase.from('events').upsert(payload)
    } catch (e: any) {
      console.warn('Supabase upsert failed, saving to local override:', e.message)
    }
  }

  localContentOverrides['event'] = payload
  logActivity('admin', 'UPDATE', 'event', 'current', { title: payload.title })

  return { success: true, data: payload }
})

