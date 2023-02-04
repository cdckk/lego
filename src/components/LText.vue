
<template>
  <component :is="tag" :style="styleProps" class="l-text-component">
    {{text}}
  </component>
</template>


<script>
import { computed } from 'vue'
import { pick } from 'lodash-es'
import { transformToComponentProps, textDefaultProps, textStylePropNames } from '../defaultProps'

// const defaultProps = computed(() => transformToComponentProps(textDefaultProps))
const defaultProps = transformToComponentProps(textDefaultProps)

export default {
  props: {
    tag: { type: String, default: 'div'},
    ... defaultProps
  },
  setup(props) {
    const styleProps = computed(() => pick(props, textStylePropNames))
    // const styleProps = computed(() => textDefaultProps)

    // 返回值会暴露给模板和其他的选项式 API 钩子
    return {
      styleProps
    }
  }
}
</script>

<style scoped lang="less">
.l-text-component {
  box-sizing: border-box;
  white-space: pre-wrap;
  position: relative !important;
}
</style>




