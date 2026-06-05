<script setup>
import GhostButton from '@/components/ui/GhostButton.vue'
import MainButton from '@/components/ui/MainButton.vue'
import NavBar from '@/layouts/NavBar.vue'
import { ref } from 'vue'

const stats = [
  { value: '2M+', label: 'Active users' },
  { value: '140ms', label: 'Avg. response time' },
  { value: '99.9%', label: 'Uptime SLA' },
  { value: '60+', label: 'Integrations' },
]
</script>

<template>
  <div class="min-h-screen bg-background flex flex-col">
    <NavBar />
    <div class="flex items-center justify-center flex-1 flex-col text-center px-4">
      <span
        class="inline-flex items-center gap-2 text-accent text-xs font-semibold tracking-widest uppercase border border-accent/30 bg-accent/5 rounded-full px-4 py-1.5 mb-6"
      >
        ● Now in open beta
      </span>
      <h1
        class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight mb-4 max-w-3xl"
      >
        The AI that <span class="text-accent">thinks</span> before it
        <span class="text-primary">whispers.</span>
      </h1>
      <p class="text-sm md:text-base text-muted-foreground max-w-md leading-relaxed mb-8">
        Whispr is your always-on AI companion — precise, fast, and hauntingly intuitive.
      </p>
      <div class="flex flex-col sm:flex-row items-center justify-center gap-3">
        <RouterLink :to="{ name: 'SignUp' }">
          <MainButton :title="'Start Whispering →'" />
        </RouterLink>
        <GhostButton title="See it in action" />
      </div>
    </div>

    <!-- Stats -->
    <div class="border-y border-border/40 bg-muted/30">
      <div class="max-w-4xl mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        <div v-for="stat in stats" :key="stat.label">
          <p class="text-2xl md:text-3xl font-black text-primary tracking-tight">
            {{ stat.value }}
          </p>
          <p class="text-xs text-muted-foreground mt-1 tracking-wide">{{ stat.label }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
