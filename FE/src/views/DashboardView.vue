<!-- src/views/DashboardView.vue -->
<template>
  <div class="h-screen overflow-hidden bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
    <!-- Animated Background -->
    <div class="fixed inset-0 pointer-events-none overflow-hidden">
      <div class="absolute -top-40 -right-40 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div class="absolute -bottom-40 -left-40 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
    </div>

    <!-- Dashboard Content -->
    <section class="relative z-10 h-full py-4">
      <div class="h-full w-full px-4">
        <div class="flex h-full gap-5">
          <!-- Sidebar -->
          <div class="w-[260px] flex-shrink-0 h-full">
            <div class="sidebar-fixed flex flex-col justify-between h-full bg-white/60 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-4">
              <div>
                <!-- Brand Logo -->
                <router-link to="/" class="flex items-center gap-3 px-3 py-2 mb-4 rounded-2xl transition hover:bg-white/50 group" title="Về trang chủ">
                  <div class="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-xl shadow-md group-hover:scale-105 transition-transform">
                    📚
                  </div>
                  <div>
                    <h1 class="text-lg font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">LinguaFlow</h1>
                    <p class="text-[10px] text-gray-400">Học tiếng Anh thông minh</p>
                  </div>
                </router-link>

                <!-- Navigation Tabs -->
                <nav class="space-y-1">
                  <button 
                    v-for="item in menuItems" 
                    :key="item.id" 
                    @click="activeTab = item.id" 
                    class="w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 text-left" 
                    :class="activeTab === item.id 
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg' 
                      : 'text-gray-600 hover:bg-white/50 hover:text-indigo-600'"
                  >
                    <span class="text-xl">{{ item.icon }}</span>
                    <span class="font-medium">{{ item.name }}</span>
                    <span v-if="item.badge" class="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">{{ item.badge }}</span>
                  </button>
                </nav>
              </div>

              <!-- Footer Sidebar: Chỉ giữ lại nút Trang chủ -->
              <div class="pt-4 border-t border-gray-200/50">
                <router-link 
                  to="/" 
                  class="w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 transition-all font-medium text-sm"
                >
                  <span class="text-lg">🏠</span>
                  <span>Trang chủ</span>
                </router-link>
              </div>
            </div>
          </div>

          <!-- Main Content -->
          <div class="dashboard-main flex-1 min-w-0 h-full">
            <div class="h-full overflow-hidden rounded-3xl bg-white/60 backdrop-blur-xl p-6 shadow-2xl border border-white/50">
              <div v-if="activeTab === 'learning'" class="h-full overflow-auto">
                <LearningTab @start-learning="goToLearning" />
              </div>

              <div v-if="activeTab === 'practice'" class="h-full overflow-auto">
                <PracticeTab />
              </div>

              <div v-if="activeTab === 'ranking'" class="h-full overflow-auto">
                <RankingTab />
              </div>

              <div v-if="activeTab === 'shop'" class="h-full overflow-auto">
                <ShopTab />
              </div>

              <div v-if="activeTab === 'missions'" class="h-full overflow-auto">
                <MissionsTab />
              </div>

              <div v-if="activeTab === 'profile'" class="h-full overflow-auto">
                <ProfileTab :user="user" @update-user="updateUser" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios';
import LearningTab from '@/components/DashBoard/LearningTab.vue';
import PracticeTab from '@/components/DashBoard/PracticeTab.vue';
import RankingTab from '@/components/DashBoard/RankingTab.vue';
import ShopTab from '@/components/DashBoard/ShopTab.vue';
import MissionsTab from '@/components/DashBoard/MissionsTab.vue';
import ProfileTab from '@/components/DashBoard/ProfileTab.vue';

export default {
  name: 'DashboardView',
  components: {
    LearningTab,
    PracticeTab,
    RankingTab,
    ShopTab,
    MissionsTab,
    ProfileTab
  },
  data() {
    return {
      activeTab: 'learning',
      user: {
        id: null,
        name: '',
        email: '',
        avatar: '',
        level: 1,
        points: 0,
        progress: 0,
        joinDate: '',
        streak: 0,
        totalWords: 0,
        totalLessons: 0
      },
      menuItems: [
        { id: 'learning', name: 'Học ngay', icon: '📚' },
        { id: 'practice', name: 'Luyện tập', icon: '✍️' },
        { id: 'ranking', name: 'BXH', icon: '🏆' },
        { id: 'shop', name: 'Cửa hàng', icon: '🛒' },
        { id: 'missions', name: 'Nhiệm vụ', icon: '🎯', badge: '3' },
        { id: 'profile', name: 'Hồ sơ', icon: '👤' }
      ]
    };
  },
  mounted() {
    if (this.$route.query && this.$route.query.tab) {
      this.activeTab = this.$route.query.tab;
    }
    this.loadUserData();
  },
  watch: {
    '$route.query.tab'(newTab) {
      if (newTab) {
        this.activeTab = newTab;
      }
    }
  },
  methods: {
    loadUserData() {
      // 1. Nạp từ localStorage
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          const parsed = JSON.parse(storedUser);
          this.user = { ...this.user, ...parsed };
        } catch (e) {
          console.error('Lỗi phân tích dữ liệu user từ localStorage:', e);
        }
      }

      // 2. Đồng bộ dữ liệu mới nhất từ server backend
      this.fetchUserFromServer();
    },

    async fetchUserFromServer() {
      const token = localStorage.getItem('token') || localStorage.getItem('access_token');
      if (!token) return;

      try {
        const res = await axios.get('http://localhost:4000/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const serverData = res.data?.data || res.data?.user || res.data;
        if (serverData) {
          this.user = { ...this.user, ...serverData };
          localStorage.setItem('user', JSON.stringify(this.user));
        }
      } catch (err) {
        console.warn('Chưa thể lấy thông tin user từ API:', err);
      }
    },

    goToLearning(payload) {
      if (!payload) {
        this.$router.push({ name: 'learning' });
        return;
      }

      const { chapterId, lessonType, chapterTitle } = payload || {};
      const params = {};
      if (chapterId !== undefined && chapterId !== null) params.deckId = chapterId;

      const query = {};
      if (chapterTitle) query.deckTitle = chapterTitle;
      if (lessonType) query.mode = lessonType;

      this.$router.push({ name: 'learning', params, query });
    },

    updateUser(updatedData) {
      this.user = { ...this.user, ...updatedData };
      localStorage.setItem('user', JSON.stringify(this.user));
    }
  }
};
</script>

<style scoped>
@keyframes blob {
  0% { transform: translate(0px, 0px) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
  100% { transform: translate(0px, 0px) scale(1); }
}

.animate-blob {
  animation: blob 7s infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}

.sidebar-fixed {
  position: relative;
  z-index: 10;
  transition: transform 0.2s ease;
}

.dashboard-main {
  min-width: 0;
}

@media (max-width: 768px) {
  .flex {
    flex-direction: column;
  }

  .w-\[260px\] {
    width: 100%;
    height: auto;
  }

  .sidebar-fixed {
    position: relative;
    width: 100%;
    height: auto;
  }

  .dashboard-main {
    height: auto;
  }
}
</style>