<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/authStore.js'

const authStore = useAuthStore()
onMounted(() => authStore.fetchUser())
</script>

<template>
  <RouterView />
</template>
