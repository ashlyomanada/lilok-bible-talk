import { getSupabaseAdmin, localContentOverrides } from '~/server/utils/admin'
import { eventConfig } from '~/config/event'

export default defineEventHandler(async () => {
  const supabase = getSupabaseAdmin()
  if (supabase) {
    try {
      const { data } = await supabase.from('verse').select('*').eq('id', 'default').maybeSingle()
      if (data) return { data }
    } catch {}
  }

  const fallback = localContentOverrides['verse'] || {
    id: 'default',
    text: eventConfig.verse.text,
    reference: eventConfig.verse.reference,
    translation: eventConfig.verse.translation,
    reflection_note: eventConfig.verse.reflectionNote
  }

  return { data: fallback }
})

