<!-- src/components/Dashboard/RankingTab.vue -->
<template>
  <div class="space-y-6">
    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <h2 class="text-2xl font-black text-gray-800">🏆 Bảng xếp hạng</h2>

      <!-- Tab Filter -->
      <div class="flex items-center space-x-2 bg-slate-100 p-1.5 rounded-2xl w-fit">
        <button 
          v-for="tab in tabs" 
          :key="tab.key"
          @click="changeTab(tab.key)"
          :class="[
            'px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer',
            activeTab === tab.key 
              ? 'bg-indigo-600 text-white shadow-xs' 
              : 'text-gray-500 hover:text-gray-800 hover:bg-white/60'
          ]"
        >
          {{ tab.label }}
        </button>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex min-h-[220px] items-center justify-center">
      <div class="h-9 w-9 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600"></div>
    </div>

    <!-- Empty State -->
    <div v-else-if="rankings.length === 0" class="p-8 text-center bg-gray-50 rounded-2xl border border-gray-100">
      <p class="text-sm font-semibold text-gray-400">Chưa có dữ liệu xếp hạng cho mốc thời gian này.</p>
    </div>

    <div v-else class="space-y-6">
      <!-- Top 3 Podium (Top 2 - Top 1 - Top 3) -->
      <div class="grid grid-cols-3 gap-3 sm:gap-4 items-end pt-4">
        <!-- Top 2 -->
        <div 
          v-if="top2" 
          class="text-center bg-gradient-to-b from-slate-50 to-gray-100 rounded-2xl p-4 border border-slate-200 shadow-xs"
        >
          <div class="text-3xl mb-1">🥈</div>
          <p class="font-extrabold text-sm text-gray-800 truncate">{{ top2.name }}</p>
          <p class="text-xs font-black text-indigo-600 mt-0.5">{{ top2.points }} XP</p>
        </div>
        <div v-else class="invisible"></div>

        <!-- Top 1 -->
        <div 
          v-if="top1" 
          class="text-center bg-gradient-to-b from-amber-50 to-yellow-100/70 rounded-2xl p-4 border-2 border-amber-300 shadow-md transform -translate-y-2"
        >
          <div class="text-4xl mb-1">👑</div>
          <p class="font-black text-sm text-gray-800 truncate">{{ top1.name }}</p>
          <p class="text-xs font-black text-amber-700 mt-0.5">{{ top1.points }} XP</p>
        </div>
        <div v-else class="invisible"></div>

        <!-- Top 3 -->
        <div 
          v-if="top3" 
          class="text-center bg-gradient-to-b from-orange-50 to-amber-50 rounded-2xl p-4 border border-orange-200 shadow-xs"
        >
          <div class="text-3xl mb-1">🥉</div>
          <p class="font-extrabold text-sm text-gray-800 truncate">{{ top3.name }}</p>
          <p class="text-xs font-black text-orange-600 mt-0.5">{{ top3.points }} XP</p>
        </div>
        <div v-else class="invisible"></div>
      </div>

      <!-- Rest of Rankings (Hạng 4 trở đi) -->
      <div v-if="restRankings.length > 0" class="space-y-2">
        <div 
          v-for="(user, index) in restRankings" 
          :key="user.id || index" 
          class="flex items-center justify-between p-3.5 bg-white border border-gray-100 rounded-2xl hover:border-indigo-100 hover:bg-indigo-50/20 transition-all shadow-xs"
        >
          <div class="flex items-center space-x-3">
            <span class="w-7 h-7 flex items-center justify-center rounded-xl bg-slate-100 text-slate-500 font-black text-xs">
              {{ index + 4 }}
            </span>
            <span class="font-bold text-sm text-gray-700">{{ user.name }}</span>
          </div>
          <span class="text-xs font-black text-indigo-600">{{ user.points }} XP</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'RankingTab',
  data() {
    return {
      activeTab: 'all',
      tabs: [
        { key: 'day', label: 'Hôm nay' },
        { key: 'month', label: 'Tháng này' },
        { key: 'all', label: 'Tổng' }
      ],
      rankings: [],
      loading: false
    };
  },
  computed: {
    top1() {
      return this.rankings[0] || null;
    },
    top2() {
      return this.rankings[1] || null;
    },
    top3() {
      return this.rankings[2] || null;
    },
    restRankings() {
      return this.rankings.slice(3);
    }
  },
  mounted() {
    this.fetchRankings();
  },
  activated() {
    this.fetchRankings();
  },
  methods: {
    getAuthHeaders() {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      return token ? { Authorization: `Bearer ${token}` } : {};
    },
    changeTab(tabKey) {
      if (this.activeTab === tabKey) return;
      this.activeTab = tabKey;
      this.fetchRankings();
    },
    async fetchRankings() {
      try {
        this.loading = true;
        // Gọi API qua endpoint /api/ranking đã đăng ký ở main.js
        const res = await axios.get('/api/ranking', {
          params: { type: this.activeTab },
          headers: this.getAuthHeaders()
        });
        if (res.data?.success) {
          this.rankings = res.data.data || [];
        }
      } catch (error) {
        console.error('Lỗi khi tải bảng xếp hạng:', error);
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>