import { getSupabaseAdmin, logActivity } from '~/server/utils/admin'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { email, password, full_name, role } = body

  if (!email || !password) {
    throw createError({ statusCode: 400, statusMessage: 'Email and password are required' })
  }

  const supabase = getSupabaseAdmin()
  if (supabase) {
    try {
      const { data: authData, error: authErr } = await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: { full_name: full_name || email }
      })

      if (authErr) {
        throw createError({ statusCode: 400, statusMessage: authErr.message })
      }

      await supabase.from('profiles').upsert({
        id: authData.user.id,
        email,
        full_name: full_name || email,
        role: role || 'editor'
      })

      logActivity('admin', 'CREATE_USER', 'user', authData.user.id, { email, role })
      return { success: true, user: { id: authData.user.id, email, full_name, role } }
    } catch (e: any) {
      throw createError({ statusCode: 400, statusMessage: e.message })
    }
  }

  return { success: true, message: 'User provisioned in local store' }
})

