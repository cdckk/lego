<template>
  <div class="editor">
    <a-layout style="padding: 0 24px 24px; height: 100vh;">
      <a-layout-sider class="editor-template-area" width="300px" style="background: white; margin: 0 auto;">
        <div>
          <component-list
            class="component-list"
            style="width: 300px;"
            @onListClick="addItem"
          >
          </component-list>
          <style-uploader></style-uploader>
        </div>
      </a-layout-sider>

      <a-layout class="editor-area">
        <a-layout-content>
          <p style="margin-top: 20px">画布区域</p>
          <div class="preview-list" id="canvas-area">
            <!-- <div v-for="component in components" :key="component.id" :style="{ 'font-size': component.props.fonSize }">{{component.props.text}}</div> -->
            <div class="body-container" :style="page.props">
            <editor-wrapper
              class="editor-wrapper"
              v-for="component in components"
              :key="component.id"
              :props="component.props"
              :id="component.id"
              :active="false"
              @setActive="setActive"
              @update-position="updatePosition"
            >
            <!-- @click="editor(component.props)" -->
              <component
                class="wrapper-slot"
                v-if="component.name === 'LText'"
                :is="LText"
                v-bind="component.props"  
              >
              <!-- @click="handleDeleteClick(component.props)" -->
              </component>
              <component
                v-else-if="component.name === 'LImage'"
                :is="LImage"
                :src="component.props.src"
                :width="component.props.width"
              ></component>
              <!-- <template #deleteBtn> -->
                <!-- stop用于阻止事件冒泡 -->
                <!-- <a-button type="primary" @click.stop="onDeleteClick(component.props)">删除</a-button> -->
              <!-- </template> -->
            </editor-wrapper>
          </div>
          </div>
        </a-layout-content>
      </a-layout>
      
      <a-layout-sider width="300" style="background: #fff">
        <a-tabs style="margin-top: 20px" v-model:activeKey="activePanel" type="card">
          <a-tab-pane key="component" tab="属性设置" class="no-top-radius">
            <div v-if="currentElement">
              <edit-group
                v-if="!currentElement.isLocked"
                :props="currentElement && currentElement.props"
                @change="handleChange"
              >
              </edit-group>
              <a-empty v-else>
                <template #description>
                  <span>
                    该元素已被锁定，无法编辑
                  </span>
                </template>
              </a-empty>
            </div>

            <image-processer
              v-if="currentElement && currentElement.props.src"
              :props="currentElement.props"
            >
            </image-processer>
          </a-tab-pane>
          <a-tab-pane key="layer" tab="图层设置">
            <LayerList
              v-if="currentElement"
              :selectedId="currentElement.id"
              :list="components"
              @change="handleChange"
              @select="setActive"
            ></LayerList>
          </a-tab-pane>
          <a-tab-pane key="page" tab="页面设置">
            <PropsTable :props="page.props" @change="handleChange"></PropsTable>
          </a-tab-pane>
        </a-tabs>
      </a-layout-sider>
    </a-layout>
  </div>
</template>

<script setup lang="ts">
import {watch} from 'vue'
import LText from '../components/LText.vue'
import LImage from '../components/LImage.vue'
import ComponentList from '../components/ComponentList.vue'
import PropsTable from '../components/PropsTable.vue'
// import PropsTable from '../components/PropsTable'
import { computed, defineExpose, ref } from 'vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from '../store/index'
import EditorWrapper from '../components/EditorWrapper.vue'
import { ComponentData } from '../store/editor'
import StyleUploader from '../components/StyleUploader.vue'
import ImageProcesser from '../components/ImageProcesser.vue'
import LayerList from '../components/LayerList.vue'
import EditGroup from '../components/EditGroup.vue'

export type TabType = 'component' | 'layer' | 'page'
export type activeType = 'component' | 'layer'

const activePanel = ref<activeType>('component')
const store = useStore<GlobalDataProps>()
const defaultComponent = computed(() => store.state.editor.components[0])
// const defaultComponent = computed(() => store.getters.getDefaultElement)

// 画布中增加的模板
// 计算属性防止数据变视图不变的情况
/**
 * 数据修改，自动更新视图，对比新旧vnode，进行diff
 */
const components = computed(() => store.state.editor.components)
watch(
  () => components,
  (val, newval) => {
    console.log('val', val)
    console.log('newval', newval)
  },
  {
    /** 深度监听适用于引用类型 */
    deep: true
  }
)
const page = computed(() => store.state.editor.page)
// const currentElement = store.getters.getCurrentElement ?? defaultComponent.value
/**
 * 注意：1.const不能用来定义 含有??的表达式
 *       2.vuex的getters用到时才会重新计算或使用缓存
 */
const currentElement = computed(() => {
  return store.getters.getCurrentElement ?? defaultComponent.value
})

const addItem = (props: any) => {
  store.commit('addComponent', props)
}

const setActive = (id: string) => {
  store.commit('setActive', id)
}
// 默认调用一次
setActive(components.value[0].id)

const onDeleteClick = (props: any) => {
  store.commit('deleteComponent', props)
}

const handleChange = (e: any) => {
  console.log('事件监听', e);
  store.commit('updateComponent', e)
}

const updatePosition = (position: { top: string; left: string; id: string }) => {
  console.log('position', position)
  const { left, top, id } = position
  store.commit('updateComponent', { key: 'left', value: left, id })
  store.commit('updateComponent', { key: 'top', value: top, id })
}

// const handleLock = (data: { id: string; key: string; value: boolean; isRoot: boolean}) => {
//   store.commit('updateComponent', data)
// }

defineExpose({
  LText
})
</script>

<style scoped lang="less">
// .wrapper-slot {
//   position: static !important;
// }
.editor-template-area {
  margin-top: 50px;
}
.editor {
  height: 100%;
}
.preview-list {
  // position: fixed;
  margin: 0 auto;
  padding: 0;
  min-width: 375px;
  min-height: 200px;
  // position: relative;
  // height: 200px;
  width: 450px;
  border: 1px solid #efefef;
  background-color: #fff;
  overflow-x: hidden;
  overflow-y: auto;
  // position: fixed;
  // margin-top: 50px;
  max-height: 80vh;
}
.component-list {
  padding-top: 20px;
  overflow: hidden;
}
.editor-wrapper {
  // display: flex;
  // align-items: center;
  // justify-content: space-around;
  // margin-bottom: 10px;
}

// #components-layout-fixed {
//   min-height: 100vh;
// }
// .page-title {
//   color: #fff;
// }
// #components-layout-demo-basic .code-box-demo {
//   height: 100%;
//   text-align: center;
// }
// #components-layout-demo-basic .ant-layout-header,
// #components-layout-demo-basic .ant-layout-footer {
//   color: #fff;
//   background: #7dbcea;
// }
// [data-theme='dark'] #components-layout-demo-basic .ant-layout-header {
//   background: #6aa0c7;
// }
// [data-theme='dark'] #components-layout-demo-basic .ant-layout-footer {
//   background: #6aa0c7;
// }
// #components-layout-demo-basic .ant-layout-footer {
//   line-height: 1.5;
// }
// #components-layout-demo-basic .ant-layout-sider {
//   color: #fff;
//   line-height: 120px;
//   background: #3ba0e9;
// }
// [data-theme='dark'] #components-layout-demo-basic .ant-layout-sider {
//   background: #3499ec;
// }
// #components-layout-demo-basic .ant-layout-content {
//   min-height: 120px;
//   color: #fff;
//   line-height: 120px;
//   background: rgba(16, 142, 233, 1);
// }
// [data-theme='dark'] #components-layout-demo-basic .ant-layout-content {
//   background: #107bcb;
// }
// #components-layout-demo-basic > .code-box-demo > .ant-layout + .ant-layout {
//   margin-top: 48px;
// }
</style>
