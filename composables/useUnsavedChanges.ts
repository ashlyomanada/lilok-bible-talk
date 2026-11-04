import { ref, onMounted, onUnmounted } from 'vue'
import { onBeforeRouteLeave } from 'vue-router'

export function useUnsavedChanges() {
  const isDirty = ref(false)

  function markDirty() {
    isDirty.value = true
  }

  function markClean() {
    isDirty.value = false
  }

  // Handle browser tab/window close
  const handleBeforeUnload = (e: BeforeUnloadEvent) => {
    if (isDirty.value) {
      e.preventDefault()
      e.returnValue = ''
    }
  }

  onMounted(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('beforeunload', handleBeforeUnload)
    }
  })

  onUnmounted(() => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  })

  // Handle internal Vue router navigation
  onBeforeRouteLeave((to, from, next) => {
    if (isDirty.value) {
      const confirmLeave = window.confirm(
        'You have unsaved changes. Are you sure you want to leave this page without saving?'
      )
      if (confirmLeave) {
        next()
      } else {
        next(false)
      }
    } else {
      next()
    }
  })

  return {
    isDirty,
    markDirty,
    markClean
  }
}

