import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useAuthStore } from '@/stores/authStore.js'
import api from '@/services/api.js'
import { useRoute } from 'vue-router'

export const useChatStore = defineStore('chat', () => {
  // * state
  const messages = ref([])
  const isLoading = ref(false)
  const authStore = useAuthStore()
  const route = useRoute()

  // * actions
  const fetchChats = async () => {
    // if (!userStore.userId) return
    console.log('userId at fetch time:', authStore.user?.id)

    try {
      const { data } = await api.get(`/chats`)

      console.log('raw data:', data) // 👈 what does this look like?
      console.log('messages:', data.chat) // 👈 is this an array?

      // messages.value = data.messages
      //   .flatMap((msg) => [
      //     { role: 'user', content: msg.message },
      //     { role: 'ai', content: msg.reply },
      //   ])
      //   .filter((msg) => msg.content) // drops any entry where content is empty or null
      // console.log('messages: ', messages.value)
      return data.messages
    } catch (error) {
      console.log('fetching chat error', error)
    }
  }

  const renameChat = async (chatId, title) => {
    try {
      const response = await api.patch(`/${chatId}`, {
        title: title,
      })
      console.log('updated title is ', response)
    } catch (error) {
      console.log(error)
    }
  }

  const sendMessage = async (content) => {
    console.log('...')

    const chatId = route.params.id
    // checking
    if (!content.trim() || !authStore.user?.id) return

    messages.value.push({ role: 'user', content: content })

    isLoading.value = true

    try {
      const { data } = await api.post(`/chats/${chatId}/message`, {
        content,
      })
      messages.value.push({ role: 'assistant', content: data.msg })
    } catch (error) {
      console.error('Error sending message: ', error)
      messages.value.push({
        role: 'ai',
        content: 'Error: unable to process request',
      })
    } finally {
      isLoading.value = false
    }
  }

  const createChat = async (message) => {
    if (!message) return console.log('message is empty!')
    try {
      const { data } = await api.post('/chats', {
        message: message,
      })
      console.log(data.chat)
      return data.chat
    } catch (error) {
      console.log(error.message)
    }
  }

  const fetchMessages = async () => {
    const chatId = route.params.id
    try {
      const response = await api.get(`/chats/${chatId}/messages`)
      console.log('response.data:', response.data)
      console.log('response.data.messages:', response.data.messages)
      messages.value = response.data.messages || []
      console.log('messages.value after assignment:', messages.value)
    } catch (error) {
      console.log(error)
    }
  }

  const deleteChat = async (chatId) => {
    try {
      const response = await api.delete(`chats/${chatId}`)
      console.log('chat has been deleted', response)
      return response
    } catch (error) {
      console.log(error)
    }
  }

  return {
    messages,
    isLoading,
    fetchChats,
    sendMessage,
    createChat,
    fetchMessages,
    deleteChat,
    renameChat,
  }
})

// TODO: add error ref and maybe loading ref if relevant
