<script setup>
import { useAuthStore } from '@/stores/authStore'
import { useSideStore } from '@/stores/sideStore.js'
import { ref, onMounted, onUnmounted, computed } from 'vue'
import whisprLogo from '@/assets/whispr.png'
import DropDownMenu from '../DropDownMenu.vue'
import { useWindowSize } from '@vueuse/core'
// import { onClickOutside } from '@vueuse/core'

const props = defineProps({
  isOpen: {
    type: Boolean,
  },
  chats: {
    type: Array,
  },
})
const emit = defineEmits(['toggle', 'renameChat', 'deleteChat'])

const { width } = useWindowSize()
const isMobile = computed(() => width.value < 768)

// desktop: respect whatever the parent says (true = w-60, false = w-17.5)
// mobile:  always say true, so it's always w-60 when visible
const effectiveOpen = computed(() => (isMobile.value ? true : props.isOpen))

const authStore = useAuthStore()
const sideStore = useSideStore()
const openDropdownId = ref(null)
const dropdownRef = ref(null)

const isSelected = ref(null)

const logoutItem = { name: 'Log out', icon: 'fa-arrow-right-from-bracket' }

const toggleDropdown = (e, chatId) => {
  e.preventDefault()
  e.stopPropagation()
  openDropdownId.value = openDropdownId.value === chatId ? null : chatId
}

const closeDropDown = () => {
  openDropdownId.value = null
}

const handeLogout = async () => {
  await authStore.logout()
}

// add the listener when the component mounts
onMounted(() => {
  document.addEventListener('click', closeDropDown)
})

// bug pervention: remove the listener when the sidebar is closed
onUnmounted(() => {
  document.removeEventListener('click', closeDropDown)
})
</script>

<template>
  <aside
    :class="[
      // base styles
      'h-screen flex flex-col bg-bg-surface text-text-primary border-r border-bg-border',
      // width phase (desktop only)
      effectiveOpen ? 'w-60' : 'w-17.5',
      // width transition (desktop only)
      'transition-[width] duration-300 ease-in-out',
      // positioning
      'fixed md:relative z-40',
      // mobile slide in/out — driven by isMobile from store
      sideStore.isMobile ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
      'transition-transform duration-300',
    ]"
    style="background-color: var(--background)"
  >
    <!-- 1. Logo area -->
    <div class="border-b border-bg-border px-3 py-4 flex items-center gap-2.5">
      <button
        class="flex items-center gap-2.5 rounded-4xl w-full cursor-pointer hover:bg-slate-800 p-1.5"
        @click="emit('toggle')"
      >
        <span
          class="text-lg min-w-6 flex items-center justify-center"
          @click="sideStore.toggleMobile"
        >
          <i v-if="effectiveOpen" class="fa-solid fa-xmark"></i>
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
            v-if="effectiveOpen"
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
          v-if="effectiveOpen"
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
          <span v-if="effectiveOpen" class="whitespace-nowrap text-sm">New Chat</span>
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
          <DropDownMenu :isOpen="openDropdownId === chat.id" ref="dropdownRef">
            <div
              class="flex items-center gap-2 px-2 py-1.5 rounded-md text-sm text-text-secondary hover:text-text-primary hover:bg-bg-raised cursor-pointer transition-colors"
              @click="emit('renameChat', chat.id)"
            >
              <i class="fa-solid fa-pen text-xs"></i>
              Rename
            </div>
            <div
              class="flex items-center gap-2 px-2 py-1.5 rounded-md text-sm text-text-muted hover:text-danger hover:bg-red-500/10 cursor-pointer transition-colors"
              @click="emit('deleteChat', chat.id)"
            >
              <i class="fa-solid fa-trash-can text-xs"></i>
              Delete
            </div>
          </DropDownMenu>
          <transition
            enter-active-class="transition-opacity duration-150 ease-in"
            leave-active-class="transition-opacity duration-150 ease-in"
            enter-from-class="opacity-0"
            leave-to-class="opacity-0"
          >
            <span v-if="effectiveOpen" class="whitespace-nowrap text-sm truncate">
              {{ chat.title.replace(/"/g, '') }}
            </span>
          </transition>
          <i
            class="fa-solid fa-ellipsis-vertical opacity-0 group-hover:opacity-100 absolute top-2 right-1 cursor-pointer transition-opacity"
            @click="(e) => toggleDropdown(e, chat.id)"
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
          <div v-if="effectiveOpen" class="flex flex-col min-w-0">
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
          <span v-if="effectiveOpen" class="whitespace-nowrap text-sm">{{ logoutItem.name }}</span>
        </transition>
      </div>
    </div>
  </aside>
</template>
