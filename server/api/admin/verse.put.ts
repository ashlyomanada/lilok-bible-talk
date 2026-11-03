import { verseSchema } from '~/shared/schemas/site'
import { getSupabaseAdmin, localContentOverrides, logActivity } from '~/server/utils/admin'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const parsed = verseSchema.safeParse(body)
  if (!parsed.success) {
    throw createError({
      statusCode: 400,
      statusMessage: parsed.error.issues[0]?.message || 'Validation failed'
    })
  }

  const payload = {
    id: 'default',
    ...parsed.data,
    updated_at: new Date().toISOString()
  }

  const supabase = getSupabaseAdmin()
  if (supabase) {
    try {
      await supabase.from('verse').upsert(payload)
    } catch {}
  }

  localContentOverrides['verse'] = payload
  logActivity('admin', 'UPDATE', 'verse', 'default', { reference: payload.reference })

  return { success: true, data: payload }
})

