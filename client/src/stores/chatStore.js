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
      // if (!userStore.userId) return
      console.log('userId at fetch time:', userStore.userId)

      try {
        const { data } = await api.post(`/chat/get-messages`, {
          userId: userStore.userId.userId,
        })

        console.log('raw data:', data) // 👈 what does this look like?
        console.log('messages:', data.messages) // 👈 is this an array?

        messages.value = data.messages
          .flatMap((msg) => [
            { role: 'user', content: msg.message },
            { role: 'ai', content: msg.reply },
          ])
          .filter((msg) => msg.content) // drops any entry where content is empty or null
        console.log('messages: ', messages.value)
      } catch (error) {
        console.log('fetching chat error', error)
      }
    }

    const sendMessage = () => {}

    return { messages, isLoading, fetchChatMessages, sendMessage }
  },
  { persist: true },
)
