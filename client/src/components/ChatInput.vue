<script setup>
import { ref } from 'vue'
import MainButton from './MainButton.vue'

const message = ref('')
const emit = defineEmits(['send'])

const sendMessage = () => {
  if (!message.value.trim()) return
  emit('send', message.value)
  message.value = ''
}
</script>

<template>
  <div class="py-2 px-4 flex">
    <div class="inline-grid flex-1 min-w-0">
      <!-- mirror -->
      <span
        class="invisible whitespace-pre-wrap wrap-break-words col-start-1 row-start-1 px-3 py-2 rounded-lg border border-transparent text-sm leading-relaxed max-h-40"
        >{{ message + '\n' }}</span
      >

      <!-- textarea-->
      <textarea
        v-model="message"
        @keydown.enter.exact.prevent="sendMessage"
        placeholder="Send a message"
        rows="1"
        class="resize-none overflow-y-auto col-start-1 row-start-1 px-3 py-2 rounded-lg bg-secondary text-white text-sm leading-relaxed focus:outline-none max-h-40"
      />
    </div>
    <MainButton @click="sendMessage" title="Send" />
  </div>
</template>
