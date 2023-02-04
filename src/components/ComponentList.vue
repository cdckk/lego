<template>
  <div class="create-component-list">
    <component
      v-for="component in defaultTextTemplates"
      :key="component.tag"
      :is="LText"
      v-bind="component"
      @click="handleListClick(component)"
    >
    </component>
  </div>
</template>

<script setup lang="ts">
import LText from './LText.vue'
import { defaultTextTemplates } from '../defaultTemplates'
import { defineEmits, defineExpose } from 'vue'

const emit = defineEmits(['onListClick'])

const handleListClick = (component: any) => {
  console.log('hha', component);
  emit("onListClick", component)
}
// defineExpose({
//   onListClick
// })
</script>

<style scoped lang="less">
</style>
