<script setup>
import whisprLogo from '@/assets/whispr.png'
</script>

<template>
  <div class="bg-secondary py-2 px flex justify-between">
    <img :src="whisprLogo" alt="" class="w-10 h-10" />
    <h1 class="text">username</h1>
    <button class="ghost-button">
      <span class="muted-text">Logout</span>
    </button>
  </div>
</template>
