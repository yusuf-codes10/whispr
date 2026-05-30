<script setup>
import SideBar from '@/components/SideBar.vue'
import { useChatStore } from '@/stores/chatStore'
import { useSideStore } from '@/stores/sideStore'
import { ref } from 'vue'

const chatStore = useChatStore()
const sideStore = useSideStore()

const chats = ref([])
</script>

<template>
  <div>
    <SideBar @toggle="sideStore.toggle" :chats="chats" :isOpen="sideStore.isOpen" />
    <RouterView />
  </div>
</template>
