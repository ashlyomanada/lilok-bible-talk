import { getSupabaseAdmin, localContentOverrides, logActivity } from '~/server/utils/admin'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const sections = Array.isArray(body) ? body : body.sections

  if (!Array.isArray(sections)) {
    throw createError({ statusCode: 400, statusMessage: 'Expected sections array' })
  }

  const updatedSections = sections.map((sec, idx) => ({
    id: sec.id,
    name: sec.name,
    title: sec.title || sec.name,
    subtitle: sec.subtitle || null,
    body_markdown: sec.body_markdown || null,
    image_url: sec.image_url || null,
    button_label: sec.button_label || null,
    button_url: sec.button_url || null,
    sort_order: idx + 1,
    is_visible: sec.is_visible !== false,
    updated_at: new Date().toISOString()
  }))

  const supabase = getSupabaseAdmin(event)
  if (supabase) {
    try {
      for (const sec of updatedSections) {
        await supabase.from('sections').upsert(sec)
      }
    } catch {}
  }

  localContentOverrides['sections'] = updatedSections
  logActivity('admin', 'UPDATE', 'sections', 'all', { count: updatedSections.length })

  return { success: true, data: updatedSections }
})

