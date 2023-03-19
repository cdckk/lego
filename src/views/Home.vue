<template>
  <!-- <div class="homepage-container">
    <a-layout :style="{ height: '100vh' }">
      <a-layout-header class="header">
        <div class="page-title" :style="{ color: '#fff' }">
          慕课乐高
        </div>
      </a-layout-header>
      <a-layout-content class="home-layout"> -->
        <uploader></uploader>
        <div class="content-container">
          <template-list :list="testData"></template-list>
        </div>
      <!-- </a-layout-content>
      <a-layout-footer style="background-color: #D9DADF">
        慕课网（imooc.com）版权所有 | 津ICP备200009号
      </a-layout-footer>
    </a-layout> -->
  <!-- </div> -->
</template>

<script setup lang="ts">
import TemplateList from '../components/TemplateList.vue'
import { useStore } from 'vuex'
import { computed } from 'vue'
import { GlobalDataProps } from '../store/index'
import Uploader from '../components/Uploader.vue'

const store = useStore<GlobalDataProps>()

const testData = computed(() => store.state.templates.templates)
</script>

<style scoped lang="less">
// .page-title {
//   color: #fff;
// }
// #components-layout-demo-basic .code-box-demo {
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
