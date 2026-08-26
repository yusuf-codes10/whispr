<script setup>
import { useAuthStore } from '@/stores/authStore'
import { useSideStore } from '@/stores/sideStore.js'
import { ref, onMounted, onUnmounted, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import whisprLogo from '@/assets/whispr.png'
import DropDownMenu from '../components/ui/DropDownMenu.vue'
import { useWindowSize } from '@vueuse/core'

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
const route = useRoute()
const openDropdownId = ref(null)
const dropdownAnchor = ref(null)

const logoutItem = { name: 'Log out', icon: 'fa-arrow-right-from-bracket' }

// One click, one meaning. The outer button and the inner icon each used to carry
// their own handler, so a single click bubbled through both and fired the
// desktop collapse *and* the mobile drawer at the same time.
const handleToggle = () => {
  if (isMobile.value) sideStore.toggleDrawer()
  else emit('toggle')
}

// Derived from the route rather than click state, so the highlight survives a
// reload or landing on a chat via a direct link.
const isActiveChat = (chatId) => String(route.params.id) === String(chatId)

// The API sometimes hands back titles wrapped in literal quote characters.
// Also guards the null/undefined case, which used to throw on .replace().
const cleanTitle = (title) => (title ?? '').replace(/"/g, '')

const toggleDropdown = (e, chatId) => {
  e.preventDefault()
  e.stopPropagation()

  if (openDropdownId.value === chatId) {
    closeDropDown()
    return
  }

  // Capture where the trigger is on screen. The menu is teleported out of the
  // scroll container, so it needs viewport coordinates to position itself.
  const rect = e.currentTarget.getBoundingClientRect()
  dropdownAnchor.value = {
    top: rect.top,
    bottom: rect.bottom,
    left: rect.left,
    right: rect.right,
  }
  openDropdownId.value = chatId
}

const closeDropDown = () => {
  openDropdownId.value = null
  dropdownAnchor.value = null
}

const handeLogout = async () => {
  await authStore.logout()
}

// Navigating should never leave the mobile drawer parked over the conversation
// you just opened, or a stale dropdown floating around.
watch(
  () => route.fullPath,
  () => {
    closeDropDown()
    sideStore.closeDrawer()
  },
)

// add the listener when the component mounts
onMounted(() => {
  document.addEventListener('click', closeDropDown)
})

// bug prevention: drop the listener when the component goes away
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
      // mobile slide in/out — driven by the drawer flag in the store
      sideStore.isDrawerOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
      'transition-transform duration-300',
    ]"
  >
    <!-- 1. Logo area -->
    <div class="border-b border-bg-border px-3 py-4 flex items-center gap-2.5">
      <button
        :class="[
          'flex items-center gap-2.5 rounded-4xl w-full cursor-pointer p-1.5 transition-colors hover:bg-bg-raised',
          effectiveOpen ? '' : 'justify-center',
        ]"
        @click="handleToggle"
      >
        <span class="text-lg min-w-6 flex items-center justify-center">
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
            WHISPR
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
        :class="[
          'flex items-center gap-2.5 py-2 rounded-lg cursor-pointer w-full hover:bg-bg-raised text-text-secondary hover:text-text-primary transition-colors',
          effectiveOpen ? 'px-2.5' : 'justify-center px-0',
        ]"
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

      <!-- Scrolling invalidates the captured trigger position, so close the menu -->
      <div class="flex flex-col gap-0.5 overflow-y-auto min-h-0" @scroll="closeDropDown">
        <RouterLink
          v-for="chat in chats"
          :key="chat.id"
          :to="{ name: 'ChatDetails', params: { id: chat.id } }"
          :class="[
            'flex items-center gap-2.5 py-2 rounded-lg w-full transition-colors group',
            effectiveOpen ? 'px-2.5' : 'justify-center px-0',
            isActiveChat(chat.id)
              ? 'bg-card text-text-primary'
              : 'text-text-secondary hover:bg-card hover:text-text-primary',
          ]"
        >
          <!-- Collapsed rail: rows would otherwise render completely empty -->
          <span
            v-if="!effectiveOpen"
            class="text-sm min-w-5 flex items-center justify-center"
            :title="cleanTitle(chat.title)"
          >
            <i class="fa-regular fa-comment"></i>
          </span>
          <transition
            enter-active-class="transition-opacity duration-150 ease-in"
            leave-active-class="transition-opacity duration-150 ease-in"
            enter-from-class="opacity-0"
            leave-to-class="opacity-0"
          >
            <span
              v-if="effectiveOpen"
              class="min-w-0 flex-1 text-sm truncate"
              :title="cleanTitle(chat.title)"
            >
              {{ cleanTitle(chat.title) }}
            </span>
          </transition>
          <i
            v-if="effectiveOpen"
            class="fa-solid fa-ellipsis-vertical shrink-0 px-1 opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity"
            @click="(e) => toggleDropdown(e, chat.id)"
          ></i>
        </RouterLink>
      </div>
    </div>

    <!--
      One menu instance for the whole list, teleported to #modal.
      Out of the scroll container so it can't be clipped, and out of the
      RouterLink so clicking Rename/Delete can't trigger navigation.
    -->
    <DropDownMenu :isOpen="openDropdownId !== null" :anchor="dropdownAnchor">
      <div
        class="flex items-center gap-2 px-2 py-1.5 rounded-md text-sm text-text-secondary hover:text-text-primary hover:bg-bg-raised cursor-pointer transition-colors"
        @click="emit('renameChat', openDropdownId)"
      >
        <i class="fa-solid fa-pen text-xs"></i>
        Rename
      </div>
      <div
        class="flex items-center gap-2 px-2 py-1.5 rounded-md text-sm text-text-muted hover:text-danger hover:bg-danger/10 cursor-pointer transition-colors"
        @click="emit('deleteChat', openDropdownId)"
      >
        <i class="fa-solid fa-trash-can text-xs"></i>
        Delete
      </div>
    </DropDownMenu>

    <!-- 3. User + Logout -->
    <div class="mt-auto border-t border-bg-border px-2 py-2 flex flex-col gap-0.5">
      <!-- User row -->
      <div
        :class="[
          'flex items-center gap-2.5 py-2 rounded-lg',
          effectiveOpen ? 'px-2.5' : 'justify-center px-0',
        ]"
      >
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
        :class="[
          'flex items-center gap-2.5 py-2 rounded-lg cursor-pointer w-full hover:bg-danger/10 text-text-muted hover:text-danger transition-colors',
          effectiveOpen ? 'px-2.5' : 'justify-center px-0',
        ]"
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
