<template>
  <div class="color-picker">
    <div class="wrapper-color">
      <div class="current-color" :style="`background-color: ${value}`"></div>
    </div>
    <div class="default-color">
      <div class="item-color"
        v-for="(item, index) in colors"
        :key="index"
        :style="`background-color: ${item}`"
        @click="selectColor(item)"
      >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { PropType, watch } from 'vue'
const defaultColors = [
  '#ffffff',
  '#f5222d',
  '#fa541c',
  '#fadb14',
  '#52c41a',
  '#1890ff',
  '#722ed1',
  '#8c8c8c',
  '#000000',
  '#efefef'
]

export default {
  props: {
    value: {
      type: String,
    },
    colors: {
      type: Array as PropType<string[]>,
      default: defaultColors
    }
  },
  emits: ['change'],
  setup(props, context) {
    const selectColor = (color: string) => {
      context.emit('change', color)
    }
    watch(
      () => props.value,
      (val, preVal) => {
        console.log('val', val)
        console.log('preVal', preVal);
        
      },
      {
        immediate: true
      }
    )
    return {
      selectColor
    }
  }
}
</script>

<style lang="less" scoped>
.color-picker {
  display: flex;
  .wrapper-color {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    .current-color {
      height: 30px;
      width: 60px;
      border: 1px solid gray;
    }
  }
  .default-color {
    flex: 1;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    .item-color {
      cursor: pointer;
      width: 21px;
      height: 21px;
      border: 1px solid #efeffe;
    }
  }
}
</style>