<script setup>
import whisprLogo from '@/assets/whispr.png'
</script>

<template>
  <div class="h-screen bg-background flex items-center justify-center">
    <div class="bg-card py-8 px-8 rounded-xl border border-border shadow-lg w-80">
      <img :src="whisprLogo" alt="" class="w-25 h-25 mx-auto" />
      <h1 class="title text-center mb-6">Welcome to Whispr</h1>
      <input
        type="text"
        class="w-full mb-3 bg-input text-foreground placeholder-muted-foreground border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none rounded px-3 py-2 text-sm transition-all"
        placeholder="Name"
      />
      <input
        type="text"
        class="w-full mb-4 bg-input text-foreground placeholder-muted-foreground border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none rounded px-3 py-2 text-sm transition-all"
        placeholder="Email"
      />
      <button class="button w-full">Go to chat</button>
    </div>
  </div>
</template>

<style scoped>
</style>
