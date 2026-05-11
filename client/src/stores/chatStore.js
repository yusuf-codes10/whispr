import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useUserStore } from '@/stores/userStore.js'
import api from '@/services/api.js'

export const useChatStore = defineStore(
  'chat',
  () => {
    // * state
    const messages = ref([])
    const isLoading = ref(false)
    const userStore = useUserStore()

    // * actions
    const fetchChatMessages = async () => {
      if (!userStore.userId) return

      try {
        const { data } = await api.post(`${import.meta.env.VITE_API_URL}/chat/get-messages`, {
          userId: userStore.userId,
        })

        messages.value = data.messages
          .flatMap((msg) => [
            { role: 'user', content: msg.message },
            { role: 'ai', content: msg.reply },
          ])
          .filter((msg) => msg.content) // drops any entry where content is empty or null
      } catch (error) {
        console.log('fetching chat error', error)
      }
    }

    const sendMessage = () => {}

    return { messages, isLoading, fetchChatMessages, sendMessage }
  },
  { persist: true },
)
