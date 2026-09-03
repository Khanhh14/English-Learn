// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      };
    }
    if (savedPosition) {
      return savedPosition;
    }
    return { top: 0 };
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/roadmap/a1',
      name: 'RoadmapA1',
      component: () => import('@/views/RoadmapView.vue'),
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
      path: '/learning/:deckId?',
      name: 'learning',
      component: () => import('../views/LearningView.vue'),
      props: true,
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
});

export default router;