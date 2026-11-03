export default defineNuxtRouteMiddleware(async (to, from) => {
  // Only protect routes under /admin
  if (!to.path.startsWith('/admin')) {
    return
  }

  const { isAuthenticated, checkAuth } = useAdminAuth()

  // Verify auth state
  let isAuthed = isAuthenticated.value
  if (!isAuthed) {
    isAuthed = await checkAuth()
  }

  // If on login page and already authenticated, redirect to /admin
  if (to.path === '/admin/login') {
    if (isAuthed) {
      return navigateTo('/admin')
    }
    return
  }

  // If on any protected /admin page and not authenticated, redirect to login
  if (!isAuthed) {
    return navigateTo({
      path: '/admin/login',
      query: { redirect: to.fullPath }
    })
  }
})

