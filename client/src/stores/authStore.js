import { ref } from 'vue'
import { defineStore } from 'pinia'
import api from '@/services/api.js'

export const useAuthStore = defineStore('auth', () => {
  // *state
  const user = ref(null)

  const register = async (credentials) => {}

  return {
    user,
  }
})
