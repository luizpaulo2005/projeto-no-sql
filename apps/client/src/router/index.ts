import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/Home.vue'
import Eventos from '@/views/Eventos.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: "/eventos",
      name: "events",
      component: Eventos
    }
  ],
})

export default router
