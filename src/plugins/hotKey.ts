import { useHotKey } from '../hooks/useHotKey'
// import { useStore } from 'vuex'
// import { GlobalDataProps } from '../store/index'
import store from '../store/index'
import { HotkeysEvent, KeyHandler } from 'hotkeys-js'

const wrap = (callback: KeyHandler) => {
  const wrapperFn = (e: KeyboardEvent, event: HotkeysEvent) =>{
    e.preventDefault()
    callback(e, event)
  }
  return wrapperFn
}

export const initailHotKeys = (id: string) => {
  // const store = useStore<GlobalDataProps>()
  // 拷贝
  useHotKey('ctrl + c', () => {
    store.commit('copyComponent', id)
  })
  // 复制
  useHotKey('ctrl + v', () => {
    store.commit('pasteComponent', id)
  })
  useHotKey('backspace, delete', () => {
    store.commit('deleteComponent', id)
  })
  useHotKey('esc', () => {
    store.commit('setActive', '')
  })
  useHotKey('up', () => {
    store.commit('moveComponent', { direction: 'up', amount: 1, id: id })
  })
}