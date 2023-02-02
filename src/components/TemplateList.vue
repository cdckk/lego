<template>
  <div class="template-list-component">
    <a-row :gutter="16">
      <a-col :span="6" v-for="item in list" :key="item.id">
        <a-card hoverable @click="handleTemplateClick(item)">
          <template #cover>
            <img alt="example" :src="item.coverImg" />
            <!-- <img src="item.coverImg" alt=""> -->
            <div class="hover-item">
              <a-button size="large" type="primary"></a-button>
            </div>
          </template>
          <a-card-meta title="Europe Street beat">
            <template #description>
              <div class="decription-detail">
                <span>作者：{{item.author}}</span>
                <span class="user-number">{{item.copiedCount}}</span>
              </div>
            </template>
          </a-card-meta>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { defineProps, withDefaults } from 'vue'
import type { PropType } from 'vue'
import { useRouter } from 'vue-router'
// import { useStore } from 'vuex'
import { TemplateProps } from '../store/index'

const router = useRouter()
// const store = useStore()

// interface Props {
//   list: Array<TemplateProps>;
//   type?: string;
// }

interface TemplateItem {
  id: number;
  coverImg: string;
}

// const props = withDefaults(defineProps<Props>(), {
//   type: 'work',
// })
const props = defineProps({
  list: Array as PropType<TemplateProps[]>
})

const handleTemplateClick = (item: TemplateItem) => {
  /**
   * 与templateDetail组件的通信思路：1.点击就把数据存入vuex中，
   * templatedetail组件初始化从vuex中取数据
   */

  // store.commit('changeTemplateData', item)
  router.push({
    name: 'template',
    params: {
      id: `${item.id}`
    }
  })
}
</script>

<style scoped lang="less">
</style>
