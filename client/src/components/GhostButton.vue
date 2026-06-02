<script setup>
defineProps({
  title: {
    type: String,
    default: 'Submit',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <button
    class="text-foreground bg-transparent font-sans text-sm font-semibold px-7 py-3 rounded-(--radius) border border-border cursor-pointer tracking-[0.04em] transition-colors duration-200 hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
    :disabled="disabled"
  >
    {{ title }}
  </button>
</template>
