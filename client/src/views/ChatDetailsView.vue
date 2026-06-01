<script setup>
import { nextTick, watch } from 'vue'
import { useChatStore } from '@/stores/chatStore'
import ChatInput from '@/components/ChatInput.vue'
import { useRoute } from 'vue-router'

const chatStore = useChatStore()
const route = useRoute()

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

watch(
  () => chatStore.messages.length,
  () => scrollToBottom()
)

// we need a watch
watch(
  () => route.params.id,
  async () => {
    await chatStore.fetchMessages()
  },
  { immediate: true }
) // ← missing | so the messages will load on refresh
</script>

<template>
  <div class="h-screen bg-background flex">
    <!-- <NavBar /> -->

    <!-- chat -->
    <div class="flex flex-col flex-1">
      <div id="chat-container" class="flex-1 overflow-y-auto p-4 space-y-4">
        <div
          v-for="msg in chatStore.messages"
          :key="msg.id"
          class="flex items-start"
          :class="msg.role === 'user' ? 'justify-end' : 'justify-start'"
        >
          <div
            v-html="formatMessage(msg.content)"
            class="max-w-xs px-4 py-2 rounded-lg md:max-w-md"
            :class="
              msg.role === 'user'
                ? 'bg-accent/15 text-primary-foreground border border-accent/25'
                : 'bg-primary/10 text-primary-foreground border border-primary/20'
            "
          ></div>
        </div>
        <div v-if="chatStore.isLoading" class="flex justify-start">
          <div class="bg-gray-700 text-white px-4 py-2 rounded-lg">
            <span class="animate-pulse">AI is thinking...</span>
          </div>
        </div>
      </div>
      <ChatInput @send="chatStore.sendMessage" />
    </div>
  </div>
</template>


            <!-- :class="msg.role === 'user' ? 'bg-primary text-white' : 'bg-card text-white'" -->
