<script setup>
import ModalWindow from '@/components/ui/ModalWindow.vue'
import MainButton from '@/components/ui/MainButton.vue'
import GhostButton from '@/components/ui/GhostButton.vue'
import SideBar from '@/layouts/SideBar.vue'
import TopBar from '@/layouts/TopBar.vue'
import { useChatStore } from '@/stores/chatStore'
import { useSideStore } from '@/stores/sideStore'
import { ref, onMounted } from 'vue'

const chatStore = useChatStore()
const sideStore = useSideStore()

// const chats = chatStore.chats
const selectedDeletedId = ref(null)
const selectedRenamedId = ref(null)
const isRenameOpen = ref(false)
const isDeleteOpen = ref(false)

const title = ref('')

const toggleRename = (id) => {
  isRenameOpen.value = !isRenameOpen.value

  if (id) selectedRenamedId.value = id
}

const toggleDelete = (id) => {
  isDeleteOpen.value = !isDeleteOpen.value
  // if id not passed keep the old one
  if (id) selectedDeletedId.value = id
}

const handleDelete = async () => {
  await chatStore.deleteChat(selectedDeletedId.value)

  toggleDelete()
}

const handleRename = async () => {
  if (!title.value.trim()) return

  await chatStore.renameChat(selectedRenamedId.value, title.value)

  title.value = ''
  toggleRename()
}

onMounted(async () => {
  await chatStore.fetchChats()
})
</script>

<template>
  <div class="h-dvh flex min-h-0">
    <SideBar
      @toggle="sideStore.toggle"
      :chats="chatStore.getChats"
      :isOpen="sideStore.isOpen"
      @renameChat="toggleRename"
      @deleteChat="toggleDelete"
    />

    <!--
      Mobile drawer backdrop. The commented-out version was gated on
      sideStore.isOpen (the desktop collapse flag) and called sideStore.close,
      which never existed on the store.
    -->
    <div
      v-if="sideStore.isDrawerOpen"
      class="fixed inset-0 bg-black/40 z-30 md:hidden"
      @click="sideStore.closeDrawer"
    />

    <div class="flex-1 flex flex-col min-h-0">
      <TopBar />
      <!-- hidden on md+ via md:hidden inside it -->
      <RouterView class="flex-1" />
    </div>

    <!-- rename modal -->
    <ModalWindow :isOpen="isRenameOpen" title="Rename chat" @close="toggleRename">
      <div class="flex flex-col gap-4 pt-3">
        <input
          type="text"
          placeholder="New chat title"
          v-model="title"
          @keydown.enter.prevent="handleRename"
          class="w-full px-3 py-2 rounded-lg bg-background text-foreground text-sm border border-border focus:outline-none focus:border-ring"
        />
        <div class="flex justify-end gap-2">
          <GhostButton title="Cancel" @click="toggleRename" />
          <MainButton title="Rename" :disabled="!title.trim()" @click="handleRename" />
        </div>
      </div>
    </ModalWindow>
    <!-- delete modal -->
    <ModalWindow :isOpen="isDeleteOpen" title="Delete chat" @close="toggleDelete">
      <div class="flex flex-col gap-4 pt-3">
        <div class="text">Are you sure you want to delete this chat?</div>
        <div class="flex justify-end gap-2">
          <GhostButton title="Cancel" @click="toggleDelete" />
          <MainButton title="Yes" @click="handleDelete" />
        </div>
      </div>
    </ModalWindow>
  </div>
</template>
