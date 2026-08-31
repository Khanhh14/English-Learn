// src/main.js
import './assets/tailwind.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios'

import App from './App.vue'
import router from './router'

import FontAwesomeIcon from './plugins/fontawesome'
import ToastPlugin from './plugins/toast'

// Cấu hình axios baseURL tự động theo môi trường (.env / .env.production)
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL || ''

// Tự động gắn token vào header cho mọi request nếu có đăng nhập
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)
app.component('FontAwesomeIcon', FontAwesomeIcon)

app.use(createPinia())
app.use(router)
app.use(ToastPlugin)

app.mount('#app')