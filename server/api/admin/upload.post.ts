import path from 'node:path'
import { getSupabaseAdmin, logActivity } from '~/server/utils/admin'

const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml']
const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5 MB

export default defineEventHandler(async (event) => {
  const form = await readMultipartFormData(event)
  if (!form || form.length === 0) {
    throw createError({ statusCode: 400, statusMessage: 'No file uploaded' })
  }

  const fileItem = form.find(f => f.name === 'file')
  const altText = form.find(f => f.name === 'altText')?.data.toString() || 'Uploaded image'

  if (!fileItem || !fileItem.data) {
    throw createError({ statusCode: 400, statusMessage: 'File data is missing' })
  }

  // Validate MIME type
  const mimeType = fileItem.type || 'application/octet-stream'
  if (!ALLOWED_MIME_TYPES.includes(mimeType)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid file type. Only JPEG, PNG, WebP, GIF, and SVG are allowed.'
    })
  }

  // Validate size
  if (fileItem.data.length > MAX_FILE_SIZE) {
    throw createError({
      statusCode: 400,
      statusMessage: 'File size exceeds maximum limit of 5 MB.'
    })
  }

  // Unique sanitized filename
  const ext = path.extname(fileItem.filename || '.jpg') || '.jpg'
  const uniqueName = `upload-${Date.now()}-${Math.random().toString(36).slice(2, 8)}${ext}`

  const supabase = getSupabaseAdmin()
  if (!supabase) {
    throw createError({
      statusCode: 503,
      statusMessage: 'Image uploads are unavailable: configure the server-only Supabase secret key.'
    })
  }

  try {
    const { data, error } = await supabase.storage
      .from('site-media')
      .upload(`gallery/${uniqueName}`, fileItem.data, {
        contentType: mimeType,
        upsert: false
      })

    if (error || !data) {
      console.error('Supabase gallery upload failed:', error?.message || 'No upload result returned')
      throw createError({
        statusCode: 502,
        statusMessage: error?.message || 'Supabase Storage did not accept the upload.'
      })
    }

    const { data: publicUrlData } = supabase.storage
      .from('site-media')
      .getPublicUrl(data.path)

    logActivity('admin', 'UPLOAD', 'media', uniqueName, { url: publicUrlData.publicUrl, altText })

    return {
      success: true,
      url: publicUrlData.publicUrl,
      altText,
      filename: uniqueName
    }
  } catch (error: any) {
    if (error?.statusCode) throw error
    console.error('Supabase gallery upload failed:', error?.message || error)
    throw createError({
      statusCode: 502,
      statusMessage: 'Supabase Storage upload failed. Check the site-media bucket and server key.'
    })
  }
})

