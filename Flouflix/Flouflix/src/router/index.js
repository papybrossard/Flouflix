import { createRouter, createWebHistory } from 'vue-router';
import DataVizualisation from '@/views/DataVizualisation.vue';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'welcomePage',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/WelcomePage.vue')
    }, 
    {
      path: '/mes-recommandations',
      name: 'recommandations',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/RecommendationSpace.vue')
    },
    {
      path: '/mes-chiffres',
      name: 'chiffres',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: DataVizualisation
    } ,
    {
      path: '/demarrage',
      name: 'demarrage',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/ColdStart.vue')
    },
    {
      path: '/espace-personnel',
      name: 'espace',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/PersonalSpace.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/AdministrationPage.vue')
    },
  ]
})

export default router
