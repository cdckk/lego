<template>
  <div class="create-component-list">
    <component
      class="component-item"
      v-for="component in defaultTextTemplates"
      :key="component.tag"
      :is="mapToComponent[component.name]"
      v-bind="component"
      @click="handleListClick(component)"
    >
    </component>
  </div>
</template>

<script setup lang="ts">
import { v4 as uuidv4} from 'uuid'
import LText from './LText.vue'
import defaultTextTemplates from '../defaultTemplates'
import { defineEmits, defineExpose, markRaw } from 'vue'
import { ComponentData } from '../store/editor'
import { imageDefaultProps, TextComponentProps } from "../defaultProps"
import { message } from 'ant-design-vue'
import { UploadResp } from '../extraType'

const mapToComponent = {
  'LText': LText
}

const emit = defineEmits(['onListClick','onItemClick'])

const lText = markRaw(LText)

const handleListClick = (component: TextComponentProps) => {
  // console.log('hha', component);
  emit("onListClick", component)
}
const onItemClick = (props: TextComponentProps) => {
  const componentData: ComponentData = {
    id: uuidv4(),
    name: 'l-text',
    props
  }
  emit("onItemClick", componentData)
}
const onImageUpoded = (resp: UploadResp) => {
  console.log(resp);
  const componentData: ComponentData = {
    name: 'l-image',
    id: uuidv4(),
    props: {
      ...imageDefaultProps
    }
  }
  message.success('上传成功')
  componentData.props.src = resp.data.url
  emit('onItemClick', componentData)
}
defineExpose({
  // onListClick,
  onItemClick,
  onImageUpoded
})
</script>

<style scoped lang="less">
// .create-component-list {
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
// }
.component-item {
  width: 100px;
  margin: 0 auto;
  margin-bottom: 15px;
}
.component-item > * {
  position: static !important;
}
</style>
