<script setup>
defineProps({
  title: {
    type: String,
    default: 'Submit',
  },
})
</script>

<template>
  <button
    class="bg-primary text-primary-foreground font-sans text-sm font-bold px-7 py-3 rounded-lg border-0 cursor-pointer tracking-[0.04em] transition-[filter] duration-200 hover:brightness-110"
  >
    {{ title }}
  </button>
</template>
