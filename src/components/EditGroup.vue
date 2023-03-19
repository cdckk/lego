<template>
  <div class="edit-groups">
    <div
      v-for="(item, index) in editProps"
      :key="item.text">
      <a-collapse v-model:activeKey="currentkey" accordion>
        <a-collapse-panel :key="`item-${index}`" :header="item.text">
          <PropsTable :props="item.props" @change="handleChange"></PropsTable>
        </a-collapse-panel>
      </a-collapse>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, computed, PropType } from 'vue'
import { difference } from 'lodash'
import { AllComponentProps } from 'lego-bricks'
// import { TextImageComponentProps } from '../defaultProps'
// import PropsTable from "./PropsTable.vue";
import PropsTable from "./PropsTable"

interface GroupProps {
  text: string;
  items: string[];
}
const defaultEditGroup: GroupProps[] = [
  {
    text: '尺寸',
    items: ['height', 'width', 'paddingLeft', 'paddingRight', 'paddingTop', 'paddingBottom']
  },
  {
    text: '边框',
    items: ['borderStyle', 'borderColor', 'borderWidth', 'borderRadius']
  },
  {
    text: '阴影与透明度',
    items: ['opacity', 'boxShadow']
  },
  {
    text: '位置',
    items: ['left', 'top']
  },
  {
    text: '事件功能',
    items: ['actionType', 'url']
  }
]
// interface Props {
//     props: Object as PropType<AllComponentProps>;
//     groups: Array as PropType<GroupProps[]>
//   }
export default {
  props: {
    props: {
      type: Object as PropType<AllComponentProps>,
      required: true
    },
    // 自定义组合功能 
    groups: {
      type: Array as PropType<GroupProps[]>,
      default: defaultEditGroup
    }
  },
  components: {
    PropsTable
  },
  emits: ['change'],
  setup(props, context) {
    const currentkey = ref('item-0')
    const activeKey = ref([])
    const newGroups = computed(() => {
      const allNormalProps = props.groups.reduce((prev, item) => {
        // prev.concat(item.items)
        return [...prev, ...item.items]
      }, [] as string[])
      const specialProps = difference(props.props && Object.keys(props.props), allNormalProps)
      return [
        {
          text: '基本属性',
          items: specialProps
        },
        ...props.groups
      ]
    })
    const editProps = computed(() => {
      return newGroups.value.map((group) => {
        const propsMap = {} as AllComponentProps
        group.items.forEach(item => {
          const key = item as keyof AllComponentProps
          propsMap[key] =  props.props[key]
        })
        return {
          ...group,
          props: propsMap
        }
      })
    })
    const handleChange = (e: any) => {
      context.emit('change', e)
    }
    return {
      currentkey,
      activeKey,
      newGroups,
      editProps,
      handleChange
    }
  }
}
</script>

<style scoped lang="less">
</style>
