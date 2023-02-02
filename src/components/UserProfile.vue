<template>
  <div class="user-profile">
    <a-button
      class="user-profile-component"
      type="primary"
      v-if="!user.isLogin"
      @click="login"
    >
      登录
    </a-button>
    <div v-else>
       <a-dropdown>
        <a class="ant-dropdown-link" @click.prevent>
          用户名
          <DownOutlined />
        </a>
        <template #overlay>
          <a-menu>
            <a-menu-item @click="logout">
              登出
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { GlobalDataProps } from '../store/index'
import { message } from 'ant-design-vue'

const store = useStore<GlobalDataProps>()
const router = useRouter()

const user = computed(() => store.state.user.user)

const login = () => {
  store.commit('user/login')
  message.success('登录成功', 2)
}
const logout = () => {
  store.commit('user/logout')
  message.success('登出成功，2秒后回到首页', 2)
  setTimeout(() => {
    router.push('/')
  }, 2000)
}
</script>

<style scoped lang="less">
.user-profile {
  color: #fff;
}
</style>
