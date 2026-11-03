import { logActivity } from '~/server/utils/admin'

export default defineEventHandler(async (event) => {
  try {
    // Invalidate Nitro cache tag for home page
    const storage = useStorage()
    await storage.clear('cache:nitro:handlers:_')
  } catch {}

  logActivity('system', 'REVALIDATE', 'cache', '/', { timestamp: new Date().toISOString() })

  return {
    revalidated: true,
    now: Date.now()
  }
})

