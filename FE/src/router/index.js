// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/DashboardView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../components/Auth/Login.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../components/Auth/Register.vue'),
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: () => import('../components/Auth/ForgotPassword.vue'),
    },
  ],
})

export default router