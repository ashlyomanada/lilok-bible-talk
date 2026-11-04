import { loginSchema } from '~/shared/schemas/site'
import { checkRateLimit, resetRateLimit, logActivity, getSupabaseAdmin, setAdminApiSession } from '~/server/utils/admin'

export default defineEventHandler(async (event) => {
  const ip = getRequestIP(event, { xForwardedFor: true }) || '127.0.0.1'

  // 1. Check rate limit
  if (!checkRateLimit(`login:${ip}`, 5, 15)) {
    throw createError({
      statusCode: 429,
      statusMessage: 'Too many failed login attempts. Please try again after 15 minutes.'
    })
  }

  // 2. Validate input with Zod schema
  const body = await readBody(event).catch(() => ({}))
  const parsed = loginSchema.safeParse(body)
  if (!parsed.success) {
    throw createError({
      statusCode: 400,
      statusMessage: parsed.error.issues[0]?.message || 'Invalid email or password'
    })
  }

  const { email, password } = parsed.data
  const expectedAdminEmail = process.env.ADMIN_EMAIL || 'admin@micc.church'
  const expectedAdminPassword = process.env.ADMIN_PASSWORD || 'LilokAdmin2026!'

  // 3. Authenticate with Supabase if available
  const supabase = getSupabaseAdmin(event)
  if (supabase) {
    try {
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (!authError && authData.user) {
        // Verify role in profiles table
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', authData.user.id)
          .maybeSingle()

        if (profile && profile.role === 'admin') {
          resetRateLimit(`login:${ip}`)
          logActivity(email, 'LOGIN', 'auth', authData.user.id, { ip })

          const user = {
            id: authData.user.id,
            email: authData.user.email!,
            fullName: profile.full_name || 'Administrator',
            role: 'admin' as const
          }

          setCookie(event, 'lilok_admin_session', JSON.stringify(user), {
            httpOnly: false,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7 // 7 days
          })
          setAdminApiSession(event, user)

          return { success: true, user }
        }
      }
    } catch (e: any) {
      console.warn('Supabase auth check failed, evaluating fallback:', e.message)
    }
  }

  // 4. Default / local credentials fallback
  if (email.toLowerCase() === expectedAdminEmail.toLowerCase() && password === expectedAdminPassword) {
    resetRateLimit(`login:${ip}`)
    logActivity(email, 'LOGIN', 'auth', 'admin-local', { ip })

    const user = {
      id: 'admin-local',
      email: expectedAdminEmail,
      fullName: 'Lilok Administrator',
      role: 'admin' as const
    }

    setCookie(event, 'lilok_admin_session', JSON.stringify(user), {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7
    })
    setAdminApiSession(event, user)

    return { success: true, user }
  }

  // Generic error to prevent user enumeration
  throw createError({
    statusCode: 401,
    statusMessage: 'Invalid email or password'
  })
})

