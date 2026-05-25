<script setup>
import whisprLogo from '@/assets/whispr.png'
</script>

<template>
  <div class="h-screen bg-background flex items-center justify-center">
    <div class="bg-card py-8 px-8 rounded-xl border border-border shadow-lg w-80">
      <img :src="whisprLogo" alt="" class="w-25 h-25 mx-auto" />
      <h1 class="title text-center mb-6">Welcome to Whispr</h1>
      <p class="text mb-2">You’ll get smarter responses and can upload files, images, and more.</p>
      <button class="w-full ghost-button" @click="goToChat">
        {{ loading ? 'Logging in...' : 'Continue with Google' }}
      </button>
      <input
        type="email"
        class="w-full mb-4 bg-input text-foreground placeholder-muted-foreground border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none rounded px-3 py-2 text-sm transition-all rounded-radius"
        placeholder="Email Adress"
        v-model="email"
      />
      <button class="button w-full" @click="goToChat">
        {{ loading ? 'Logging in...' : 'Continue' }}
      </button>
      <p v-if="error" class="text-destructive text-center">{{ error }}</p>
    </div>
  </div>
</template>
