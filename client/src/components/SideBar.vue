<script setup>
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import whisprLogo from '@/assets/whispr.png'
import DropDownMenu from './DropDownMenu.vue'

const authStore = useAuthStore()
const router = useRouter()
const openDropdownId = ref(null)

const toggleDropdown = (e, chatId) => {
  e.preventDefault()
  e.stopPropagation()
  openDropdownId.value = openDropdownId.value === chatId ? null : chatId
}

const props = defineProps({
  isOpen: {
    type: Boolean,
  },
  chats: {
    type: Array,
  },
})
const emit = defineEmits(['toggle'])

const isSelected = ref(null)

const logoutItem = { name: 'Log out', icon: 'fa-arrow-right-from-bracket' }

const handeLogout = async () => {
  await authStore.logout()
  router.push('/sign-up')
}
</script>

<template>
  <aside
    :class="[
      'h-screen flex flex-col bg-bg-surface text-text-primary overflow-hidden transition-[width] duration-300 ease-in-out border-r border-bg-border',
      props.isOpen ? 'w-60' : 'w-17.5',
    ]"
  >
    <!-- 1. Logo area -->
    <div class="border-b border-bg-border px-3 py-4 flex items-center gap-2.5">
      <button
        class="flex items-center gap-2.5 rounded-4xl w-full cursor-pointer hover:bg-slate-800 p-1.5"
        @click="emit('toggle')"
      >
        <span class="text-lg min-w-6 flex items-center justify-center">
          <i v-if="props.isOpen" class="fa-solid fa-xmark"></i>
          <!-- whispr logo -->
          <img v-else :src="whisprLogo" alt="logo" class="h-8 w-8" />
        </span>
        <transition
          enter-active-class="transition-opacity duration-150 ease-in"
          leave-active-class="transition-opacity duration-150 ease-in"
          enter-from-class="opacity-0"
          leave-to-class="opacity-0"
        >
          <span
            v-if="props.isOpen"
            class="font-display font-extralight tracking-[6px] text-text-primary text-base"
          >
          </span>
        </transition>
      </button>
    </div>

    <!-- 2. Nav links -->
    <div class="flex-1 px-2 py-3 flex flex-col gap-1 min-h-0">
      <!-- Markets section -->
      <transition
        enter-active-class="transition-opacity duration-150 ease-in"
        leave-active-class="transition-opacity duration-150 ease-in"
        enter-from-class="opacity-0"
        leave-to-class="opacity-0"
      >
        <p
          v-if="props.isOpen"
          class="text-[10px] uppercase tracking-widest text-text-muted px-2 pt-1 pb-1"
        >
          Chats
        </p>
      </transition>

      <!-- actions sections -->
      <RouterLink
        :to="{ name: 'Chat' }"
        class="flex items-center gap-2.5 px-2.5 py-2 rounded-lg cursor-pointer w-full hover:bg-bg-raised text-text-secondary hover:text-text-primary transition-colors"
      >
        <span class="text-sm min-w-5 flex items-center justify-center">
          <i class="fa-solid fa-plus"></i>
        </span>
        <transition
          enter-active-class="transition-opacity duration-150 ease-in"
          leave-active-class="transition-opacity duration-150 ease-in"
          enter-from-class="opacity-0"
          leave-to-class="opacity-0"
        >
          <span v-if="props.isOpen" class="whitespace-nowrap text-sm">New Chat</span>
        </transition>
      </RouterLink>

      <div class="flex flex-col gap-0.5 overflow-y-auto min-h-0">
        <RouterLink
          v-for="chat in chats"
          :key="chat.id"
          :to="{ name: 'ChatDetails', params: { id: chat.id } }"
          :class="[
            'flex items-center gap-2.5 px-2.5 py-2 rounded-lg w-full transition-colors relative group',
            isSelected === chat.id
              ? 'bg-card text-text-primary'
              : 'text-text-secondary hover:bg-card hover:text-text-primary',
          ]"
          @click="isSelected = chat.id"
        >
          <DropDownMenu :isOpen="openDropdownId === chat.id">
            <div>Rename</div>
            <div>Delete</div>
          </DropDownMenu>
          <transition
            enter-active-class="transition-opacity duration-150 ease-in"
            leave-active-class="transition-opacity duration-150 ease-in"
            enter-from-class="opacity-0"
            leave-to-class="opacity-0"
          >
            <span v-if="props.isOpen" class="whitespace-nowrap text-sm truncate">
              {{ chat.title.replace(/"/g, '') }}
            </span>
          </transition>
          <i
            class="fa-solid fa-ellipsis-vertical opacity-0 group-hover:opacity-100 absolute top-2 right-1 cursor-pointer transition-opacity"
            @click="toggleDropdown(chat.id)"
          ></i>
        </RouterLink>
      </div>
    </div>

    <!-- 3. User + Logout -->
    <div class="mt-auto border-t border-bg-border px-2 py-2 flex flex-col gap-0.5">
      <!-- User row -->
      <div class="flex items-center gap-2.5 px-2.5 py-2 rounded-lg">
        <div class="w-7 h-7 rounded-full overflow-hidden shrink-0 flex-none">
          <img
            :src="authStore.user?.avatar"
            :alt="authStore.user?.name"
            class="w-full h-full object-cover block"
            referrerpolicy="no-referrer"
          />
        </div>
        <transition
          enter-active-class="transition-opacity duration-150 ease-in"
          leave-active-class="transition-opacity duration-150 ease-in"
          enter-from-class="opacity-0"
          leave-to-class="opacity-0"
        >
          <div v-if="props.isOpen" class="flex flex-col min-w-0">
            <span class="text-xs font-medium text-text-primary truncate">{{
              authStore.user?.name
            }}</span>
            <span class="text-[11px] text-text-muted">Pro plan</span>
          </div>
        </transition>
      </div>

      <!-- Logout -->
      <div
        @click="handeLogout"
        class="flex items-center gap-2.5 px-2.5 py-2 rounded-lg cursor-pointer w-full hover:bg-red-500/10 text-text-muted hover:text-danger transition-colors"
      >
        <span class="text-sm min-w-5 flex items-center justify-center">
          <i :class="logoutItem.icon" class="fa-solid"></i>
        </span>
        <transition
          enter-active-class="transition-opacity duration-150 ease-in"
          leave-active-class="transition-opacity duration-150 ease-in"
          enter-from-class="opacity-0"
          leave-to-class="opacity-0"
        >
          <span v-if="props.isOpen" class="whitespace-nowrap text-sm">{{ logoutItem.name }}</span>
        </transition>
      </div>
    </div>
  </aside>
</template>
