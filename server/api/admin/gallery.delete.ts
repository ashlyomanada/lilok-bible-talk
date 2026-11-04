import { getSupabaseAdmin, localContentOverrides, logActivity } from '~/server/utils/admin'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const id = query.id as string

  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'Image ID is required' })
  }

  const supabase = getSupabaseAdmin()
  if (supabase) {
    try {
      // Find record to get storage path
      const { data: img } = await supabase.from('gallery_images').select('*').eq('id', id).maybeSingle()
      if (img && img.image_url) {
        if (img.image_url.includes('site-media')) {
          const parts = img.image_url.split('/site-media/')
          if (parts[1]) {
            await supabase.storage.from('site-media').remove([parts[1]])
          }
        }
      }
      await supabase.from('gallery_images').delete().eq('id', id)
    } catch {}
  }

  if (Array.isArray(localContentOverrides['gallery'])) {
    localContentOverrides['gallery'] = localContentOverrides['gallery'].filter((g: any) => g.id !== id)
  }

  logActivity('admin', 'DELETE', 'gallery', id)
  return { success: true, id }
})

