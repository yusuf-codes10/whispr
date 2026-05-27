<script setup>
import { onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import api from '@/services/api.js'

const router = useRouter()
const route = useRoute()

onMounted(async () => {
  const code = route.query.code

  if (!code) return router.push('/sign-up')
})
</script>

<template>
  <div>Redirect</div>
</template>
