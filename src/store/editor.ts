import { Module } from 'vuex'
import store, { GlobalDataProps } from './index'
import { v4 as uuidv4 } from 'uuid'
import { TextComponentProps, textDefaultProps, imageDefaultProps } from '../defaultProps'
import { ImageComponentProps } from '../defaultProps'
import { AllComponentProps } from 'lego-bricks'
import { message } from 'ant-design-vue'
import { cloneDeep } from 'lodash-es'

export interface ComponentData {
  // props: { [key: string]: any };
  props: Partial<TextComponentProps & ImageComponentProps>;
  id: string;
  // name: string;
  // 业务组件的名称
  name: 'LText' | 'LImage' | 'LShape';
  isHidden?: boolean;
  isLocked?: boolean;
  layerName?: string;
}

export interface EditorProps {
  components: ComponentData[];
  currentElement: string;
  page: PageData;
  copyComponent?: ComponentData;
}

export interface PageProps {
  backgroundColor: string;
  backgroundImage: string;
  backgroundRepeat: string;
  backgroundSize: string;
  height: string;
}

export type AllFormProps = PageProps & AllComponentProps

export interface PageData {
  props: PageProps;
  title: string;
}

export const testComponents: ComponentData[] = [
  { id: uuidv4(), name: 'LText', layerName: '图层1', isLocked: false, isHidden: true, props: { ...textDefaultProps, text: 'hello', fontSize: '50px', color: 'red', lineHeight: '1', textAlign: 'left', fontFamily: '', width: '100px', height: '100px', backgroundColor: '#efefef', left: '10px', top: '10px', position: 'absolute'}},
  // { id: uuidv4(), name: 'LText', layerName: '图层1', isLocked: false, isHidden: true, props: { ...textDefaultProps, text: 'hello', fontSize: '50px', color: 'red', lineHeight: '1', textAlign: 'left', fontFamily: ''}},
  // { id: uuidv4(), name: 'LText', layerName: '图层2', isLocked: false, isHidden: true, props: { ...textDefaultProps, text: 'hello2', fontSize: '25px', lineHeight: '1', textAlign: 'left' }},
  // { id: uuidv4(), name: 'LText', layerName: '图层3', isLocked: false, isHidden: true, props: { ...textDefaultProps, text: 'hello3', fontSize: '15px', actionType: 'url', url: 'https://www.baidu.com/', textAlign: 'left' }}
]

export const pageDefaultProps = {
  backgroundColor: '#ffffff',
  backgroundImage: '',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  height: '560px'
}

const editor: Module<EditorProps, GlobalDataProps> = {
  state: {
    components: testComponents,
    currentElement: '',
    page: {
      props: pageDefaultProps,
      title: 'test title'
    }
  },
  mutations: {
    addComponent(state, props: Partial<TextComponentProps | ImageComponentProps>) {
    // addComponent(state, component: ComponentData) {
      // const newComponent: ComponentData = { id: uuidv4(), name: 'LText', props }
      // state.components.push(newComponent)
      // props.hasOwnProperty.call('text')
      if ('text' in props) {
        const newComponent: ComponentData = { id: uuidv4(), name: 'LText', props }
        newComponent.layerName = '图层' + (state.components.length + 1)
        state.components.push(newComponent)
      } else if ('src' in props) {
        const newComponent: ComponentData = { id: uuidv4(), name: 'LImage', props }
        state.components.push(newComponent)
      }
    },
    deleteComponent(state, props) {
      /**
       * 删除数组中指定数组对象
       */
      state.components.forEach((item, index, arr) => {
        // if(item.props.text === props.text) {
        //   arr.splice(index, 1)
        // }
        if (item.id === props) {
          arr.splice(index, 1)
          message.success('删除图层成功', 1)
        } else {
          arr.splice(index, 1)
          message.success('删除图层成功')
        }
      })
    },
    setActive(state, currentId: string) {
      state.currentElement = currentId
    },
    updateComponent(state, { key, value, id, isRoot }) {
      // updateComponent是对state.components的引用
      const updateComponent = state.components.find((item) => item.id === (id || state.currentElement))
      if(updateComponent) { 
        if (isRoot) {
          (updateComponent as any)[key] = value
        } else {
          // 需要一个属性来决定修改props还是一级属性
          updateComponent.props[key as keyof TextComponentProps] = value
        }
      }
    },
    copyComponent(state, id) {
      // const currentComponent = state.components.find((component) => component.id === id)
      const currentComponent = store.getters.getElement(id)
      if (currentComponent) {
        state.copyComponent = currentComponent
        message.success('已经拷贝当前图层')
      }
    },
    pasteComponent(state, id) {
      if (state.copyComponent) {
        // state.components.push(...state.copyComponent)
        const clone = cloneDeep(state.copyComponent)
        clone.id = uuidv4()
        clone.layerName = clone.layerName + '副本'
        state.components.push(clone)
      }
    },
    moveComponent(state, data: { direction: string; amount: number; id: string}) {
      const currentElement = store.getters.getElement(data.id)
      if (currentElement) {
        /**
         * 数据运算要统一类型，否则会返回NaN
         */
        const oldTop = parseInt(currentElement.props.top)
        // const oldTop = currentElement.props.top
        switch(data.direction) {          
        case 'up': {
          const newTop = oldTop - data.amount + 'px'
          store.commit('updateComponent', { key: 'top', value: newTop, id: data.id })
          break
        }
        default:
          break
        }
      }
    }
  },
  getters: {
    getCurrentElement: (state) => {
      return state.components.find((item) => item.id === state.currentElement)
    },
    /**
     * 
     * @param state 逻辑复用
     * @returns 
     */
    getElement: (state) => (id: string) => {
      // 后面写哥或运算符可以取代第一个getters
      return state.components.find(item => item.id === id || state.currentElement)
    }
  }
}

export default editor