import fs from 'node:fs'
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
  if (supabase) {
    try {
      const { data, error } = await supabase.storage
        .from('site-media')
        .upload(`gallery/${uniqueName}`, fileItem.data, {
          contentType: mimeType,
          upsert: false
        })

      if (!error && data) {
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
      }
    } catch (e: any) {
      console.warn('Supabase storage upload failed, using local public upload:', e.message)
    }
  }

  // Local storage fallback into public/images/uploads
  const uploadDir = path.resolve(process.cwd(), 'public/images/uploads')
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true })
  }

  const filePath = path.join(uploadDir, uniqueName)
  fs.writeFileSync(filePath, fileItem.data)

  const publicUrl = `/images/uploads/${uniqueName}`
  logActivity('admin', 'UPLOAD', 'media', uniqueName, { url: publicUrl, altText })

  return {
    success: true,
    url: publicUrl,
    altText,
    filename: uniqueName
  }
})

