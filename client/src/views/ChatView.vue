<script setup>
import { nextTick, watch } from 'vue'
import { useChatStore } from '@/stores/chatStore'
import { useRouter } from 'vue-router'
import ChatInput from '@/components/chat/ChatInput.vue'
import { useAuthStore } from '@/stores/authStore'

const chatStore = useChatStore()
const authStore = useAuthStore()
const router = useRouter()

// auto scrool to bottom
const scrollToBottom = () => {
  nextTick(() => {
    const chatContainer = document.querySelector('#chat-container')
    if (chatContainer) chatContainer.scrollTop = chatContainer.scrollHeight
  })
}

const createChat = async (message) => {
  const chat = await chatStore.createChat(message)
  router.push(`/chat/${chat.id}`)
}

watch(
  () => chatStore.messages.length,
  () => scrollToBottom()
)
</script>

<template>
  <div class="h-screen flex bg-background">
    <!-- <NavBar /> -->
    <!-- chat -->
    <div class="flex flex-col flex-1">
      <div
        id="chat-container"
        class="flex-1 overflow-y-auto p-4 space-y-4 flex items-center justify-center flex-col gap-2"
      >
        <p class="text-xl md:text-3xl">Shall we begin? {{ authStore.user?.name }}</p>
        <ChatInput @send="createChat" class="w-full md:w-160" />
      </div>
    </div>
  </div>
</template>
