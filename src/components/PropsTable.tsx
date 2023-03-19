import { VNode } from 'vue'
import { PropType, computed } from 'vue'
import { reduce } from 'lodash'
import { mapPropsToForms } from '../propsMap'
import { TextComponentProps } from '../defaultProps'
import { TextImageComponentProps, ImageComponentProps } from '../defaultProps'
import { Input, InputNumber, InputGroup, Select, SelectOption, Slider, RadioGroup, RadioButton } from 'ant-design-vue'
import ColorPicker from './ColorPicker.vue'

// 组件实例
const mapToComponent = {
  'color-picker': ColorPicker,
  'a-input': Input,
  'a-input-number': InputNumber,
  'a-input-group': InputGroup,
  'a-select': Select,
  'a-select-option': SelectOption,
  'a-slider': Slider,
  'a-radio-group': RadioGroup,
  'a-radio-button': RadioButton,
  'a-textarea': Input.TextArea
} as any

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

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export default {
  props: {
    props: {
      type: Object as PropType< Partial<TextComponentProps & ImageComponentProps>>,
      required: true
    },
    id: {
      type: String
    }
  },
  emits: ['change'],
  setup(props, context) {
    const finalProps = computed(() => {
      return reduce(props.props, (result, value, key) => {
        const newKey = key as keyof TextImageComponentProps
        /** 因为mapPropsToForms的key是联合类型，所以key要进行类型断言 */
        const item = mapPropsToForms[newKey]
        if (item) {
          const { valueProp = 'value', eventName = 'change', intialTransform, afterTransform } = item
          // 转换数据结构
          const newItem: FormProps = {
            ...item,
            // 转换数据类型
            /** bug */
            value: intialTransform ? intialTransform(value) : value,
            valueProp,
            eventName,
            events: {
              ['on' + capitalizeFirstLetter(eventName)]: (e: any) => { context.emit('change', { key, value: afterTransform ? afterTransform(e) : e })}
            }
          }
          result[newKey] = newItem
        }
        return result
      }, {} as {[key: string]: FormProps})
    })
    return () => <div class="props-table">
      {
        Object.keys(finalProps.value).map(key => {
          const value = finalProps.value[key]
          const props = {
            [value.valueProp]: value.value,
            ...value.extraProps,
            ...value.events
          }
          const ComponentName = mapToComponent[value.component]
          const SubComponent = value.subComponent && mapToComponent[value.subComponent]
          return (
            <div key={key} class="prop-item" style="display: flex; align-items: center; margin-bottom: 10px">
              { value.text && <span class="label" style="width: 28%">{value.text}</span>}
              <div class="prop-component" style="width: 72%">
                <ComponentName {...props}>
                  {
                    value.options && value.options.map(option => {
                      return (
                        <SubComponent value={option.value}>{option.text}</SubComponent>
                      )
                    })
                  }
                </ComponentName>
              </div>
            </div>
          )
        })
      }
    </div>
  }
}