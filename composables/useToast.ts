import { ref } from 'vue'

export interface ToastMessage {
  id: number
  text: string
  type?: 'success' | 'info' | 'warning'
}

const toasts = ref<ToastMessage[]>([])
let nextId = 1

export function useToast() {
  const showToast = (text: string, type: 'success' | 'info' | 'warning' = 'info', duration = 3500) => {
    const id = nextId++
    toasts.value.push({ id, text, type })

    setTimeout(() => {
      toasts.value = toasts.value.filter(t => t.id !== id)
    }, duration)
  }

  const removeToast = (id: number) => {
    toasts.value = toasts.value.filter(t => t.id !== id)
  }

  return {
    toasts,
    showToast,
    removeToast
  }
}
