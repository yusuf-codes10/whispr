<script setup>
import { onMounted, nextTick } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { useChatStore } from '@/stores/chatStore'
import { useRouter } from 'vue-router'
import NavBar from '@/components/NavBar.vue'

const userStore = useUserStore()
const chatStore = useChatStore()
const router = useRouter()

// check if user is logged in
if (!userStore.userId) {
  router.push('/')
}

// auto scrool to bottom
const scrollToBottom = () => {
  nextTick(() => {
    const chatContainer = document.querySelector('#chat-container')
    if (chatContainer) chatContainer.scrollTop = chatContainer.scrollHeight
  })
}

// Format message
const formatMessage = (text) => {
  if (!text) return ''

  return text
    .replace(/\n/g, '<br>') // Preserve line breaks
    .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>') // Bold text
    .replace(/\*(.*?)\*/g, '<i>$1</i>') // Italic text
    .replace(/`(.*?)`/g, '<code>$1</code>') // Inline code
    .replace(/(?:^|\n)- (.*?)(?:\n|$)/g, '<li>$1</li>') // Bullet points
    .replace(/(?:^|\n)(\d+)\. (.*?)(?:\n|$)/g, '<li>$1. $2</li>') // Numbered lists
    .replace(/<\/li>\n<li>/g, '</li><li>') // Ensure list continuity
    .replace(/<li>/, '<ul><li>') // Wrap in `<ul>`
    .replace(/<\/li>$/, '</li></ul>') // Close the `<ul>`
}

onMounted(() => {
  chatStore.fetchChatMessages().then(() => scrollToBottom())
})
</script>

<template>
  <div class="h-screen bg-background flex flex-col">
    <NavBar />

    <!-- char -->
    <div id="chat-container" class="flex-1 overflow-y-auto p-4 space-y-4">
      <div
        v-for="(msg, index) in chatStore.messages"
        :key="index"
        class="flex items-start"
        :class="msg.role === 'user' ? 'justify-end' : 'justify-start'"
      >
        <div
          v-html="formatMessage(msg.content)"
          class="max-w-xs px-4 py-2 rounded-lg md:max-w-md"
          :class="msg.role === 'user' ? 'bg-primary text-white' : 'bg-card text-white'"
        ></div>
      </div>
      <div v-if="chatStore.isLoading" class="flex justify-start">
        <div class="bg-gray-700 text-white px-4 py-2 rounded-lg">
          <span class="animate-pulse">AI is thinking...</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
