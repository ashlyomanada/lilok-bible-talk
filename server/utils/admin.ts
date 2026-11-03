import type { H3Event } from 'h3'
import { createClient } from '@supabase/supabase-js'

// Simple in-memory rate limiter for failed login attempts and mutations
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()

export function checkRateLimit(ip: string, maxAttempts = 5, windowMinutes = 15): boolean {
  const now = Date.now()
  const record = rateLimitMap.get(ip)

  if (!record || now > record.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + windowMinutes * 60 * 1000 })
    return true
  }

  if (record.count >= maxAttempts) {
    return false
  }

  record.count++
  return true
}

export function resetRateLimit(ip: string) {
  rateLimitMap.delete(ip)
}

// In-memory activity log store for recent admin actions
const inMemoryActivityLogs: Array<{
  id: string
  userId: string
  userEmail: string
  action: string
  entityType: string
  entityId?: string
  details?: any
  createdAt: string
}> = [
  {
    id: 'initial-setup',
    userId: 'system',
    userEmail: 'system@micc.church',
    action: 'INITIALIZE',
    entityType: 'cms',
    entityId: 'seed',
    details: { message: 'Lilok Bible Talk CMS configured with hybrid rendering' },
    createdAt: new Date().toISOString()
  }
]

export function logActivity(userEmail: string, action: string, entityType: string, entityId?: string, details?: any) {
  inMemoryActivityLogs.unshift({
    id: `log-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    userId: 'admin',
    userEmail: userEmail || 'admin@micc.church',
    action,
    entityType,
    entityId,
    details,
    createdAt: new Date().toISOString()
  })

  if (inMemoryActivityLogs.length > 50) {
    inMemoryActivityLogs.pop()
  }
}

export function getActivityLogs() {
  return inMemoryActivityLogs
}

export function getSupabaseAdmin() {
  const supabaseUrl = process.env.SUPABASE_URL || process.env.NUXT_PUBLIC_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NUXT_SUPABASE_SECRET_KEY

  if (!supabaseUrl || !supabaseServiceKey) {
    return null
  }

  return createClient(supabaseUrl, supabaseServiceKey)
}

// In-memory content cache for local changes if Supabase is offline
export const localContentOverrides: Record<string, any> = {}

