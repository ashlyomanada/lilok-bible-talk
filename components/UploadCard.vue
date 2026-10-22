<script setup lang="ts">
import { ref } from 'vue'
import { eventConfig } from '~/config/event'
import { useToast } from '~/composables/useToast'

const { showToast } = useToast()

const fileInputRef = ref<HTMLInputElement | null>(null)
const previewUrl = ref<string | null>(null)
const selectedFileName = ref<string>('')
const isDragging = ref(false)

const form = ref({
  name: '',
  message: ''
})

const handleFileSelect = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (target.files && target.files[0]) {
    processFile(target.files[0])
  }
}

const handleDrop = (e: DragEvent) => {
  isDragging.value = false
  if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0]) {
    processFile(e.dataTransfer.files[0])
  }
}

const processFile = (file: File) => {
  if (!file.type.startsWith('image/')) {
    showToast('Please select an image file (PNG, JPG, etc.)', 'warning')
    return
  }
  selectedFileName.value = file.name
  previewUrl.value = URL.createObjectURL(file)
  showToast(`Photo "${file.name}" loaded into preview`, 'info')
}

const triggerFileInput = () => {
  fileInputRef.value?.click()
}

const clearSelectedImage = () => {
  selectedFileName.value = ''
  if (previewUrl.value) {
    URL.revokeObjectURL(previewUrl.value)
    previewUrl.value = null
  }
  if (fileInputRef.value) {
    fileInputRef.value.value = ''
  }
}

const handleSubmit = (e: Event) => {
  e.preventDefault()
  showToast('Photo & testimony uploads will open on event day! Stay tuned.', 'info', 4500)
}
</script>

<template>
  <section id="upload" class="py-20 sm:py-28 bg-surface-100 text-navy-900 relative">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
        <div class="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-accent-700 mb-3">
          <span class="w-5 h-0.5 bg-accent-500"></span>
          <span>Community Wall · Coming Soon</span>
          <span class="w-5 h-0.5 bg-accent-500"></span>
        </div>
        <h2 class="font-sans font-black text-4xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-navy-900 mb-4">
          Share Your Moment
        </h2>
        <p class="text-navy-700 text-base sm:text-lg font-normal leading-relaxed">
          Have an encouraging photo, discipleship memory, or short word of faith? We love celebrating what God is doing!
        </p>
      </div>

      <!-- Upload Form Card -->
      <div class="bg-white rounded-4xl sm:rounded-5xl p-6 sm:p-10 md:p-12 border border-surface-300 shadow-soft-xl">
        <form @submit="handleSubmit" class="space-y-6">
          <!-- Hidden Native File Input -->
          <input
            ref="fileInputRef"
            type="file"
            accept="image/*"
            class="hidden"
            @change="handleFileSelect"
          />

          <!-- Drag & Drop Zone -->
          <div
            class="relative rounded-3xl border-2 border-dashed p-6 sm:p-10 text-center transition-all duration-200 cursor-pointer flex flex-col items-center justify-center min-h-[220px]"
            :class="[
              isDragging
                ? 'border-accent-500 bg-accent-50/80 scale-[1.01]'
                : previewUrl
                ? 'border-emerald-400 bg-surface-50'
                : 'border-surface-300 bg-surface-50 hover:border-accent-500 hover:bg-white'
            ]"
            @dragover.prevent="isDragging = true"
            @dragleave.prevent="isDragging = false"
            @drop.prevent="handleDrop"
            @click="triggerFileInput"
          >
            <!-- Preview if Image is Selected -->
            <div v-if="previewUrl" class="flex flex-col items-center gap-3 w-full">
              <div class="relative max-w-xs max-h-48 overflow-hidden rounded-2xl border border-surface-300 shadow-soft">
                <img :src="previewUrl" alt="Selected photo preview" class="w-full h-36 object-cover" />
                <button
                  type="button"
                  class="absolute top-2 right-2 p-1.5 rounded-full bg-navy-900/80 text-white hover:bg-navy-900 transition-colors"
                  title="Remove image"
                  @click.stop="clearSelectedImage"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>
              <p class="text-xs font-bold text-navy-900 truncate max-w-xs">
                {{ selectedFileName }}
              </p>
              <span class="text-xs text-accent-700 underline font-black uppercase tracking-wider">Choose another photo</span>
            </div>

            <!-- Default Dropzone Prompt -->
            <div v-else class="flex flex-col items-center gap-3">
              <div class="w-14 h-14 rounded-2xl bg-accent-100 text-accent-800 flex items-center justify-center shadow-soft-sm">
                <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
                </svg>
              </div>
              <div>
                <p class="font-sans font-black text-xl text-navy-900 uppercase tracking-tight">
                  Drag and drop your photo here
                </p>
                <p class="text-xs sm:text-sm text-navy-600 mt-1">
                  or <span class="text-accent-700 font-extrabold underline">click to browse</span> from your device
                </p>
              </div>
              <span class="text-[11px] font-medium text-navy-500">
                Supports JPG, PNG, WEBP (up to 10MB) · UI Preview
              </span>
            </div>
          </div>

          <!-- Name & Message Inputs -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label for="uploader-name" class="block text-xs font-black uppercase tracking-wider text-navy-900 mb-1.5">
                Your Name
              </label>
              <input
                id="uploader-name"
                v-model="form.name"
                type="text"
                placeholder="e.g., Sarah / Mark"
                class="w-full px-5 py-3.5 rounded-2xl border border-surface-300 bg-surface-50 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:bg-white text-sm transition-all text-navy-950"
              />
            </div>

            <div>
              <label for="uploader-note" class="block text-xs font-black uppercase tracking-wider text-navy-900 mb-1.5">
                A Short Note or Testimony <span class="text-navy-500 font-normal lowercase">(optional)</span>
              </label>
              <input
                id="uploader-note"
                v-model="form.message"
                type="text"
                placeholder="e.g., Grateful for my Bible Talk family!"
                class="w-full px-5 py-3.5 rounded-2xl border border-surface-300 bg-surface-50 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:bg-white text-sm transition-all text-navy-950"
              />
            </div>
          </div>

          <!-- Submit Action & Disclaimer -->
          <div class="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 border-t border-surface-200">
            <div class="inline-flex items-center gap-2 text-xs text-navy-600 font-medium">
              <svg class="w-4 h-4 text-accent-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span>Uploads open on event day. Submissions are moderated.</span>
            </div>

            <button
              type="submit"
              class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-accent-500 hover:bg-accent-600 text-navy-950 font-black text-xs sm:text-sm uppercase tracking-wider shadow-soft hover:shadow-glow-gold active:scale-95 transition-all"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/>
              </svg>
              <span>Submit Photo / Testimony</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
