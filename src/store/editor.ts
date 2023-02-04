import { Module } from 'vuex'
import { GlobalDataProps } from './index'
import { v4 as uuidv4 } from 'uuid'

export interface ComponentData {
  props: { [key: string]: any };
  id: string;
  name: string;
}

export interface EditorProps {
  components: ComponentData[];
  currentElement: string;
}

export const testComponents: ComponentData[] = [
  { id: uuidv4(), name: 'LText', props: { text: 'hello', fontSize: '50px', color: 'red' }},
  { id: uuidv4(), name: 'LText', props: { text: 'hello2', fontSize: '25px' }},
  { id: uuidv4(), name: 'LText', props: { text: 'hello3', fontSize: '15px', url: 'https://www.baidu.com/' }}
]

const editor: Module<EditorProps, GlobalDataProps> = {
  state: {
    components: testComponents,
    currentElement: ''
  },
  mutations: {
    addComponent(state, props) {
      const newComponent: ComponentData = { id: uuidv4(), name: 'LText', props }
      state.components.push(newComponent)
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
    }
  }
}

export default editor