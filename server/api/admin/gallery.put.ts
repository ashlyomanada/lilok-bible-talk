import { getSupabaseAdmin, localContentOverrides, logActivity } from '~/server/utils/admin'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const items = Array.isArray(body) ? body : body.images

  if (!Array.isArray(items)) {
    throw createError({ statusCode: 400, statusMessage: 'Expected array of gallery images' })
  }

  const updatedItems = items.map((img, idx) => ({
    ...(img.id && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(img.id) ? { id: img.id } : {}),
    image_url: img.image_url,
    alt_text: img.alt_text || 'Gallery photo',
    title: img.title || 'Fellowship',
    subtitle: img.subtitle || '',
    span: img.span || 'col-span-1 md:col-span-1 aspect-[4/5]',
    sort_order: idx + 1,
    published: img.published !== false,
    updated_at: new Date().toISOString()
  }))

  const supabase = getSupabaseAdmin(event)
  if (!supabase) {
    throw createError({
      statusCode: 503,
      statusMessage: 'Gallery cannot be saved: configure the server-only Supabase secret key.'
    })
  }

  const savedItems = []
  for (const img of updatedItems) {
    const { data, error } = await supabase
      .from('gallery_images')
      .upsert(img)
      .select()
      .single()

    if (error || !data) {
      console.error('Supabase gallery save failed:', error?.message || 'No saved row returned')
      throw createError({
        statusCode: 502,
        statusMessage: error?.message || 'Supabase could not save the gallery. Check the database permissions and schema.'
      })
    }

    savedItems.push(data)
  }

  localContentOverrides['gallery'] = savedItems
  logActivity('admin', 'UPDATE', 'gallery', 'all', { count: updatedItems.length })

  return { success: true, data: savedItems }
})

