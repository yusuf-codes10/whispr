<script setup>
import ModalWindow from '@/components/ModalWindow.vue'
import SideBar from '@/components/SideBar.vue'
import { useChatStore } from '@/stores/chatStore'
import { useSideStore } from '@/stores/sideStore'
import { ref, onMounted } from 'vue'

const chatStore = useChatStore()
const sideStore = useSideStore()

const chats = chatStore.getChats
const selectedDeletedId = ref(null)
const selectedRenamedId = ref(null)
const isRenameOpen = ref(false)
const isDeleteOpen = ref(false)

const title = ref('')

const toggleRename = (id) => {
  isRenameOpen.value = !isRenameOpen.value
  console.log('this is the chat id: ', id)

  if (id) selectedRenamedId.value = id
}

const toggleDelete = (id) => {
  isDeleteOpen.value = !isDeleteOpen.value
  console.log('this is the chat id: ', id)
  // if id not passed keep the old one
  if (id) selectedDeletedId.value = id
}

const handleDelete = async () => {
  await chatStore.deleteChat(selectedDeletedId.value)

  toggleDelete()
}

const handleRename = async () => {
  await chatStore.renameChat(selectedRenamedId.value, title.value)

  toggleRename()
}

onMounted(async () => {
  await chatStore.fetchChats()
  console.log(
    'chats: ',
    chats.map((chat) => chat.title)
  )
})
</script>

<template>
  <div class="h-screen flex">
    <SideBar
      @toggle="sideStore.toggle"
      :chats="chats"
      :isOpen="sideStore.isOpen"
      @renameChat="toggleRename"
      @deleteChat="toggleDelete"
    />
    <RouterView class="flex-1" />
    <!-- rename modal -->
    <ModalWindow :isOpen="isRenameOpen" title="Remove item" @close="toggleRename">
      <div class="bg-background p-4">
        <input type="text" placeholder="New chat title" v-model="title" />
        <button @click="handleRename">Submit</button>
      </div>
    </ModalWindow>
    <!-- delete modal -->
    <ModalWindow :isOpen="isDeleteOpen" title="Remove item" @close="toggleDelete">
      <div class="text">Are you sure you want to delete this chat?</div>
      <div>
        <button @click="handleDelete" class="button">Yes</button>
      </div>
    </ModalWindow>
  </div>
</template>
