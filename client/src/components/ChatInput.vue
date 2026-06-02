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
    <div class="inline-grid">
      <!-- invisible mirror -->
      <span class="invisible col-start-1 row-start-1 px-3 py-2 border whitespace-pre">
        {{ message || ' ' }}
      </span>

      <!-- actual input -->
      <input
        v-model="message"
        @keyup.enter="sendMessage"
        placeholder="Send a message"
        type="text"
        class="flex-1 px-7 py-3 rounded-lg bg-secondary text-white focus:outline-none"
      />
    </div>
    <MainButton @click="sendMessage" title="Send" />
  </div>
</template>
