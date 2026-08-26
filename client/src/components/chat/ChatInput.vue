<script setup>
import { ref, computed } from 'vue'
import SendButton from '../ui/SendButton.vue'

// Taken as a prop rather than read from the store, because ChatView drives
// createChat (which never touches isLoading) while ChatDetailsView drives
// chatStore.sendMessage (which does). Reading the store here would give
// ChatView a permanently dead spinner.
const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
})

const message = ref('')
const emit = defineEmits(['send'])

const canSend = computed(() => message.value.trim().length > 0 && !props.loading)

const sendMessage = () => {
  if (!canSend.value) return
  emit('send', message.value)
  message.value = ''
}
</script>

<template>
  <div class="py-2 px-4 flex items-end gap-2">
    <!-- max-h and overflow go on the grid wrapper, not the children -->
    <div class="inline-grid flex-1 min-w-0 max-h-40 overflow-hidden">
      <span
        class="invisible whitespace-pre-wrap wrap-break-word col-start-1 row-start-1 px-3 py-2 text-sm leading-relaxed"
        >{{ message + '\n' }}</span
      >

      <textarea
        v-model="message"
        @keydown.enter.exact.prevent="sendMessage"
        placeholder="Send a message"
        rows="1"
        class="resize-none overflow-y-auto col-start-1 row-start-1 px-3 py-2 rounded-lg bg-secondary text-foreground text-sm leading-relaxed focus:outline-none h-full"
      />
    </div>
    <SendButton :disabled="!canSend" :loading="loading" @click="sendMessage" />
  </div>
</template>
