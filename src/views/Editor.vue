<template>
  <div class="editor">
    <a-layout style="padding: 0 24px 24px; height: 100vh;">
      <a-layout-sider width="300" style="background: yellow">
        <component-list @onListClick="addItem"></component-list>
      </a-layout-sider>
      <a-layout class="editor-area">
        <a-layout-content>
          <p>画布区域</p>
          <div class="preview-list" id="canvas-area">
            <!-- <div v-for="component in components" :key="component.id" :style="{ 'font-size': component.props.fonSize }">{{component.props.text}}</div> -->
            <component
              v-for="component in components"
              :key="component.id"
              :is="LText"
              v-bind="component.props"
              @click="handleDeleteClick(component.props)"
            >
            </component>
          </div>
        </a-layout-content>
      </a-layout>
      <a-layout-sider width="300" style="background: purple">右边</a-layout-sider>
    </a-layout>
  </div>
</template>

<script setup lang="ts">
import LText from '../components/LText.vue'
import ComponentList from '../components/ComponentList.vue'
import { computed, defineExpose } from 'vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from '../store/index'


const store = useStore<GlobalDataProps>()
const components = computed(() => store.state.editor.components)

const addItem = (props: any) => {
  store.commit('addComponent', props)
}
const handleDeleteClick = (props: any) => {
  store.commit('deleteComponent', props)
}

defineExpose({
  LText
})
</script>

<style scoped lang="less">
.editor {
  height: 100%;
}
.preview-list {
  margin: 0 auto;
  // position: relative;
  height: 200px;
  width: 450px;
  background-color: #fff;
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
