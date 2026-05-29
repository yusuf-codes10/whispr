import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSideStore = defineStore('sidebar', () => {
  const isOpen = ref(false)

  const toggle = () => {
    isOpen.value = !isOpen.value
  }

  return {
    isOpen,
    toggle,
  }
})
