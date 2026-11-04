import { getSupabaseAdmin, logActivity, requireAdminSession } from '~/server/utils/admin'

export default defineEventHandler(async (event) => {
  requireAdminSession(event)
  const id = getQuery(event).id
  if (typeof id !== 'string' || !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id)) {
    throw createError({ statusCode: 400, statusMessage: 'A valid testimony ID is required.' })
  }

  const supabase = getSupabaseAdmin()
  if (!supabase) throw createError({ statusCode: 503, statusMessage: 'Testimonies are unavailable: configure the server-only Supabase secret key.' })

  const { data: testimony, error: lookupError } = await supabase.from('testimonies').select('id, image_path, name').eq('id', id).maybeSingle()
  if (lookupError || !testimony) {
    throw createError({ statusCode: lookupError ? 502 : 404, statusMessage: 'Testimony not found.' })
  }

  const { error: storageError } = await supabase.storage.from('site-media').remove([testimony.image_path])
  if (storageError) {
    console.error('[testimonies] Photo deletion failed:', storageError.message)
    throw createError({ statusCode: 502, statusMessage: 'Could not remove the submitted photo.' })
  }

  const { error } = await supabase.from('testimonies').delete().eq('id', id)
  if (error) {
    console.error('[testimonies] Submission deletion failed:', error.message)
    throw createError({ statusCode: 502, statusMessage: 'Could not delete this testimony.' })
  }

  logActivity('admin', 'DELETE', 'testimony', id, { name: testimony.name })
  return { success: true, id }
})
