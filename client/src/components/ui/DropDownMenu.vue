<script setup>
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <div
    v-if="props.isOpen"
    class="absolute right-0 top-full mt-1 p-4 min-w-40 rounded-lg border border-bg-border bg-card shadow-lg overflow-hidden z-50"
  >
    <slot />
  </div>
</template>
