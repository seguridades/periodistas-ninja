import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import SelectorMision from '@/views/SelectorMision.vue'
import PantallaJuego from '@/views/PantallaJuego.vue'

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
      component: SelectorMision,
    },
    {
      path: '/jugar/:misionId',
      name: 'PantallaJuego',
      component: PantallaJuego,
      props: true,
    },
  ],
})

export default router
