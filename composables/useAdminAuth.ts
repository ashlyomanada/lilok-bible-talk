import { ref, computed } from 'vue'

export interface AdminUser {
  id: string
  email: string
  fullName: string
  role: 'admin' | 'editor'
}

export function useAdminAuth() {
  const supabase = useSupabaseClient ? useSupabaseClient() : null
  const supabaseUser = useSupabaseUser ? useSupabaseUser() : null

  // Persistent user state in cookie / localStorage
  const adminUser = useState<AdminUser | null>('admin-user', () => null)
  const isCheckingAuth = useState<boolean>('is-checking-auth', () => false)

  const isAuthenticated = computed(() => {
    return Boolean(adminUser.value && adminUser.value.role === 'admin')
  })

  // Initialize from session / cookie on client
  async function checkAuth(): Promise<boolean> {
    if (adminUser.value) return true
    isCheckingAuth.value = true

    try {
      // 1. Check local session storage if available
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('lilok_admin_session')
        if (stored) {
          try {
            const parsed = JSON.parse(stored)
            if (parsed && parsed.email && parsed.role === 'admin') {
              adminUser.value = parsed
              isCheckingAuth.value = false
              return true
            }
          } catch {}
        }
      }

      // 2. Check Supabase session if Supabase is active
      if (supabase && supabaseUser && supabaseUser.value) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', supabaseUser.value.id)
          .maybeSingle()

        if (profile && profile.role === 'admin') {
          adminUser.value = {
            id: profile.id,
            email: profile.email,
            fullName: profile.full_name || 'Admin',
            role: 'admin'
          }
          if (typeof window !== 'undefined') {
            localStorage.setItem('lilok_admin_session', JSON.stringify(adminUser.value))
          }
          isCheckingAuth.value = false
          return true
        }
      }

      // 3. Check server auth endpoint
      const res = await $fetch<{ user: AdminUser | null }>('/api/admin/auth/me', {
        headers: useRequestHeaders(['cookie'])
      }).catch(() => ({ user: null }))

      if (res.user && res.user.role === 'admin') {
        adminUser.value = res.user
        if (typeof window !== 'undefined') {
          localStorage.setItem('lilok_admin_session', JSON.stringify(adminUser.value))
        }
        isCheckingAuth.value = false
        return true
      }
    } catch (err) {
      console.error('Auth verification error:', err)
    } finally {
      isCheckingAuth.value = false
    }

    adminUser.value = null
    return false
  }

  async function login(email: string, password: string):Promise<{ success: boolean; error?: string }> {
    try {
      const res = await $fetch<{ success: boolean; user?: AdminUser; error?: string }>('/api/admin/auth/login', {
        method: 'POST',
        body: { email, password }
      })

      if (!res.success || !res.user) {
        return { success: false, error: res.error || 'Invalid email or password' }
      }

      if (res.user.role !== 'admin') {
        return { success: false, error: 'Access denied. Administrator privileges required.' }
      }

      adminUser.value = res.user
      if (typeof window !== 'undefined') {
        localStorage.setItem('lilok_admin_session', JSON.stringify(res.user))
      }

      // Also sign in with Supabase client if configured
      if (supabase) {
        try {
          await supabase.auth.signInWithPassword({ email, password })
        } catch {}
      }

      return { success: true }
    } catch (err: any) {
      return {
        success: false,
        error: err?.data?.message || err?.message || 'Authentication failed. Please check credentials.'
      }
    }
  }

  async function logout() {
    try {
      await $fetch('/api/admin/auth/logout', { method: 'POST' }).catch(() => {})
      if (supabase) {
        await supabase.auth.signOut().catch(() => {})
      }
    } finally {
      adminUser.value = null
      if (typeof window !== 'undefined') {
        localStorage.removeItem('lilok_admin_session')
      }
      navigateTo('/admin/login')
    }
  }

  return {
    adminUser,
    isAuthenticated,
    isCheckingAuth,
    checkAuth,
    login,
    logout
  }
}

