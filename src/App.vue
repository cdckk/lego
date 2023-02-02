<template>
  <!-- <Home></Home> -->
  <!-- <editor></editor> -->
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

<style>
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
</style>
