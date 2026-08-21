<!-- src/components/Dashboard/PracticeTab.vue -->
<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-2xl font-bold text-gray-800">✍️ Luyện tập</h2>
      <span class="text-sm text-gray-500">Hoàn thành để nhận thêm điểm</span>
    </div>

    <div class="grid md:grid-cols-3 gap-4">
      <div class="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all cursor-pointer group">
        <div class="text-4xl mb-3">📝</div>
        <h3 class="text-lg font-bold text-gray-800 group-hover:text-indigo-600 transition-colors">Trắc nghiệm</h3>
        <p class="text-sm text-gray-500 mt-1">20 câu hỏi</p>
        <p class="text-sm text-gray-600 mt-2">Kiểm tra kiến thức của bạn</p>
        <div class="flex items-center justify-between mt-3">
          <span class="text-xs text-yellow-600">⭐ +50 điểm</span>
          <button class="text-sm text-indigo-600 font-medium hover:text-indigo-700 group-hover:underline">Bắt đầu →</button>
        </div>
      </div>

      <div class="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all cursor-pointer group">
        <div class="text-4xl mb-3">🎯</div>
        <h3 class="text-lg font-bold text-gray-800 group-hover:text-indigo-600 transition-colors">Ghép từ</h3>
        <p class="text-sm text-gray-500 mt-1">15 cặp từ</p>
        <p class="text-sm text-gray-600 mt-2">Nối từ với nghĩa phù hợp</p>
        <div class="flex items-center justify-between mt-3">
          <span class="text-xs text-yellow-600">⭐ +40 điểm</span>
          <button class="text-sm text-indigo-600 font-medium hover:text-indigo-700 group-hover:underline">Bắt đầu →</button>
        </div>
      </div>

      <div class="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all cursor-pointer group">
        <div class="text-4xl mb-3">🔊</div>
        <h3 class="text-lg font-bold text-gray-800 group-hover:text-indigo-600 transition-colors">Nghe và viết</h3>
        <p class="text-sm text-gray-500 mt-1">10 từ</p>
        <p class="text-sm text-gray-600 mt-2">Luyện kỹ năng nghe</p>
        <div class="flex items-center justify-between mt-3">
          <span class="text-xs text-yellow-600">⭐ +60 điểm</span>
          <button class="text-sm text-indigo-600 font-medium hover:text-indigo-700 group-hover:underline">Bắt đầu →</button>
        </div>
      </div>
    </div>

    <div class="mt-6 grid md:grid-cols-2 gap-4">
      <div class="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-4 border border-blue-100">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-500">Luyện tập hôm nay</p>
            <p class="text-2xl font-bold text-gray-800">15 phút</p>
          </div>
          <div class="text-3xl">⏱️</div>
        </div>
      </div>
      <div class="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-4 border border-purple-100">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-500">Điểm đạt được</p>
            <p class="text-2xl font-bold text-gray-800">+280</p>
          </div>
          <div class="text-3xl">⭐</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PracticeTab'
}
</script>