import { getSupabaseAdmin } from '~/server/utils/admin'

export default defineEventHandler(async (event) => {
  setResponseHeader(event, 'Cache-Control', 'public, max-age=30, stale-while-revalidate=60')

  const supabase = getSupabaseAdmin(event)
  if (!supabase) return { data: [] }

  const { data, error } = await supabase
    .from('testimonies')
    .select('id, name, message, image_url, created_at, published_at')
    .eq('is_published', true)
    .order('published_at', { ascending: false })

  if (error) {
    console.warn('[testimonies] Could not load published submissions:', error.message)
    return { data: [] }
  }

  return { data: data || [] }
})
