<script setup>
import { ref } from 'vue'

const message = ref('')
const emit = defineEmits(['send'])

const sendMessage = () => {
  if (!message.value.trim()) return
  emit('send', message.value)
  message.value = ''
}
</script>

<template>
  <div class="bg-secondary py-2 px-4 flex">
    <input
      v-model="message"
      @keyup.enter="sendMessage"
      placeholder="Send a message"
      type="text"
      class="flex-1 p-2 rounded-lg bg-background text-white focus:outline-none"
    />
    <button @click="sendMessage" class="ml-2 px-4 py-2 bg-primary rounded-lg">Send</button>
  </div>
</template>
