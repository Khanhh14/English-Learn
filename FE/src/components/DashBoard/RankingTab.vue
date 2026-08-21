<!-- src/components/Dashboard/RankingTab.vue -->
<template>
  <div>
    <h2 class="text-2xl font-bold text-gray-800 mb-4">🏆 Bảng xếp hạng</h2>

    <div class="flex items-center space-x-4 mb-6">
      <button class="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-xl font-medium">Tuần này</button>
      <button class="px-4 py-2 bg-white/70 text-gray-600 rounded-xl font-medium hover:bg-white/90 transition-all">Tháng này</button>
      <button class="px-4 py-2 bg-white/70 text-gray-600 rounded-xl font-medium hover:bg-white/90 transition-all">Tổng</button>
    </div>

    <!-- Top 3 -->
    <div class="grid grid-cols-3 gap-4 mb-6">
      <div class="text-center bg-gradient-to-b from-yellow-50 to-orange-50 rounded-2xl p-4 border border-yellow-200">
        <div class="text-3xl mb-2">🥈</div>
        <p class="font-bold text-gray-800">Nguyễn Văn A</p>
        <p class="text-sm text-gray-500">1,284 điểm</p>
      </div>
      <div class="text-center bg-gradient-to-b from-yellow-50 to-orange-50 rounded-2xl p-4 border border-yellow-400 shadow-lg transform scale-105">
        <div class="text-4xl mb-2">👑</div>
        <p class="font-bold text-gray-800">Trần Thị B</p>
        <p class="text-sm text-gray-500">1,456 điểm</p>
      </div>
      <div class="text-center bg-gradient-to-b from-yellow-50 to-orange-50 rounded-2xl p-4 border border-yellow-200">
        <div class="text-3xl mb-2">🥉</div>
        <p class="font-bold text-gray-800">Lê Văn C</p>
        <p class="text-sm text-gray-500">1,120 điểm</p>
      </div>
    </div>

    <!-- Ranking List -->
    <div class="space-y-2">
      <div v-for="(user, index) in rankings" :key="index" class="flex items-center justify-between p-3 bg-white/50 rounded-xl hover:bg-white/70 transition-all">
        <div class="flex items-center space-x-3">
          <span class="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 font-bold text-sm">{{ index + 4 }}</span>
          <span class="font-medium text-gray-700">{{ user.name }}</span>
        </div>
        <span class="text-sm font-medium text-gray-600">{{ user.points }} điểm</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RankingTab',
  data() {
    return {
      rankings: [
        { name: 'Phạm Thị D', points: 980 },
        { name: 'Hoàng Văn E', points: 920 },
        { name: 'Ngô Thị F', points: 850 },
        { name: 'Đỗ Văn G', points: 780 },
        { name: 'Bùi Thị H', points: 720 }
      ]
    }
  }
}
</script>