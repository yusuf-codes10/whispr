<script setup>
import ModalWindow from '@/components/ModalWindow.vue'
import SideBar from '@/components/SideBar.vue'
import { useChatStore } from '@/stores/chatStore'
import { useSideStore } from '@/stores/sideStore'
import { ref, onMounted } from 'vue'

const chatStore = useChatStore()
const sideStore = useSideStore()

const chats = ref([])
const isModalOpen = ref(false)

const toggleModal = () => {
  isModalOpen.value = !isModalOpen.value
}

onMounted(async () => {
  chats.value = await chatStore.fetchChats()
  console.log(
    'chats: ',
    chats.value.map((chat) => chat.title)
  )
})
</script>

<template>
  <div class="h-screen flex">
    <SideBar @toggle="sideStore.toggle" :chats="chats" :isOpen="sideStore.isOpen" />
    <RouterView class="flex-1" />
    <ModalWindow :isOpen="isModalOpen" title="Remove item">
      <div class="bg-background p-4">Lorem ipsum dolor sit, amet consectetur adipisicing elit.</div>
    </ModalWindow>
  </div>
</template>
