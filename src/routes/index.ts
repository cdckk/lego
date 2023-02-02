import { createRouter,createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import Editor from '../views/Editor.vue'
import TemplateDetail from '../views/TemplateDetail.vue'

const routes = [
  { path: '/', name: 'home', component: Home, meta: { withHeader: true } },
  { path: '/editor', name: 'editor', component: Editor },
  { path: '/template/:id', name: 'template', component: TemplateDetail, meta: { withHeader: true } },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router