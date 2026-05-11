<script setup>
import { onMounted, nextTick } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { useChatStore } from '@/stores/chatStore'
import { useRouter } from 'vue-router'

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
    const chatContainer = document.getElementById('chat-container')
    if (chatContainer) chatContainer.scrollTop = chatContainer.scrollHeight
  })
}

onMounted(() => {
  chatStore.fetchChatMessages().then(() => scrollToBottom())
})
</script>

<template>
  <div class="h-screen bg-background flex flex-col"></div>
</template>

<style scoped>
</style>
