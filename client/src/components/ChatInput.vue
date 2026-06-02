<script setup>
import { ref } from 'vue'
// import MainButton from './MainButton.vue'
import SendButton from './SendButton.vue'

const message = ref('')
const emit = defineEmits(['send'])

const sendMessage = () => {
  if (!message.value.trim()) return
  emit('send', message.value)
  message.value = ''
}
</script>

<template>
  <div class="py-2 px-4 flex items-end gap-2 relative">
    <!-- max-h and overflow go on the grid wrapper, not the children -->
    <div class="inline-grid flex-1 min-w-0 max-h-40 overflow-hidden">
      <span
        class="invisible whitespace-pre-wrap wrap-break-words col-start-1 row-start-1 px-3 py-2 text-sm leading-relaxed"
        >{{ message + '\n' }}</span
      >

      <textarea
        v-model="message"
        @keydown.enter.exact.prevent="sendMessage"
        placeholder="Send a message"
        rows="1"
        class="resize-none overflow-y-auto col-start-1 row-start-1 px-7 py-3 rounded-lg bg-secondary text-white text-sm leading-relaxed focus:outline-none h-full"
      />
    </div>

    <!-- items-end on parent keeps this pinned to bottom as textarea grows -->
    <!-- <MainButton @click="sendMessage" title="Send" /> -->
    <SendButton class="absolute top-3.5 right-8" @click="sendMessage" />
  </div>
</template>
