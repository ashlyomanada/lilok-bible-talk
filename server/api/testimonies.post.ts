import { randomUUID } from 'node:crypto'
import { checkRateLimit, getSupabaseAdmin } from '~/server/utils/admin'

const MAX_FILE_SIZE = 10 * 1024 * 1024
const EXTENSIONS_BY_TYPE: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp'
}

export default defineEventHandler(async (event) => {
  const ip = getRequestIP(event, { xForwardedFor: true }) || 'unknown'
  if (!checkRateLimit(`testimony:${ip}`, 3, 60)) {
    throw createError({ statusCode: 429, statusMessage: 'Too many submissions. Please try again later.' })
  }

  const form = await readMultipartFormData(event)
  const file = form?.find(item => item.name === 'photo')
  const name = form?.find(item => item.name === 'name')?.data.toString().trim() || ''
  const message = form?.find(item => item.name === 'message')?.data.toString().trim() || ''

  if (!name || name.length > 100) {
    throw createError({ statusCode: 400, statusMessage: 'Please provide a name (up to 100 characters).' })
  }
  if (message.length > 500) {
    throw createError({ statusCode: 400, statusMessage: 'The testimony note must be 500 characters or fewer.' })
  }
  if (!file?.data) {
    throw createError({ statusCode: 400, statusMessage: 'Please choose a photo to submit.' })
  }
  if (file.data.length > MAX_FILE_SIZE) {
    throw createError({ statusCode: 400, statusMessage: 'Photos must be 10 MB or smaller.' })
  }

  const extension = EXTENSIONS_BY_TYPE[file.type || '']
  if (!extension) {
    throw createError({ statusCode: 400, statusMessage: 'Please upload a JPG, PNG, or WebP image.' })
  }

  const bytes = file.data
  const hasValidImageSignature = extension === 'jpg'
    ? bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff
    : extension === 'png'
      ? bytes.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))
      : bytes.toString('ascii', 0, 4) === 'RIFF' && bytes.toString('ascii', 8, 12) === 'WEBP'
  if (!hasValidImageSignature) {
    throw createError({ statusCode: 400, statusMessage: 'The uploaded file is not a valid JPG, PNG, or WebP image.' })
  }

  const supabase = getSupabaseAdmin(event)
  if (!supabase) {
    throw createError({ statusCode: 503, statusMessage: 'Submissions are temporarily unavailable.' })
  }

  const storagePath = `testimonies/${randomUUID()}.${extension}`
  const { data: uploaded, error: uploadError } = await supabase.storage
    .from('site-media')
    .upload(storagePath, file.data, { contentType: file.type, upsert: false })

  if (uploadError || !uploaded) {
    console.error('[testimonies] Photo upload failed:', uploadError?.message || 'No upload result')
    throw createError({ statusCode: 502, statusMessage: 'Could not upload the photo. Please try again.' })
  }

  const { data: publicUrl } = supabase.storage.from('site-media').getPublicUrl(storagePath)
  const { data, error } = await supabase.from('testimonies').insert({
    name,
    message,
    image_url: publicUrl.publicUrl,
    image_path: storagePath,
    is_published: false
  }).select('id').single()

  if (error || !data) {
    await supabase.storage.from('site-media').remove([storagePath])
    console.error('[testimonies] Submission save failed:', error?.message || 'No submission row returned')
    throw createError({ statusCode: 502, statusMessage: 'Could not save the submission. Please try again.' })
  }

  setResponseStatus(event, 201)
  return { success: true, id: data.id }
})
