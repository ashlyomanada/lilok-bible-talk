import { getSupabaseAdmin, localContentOverrides, logActivity } from '~/server/utils/admin'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const cards = Array.isArray(body) ? body : body.cards

  if (!Array.isArray(cards)) {
    throw createError({ statusCode: 400, statusMessage: 'Expected cards array' })
  }

  const updatedCards = cards.map((c, idx) => ({
    id: c.id || `card-${idx + 1}`,
    card_id: c.card_id || `card-${Date.now()}-${idx}`,
    title: c.title,
    tagline: c.tagline,
    description: c.description,
    icon: c.icon || 'heart',
    badge: c.badge || null,
    span: c.span || 'col-span-1',
    sort_order: idx + 1,
    published: c.published !== false,
    updated_at: new Date().toISOString()
  }))

  const supabase = getSupabaseAdmin(event)
  if (supabase) {
    try {
      for (const card of updatedCards) {
        await supabase.from('expect_cards').upsert(card)
      }
    } catch {}
  }

  localContentOverrides['expect_cards'] = updatedCards
  logActivity('admin', 'UPDATE', 'expect_cards', 'all', { count: updatedCards.length })

  return { success: true, data: updatedCards }
})

