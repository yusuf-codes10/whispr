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
    <input
      v-model="message"
      @keyup.enter="sendMessage"
      placeholder="Send a message"
      type="text"
      class="flex-1 p-2 rounded-lg bg-secondary text-white focus:outline-none"
    />
    <MainButton @click="sendMessage" title="Send" />
  </div>
</template>
