import { getSupabaseAdmin, localContentOverrides, logActivity } from '~/server/utils/admin'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const items = Array.isArray(body) ? body : body.images

  if (!Array.isArray(items)) {
    throw createError({ statusCode: 400, statusMessage: 'Expected array of gallery images' })
  }

  const updatedItems = items.map((img, idx) => ({
    id: img.id || `gal-${idx + 1}`,
    image_url: img.image_url,
    alt_text: img.alt_text || 'Gallery photo',
    title: img.title || 'Fellowship',
    subtitle: img.subtitle || '',
    span: img.span || 'col-span-1 md:col-span-1 aspect-[4/5]',
    sort_order: idx + 1,
    published: img.published !== false,
    updated_at: new Date().toISOString()
  }))

  const supabase = getSupabaseAdmin()
  if (supabase) {
    try {
      for (const img of updatedItems) {
        await supabase.from('gallery_images').upsert(img)
      }
    } catch {}
  }

  localContentOverrides['gallery'] = updatedItems
  logActivity('admin', 'UPDATE', 'gallery', 'all', { count: updatedItems.length })

  return { success: true, data: updatedItems }
})

