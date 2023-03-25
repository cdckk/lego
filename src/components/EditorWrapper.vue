<template>
  <div
    ref="editorWrapper"
    class="editor-wrapper"
    id="editor-wrapper"
    @click="onItemClick"
    @mousedown="startMove"
    :class="{ active: isActive }"
    :style="wrapperStyle"
  >
    <slot class="wrapperSlot"></slot>
    <slot name="deleteBtn"></slot>
    <div class="resizers">
      <div class="resizer top-left"></div>
      <div class="resizer top-right" @mousedown.stop="startResize($event, 'top-right')"></div>
      <div class="resizer bottom-left"></div>
      <div class="resizer bottom-right" @mousedown.stop="startResize($event, 'bottom-right')"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps, computed, ref, nextTick } from 'vue'
import { pick } from 'lodash-es'
import { initailHotKeys } from '../plugins/hotKey'
type ResizeDirection = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
interface Position {
  left: number;
  right: number;
  top: number;
  bottom: number;
}
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
const emit = defineEmits(['setActive', 'update-position', 'update-width-height'])
// 盒内鼠标到盒子边框的距离
const gap = {
  x: 0,
  y: 0
}
const isActive = ref(false)
let isMoving = false
const editorWrapper = ref<null | HTMLElement>(null)

const wrapperStyle = computed(() => {
  return pick(props.props, [ 'top','left', 'width', 'height'])
})

const calcMovePosition = (e: MouseEvent) => {
  const container = document.getElementById('canvas-area') as HTMLElement
  const left = e.clientX - gap.x - container.offsetLeft
  const top = e.clientY - gap.y - container.offsetTop
  return {
    left,
    top
  }
}
// 移动元素位置
const startMove = (e: MouseEvent) => {
  initailHotKeys(props.id)
  isMoving = true
  const currentElement = editorWrapper.value
  if (editorWrapper.value) {
    const { left, top } = editorWrapper.value.getBoundingClientRect()
    gap.x = e.clientX - left
    // 鼠标到视口的距离e.clientX
    gap.y = e.clientY - top
  }
  const handleMove = (e: MouseEvent) => {
    const { left, top } = calcMovePosition(e)
    if (currentElement) {
      currentElement.style.top = top + 'px'
      currentElement.style.left = left + 'px'
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

// 拖拽元素尺寸大小 这个方法需要复用
const calcResize = (e: MouseEvent, direction: ResizeDirection, positions: Position) => {
  const { clientX, clientY } = e
  const { left, right, top, bottom } = positions
  const editorContainer = document.getElementById('canvas-area')
  // 问题：为什么getElementsByClassName拿不到offsetLeft
  // const container = editorWrapper.value
  if (editorContainer) {
    let width = -1
    let height = -1
    let topVal = 0
    switch (direction) {
    case 'top-left':
      break;
    case 'top-right':
      width = clientX - left
      height = bottom - clientY
      topVal = clientY - editorContainer.offsetTop
      return {
        width,
        height,
        topVal
      }
    case 'bottom-left':
      break;
    case 'bottom-right':
      width = clientX - left
      height = clientY - top
      return {
        width,
        height
      }
    }
    // return {
    //   width,
    //   height,
    //   topVal
    // }
  }
}
const startResize = (e, direction) => {
  const container = document.getElementById('editor-wrapper') as HTMLElement
  const { left, right, top, bottom } = container.getBoundingClientRect()
  const handleMove = (e) => {
    const data = calcResize(e, direction, { left, right, top, bottom })
    if (data) {
      const newWidth = data.width + 'px'
      const newHeight = data.height + 'px'
      const newTop = data.topVal + 'px' 
      console.log(newWidth, newHeight);
      // container.style.width = newWidth + 'px'
      // container.style.height = newHeight + 'px'
      // container.style.top = newTop + 'px'
      emit('update-width-height', { width: newWidth , height: newHeight, top: newTop, id: props.id })
    }
  }
  const handleMouseUp = () => {
    removeEventListener('mousemove', handleMove)
    nextTick(() => {
      document.removeEventListener('mouseup', startMove)
    })
  }
  addEventListener('mousemove', handleMove)
  addEventListener('mouseup', handleMouseUp)
}

const onItemClick = () => {
  emit('setActive', props.id)
  isActive.value = true
}
</script>

<style scoped lang="less">
.editor-wrapper {
  position: absolute;
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
  /**
    小bug：子元素和父元素一样大，父元素的边框显示不全
  */
  box-sizing: content-box;
  // border: 1px solid #1890ff;
}
.editor-wrapper.active {
  box-sizing: content-box;
  border: 1px solid #1890ff;
  user-select: none;
  z-index: 1500;
}

.editor-wrapper .resizers {
  display: none;
}
.editor-wrapper.active .resizers {
  display: block;
}
.editor-wrapper.active .resizers .resizer {
  width: 10px;
  height: 10px;
  background-color: #fff;
  position: absolute;
  border-radius: 50%;
  border: 3px solid #1890ff;
}
.editor-wrapper.active .resizers .resizer.top-left {
  top: -5px;
  left: -5px;
  cursor:  nw-resize;
}
.editor-wrapper.active .resizers .resizer.top-right {
  right: -5px;
  top: -5px;
  cursor: ne-resize;
}
.editor-wrapper.active .resizers .resizer.bottom-left {
  left: -5px;
  bottom: -5px;
  cursor: sw-resize;
}
.editor-wrapper.active .resizers .resizer.bottom-right {
  right: -5px;
  bottom: -5px;
  cursor: se-resize;
} 
</style>
