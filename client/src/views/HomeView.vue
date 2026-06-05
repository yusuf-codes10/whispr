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

const features = [
  {
    icon: '🧠',
    iconClass: 'bg-primary/10 text-primary border border-primary/20',
    title: 'Deep context memory',
    desc: 'Whispr remembers your projects and preferences — no need to repeat yourself.',
  },
  {
    icon: '⚡',
    iconClass: 'bg-accent/10 text-accent border border-accent/20',
    title: 'Sub-second responses',
    desc: 'Streamed responses start before the model finishes thinking.',
  },
  {
    icon: '🔒',
    iconClass: 'bg-secondary/50 text-foreground border border-border/40',
    title: 'Zero-data retention',
    desc: 'End-to-end encrypted, never logged, never used for training.',
  },
  {
    icon: '💻',
    iconClass: 'bg-accent/10 text-accent border border-accent/20',
    title: 'Agentic code mode',
    desc: 'Write, run, debug, and deploy code right inside the chat.',
  },
  {
    icon: '🔀',
    iconClass: 'bg-primary/10 text-primary border border-primary/20',
    title: 'Multi-model routing',
    desc: 'Automatically picks the best model for speed, depth, or creativity.',
  },
  {
    icon: '🔌',
    iconClass: 'bg-secondary/50 text-foreground border border-border/40',
    title: '60+ integrations',
    desc: 'Connect Slack, GitHub, Notion, Linear, and more.',
  },
]

const steps = [
  {
    num: '01',
    title: 'Connect your tools',
    desc: 'Link Whispr to your stack in under a minute. No API keys, no config hell.',
  },
  {
    num: '02',
    title: 'Ask anything',
    desc: 'Type, paste, or voice-in your request. Whispr understands context from day one.',
  },
  {
    num: '03',
    title: 'Ship faster',
    desc: 'Get drafts, code, summaries, and decisions — all in one thread.',
  },
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

    <!-- Features -->
    <div class="max-w-5xl mx-auto px-4 py-24 w-full">
      <p class="text-xs font-bold tracking-widest uppercase text-primary text-center mb-2">
        Capabilities
      </p>
      <h2 class="text-2xl md:text-3xl font-black tracking-tight text-center text-foreground mb-12">
        Built for the <span class="text-accent">edge.</span>
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="feat in features"
          :key="feat.title"
          class="bg-card border border-border/40 rounded-xl p-6"
        >
          <div
            class="w-10 h-10 rounded-lg flex items-center justify-center text-lg mb-4"
            :class="feat.iconClass"
          >
            {{ feat.icon }}
          </div>
          <p class="font-bold text-sm text-foreground mb-1">{{ feat.title }}</p>
          <p class="text-xs text-muted-foreground leading-relaxed">{{ feat.desc }}</p>
        </div>
      </div>
    </div>

    <!-- How it works -->
    <div class="bg-muted/20 border-y border-border/40 w-full">
      <div class="max-w-4xl mx-auto px-4 py-24">
        <p class="text-xs font-bold tracking-widest uppercase text-primary text-center mb-2">
          How it works
        </p>
        <h2
          class="text-2xl md:text-3xl font-black tracking-tight text-center text-foreground mb-12"
        >
          Three steps to <span class="text-accent">clarity.</span>
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div v-for="step in steps" :key="step.title">
            <div
              class="w-11 h-11 rounded-full border border-primary/40 text-primary font-black text-sm flex items-center justify-center mx-auto mb-4"
            >
              {{ step.num }}
            </div>
            <p class="font-bold text-sm text-foreground mb-1">{{ step.title }}</p>
            <p class="text-xs text-muted-foreground leading-relaxed">{{ step.desc }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- CTA -->
    <div class="max-w-3xl mx-auto px-4 py-24 text-center w-full">
      <h2 class="text-2xl md:text-3xl font-black tracking-tight text-foreground mb-3">
        Ready to whisper something<br class="hidden sm:block" />
        into existence?
      </h2>
      <p class="text-sm text-muted-foreground mb-8">
        Free forever for solo users. No credit card required.
      </p>
      <div class="flex flex-col sm:flex-row items-center justify-center gap-3">
        <RouterLink :to="{ name: 'SignUp' }">
          <MainButton title="Create free account" />
        </RouterLink>
        <GhostButton title="Talk to sales" />
      </div>
    </div>
  </div>
</template>
