import { Module } from 'vuex'
import { GlobalDataProps } from './index'

export interface UserProps {
  isLogin: boolean;
  userName?: string;
}

export interface UsersProps {
  user: UserProps;
}

const user: Module<UsersProps, GlobalDataProps> = {
  state() {
    return {
      user: {
        isLogin: true
      }
    }
  },
  mutations: {
    login(state) {
      state.user = { ...state.user, isLogin: true, userName: 'chen' }
    },
    logout(state) {
      state.user = { isLogin: false }
    }
  },
}

export default user