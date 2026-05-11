<script setup>
import whisprLogo from '@/assets/whispr.png'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()
</script>

<template>
  <div class="bg-secondary py-2 px flex justify-between">
    <img :src="whisprLogo" alt="" class="w-10 h-10" />
    <!-- <h1>Whispr</h1> -->
    <button @click="userStore.logUserOut" class="ghost-button">
      <span class="muted-text">Logout</span>
    </button>
  </div>
</template>
