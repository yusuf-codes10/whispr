<script setup>
import whisprLogo from '@/assets/whispr.png'
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()
</script>

<template>
  <div class="bg-secondary py-2 px flex justify-between">
    <img :src="whisprLogo" alt="" class="w-10 h-10" />
    <h1 class="text">{{ authStore.user?.name }}</h1>
    <button @click="authStore.logout" class="ghost-button">
      <span class="muted-text">Logout</span>
    </button>
  </div>
</template>
