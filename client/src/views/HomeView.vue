<script setup>
import whisprLogo from '@/assets/whispr.png'
</script>

<template>
  <div class="h-screen bg-background flex items-center justify-center">
    <div class="bg-card py-2 px-4">
      <img :src="whisprLogo" alt="" class="w-25 h-25 mx-auto" />
      <h1 class="title text-center">Welcome to Whispr</h1>
      <input type="text" class="w-full mb-2 bg-popover rounded" placeholder="Name" />
      <input type="text" class="w-full mb-2 bg-popover rounded" placeholder="Email" />
      <button class="button w-full">Go to chat</button>
    </div>
  </div>
</template>

<style scoped>
</style>
