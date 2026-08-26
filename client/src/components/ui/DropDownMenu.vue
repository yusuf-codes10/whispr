<script setup>
import { computed } from 'vue'
import { useWindowSize } from '@vueuse/core'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  // Viewport coordinates of the trigger element, straight from
  // getBoundingClientRect(). Null means "not positioned yet".
  anchor: {
    type: Object,
    default: null,
  },
})

// The menu is teleported out of the sidebar because the chat list is an
// overflow-y-auto scroll container, and a scroll container clips
// absolutely-positioned descendants. Teleport + position:fixed is the only way
// for the menu to escape that box.
//
// Width and height are fixed rather than intrinsic so the flip/clamp maths
// below is deterministic — w-44 is 176px, and two rows at py-1.5 plus the
// wrapper padding lands at roughly 84px.
const MENU_WIDTH = 176
const MENU_HEIGHT = 84
const GAP = 4
const EDGE = 8

const { width: viewportWidth, height: viewportHeight } = useWindowSize()

const style = computed(() => {
  if (!props.anchor) return { display: 'none' }

  // Right-align the menu to the trigger, then clamp inside the viewport
  let left = props.anchor.right - MENU_WIDTH
  left = Math.min(Math.max(left, EDGE), viewportWidth.value - MENU_WIDTH - EDGE)

  // Prefer below the trigger; flip above when there isn't room
  let top = props.anchor.bottom + GAP
  if (top + MENU_HEIGHT > viewportHeight.value - EDGE) {
    top = props.anchor.top - MENU_HEIGHT - GAP
  }
  top = Math.max(top, EDGE)

  return { top: `${top}px`, left: `${left}px` }
})
</script>

<template>
  <Teleport to="#modal">
    <div
      v-if="props.isOpen"
      :style="style"
      class="fixed w-44 p-1.5 rounded-lg border border-bg-border bg-card shadow-lg z-50"
    >
      <slot />
    </div>
  </Teleport>
</template>
