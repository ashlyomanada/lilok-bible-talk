import type { H3Event } from 'h3'
import { createError, deleteCookie, getCookie, setCookie } from 'h3'
import { createHmac, timingSafeEqual } from 'node:crypto'
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

export function getSupabaseAdmin(event: H3Event) {
  const config = useRuntimeConfig(event)
  const supabaseUrl = config.public.supabase.url || process.env.SUPABASE_URL || process.env.NUXT_PUBLIC_SUPABASE_URL
  const supabaseServiceKey = config.supabaseSecretKey
    || process.env.NUXT_SUPABASE_SECRET_KEY
    || process.env.SUPABASE_SECRET_KEY
    || process.env.SUPABASE_SERVICE_KEY
    || process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseServiceKey) {
    return null
  }

  return createClient(supabaseUrl, supabaseServiceKey)
}

function getAdminSessionSecret(event: H3Event) {
  const config = useRuntimeConfig(event)
  return config.adminSessionSecret
    || process.env.ADMIN_SESSION_SECRET
    || config.supabaseSecretKey
    || process.env.NUXT_SUPABASE_SECRET_KEY
    || process.env.SUPABASE_SECRET_KEY
    || process.env.SUPABASE_SERVICE_KEY
    || process.env.SUPABASE_SERVICE_ROLE_KEY
    || process.env.ADMIN_PASSWORD
}

export function setAdminApiSession(event: H3Event, user: { role: string; [key: string]: unknown }) {
  const secret = getAdminSessionSecret(event)
  if (!secret) {
    throw createError({ statusCode: 503, statusMessage: 'Server-side admin session signing is not configured.' })
  }

  const payload = Buffer.from(JSON.stringify(user)).toString('base64url')
  const signature = createHmac('sha256', secret).update(payload).digest('base64url')
  setCookie(event, 'lilok_admin_api_session', `${payload}.${signature}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7
  })
}

export function clearAdminApiSession(event: H3Event) {
  deleteCookie(event, 'lilok_admin_api_session', { path: '/' })
}

export function requireAdminSession(event: H3Event) {
  const sessionCookie = getCookie(event, 'lilok_admin_api_session')
  const secret = getAdminSessionSecret(event)
  try {
    if (sessionCookie && secret) {
      const [payload, signature] = sessionCookie.split('.')
      if (payload && signature) {
        const expected = createHmac('sha256', secret).update(payload).digest()
        const received = Buffer.from(signature, 'base64url')
        if (expected.length === received.length && timingSafeEqual(expected, received)) {
          const user = JSON.parse(Buffer.from(payload, 'base64url').toString())
          if (user?.role === 'admin') return user
        }
      }
    }
  } catch {}

  throw createError({ statusCode: 401, statusMessage: 'Administrator sign-in is required.' })
}

// In-memory content cache for local changes if Supabase is offline
export const localContentOverrides: Record<string, any> = {}

