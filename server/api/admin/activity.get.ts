import { getActivityLogs } from '~/server/utils/admin'

export default defineEventHandler(() => {
  return {
    logs: getActivityLogs()
  }
})

