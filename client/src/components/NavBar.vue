<script setup>
import whisprLogo from '@/assets/whispr.png'
import GhostButton from './GhostButton.vue'
</script>

<template>
  <div class="bg-background py-4 px-2 flex justify-between">
    <div class="inline-flex gap-1">
      <img :src="whisprLogo" alt="" class="w-10 h-10" />
      <h1 class="text-xl text-primary font-extrabold">Whispr</h1>
    </div>
    <div>
      <ul class="hidden md:inline-flex gap-4">
        <li>Features</li>
        <li>Pricings</li>
        <li>Docs</li>
        <li>Blog</li>
      </ul>
    </div>
    <GhostButton title="Get Started" />
  </div>
</template>
