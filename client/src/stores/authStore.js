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
    router.push('/new-chat')
  }

  const fetchUser = async () => {
    try {
      const response = await api.get('/auth/me')
      console.log('auth/me response:', response)
      console.log('user:', response.data.user)
      user.value = response.data.user
    } catch (error) {
      console.log('fetchUser failed:', error.response?.status, error.response?.data)
      user.value = null
    }
  }

  const logout = async () => {
    await api.post('/auth/logout')
    user.value = null
    router.push('/sign-up')
  }

  return {
    user,
    getGoogleUrl,
    handleCallback,
    fetchUser,
    logout,
  }
})
