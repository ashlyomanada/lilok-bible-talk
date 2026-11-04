<script setup lang="ts">
import { ref, watch } from 'vue'
import { useToast } from '~/composables/useToast'
import { useUnsavedChanges } from '~/composables/useUnsavedChanges'

definePageMeta({
  layout: 'admin',
  middleware: 'admin-auth'
})

const { showToast } = useToast()
const { isDirty, markDirty, markClean } = useUnsavedChanges()

interface GalleryItem {
  id?: string
  image_url: string
  alt_text: string
  title: string
  subtitle: string
  span: string
  sort_order: number
  published: boolean
}

const { data: galleryRes, refresh } = await useAsyncData('admin-gallery', () => $fetch('/api/admin/gallery'))

const images = ref<GalleryItem[]>(
  galleryRes.value?.data ? JSON.parse(JSON.stringify(galleryRes.value.data)) : []
)

watch(images, () => markDirty(), { deep: true })

const isSaving = ref(false)
const isUploading = ref(false)
const uploadProgress = ref('')
const fileInputRef = ref<HTMLInputElement | null>(null)

// Drag and drop upload state
const isDragging = ref(false)

const spanOptions = [
  { label: 'Standard Vertical (1 Col, 4:5)', value: 'col-span-1 md:col-span-1 aspect-[4/5]' },
  { label: 'Wide Banner (2 Cols, 16:10)', value: 'col-span-1 md:col-span-2 aspect-[16/10]' },
  { label: 'Square (1 Col, 1:1)', value: 'col-span-1 md:col-span-1 aspect-square' }
]

const moveUp = (idx: number) => {
  if (idx <= 0) return
  const temp = images.value[idx]
  images.value[idx] = images.value[idx - 1]
  images.value[idx - 1] = temp
  images.value.forEach((img, i) => img.sort_order = i + 1)
}

const moveDown = (idx: number) => {
  if (idx >= images.value.length - 1) return
  const temp = images.value[idx]
  images.value[idx] = images.value[idx + 1]
  images.value[idx + 1] = temp
  images.value.forEach((img, i) => img.sort_order = i + 1)
}

const removeImage = async (idx: number) => {
  const item = images.value[idx]
  if (!confirm(`Are you sure you want to delete "${item.title || 'this photo'}"?`)) {
    return
  }

  if (item.id && !item.id.startsWith('new-')) {
    try {
      await $fetch(`/api/admin/gallery?id=${item.id}`, { method: 'DELETE' })
      showToast('Photo removed from storage and database', 'info')
    } catch (e: any) {
      console.warn('Delete call error:', e)
    }
  }

  images.value.splice(idx, 1)
  images.value.forEach((img, i) => img.sort_order = i + 1)
}

const handleFileUpload = async (files: FileList | null) => {
  if (!files || files.length === 0) return

  isUploading.value = true
  uploadProgress.value = 'Uploading file...'

  try {
    let uploadedCount = 0
    for (let i = 0; i < files.length; i++) {
      const file = files[i]

      if (file.size > 5 * 1024 * 1024) {
        showToast(`"${file.name}" exceeds maximum allowed size of 5 MB.`, 'error')
        continue
      }

      const formData = new FormData()
      formData.append('file', file)
      formData.append('altText', file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '))

      const result: any = await $fetch('/api/admin/upload', {
        method: 'POST',
        body: formData
      })

      if (result?.url) {
        const isWide = images.value.length % 3 === 0
        images.value.push({
          id: `new-${Date.now()}-${i}`,
          image_url: result.url,
          alt_text: result.altText || 'Fellowship moment',
          title: 'Fellowship Moment',
          subtitle: 'Connecting through faith and authentic community',
          span: isWide ? 'col-span-1 md:col-span-2 aspect-[16/10]' : 'col-span-1 md:col-span-1 aspect-[4/5]',
          sort_order: images.value.length + 1,
          published: true
        })
        uploadedCount++
      }
    }

    if (uploadedCount > 0) {
      showToast(`${uploadedCount} photo${uploadedCount === 1 ? '' : 's'} uploaded. Click "Save Gallery" to publish.`, 'success')
    }
  } catch (err: any) {
    showToast(err?.statusMessage || 'Upload failed. Ensure image is < 5MB.', 'error')
  } finally {
    isUploading.value = false
    uploadProgress.value = ''
    if (fileInputRef.value) fileInputRef.value.value = ''
  }
}

const onDrop = (e: DragEvent) => {
  isDragging.value = false
  if (e.dataTransfer && e.dataTransfer.files) {
    handleFileUpload(e.dataTransfer.files)
  }
}

const handleSave = async () => {
  isSaving.value = true
  try {
    await $fetch('/api/admin/gallery', {
      method: 'PUT',
      body: images.value
    })

    await $fetch('/api/revalidate', { method: 'POST' }).catch(() => {})
    markClean()
    showToast('Photo gallery saved and updated live!', 'success')
    await refresh()
  } catch (err: any) {
    showToast(err?.statusMessage || 'Failed to save gallery.', 'error')
  } finally {
    isSaving.value = false
  }
}
</script>

<template>
  <div class="space-y-8 text-left max-w-5xl">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
      <div>
        <h1 class="font-sans font-black text-2xl sm:text-3xl uppercase tracking-tight text-white">
          Photo Gallery
        </h1>
        <p class="text-xs sm:text-sm text-surface-300">
          Upload and manage moments from Lilok gatherings. Drag photos, reorder, adjust layout spans, and toggle live visibility.
        </p>
      </div>

      <div class="flex items-center gap-3">
        <button
          type="button"
          class="px-5 py-2.5 rounded-xl font-sans font-black text-xs uppercase tracking-wider bg-accent-500 hover:bg-accent-400 text-navy-950 shadow-lg shadow-accent-500/20 transition-all flex items-center gap-2 disabled:opacity-50"
          :disabled="isSaving"
          @click="handleSave"
        >
          <svg v-if="isSaving" class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
          </svg>
          <span v-if="isSaving">Saving...</span>
          <span v-else>Save Gallery</span>
        </button>
      </div>
    </div>

    <!-- Drag & Drop Upload Zone -->
    <div
      class="border-2 border-dashed rounded-3xl p-8 sm:p-12 text-center transition-all cursor-pointer relative"
      :class="isDragging ? 'border-accent-400 bg-accent-500/10' : 'border-white/20 bg-navy-900/40 hover:border-accent-500/50 hover:bg-navy-900/60'"
      @dragover.prevent="isDragging = true"
      @dragleave.prevent="isDragging = false"
      @drop.prevent="onDrop"
      @click="fileInputRef?.click()"
    >
      <input
        ref="fileInputRef"
        type="file"
        multiple
        accept="image/jpeg,image/png,image/webp,image/gif"
        class="hidden"
        @change="(e: any) => handleFileUpload(e.target.files)"
      />

      <div class="flex flex-col items-center justify-center gap-3">
        <div class="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-accent-400">
          <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
          </svg>
        </div>

        <div>
          <span class="font-sans font-bold text-sm text-white">
            {{ isUploading ? uploadProgress : 'Click to upload or drag & drop photos here' }}
          </span>
          <p class="text-xs text-surface-400 mt-1">
            PNG, JPG, WebP, GIF up to 5 MB each. Automatically optimized & saved to Supabase Storage.
          </p>
        </div>

        <div v-if="isUploading" class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-500/20 text-accent-400 text-xs font-bold animate-pulse">
          Processing uploads...
        </div>
      </div>
    </div>

    <!-- Gallery Items Grid -->
    <div class="space-y-4">
      <div class="flex items-center justify-between">
        <h2 class="text-xs font-black uppercase tracking-wider text-accent-400">
          Current Gallery Photos ({{ images.length }})
        </h2>
        <span class="text-xs text-surface-400">
          Order displayed on public landing page
        </span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          v-for="(img, idx) in images"
          :key="img.id || idx"
          class="bg-navy-900/60 border rounded-2xl overflow-hidden flex flex-col transition-all"
          :class="img.published ? 'border-white/10 shadow-lg' : 'border-white/5 opacity-60 bg-navy-950/60'"
        >
          <!-- Image Header & Preview -->
          <div class="relative h-48 bg-navy-950 overflow-hidden group">
            <img
              :src="img.image_url"
              :alt="img.alt_text"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-transparent to-black/40 pointer-events-none" />

            <!-- Order Badge -->
            <div class="absolute top-3 left-3 flex items-center gap-2">
              <span class="px-2.5 py-1 rounded-lg bg-navy-950/80 backdrop-blur-md text-[11px] font-black uppercase tracking-wider text-accent-400 border border-white/10">
                #{{ idx + 1 }}
              </span>
              <span
                class="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider"
                :class="img.published ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-surface-700/80 text-surface-400 border border-white/10'"
              >
                {{ img.published ? 'Published' : 'Draft' }}
              </span>
            </div>

            <!-- Action buttons: Up, Down, Delete -->
            <div class="absolute top-3 right-3 flex items-center gap-1.5 bg-navy-950/80 backdrop-blur-md p-1 rounded-xl border border-white/10">
              <button
                type="button"
                :disabled="idx === 0"
                class="p-1 rounded text-surface-300 hover:text-white disabled:opacity-30 disabled:hover:text-surface-300"
                title="Move earlier"
                @click="moveUp(idx)"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 15l7-7 7 7"/>
                </svg>
              </button>
              <button
                type="button"
                :disabled="idx === images.length - 1"
                class="p-1 rounded text-surface-300 hover:text-white disabled:opacity-30 disabled:hover:text-surface-300"
                title="Move later"
                @click="moveDown(idx)"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"/>
                </svg>
              </button>
              <button
                type="button"
                class="p-1 rounded text-red-400 hover:bg-red-500/20 transition-colors"
                title="Delete photo"
                @click="removeImage(idx)"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                </svg>
              </button>
            </div>
          </div>

          <!-- Edit Fields -->
          <div class="p-5 space-y-4 flex-grow flex flex-col justify-between">
            <div class="space-y-3">
              <div>
                <label class="block text-[11px] font-black uppercase tracking-wider text-surface-300 mb-1">
                  Title Overlay
                </label>
                <input
                  v-model="img.title"
                  type="text"
                  placeholder="e.g. Authentic Fellowship"
                  class="w-full bg-navy-950 border border-white/10 rounded-xl px-3.5 py-2 text-xs font-semibold text-white focus:outline-none focus:border-accent-500 transition-colors"
                />
              </div>

              <div>
                <label class="block text-[11px] font-black uppercase tracking-wider text-surface-300 mb-1">
                  Subtitle / Description
                </label>
                <input
                  v-model="img.subtitle"
                  type="text"
                  placeholder="Short caption describing the moment"
                  class="w-full bg-navy-950 border border-white/10 rounded-xl px-3.5 py-2 text-xs font-medium text-white focus:outline-none focus:border-accent-500 transition-colors"
                />
              </div>

              <div>
                <label class="block text-[11px] font-black uppercase tracking-wider text-surface-300 mb-1">
                  Alt Text (SEO & Accessibility) <span class="text-red-400">*</span>
                </label>
                <input
                  v-model="img.alt_text"
                  type="text"
                  required
                  placeholder="Accurate description of the image content"
                  class="w-full bg-navy-950 border border-white/10 rounded-xl px-3.5 py-2 text-xs font-medium text-white focus:outline-none focus:border-accent-500 transition-colors"
                />
              </div>

              <div>
                <label class="block text-[11px] font-black uppercase tracking-wider text-surface-300 mb-1">
                  Grid Layout Span
                </label>
                <select
                  v-model="img.span"
                  class="w-full bg-navy-950 border border-white/10 rounded-xl px-3.5 py-2 text-xs font-semibold text-white focus:outline-none focus:border-accent-500 transition-colors"
                >
                  <option v-for="opt in spanOptions" :key="opt.value" :value="opt.value">
                    {{ opt.label }}
                  </option>
                </select>
              </div>
            </div>

            <!-- Published switch -->
            <div class="pt-3 border-t border-white/10 flex items-center justify-between">
              <span class="text-xs font-bold text-surface-300">
                Visible in Gallery
              </span>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="img.published" class="sr-only peer">
                <div class="w-10 h-5 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-accent-500"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

