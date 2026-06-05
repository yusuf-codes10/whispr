<script setup>
import GhostButton from '@/components/ui/GhostButton.vue'
import MainButton from '@/components/ui/MainButton.vue'
import NavBar from '@/layouts/NavBar.vue'
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
        <GhostButton title="See it in action" />
      </div>
    </div>
  </div>
</template>
