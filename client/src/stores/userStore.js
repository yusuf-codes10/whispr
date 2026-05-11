import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'

export const useUserStore = defineStore(
  'user',
  () => {
    // * state
    const userId = ref('')
    const username = ref('')
    const router = useRouter()

    // * actions
    const setUser = (id, name) => {
      userId.value = id
      username.value = name
    }

    const logUserOut = () => {
      userId.value = ''
      username.value = ''
      router.push('/')
    }

    return { userId, username, setUser, logUserOut }
  },
  { persist: true },
)
