import { clearAdminApiSession } from '~/server/utils/admin'

export default defineEventHandler((event) => {
  deleteCookie(event, 'lilok_admin_session')
  clearAdminApiSession(event)
  return { success: true }
})

