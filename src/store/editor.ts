import { Module } from 'vuex'
import { GlobalDataProps } from './index'
import { v4 as uuidv4 } from 'uuid'
import { TextComponentProps, textDefaultProps, imageDefaultProps } from '../defaultProps'
import { ImageComponentProps } from '../defaultProps'
import { AllComponentProps } from 'lego-bricks'

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
        state.components.push(newComponent)
      } else if ('src' in props) {
        console.log('props', props);
        
        const newComponent: ComponentData = { id: uuidv4(), name: 'LImage', props }
        state.components.push(newComponent)
      }
    },
    deleteComponent(state, props) {
      /**
       * 删除数组中指定数组对象
       */
      state.components.forEach((item, index, arr) => {
        if(item.props.text === props.text) {
          arr.splice(index, 1)
        }
      })
    },
    setActive(state, currentId: string) {
      state.currentElement = currentId
      console.log(currentId);
      
    },
    updateComponent(state, { key, value, id, isRoot }) {
      console.log('vuex id', id);
      
      // updateComponent是对state.components的引用
      const updateComponent = state.components.find((item) => item.id === (id || state.currentElement))
      if(updateComponent) { 
        if (isRoot) {
          console.log(key, value);
          (updateComponent as any)[key] = value
          console.log(updateComponent);
          
        } else {
          // 需要一个属性来决定修改props还是一级属性
          updateComponent.props[key as keyof TextComponentProps] = value
        }
      }
    }
  },
  getters: {
    getCurrentElement: (state) => {
      console.log('重新计算');
      
      return state.components.find((item) => item.id === state.currentElement)
    },
    // getDefaultElement: (state) => {
    //   return state.components[0]
    // }
  }
}

export default editor