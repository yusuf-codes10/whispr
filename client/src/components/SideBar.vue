<script setup>
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'
import whisprLogo from '@/assets/whispr.png'

const authStore = useAuthStore()
const router = useRouter()

const props = defineProps({
  isOpen: {
    type: Boolean,
  },
})
const emit = defineEmits(['toggle'])

const navItems = []
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
            <orion-logo width="100px" />
          </span>
        </transition>
      </button>
    </div>

    <!-- 2. Nav links -->
    <div class="flex-1 px-2 py-3 flex flex-col gap-1">
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

      <ul class="flex flex-col gap-0.5">
        <li v-for="item in navItems" :key="item.name">
          <RouterLink
            :to="{ name: item.router }"
            class="flex items-center gap-2.5 px-2.5 py-2 rounded-lg w-full hover:bg-bg-raised text-text-secondary hover:text-text-primary transition-colors"
          >
            <span class="text-sm min-w-5 flex items-center justify-center">
              <i :class="item.icon" class="fa-solid"></i>
            </span>
            <transition
              enter-active-class="transition-opacity duration-150 ease-in"
              leave-active-class="transition-opacity duration-150 ease-in"
              enter-from-class="opacity-0"
              leave-to-class="opacity-0"
            >
              <span v-if="props.isOpen" class="whitespace-nowrap text-sm">
                {{ item.name }}
              </span>
            </transition>
          </RouterLink>
        </li>
      </ul>

      <!-- Divider -->
      <!-- <hr class="border-bg-border my-2" /> -->

      <ul class="flex flex-col gap-0.5">
        <li v-for="item in accountItems" :key="item.name">
          <RouterLink
            :to="{ name: item.router }"
            class="flex items-center gap-2.5 px-2.5 py-2 rounded-lg w-full hover:bg-bg-raised text-text-secondary hover:text-text-primary transition-colors"
          >
            <span class="text-sm min-w-5 flex items-center justify-center">
              <i :class="item.icon" class="fa-solid"></i>
            </span>
            <transition
              enter-active-class="transition-opacity duration-150 ease-in"
              leave-active-class="transition-opacity duration-150 ease-in"
              enter-from-class="opacity-0"
              leave-to-class="opacity-0"
            >
              <span v-if="props.isOpen" class="whitespace-nowrap text-sm">{{ item.name }}</span>
            </transition>
          </RouterLink>
        </li>
      </ul>
    </div>

    <!-- 3. User + Logout -->
    <div class="mt-auto border-t border-bg-border px-2 py-2 flex flex-col gap-0.5">
      <!-- User row -->
      <div class="flex items-center gap-2.5 px-2.5 py-2 rounded-lg">
        <span
          class="min-w-5 w-7 h-7 rounded-full bg-bg-raised border border-bg-border flex items-center justify-center text-[11px] font-medium text-accent shrink-0"
        >
          {{ authStore.user?.username?.slice(0, 2).toUpperCase() }}
        </span>
        <transition
          enter-active-class="transition-opacity duration-150 ease-in"
          leave-active-class="transition-opacity duration-150 ease-in"
          enter-from-class="opacity-0"
          leave-to-class="opacity-0"
        >
          <div v-if="props.isOpen" class="flex flex-col min-w-0">
            <span class="text-xs font-medium text-text-primary truncate">{{
              authStore.user?.username
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
