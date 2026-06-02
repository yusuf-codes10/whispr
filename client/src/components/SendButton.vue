<script setup>
defineProps({
  loading: Boolean,
  disabled: Boolean,
})

defineEmits(['click'])
</script>

<template>
  <button
    :disabled="disabled || loading"
    @click="$emit('click')"
    class="bg-primary text-primary-foreground font-sans text-sm font-bold rounded-[50%] p-2 border-0 cursor-pointer tracking-[0.04em] transition-[filter] duration-200 hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed"
  >
    <span
      v-if="loading"
      class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin block"
    />
    <i v-else class="fa-solid fa-paper-plane" />
  </button>
</template>
