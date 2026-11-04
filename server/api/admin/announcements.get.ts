import { getSupabaseAdmin, localContentOverrides } from '~/server/utils/admin'

export default defineEventHandler(async (event) => {
  const supabase = getSupabaseAdmin(event)
  if (supabase) {
    try {
      const { data } = await supabase.from('announcements').select('*').order('created_at', { ascending: false }).limit(1).maybeSingle()
      if (data) return { data }
    } catch {}
  }

  const fallback = localContentOverrides['announcement'] || {
    id: 'announcement-1',
    message: 'Welcome to Lilok Bible Talk! We gather every Thursday at 7:00 PM.',
    link_url: 'https://m.me/manilaicc',
    link_text: 'Message Us on Messenger',
    start_date: null,
    end_date: null,
    is_active: false
  }

  return { data: fallback }
})

