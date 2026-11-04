import { getSupabaseAdmin, logActivity, requireAdminSession } from '~/server/utils/admin'

export default defineEventHandler(async (event) => {
  requireAdminSession(event)
  const body = await readBody(event)
  if (typeof body?.id !== 'string' || !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(body.id)) {
    throw createError({ statusCode: 400, statusMessage: 'A valid testimony ID is required.' })
  }
  if (typeof body.is_published !== 'boolean') {
    throw createError({ statusCode: 400, statusMessage: 'Choose whether this testimony is published.' })
  }

  const supabase = getSupabaseAdmin(event)
  if (!supabase) throw createError({ statusCode: 503, statusMessage: 'Testimonies are unavailable: configure the server-only Supabase secret key.' })

  const { data, error } = await supabase.from('testimonies').update({
    is_published: body.is_published,
    published_at: body.is_published ? new Date().toISOString() : null
  }).eq('id', body.id).select().maybeSingle()

  if (error || !data) {
    console.error('[testimonies] Moderation update failed:', error?.message || 'Submission not found')
    throw createError({ statusCode: error ? 502 : 404, statusMessage: 'Could not update this testimony.' })
  }

  logActivity('admin', body.is_published ? 'PUBLISH' : 'UNPUBLISH', 'testimony', data.id, { name: data.name })
  return { success: true, data }
})
