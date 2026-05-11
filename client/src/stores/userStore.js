import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  // * state
  const userId = ref('')
  const username = ref('')

  // * actions
  const setUser = (id, name) => {
    userId.value = id
    username.value = name
  }

  const logUserOut = () => {
    userId.value = ''
    username.value = ''
  }

  return { userId, username, setUser, logUserOut }
})
