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
    await api.post('/auth/google/callback', { code })
    await fetchUser()
    router.push('/chat')
  }

  const fetchUser = async () => {
    try {
      const response = await api.get('/auth/me')
      user.value = response.data.user
    } catch {
      user.value = null
    }
  }

  return {
    user,
    getGoogleUrl,
    handleCallback,
    fetchUser,
  }
})
