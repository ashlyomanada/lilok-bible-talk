export default defineEventHandler((event) => {
  const cookie = getCookie(event, 'lilok_admin_session')
  if (!cookie) {
    return { user: null }
  }

  try {
    const user = JSON.parse(cookie)
    if (user && user.role === 'admin') {
      return { user }
    }
  } catch {}

  return { user: null }
})

