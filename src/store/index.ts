import { createStore } from 'vuex'
import templates, { TemplatesProps } from './templates'
import user, { UsersProps } from './user'

export interface GlobalDataProps {
  user: UsersProps;
  templates: TemplatesProps;
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
    templates
  }
})

export default store