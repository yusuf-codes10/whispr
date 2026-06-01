import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useAuthStore } from '@/stores/authStore.js'
import api from '@/services/api.js'
import { useRoute } from 'vue-router'

export const useChatStore = defineStore('chat', () => {
  // * state
  const chats = ref([])
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
      chats.value = data.messages
      console.log('chats are', data.messages)
    } catch (error) {
      console.log('fetching chat error', error)
    }
  }

  const renameChat = async (chatId, title) => {
    try {
      const { data } = await api.patch(`/chats/${chatId}`, {
        title: title,
      })
      const foundChat = chats.value.find((chat) => chat.id === chatId)

      if (foundChat) foundChat.title = data.title //data.title
      console.log('updated title is ', data.title)
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
      chats.value.push(data.chat)
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
      const { data } = await api.delete(`chats/${chatId}`)
      chats.value = chats.value.filter((chat) => chat.id !== data.id)
      console.log('chat has been deleted', data)
      return data.id
    } catch (error) {
      console.log(error)
    }
  }

  // * getters
  const getChats = computed(() => chats.value)

  return {
    messages,
    isLoading,
    fetchChats,
    sendMessage,
    createChat,
    fetchMessages,
    deleteChat,
    renameChat,

    // * getters
    getChats,
  }
})

// TODO: add error ref and maybe loading ref if relevant
