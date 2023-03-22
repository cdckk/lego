<template>
  <div
    ref="editorWrapper"
    class="editor-wrapper"
    @click="onItemClick"
    @mousedown="startMove"
    :class="{ active: active }"
    :style="wrapperStyle"
  >
    <slot class="wrapperSlot"></slot>
    <slot name="deleteBtn"></slot>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps, computed, ref, nextTick } from 'vue'
import { pick } from 'lodash-es'
const props = defineProps({
  id: {
    type: String,
    required: true
  },
  active: {
    type: Boolean,
    default: false
  },
  props: {
    type: Object
  }
})
const emit = defineEmits(['setActive', 'update-position'])

// 盒内鼠标到盒子边框的距离
const gap = {
  x: 0,
  y: 0
}

let isMoving = false

const editorWrapper = ref<null | HTMLElement>(null)
// console.log(editorWrapper.value)


const wrapperStyle = computed(() => {
  return pick(props.props, [ 'top','left', 'width', 'height'])
})

const calcMovePosition = (e: MouseEvent) => {
  // console.log(e);
  const container = document.getElementById('canvas-area') as HTMLElement
  // console.log('container.offsetLeft', container.offsetLeft);
  // console.log('container.offsetTop', container.offsetTop);
  
  const left = e.clientX - gap.x - container.offsetLeft
  const top = e.clientY - gap.y - container.offsetTop
  return {
    left,
    top
  }
}
const startMove = (e: MouseEvent) => {
  isMoving = true
  const currentElement = editorWrapper.value
  if (editorWrapper.value) {
    // console.log(editorWrapper.value?.getBoundingClientRect())
    // console.log(e);
    // getBoundingClientRect
    const { left, top } = editorWrapper.value.getBoundingClientRect()
    gap.x = e.clientX - left
    // 鼠标到视口的距离e.clientX
    gap.y = e.clientY - top
    // console.log('gap', gap);
  }
  const handleMove = (e: MouseEvent) => {
    const { left, top } = calcMovePosition(e)
    console.log(left, top);
    if (currentElement) {
      currentElement.style.top = top + 'px'
      currentElement.style.left = left + 'px'
      nextTick()
      console.log(currentElement.style);
    }
    
    
  }
  const handleMouseUp = (e) => {
    document.removeEventListener('mousemove', handleMove)
    if (isMoving) {
      const { top, left } = calcMovePosition(e)
      emit('update-position', { top, left, id: props.id })
      isMoving = false
      nextTick(() => {
        document.removeEventListener('mouseup', handleMouseUp)
      })
    }
  }
  document.addEventListener('mousemove', handleMove)
  document.addEventListener('mouseup', handleMouseUp)
}

const onItemClick = () => {
  emit('setActive', props.id)
}
</script>

<style scoped lang="less">
.editor-wrapper {
  position: relative;
  // top: 10px;
  // left: 10px;
  // width: 100px;
  // height: 100px;
  padding: 0;
  cursor: pointer;
  border: 1px solid transparent;
  user-select: none;
  /**
    样式穿透选择组件里的后代元素  禁止内部的定位
  */
  :deep(> *) {
    position: static !important;
  }
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
