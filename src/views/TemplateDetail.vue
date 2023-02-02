<template>
  <div class="template-detail--container">
     <a-row type="flex" justify="center">
      <a-col :span="8">
        <img class="template-img" :src="template.coverImg" alt="">
      </a-col>
      <a-col :span="8">
        <!-- <div class="template-detail"> -->
          <h2 class="title">前端架构师海报</h2>
          <p class="title">如何突破前端瓶颈</p>
          <div class="author">
            <a-avatar>V</a-avatar>
            该模板由<b>{{template.author}}</b>制作
          </div>
          <div class="bar-code-area">
            <span>扫一扫，手机预览</span>
            <div ref="container"></div>
          </div>
          <a-button type="primary" size="large" @click="handleTemplateClick">使用模板</a-button>
          <a-button size="large">下载图片海报</a-button>
        <!-- </div> -->
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { onMounted, ref, computed } from 'vue'
import { TemplateProps } from '../store/index'

const router = useRouter()
const store = useStore()
const route = useRoute()

const currentId = route.params.id as string
const template = computed<TemplateProps>(() => {
  return store.getters.getTemplateById(parseInt(currentId))
})



const templateDetailData = ref([])

const handleTemplateClick = () => {
  router.push('/editor')
}

onMounted(() => {
  templateDetailData.value = store.state.templates
})
</script>

<style scoped lang="less">
.template-detail--container {
  margin-top: 70px;
}
.template-img {
  height: 686px;
  width: 384px;
}
</style>
