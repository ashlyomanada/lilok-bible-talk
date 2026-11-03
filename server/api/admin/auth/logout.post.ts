export default defineEventHandler((event) => {
  deleteCookie(event, 'lilok_admin_session')
  return { success: true }
})

