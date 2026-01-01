import { createRouter, createWebHistory } from 'vue-router'
import TherapeutesView from '../views/TherapeutesView.vue'
import TherapeuteFormView from '../views/TherapeuteFormView.vue'

const routes = [
  {
    path: '/',
    redirect: '/therapeutes',
  },
  {
    path: '/therapeutes',
    name: 'therapeutes',
    component: TherapeutesView,
  },
  {
    path: '/therapeutes/:id',
    name: 'therapeute-fiche',
    component: TherapeuteFormView,
    props: true,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
