<script setup>
import { useSideStore } from '@/stores/sideStore'

const sideStore = useSideStore()
</script>

<template>
  <header class="md:hidden flex items-center px-4 py-3 bg-bg-surface border-b border-bg-border">
    <button @click="sideStore.toggleMobile">
      <i class="fa-solid fa-bars text-text-primary"></i>
    </button>
  </header>
</template>
