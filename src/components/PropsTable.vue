<template>
  <div class="props-table">
    <div
      v-for="(value, key) in finalProps"
      :key="key"
      class="prop-item"
    >
      <span class="label" v-if="value.text">{{value.text}}</span>
      <component
        class="prop-component"
        v-if="value"
        :is="mapToComponent[value.component]"
        :[value.valueProp]="value.value"
        v-on="value.events"
        v-bind="value.extraProps"
      >
        <!-- vue3新增的空节点 -->
        <template v-if="value.options"> 
          <component
            v-for="(option, k) in value.options"
            :key="k"
            :is="value.subComponent && mapToComponent[value.subComponent]"
            :value="option.value"
          >
          {{option.text}}
        </component>
        </template>
      </component>
      <!-- <img v-else-if="value.name === 'LImage'" :src="value.props.src" /> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { VNode } from 'vue'
import { defineProps, PropType, computed, defineEmits } from 'vue'
import { reduce } from 'lodash'
import { PropsToForms, mapPropsToForms } from '../propsMap'
import { TextComponentProps } from '../defaultProps'
import LImage from './LImage.vue'
import { TextImageComponentProps, ImageComponentProps } from '../defaultProps'
import { Input, InputNumber, InputGroup, Select, SelectOption, Slider, RadioGroup, RadioButton } from 'ant-design-vue'
import ColorPicker from './ColorPicker.vue'
import { number } from 'vue-types'

// 组件实例
const mapToComponent = {
  'color-picker': ColorPicker,
  'a-input': Input,
  'a-imput-number': InputNumber,
  'a-input-group': InputGroup,
  'a-select': Select,
  'a-select-option': SelectOption,
  'a-slider': Slider,
  'a-radio-group': RadioGroup,
  'a-radio-button': RadioButton
}

// 渲染表单的数据
interface FormProps {
  component: string;
  subComponent?: string;
  value: string;
  extraProps?: { [key: string]: any };
  text?: string;
  options?: { text: string | VNode; value: any }[];
  valueProp: string;
  eventName: string;
  events: { [key: string]: (e: any) => void };
  src?: string;
}

const props = defineProps({
  props: {
    type: Object as PropType< Partial<TextComponentProps & ImageComponentProps>>,
    // type: Object as PropType<TextComponentProps>,
    required: true
  }
})
const emit = defineEmits(['change'])
const finalProps = computed(() => {
  return reduce(props.props, (result, value, key) => {
    const newKey = key as keyof TextImageComponentProps
    /** 因为mapPropsToForms的key是联合类型，所以key要进行类型断言 */
    const item = mapPropsToForms[newKey]
    if (item) {
      const { valueProp = 'value', eventName = 'change', intialTransform, afterTransform } = item
      const newItem: FormProps = {
        ...item,
        value: intialTransform ? intialTransform(value) : value,
        valueProp,
        eventName,
        events: {
          [eventName]: (e: any) => { emit('change', { key, value: afterTransform ? afterTransform(e) : e })}
        }
      }
      // item.value = item.initalTransform ? item.initalTransform(value) : value
      // item.valueProp = item.valueProp ? item.valueProp : 'value'
      // result[newKey] = item
      result[newKey] = newItem
    }
    return result
  // }, {} as Required<PropsToForms>)
  }, {} as {[key: string]: FormProps})
})
</script>

<style scoped lang="less">
.prop-item {
  display: flex;
  margin-bottom: 10px;
  align-items: center;
}
.label {
  width: 28%;
}
.prop-component {
  width: 72%;
}
</style>
