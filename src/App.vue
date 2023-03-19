<template>
  <!-- <Home></Home> -->
  <!-- <editor></editor> -->
  <!-- <uploader drag listType="picture"></uploader> -->
  <!-- <style-uploader></style-uploader> -->
  <div class="homepage-container" v-if="withHeader">
    <a-layout :style="{ minHeight: '100vh' }" id="components-layout-fixed">
      <a-layout-header class="header">
        <div class="page-title" style="text-align: left; color: #fff">
          <router-link to="/">慕课乐高</router-link>
        </div>
        <user-profile></user-profile>
      </a-layout-header>
      <a-layout>
        <a-layout-content>
            <!-- <p>画布区域</p>
            <div class="preview-list" id="canvas-area"></div> -->
            <router-view></router-view>
          </a-layout-content>
      </a-layout>
      <a-layout-footer style="background-color: #D9DADF">
        慕课网（imooc.com）版权所有 | 津ICP备200009号
      </a-layout-footer>
    </a-layout>
  </div>
  <div class="homepage-container" v-else>
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import UserProfile from './components/UserProfile.vue'
import Uploader from './components/Uploader.vue'
import StyleUploader from './components/StyleUploader.vue'
// import Home from './views/Home.vue'
// import Editor from './views/Editor.vue'

// export default defineComponent({
//   name: 'App',
//   components: {
//     // Home,
//     // Editor
//   }
// })
const route = useRoute()
const withHeader = computed(() => {
  return route.meta.withHeader
})
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /* color: #2c3e50; */
  /* margin-top: 60px; */
}
.header {
  display: flex;
  justify-content: space-between;
}

// .file-upload .upload-area {
//   background-color: #efefef;
//   border: 1px dashed #ccc;
//   border-radius: 4px;
//   cursor: pointer;
//   padding: 20px;
//   width: 360px;
//   height: 180px;
//   text-align: center;
//   &:hover {
//     border: 1px dashed #1890ff;
//   }
//   // 文件拖到了区域
//   &.is-dragover {
//     border: 2px dashed #1890ff;
//     background-color: rgba(#1890ff, .2);
//   }
// }
.upload-area img {
  height: 100px;
}
</style>
