import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useUserStore } from '@/stores/userStore.js'

export const useChatStore = defineStore(
  'chat',
  () => {
    // * state
    const messages = ref([])
    const isLoading = ref(false)
    const userStore = useUserStore()

    // * actions
    const fetchChatMessages = () => {}

    const sendMessage = () => {}

    return { messages, isLoading, userStore, fetchChatMessages, sendMessage }
  },
  { persist: true },
)
