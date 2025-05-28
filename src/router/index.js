import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/misiones',
      name: 'SelectorMision',
      component: () => import('../views/SelectorMision.vue'),
    },
    {
      path: '/mision/:id',
      name: 'JugarMision',
      component: () => import('../views/JugarMision.vue'),
    },
  ],
})

export default router
