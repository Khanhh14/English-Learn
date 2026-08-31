// src/stores/auth.js
import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user') || 'null'),
    token: localStorage.getItem('token') || null,
    loading: false
  }),

  getters: {
    isAuthenticated: (state) => Boolean(state.token),
    currentUser: (state) => state.user || {}
  },

  actions: {
    // 1. Đăng nhập
    async login(credentials) {
      this.loading = true;
      try {
        const res = await axios.post('/api/auth/login', credentials);
        const { token, user } = res.data;

        this.token = token;
        this.user = user;

        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        return { success: true };
      } catch (error) {
        return {
          success: false,
          message: error.response?.data?.message || 'Đăng nhập thất bại!'
        };
      } finally {
        this.loading = false;
      }
    },

    // 2. Lấy thông tin user hiện tại (auth/me)
    async fetchMe() {
      if (!this.token) return;
      try {
        const res = await axios.get('/api/auth/me', {
          headers: { Authorization: `Bearer ${this.token}` }
        });
        const userData = res.data?.data || res.data;
        if (userData) {
          this.user = { ...this.user, ...userData };
          localStorage.setItem('user', JSON.stringify(this.user));
        }
      } catch (error) {
        console.warn('Lỗi lấy thông tin me:', error);
        if (error.response?.status === 401) {
          this.logout();
        }
      }
    },

    // 3. Cập nhật hồ sơ
    async updateProfile(payload) {
      try {
        const res = await axios.put('/api/auth/profile', payload, {
          headers: { Authorization: `Bearer ${this.token}` }
        });

        if (payload.name) {
          this.user.name = payload.name;
          this.user.username = payload.name;
        }

        localStorage.setItem('user', JSON.stringify(this.user));
        return { success: true, message: res.data?.message || 'Cập nhật thành công!' };
      } catch (error) {
        return {
          success: false,
          message: error.response?.data?.message || 'Cập nhật thất bại!'
        };
      }
    },

    // 4. Đăng xuất
    logout() {
      this.user = null;
      this.token = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  }
});