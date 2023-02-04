import { createStore } from 'vuex'
import templates, { TemplatesProps } from './templates'
import user, { UsersProps } from './user'
import editor, { EditorProps } from './editor'

export interface GlobalDataProps {
  user: UsersProps;
  templates: TemplatesProps;
  editor: EditorProps;
}

const store = createStore<GlobalDataProps>({
  // state() {
  //   return {
  //     user: {
  //       isLogin: false
  //     },
  //     templates: testData
  //   }
  // },
  // state: {
  //   user: {
  //     isLogin: false
  //   },
    
  // },
 
  actions: {
  },
  modules: {
    user,
    templates,
    editor
  }
})

export default store