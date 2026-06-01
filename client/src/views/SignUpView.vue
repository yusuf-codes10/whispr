<script setup>
// import whisprLogo from '@/assets/whispr.png'
import api from '@/services/api.js'
import { ref } from 'vue'
// import { onMounted } from 'vue'

const loading = ref(false)
const error = ref(null)

// calling the GET /auth/google
const getGoogleUrl = async () => {
  try {
    loading.value = true
    const response = await api.get('/auth/google')
    window.location.href = response.data.url
  } catch (err) {
    error.value = err
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="h-screen bg-background flex items-center justify-center">
    <div class="bg-card py-8 px-8 rounded-xl border border-border shadow-lg w-80">
      <!-- <img :src="whisprLogo" alt="" class="w-25 h-25 mx-auto" /> -->
      <h1 class="title text-center mb-6">Welcome to Whispr</h1>
      <p class="text mb-2">You’ll get smarter responses and can upload files, images, and more.</p>
      <button
        class="w-full ghost-button my-4 disabled:opacity-50 disabled:cursor-not-allowed"
        :disabled="loading"
        @click="getGoogleUrl"
      >
        {{ loading ? 'Logging in...' : 'Continue with Google' }}
      </button>

      <hr />

      <p v-if="error" class="text-destructive text-center">{{ error }}</p>
    </div>
  </div>
</template>
