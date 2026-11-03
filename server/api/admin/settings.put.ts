import { siteSettingsSchema } from '~/shared/schemas/site'
import { getSupabaseAdmin, localContentOverrides, logActivity } from '~/server/utils/admin'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const parsed = siteSettingsSchema.safeParse(body)
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
      await supabase.from('site_settings').upsert(payload)
    } catch {}
  }

  localContentOverrides['settings'] = payload
  logActivity('admin', 'UPDATE', 'site_settings', 'default', { groupName: payload.group_name })

  return { success: true, data: payload }
})

