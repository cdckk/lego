<template>
  <div class="editor">
    <!-- <a-layout :style="{ minHeight: '100vh' }" id="components-layout-fixed">
      <a-layout-header class="header" style="height: 80px">
        <div class="page-title" style="text-align: left; color: #fff">慕课乐高</div>
      </a-layout-header>
      <a-layout>
        <a-layout-sider width="300" style="background: yellow">
          <div class="sidebar-container">组件列表</div>
        </a-layout-sider> -->
        <a-layout style="padding: 0 24px 24px">
          <a-layout-content>
            <p>画布区域</p>
            <div class="preview-list" id="canvas-area"></div>
          </a-layout-content>
        </a-layout>
        
        <!-- <a-layout-sider width="300" style="background: purple" class="setting-area">
          组件属性
        </a-layout-sider>
      </a-layout>
      
      <a-layout-footer style="background-color: #D9DADF">
        慕课网（imooc.com）版权所有 | 津ICP备200009号
      </a-layout-footer>
    </a-layout> -->
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="less">
.editor {
  height: 100%;
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
