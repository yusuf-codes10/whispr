<script setup>
</script>

<template>
  <button
    class="bg-primary text-primary-foreground font-sans text-sm font-bold rounded-[50%] p-2 border-0 cursor-pointer tracking-[0.04em] transition-[filter] duration-200 hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-primary"
  >
    <i v-if="loading" class="fa-solid fa-paper-plane"></i>
    <slot v-else />
  </button>
</template>
