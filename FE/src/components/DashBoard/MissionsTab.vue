<!-- src/components/Dashboard/MissionsTab.vue -->
<template>
  <div class="max-w-4xl mx-auto space-y-6">
    <!-- Header Thống Kê -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="md:col-span-2 bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-3xl p-6 shadow-xl shadow-indigo-100 relative overflow-hidden flex flex-col justify-between">
        <div class="relative z-10">
          <div class="flex items-center space-x-2 text-indigo-200 text-sm font-semibold uppercase tracking-wider mb-1">
            <span>⚡ Thử thách mỗi ngày</span>
          </div>
          <h2 class="text-2xl md:text-3xl font-extrabold tracking-tight">Hoàn thành nhiệm vụ</h2>
          <p class="text-indigo-100 text-sm mt-1">Tích lũy xu để mở khóa vật phẩm trong Cửa Hàng.</p>
        </div>

        <div class="mt-6 relative z-10">
          <div class="flex justify-between items-center text-xs font-semibold mb-2">
            <span>Tiến độ ngày</span>
            <span>{{ completedCount }} / {{ missions.length }} hoàn thành</span>
          </div>
          <div class="w-full bg-white/20 rounded-full h-3 backdrop-blur-sm overflow-hidden p-0.5">
            <div 
              class="bg-white rounded-full h-full transition-all duration-700 ease-out shadow-sm"
              :style="{ width: `${progressPercentage}%` }"
            ></div>
          </div>
        </div>

        <div class="absolute -right-8 -bottom-8 w-36 h-36 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
      </div>

      <!-- Card Xu -->
      <div class="bg-gradient-to-br from-amber-500 to-orange-500 text-white rounded-3xl p-6 shadow-xl shadow-orange-100 flex flex-col justify-between relative overflow-hidden">
        <div class="flex items-center justify-between">
          <span class="text-xs font-bold uppercase tracking-wider text-amber-100">Kho Báu Của Bạn</span>
          <span class="text-2xl">🪙</span>
        </div>
        <div class="my-4">
          <div class="text-4xl font-black tracking-tight">{{ totalCoins.toLocaleString() }}</div>
          <span class="text-xs text-amber-100 font-medium">Xu khả dụng</span>
        </div>
        <router-link 
          to="/dashboard/shop" 
          class="w-full py-2.5 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-xl text-xs font-bold transition-all text-center"
        >
          Vào Cửa Hàng Đổi Quà →
        </router-link>
      </div>
    </div>

    <!-- Trạng thái Loading -->
    <div v-if="isLoading" class="space-y-3">
      <div v-for="n in 3" :key="n" class="h-20 bg-gray-100 animate-pulse rounded-2xl border border-gray-200"></div>
    </div>

    <!-- Danh Sách Nhiệm Vụ Rỗng -->
    <div v-else-if="errorMessage" class="text-center py-12 bg-white rounded-2xl border border-red-200">
      <span class="text-4xl">⚠️</span>
      <p class="mt-2 text-red-600 text-sm">{{ errorMessage }}</p>
      <button @click="fetchMissions" class="mt-4 px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold">
        Thử lại
      </button>
    </div>

    <div v-else-if="missions.length === 0" class="text-center py-12 bg-white rounded-2xl border border-gray-200">
      <span class="text-4xl">🎉</span>
      <p class="mt-2 text-gray-500 text-sm">Hôm nay chưa có nhiệm vụ nào mới!</p>
    </div>

    <!-- Danh Sách Nhiệm Vụ Đã Tải -->
    <div v-else class="space-y-3">
      <div 
        v-for="mission in missions" 
        :key="mission.id"
        class="group relative bg-white border rounded-2xl p-4 md:p-5 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-4"
        :class="mission.completed 
          ? 'border-gray-100 bg-gray-50/70 opacity-75' 
          : 'border-gray-200/80 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-50/50'"
      >
        <div class="flex items-center space-x-4 flex-1 min-w-0">
          <!-- Icon -->
          <div 
            class="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 shadow-inner transition-transform group-hover:scale-105"
            :class="mission.completed ? 'bg-emerald-100 text-emerald-600' : 'bg-indigo-50 text-indigo-600'"
          >
            <span v-if="mission.completed">✓</span>
            <span v-else>{{ mission.icon || getFallbackIcon(mission.name) }}</span>
          </div>

          <!-- Nội Dung -->
          <div class="flex-1 min-w-0 space-y-1">
            <div class="flex items-center space-x-2">
              <h4 class="font-bold text-gray-800 truncate" :class="{ 'line-through text-gray-400': mission.completed }">
                {{ mission.name }}
              </h4>
              <span 
                v-if="mission.completed" 
                class="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-700"
              >
                Đã nhận
              </span>
            </div>
            <p class="text-xs text-gray-500 truncate">{{ mission.description || 'Hoàn thành chỉ tiêu để nhận xu' }}</p>

            <!-- Tiến độ & Phần thưởng -->
            <div class="flex items-center space-x-4 pt-1">
              <div class="flex items-center space-x-1 text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200/50">
                <span>🪙</span>
                <span>+{{ mission.reward }} xu</span>
              </div>

              <!-- Mini Progress Bar -->
              <div class="flex items-center space-x-2 flex-1 max-w-[180px]">
                <div class="flex-1 bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div 
                    class="h-full rounded-full transition-all duration-500"
                    :class="mission.completed ? 'bg-emerald-500' : 'bg-indigo-600'"
                    :style="{ width: `${Math.min((mission.progress / mission.total) * 100, 100)}%` }"
                  ></div>
                </div>
                <span class="text-[11px] font-semibold text-gray-400 tabular-nums">
                  {{ mission.progress }}/{{ mission.total }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Nút Nhận Thưởng / Trạng thái -->
        <div class="flex items-center justify-end md:pl-4">
          <div v-if="mission.completed" class="text-emerald-500 font-semibold text-xs flex items-center space-x-1 bg-emerald-50 px-3 py-2 rounded-xl">
            <span>Đã nhận thưởng</span>
          </div>

          <button 
            v-else-if="mission.progress >= mission.total"
            @click="claimReward(mission)"
            :disabled="claimingId === mission.id"
            class="w-full md:w-auto px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 disabled:opacity-50 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-200 active:scale-95 transition-all flex items-center justify-center space-x-1.5 animate-pulse cursor-pointer"
          >
            <span>{{ claimingId === mission.id ? 'Đang nhận...' : 'Nhận Thưởng' }}</span>
            <span>🎉</span>
          </button>

          <div v-else class="text-xs font-semibold text-gray-400 bg-gray-100 px-3 py-2 rounded-xl">
            Chưa đạt
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

const missions = ref([]);
const totalCoins = ref(0);
const isLoading = ref(true);
const claimingId = ref(null);
const errorMessage = ref('');

let storedUser = null;
try {
  storedUser = JSON.parse(localStorage.getItem('user') || 'null');
} catch (error) {
  console.warn('Không thể đọc thông tin người dùng đã lưu:', error);
}
const currentUserId = ref(storedUser?.id || localStorage.getItem('userId'));
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || '';

const completedCount = computed(() => missions.value.filter(m => m.completed).length);
const progressPercentage = computed(() => {
  if (missions.value.length === 0) return 0;
  return Math.round((completedCount.value / missions.value.length) * 100);
});

// Tự gán icon tương ứng nếu database không lưu cột icon
const getFallbackIcon = (title = '') => {
  const t = title.toLowerCase();
  if (t.includes('từ')) return '📚';
  if (t.includes('luyện') || t.includes('tập')) return '✍️';
  if (t.includes('streak') || t.includes('lửa')) return '🔥';
  if (t.includes('tuần') || t.includes('điểm') || t.includes('xp')) return '🏆';
  return '🎯';
};

// Gọi API lấy dữ liệu nhiệm vụ từ backend
const fetchMissions = async () => {
  isLoading.value = true;
  errorMessage.value = '';
  try {
    if (!currentUserId.value) {
      throw new Error('Không tìm thấy thông tin người dùng. Vui lòng đăng nhập lại.');
    }

    const headers = {};
    const token = localStorage.getItem('token');
    if (token) headers.Authorization = `Bearer ${token}`;

    const res = await fetch(`${apiBaseUrl}/api/quests/user/${currentUserId.value}`, { headers });
    const data = await res.json();
    
    if (!res.ok) {
      throw new Error(data.message || 'Không thể tải danh sách nhiệm vụ.');
    }

    missions.value = Array.isArray(data.missions) ? data.missions : [];
    totalCoins.value = Number(data.totalCoins) || 0;
  } catch (error) {
    console.error('Không thể tải danh sách nhiệm vụ:', error);
    errorMessage.value = error.message || 'Không thể tải danh sách nhiệm vụ.';
  } finally {
    isLoading.value = false;
  }
};

// Gọi API nhận thưởng
const claimReward = async (mission) => {
  claimingId.value = mission.id;
  try {
    const token = localStorage.getItem('token');
    const res = await fetch(`${apiBaseUrl}/api/quests/claim`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      },
      body: JSON.stringify({ 
        userId: currentUserId.value, 
        questId: mission.id 
      })
    });
    const data = await res.json();

    if (res.ok && data.success) {
      mission.completed = true;
      totalCoins.value += data.reward;
    } else {
      alert(data.message || 'Có lỗi xảy ra khi nhận thưởng');
    }
  } catch (error) {
    console.error('Lỗi nhận thưởng:', error);
  } finally {
    claimingId.value = null;
  }
};

onMounted(() => {
  fetchMissions();
});
</script>