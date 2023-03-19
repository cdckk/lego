<template>
  <div
    class="inline-edit" 
    @click.stop="handleClick"
    ref="wrapper"
  >
    <input
      v-model="innerValue"
      v-if="isEditing"
      placeholder="文本不能为空"
      ref="inputRef"
      type="text" />
    <slot v-else><span class="edit-text">{{innerValue}}</span></slot>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, watch, nextTick } from 'vue'
import useKeyPress from '../hooks/useKeyPress'
import useClickOutside from '../hooks/useClickOutside'
const props = defineProps({
  value: {
    type: String,
    request: true
  }
})
let cacheOldValue: string | undefined = ''
const emit = defineEmits(['change'])
const innerValue = ref(props.value)
// 属性更新时内部数据还是旧的
watch(() => props.value, (newValue) => {
  // if (newValue) {
  innerValue.value = newValue
  // }
})
const isEditing = ref<boolean>(false)
const wrapper = ref<null | HTMLElement>(null)
const inputRef = ref<null | HTMLElement>(null)
const isOutside = useClickOutside(wrapper)
watch(isOutside, (newValue) => {
  console.log(isOutside.value,newValue)
  if (newValue && isEditing.value) {
    isEditing.value = false
    emit('change', innerValue.value)
  }
  isOutside.value = false
})
watch(isEditing, async (isEditing) => {
  if (isEditing) {
    cacheOldValue = innerValue.value
    await nextTick()
    if (inputRef.value) {
      inputRef.value.focus()
    }
  }
})
const handleClick = () => {
  isEditing.value = true
  console.log('点组件');
  
  /**
   * 组件更新是异步的
   */
  // setTimeout(() => {
  //   if (inputRef.value) {
  //     inputRef.value.focus()
  //   }
  // }, 500);
  
}
useKeyPress('Enter', () => {
  // console.log('enter事件');
  if (isEditing.value) {
    isEditing.value = false
    emit('change', innerValue.value)
  }
})
useKeyPress('Escape', () => {
  if (isEditing.value) {
    isEditing.value = false
    innerValue.value = cacheOldValue
  }
})

</script>

<style scoped lang="less">
// .edit-text {
//   text-align: left;
// }
.inline-edit {
  display: flex;
}
</style>
