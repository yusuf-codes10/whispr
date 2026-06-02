<script setup>
import MainButton from '@/components/MainButton.vue'
import NavBar from '@/components/NavBar.vue'

// import { ref } from 'vue'
// import api from '@/services/api.js'
// import { useUserStore } from '@/stores/userStore.js'
// import { useRouter } from 'vue-router'
// import whisprLogo from '@/assets/whispr.png'

// const userStore = useUserStore()
// const router = useRouter()

// const name = ref('test')
// const email = ref('test@gmail.com')
// const error = ref('')
// const loading = ref(false)

// const goToChat = async () => {
//   if (!name.value || !email.value) {
//     error.value = 'Username and Email are required!'
//     return
//   }

//   error.value = ''
//   loading.value = true

//   try {
//     const { data } = await api.post(`${import.meta.env.VITE_API_URL}/register`, {
//       name: name.value,
//       email: email.value,
//     })

//     // setting the user in pinia
//     userStore.setUser(data.userId, data.name)

//     router.push('/chat')
//   } catch (err) {
//     error.value = err
//   } finally {
//     loading.value = false
//   }
// }
</script>

<template>
  <div class="h-screen bg-background flex flex-col">
    <NavBar />
    <div class="flex items-center justify-center flex-1 flex-col">
      <h1 class="text-2xl md:text-4xl mb-2">
        The AI that <span class="font-extrabold text-accent">thinks</span> before it
        <span class="font-extrabold text-primary">whispers!</span>
      </h1>
      <p class="text-xs md:text-sm text-muted-foreground">
        Whispr is your always-on AI companion — precise, fast, and hauntingly intuitive.
      </p>
      <div class="flex flex-col md:flex-row justify-between mt-8 gap-2">
        <RouterLink :to="{ name: 'SignUp' }">
          <MainButton :title="'Start Whispering'" />
        </RouterLink>
        <button class="ghost-button">See it in action</button>
      </div>
    </div>
    <!-- <div class="bg-card py-8 px-8 rounded-xl border border-border shadow-lg w-80"> -->
    <!-- <img :src="whisprLogo" alt="" class="w-25 h-25 mx-auto" />
      <h1 class="title text-center mb-6">Welcome to Whispr</h1>

      <RouterLink :to="{ name: 'SignUp' }">
        <button class="button w-full">
          {{ loading ? 'Logging in...' : 'Go to Chat' }}
        </button>
      </RouterLink>
      <p v-if="error" class="text-destructive text-center">{{ error }}</p> -->
    <!-- </div> -->
  </div>
</template>
