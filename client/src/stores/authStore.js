import { ref } from 'vue'
import { defineStore } from 'pinia'
import api from '@/services/api.js'
import { useRouter } from 'vue-router'

export const useAuthStore = defineStore('auth', () => {
  // *state
  const user = ref(null)
  const router = useRouter()

  const getGoogleUrl = async () => {
    const response = await api.get('/auth/google')
    window.location.href = response.data.url
  }

  const handleCallback = async (code) => {
    const response = await api.post('/auth/google/callback', { code })
    router.push('/chat')
  }

  return {
    user,
    getGoogleUrl,
    handleCallback,
  }
})
