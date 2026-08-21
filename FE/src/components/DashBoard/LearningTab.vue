<!-- src/components/Dashboard/LearningTab.vue -->
<template>
  <div>
    <h2 class="text-2xl font-bold text-gray-800 mb-4">📚 Tiếp tục học</h2>
    
    <div class="grid md:grid-cols-2 gap-4">
      <div class="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-100">
        <div class="flex items-start justify-between">
          <div>
            <p class="text-sm text-gray-500">Bài học hôm nay</p>
            <h3 class="text-xl font-bold text-gray-800 mt-1">Gia đình</h3>
            <p class="text-sm text-gray-600 mt-2">5 từ vựng cần học</p>
            <div class="mt-3 w-full bg-gray-200 rounded-full h-2 max-w-[200px]">
              <div class="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full" style="width: 60%"></div>
            </div>
            <p class="text-xs text-gray-500 mt-1">Tiến độ: 60%</p>
          </div>
          <button 
            @click="$emit('start-learning')"
            class="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
          >
            Học ngay
          </button>
        </div>
      </div>

      <div class="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
        <div class="flex items-start justify-between">
          <div>
            <p class="text-sm text-gray-500">Bài học tiếp theo</p>
            <h3 class="text-xl font-bold text-gray-800 mt-1">Màu sắc</h3>
            <p class="text-sm text-gray-600 mt-2">8 từ vựng cần học</p>
            <div class="mt-3 w-full bg-gray-200 rounded-full h-2 max-w-[200px]">
              <div class="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full" style="width: 20%"></div>
            </div>
            <p class="text-xs text-gray-500 mt-1">Tiến độ: 20%</p>
          </div>
          <button class="px-4 py-2 bg-white/70 backdrop-blur-sm text-gray-700 rounded-xl font-medium border border-gray-200 hover:bg-white transition-all">
            Chuẩn bị
          </button>
        </div>
      </div>
    </div>

    <div class="mt-6">
      <h3 class="text-lg font-bold text-gray-800 mb-3">Từ vựng đã học</h3>
      <div class="flex flex-wrap gap-2">
        <span class="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm">Family ✅</span>
        <span class="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm">Mother ✅</span>
        <span class="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm">Father ✅</span>
        <span class="px-3 py-1 bg-gray-100 text-gray-500 rounded-full text-sm">Sister</span>
        <span class="px-3 py-1 bg-gray-100 text-gray-500 rounded-full text-sm">Brother</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LearningTab',
  emits: ['start-learning']
}
</script>