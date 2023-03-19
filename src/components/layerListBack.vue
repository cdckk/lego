<template>
  <div class="layer-list" style="border: 1px solid #A7ABB7">
    <ul
      :list="list"
      @drop="onDrop"
      @dragover="ondragover"
      class="ant-list-items">
      <li
        class="ant-list-item"
        :class="{active: selectedId === item.id, ghost: dragData.currentDragging === item.id}"
        v-for="(item, index) in arrList"
        :key="item && item.id"
        @click="handleSelect(item.id)"
        @dragstart="onDragStart($event, item.id, index)"
        @dragenter="$event =>onDragEnter($event, index)"
        draggable="true"
        :data-index="index"
      >
        <a-tooltip :title="item.isHidden ? '显示' : '隐藏'">
          <a-button shape="circle" @click="handleClick(item.id, 'isHidden', !item.isHidden)">
            <!-- 隐藏 -->
            <template v-slot:icon v-if="item.isHidden">
              <eye-invisible-outlined />
            </template>
            <!-- 不隐藏 -->
            <template v-slot:icon v-else>
              <eye-outlined />
            </template>
          </a-button>
        </a-tooltip>
        <a-tooltip :title="item.isLocked ? '解锁' : '锁定'">
          <a-button shape="circle" @click="handleClick(item.id, 'isLocked', !item.isLocked)">
            <!-- 锁 -->
            <template v-slot:icon v-if="item.isLocked">
              <lock-outlined />
            </template>
            <!-- 不锁 -->
            <template v-slot:icon v-else>
              <unlock-outlined />
            </template>
          </a-button>
        </a-tooltip>
        <inline-edit
          :value="item.layerName"
          @change="handleChange"
        >
          {{ item.layerName }}
        </inline-edit>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ComponentData } from '../store/editor'
import { reactive, defineProps, defineEmits, PropType, ref } from 'vue'
import { EyeOutlined, EyeInvisibleOutlined, LockOutlined, UnlockOutlined } from '@ant-design/icons-vue'
import InlineEdit from './InlineEdit.vue'
import { getParentElement } from '../helper'
// import arrayMove from 'array-move'
import {arrayMoveImmutable} from 'array-move'

const props = defineProps({
  list: {
    type: Array as PropType<ComponentData[]>
  },
  selectedId: {
    type: String
  }
})
const emit = defineEmits(['select', 'change', 'drop'])
const arrList = ref(props.list)
let start = -1
let end = -1

const dragData = reactive({
  currentDragging: '',
  currentIndex: -1
})
const onDragStart = (e: DragEvent, id: string, index: number) => {
  // 代表正在拖拽元素
  dragData.currentDragging = id
  dragData.currentIndex = index
  start = index
}
const onDragEnter = (e: DragEvent, index: number) => {
  // console.log('enter', index);
  // if (props.list) {
  //   const arr = arrayMoveImmutable(props.list, dragData.currentIndex, index)
  //   // console.log(arr);
  //   arrList.value = arr
  // } 
  // dragData.currentIndex = index
  end = index
}
const onDrop = (e: DragEvent) => {
  // const currentElement = e.target as HTMLElement
  const currentElement = getParentElement(e.target as HTMLElement, 'ant-list-item')
  if (currentElement && currentElement.dataset.index) {
    const moveIndex = parseInt(currentElement.dataset.index)
    console.log(moveIndex);
    if (props.list) {
      const arr = arrayMoveImmutable(props.list, dragData.currentIndex, moveIndex)
      // console.log(arr);
      arrList.value = arr
    }
  }
  emit('drop', { start, end })
  dragData.currentDragging = ''
}
const ondragover = (e: DragEvent) => {
  e.preventDefault()
}

// const isActive = ref(false)
const handleClick = (id: string, key: string, value: boolean) => {
  console.log('value', value);
  const data = {
    id,
    key,
    value,
    isRoot: true
  }
  emit('change', data)
}
const handleSelect = (id: string) => {
  emit('select', id)
}
const handleChange = (innerValue: string) => {
  console.log('innerValue', innerValue);
  
}

</script>

<style scoped lang="less">
.ant-list-items {
  margin-bottom: 0;
}
.ant-list-item {
  padding: 10px 15px;
  transition: all 0.5s ease-out;
  cursor: pointer;
  justify-content: normal;
  border: 1px solid #fff;
  border-bottom-color: #f0f0f0;
}
.ant-list-item.active {
  border: 1px solid #0585fe;
}
.ant-list-item.ghost {
  opacity: .5;
}
.ant-list-item:hover {
  background: #e6f7ff;
}
.ant-list-item > * {
  margin-right: 10px;
}
.ant-list-item button {
  font-size: 12px;
}
</style>
