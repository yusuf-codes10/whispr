import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSideStore = defineStore('sidebar', () => {
  // Desktop: is the rail expanded (w-60) or collapsed (w-17.5)?
  const isOpen = ref(false)

  // Mobile: is the slide-in drawer showing?
  // Previously called `isMobile`, which collided with the "viewport is mobile"
  // computed in SideBar.vue and made the responsive behaviour hard to reason about.
  const isDrawerOpen = ref(false)

  const toggle = () => {
    isOpen.value = !isOpen.value
  }

  const toggleDrawer = () => {
    isDrawerOpen.value = !isDrawerOpen.value
  }

  const closeDrawer = () => {
    isDrawerOpen.value = false
  }

  return {
    isOpen,
    isDrawerOpen,
    toggle,
    toggleDrawer,
    closeDrawer,
  }
})
