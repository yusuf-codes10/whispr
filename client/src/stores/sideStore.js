import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSideStore = defineStore('sidebar', () => {
  const isOpen = ref(false)
  const isMobile = ref(false)

  const toggle = () => {
    isOpen.value = !isOpen.value
  }

  const toggleMobile = () => {
    isMobile.value = !isMobile.value
  }

  return {
    isOpen,
    isMobile,
    toggle,
    toggleMobile,
  }
})
