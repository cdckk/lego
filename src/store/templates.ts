import { Module } from 'vuex'
import { GlobalDataProps } from './index'

export interface TemplateProps {
  id: number;
  coverImg: string;
  title?: string;
  author: string;
  copiedCount?: number;
}

export interface TemplatesProps {
  templates: TemplateProps[];
}

const testData: TemplateProps[] = [
  { id: 1, coverImg: 'https://static.imooc-lego.com/upload-files/screenshot-889755.png', title: '前端直播海报', author: 'chen', copiedCount: 1 },
  { id: 2, coverImg: 'https://static-dev.imooc-lego.com/imooc-test/sZHlgv.png',title: '前端直播海报', author: 'chen', copiedCount: 1 },
  { id: 3, coverImg: 'https://static.imooc-lego.com/upload-files/screenshot-323204.png', title: '前端直播海报', author: 'chen', copiedCount: 1 },
  { id: 4, coverImg: 'https://static.imooc-lego.com/upload-files/screenshot-677311.png', title: '前端直播海报', author: 'chen', copiedCount: 1 },
  { id: 5, coverImg: 'https://static.imooc-lego.com/upload-files/screenshot-726751.png', title: '前端直播海报', author: 'chen', copiedCount: 1 },
  { id: 6, coverImg: 'https://static.imooc-lego.com/upload-files/screenshot-682056.png', title: '前端直播海报', author: 'chen', copiedCount: 1 }
]

const templates: Module<TemplatesProps, GlobalDataProps> = {
  state() {
    return {
      templates: testData
    }
  },
  getters: {
    getTemplateById: (state) => (id: number) => {
      return state.templates.find((item) => item.id === id)
    }
  }
}

export default templates