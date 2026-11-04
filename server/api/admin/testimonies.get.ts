import { getSupabaseAdmin, requireAdminSession } from '~/server/utils/admin'

export default defineEventHandler(async (event) => {
  requireAdminSession(event)
  const supabase = getSupabaseAdmin()
  if (!supabase) {
    throw createError({ statusCode: 503, statusMessage: 'Testimonies are unavailable: configure the server-only Supabase secret key.' })
  }

  const { data, error } = await supabase.from('testimonies').select('*').order('created_at', { ascending: false })
  if (error) {
    console.error('[testimonies] Admin list failed:', error.message)
    throw createError({ statusCode: 502, statusMessage: 'Could not load submitted testimonies.' })
  }

  return { data: data || [] }
})
