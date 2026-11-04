import { getSupabaseAdmin, logActivity } from '~/server/utils/admin'

export default defineEventHandler(async () => {
  const supabase = getSupabaseAdmin(event)
  if (supabase) {
    try {
      const { data } = await supabase.from('profiles').select('*').order('created_at', { ascending: false })
      if (data && data.length > 0) {
        return { users: data }
      }
    } catch {}
  }

  // Fallback profile list
  return {
    users: [
      {
        id: 'admin-1',
        email: 'admin@micc.church',
        full_name: 'Lilok Administrator',
        role: 'admin',
        created_at: new Date().toISOString()
      }
    ]
  }
})

