<template>
  <div
    class="editor-wrapper"
    @click="onItemClick"
    :class="{ active: active }"
  >
    <slot></slot>
    <slot name="deleteBtn"></slot>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps, ref } from 'vue'

const props = defineProps({
  id: {
    type: String,
    required: true
  },
  active: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['setActive'])

const onItemClick = () => {
  emit('setActive', props.id)
}
</script>

<style scoped lang="less">
.editor-wrapper {
  padding: 0;
  cursor: pointer;
  border: 1px solid transparent;
  user-select: none;
}
.editor-wrapper:hover {
  border: 1px dashed #ccc;
}
.editor-wrapper.active {
 border: 1px solid #1890ff;
 user-select: none;
 z-index: 1500;
}
</style>
