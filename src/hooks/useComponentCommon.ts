import { computed } from 'vue'
import { pick } from 'lodash-es'
import { TextComponentProps } from '../defaultProps'

// const useComponentCommon = <T extends {[key: string]: any}>(props: T, picks: string[]) => {
/**
 * 
 * @param props 用到vue3的props，所以是只读的
 * @param picks 
 */
const useComponentCommon = (props: Readonly<Partial<TextComponentProps>>, picks: string[]) => {
  const styleProps = computed(() => pick(props, picks))
  const handleClick = () => {
    if(props.actionType === 'url' && props.url) {
      window.location.href = props.url
    }
  }
  return {
    // style的提取
    styleProps,
    // 对应的点击事件
    handleClick
  }
}

export default useComponentCommon