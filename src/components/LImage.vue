<template>
  <div class="">
    <img
      class="l-image-component"
      :style="{width: `${width}px`}"
      :src="src"
      @click.prevent="handleClick"
    >
    <!-- prevent阻止默认事件 -->
  </div>
</template>

<script setup lang="ts">
import { defineProps, watch } from 'vue'
import useComponentCommon from '../hooks/useComponentCommon'
import { ImageComponentProps, transformToComponentProps, imageDefaultProps, imageStylePropsNames } from '../defaultProps'


// const defaultProps = transformToComponentProps(imageDefaultProps)
const props = defineProps({
  src: {
    type: String
  },
  // styleProps: {
  //   type: ImageComponentProps
  // }
  width: {
    type: Number
  }
})

watch(() => props.width, (newValue) => {
  console.log('newValue', newValue)
}, { immediate: true })

const { styleProps, handleClick } = useComponentCommon(props, imageStylePropsNames)
</script>

<style scoped lang="less">
// .l-image-component {
//   widows: 100px;
//   height: 100px;
// }
</style>
