<!-- src/components/Dashboard/ShopTab.vue -->
<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-2xl font-bold text-gray-800">🛒 Cửa hàng</h2>
      <div class="flex items-center space-x-2 bg-yellow-50 px-4 py-2 rounded-full border border-yellow-200">
        <span class="text-yellow-500">⭐</span>
        <span class="font-bold text-gray-700">{{ userCoins.toLocaleString() }} xu</span>
      </div>
    </div>

    <div class="grid md:grid-cols-3 gap-4">
      <div v-for="item in shopItems" :key="item.id" 
        class="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 hover:shadow-xl transition-all hover:-translate-y-1">
        <div class="text-4xl mb-3">{{ item.icon }}</div>
        <h3 class="text-lg font-bold text-gray-800">{{ item.name }}</h3>
        <p class="text-sm text-gray-500 mt-1 h-12">{{ item.description }}</p>
        <div class="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
          <div class="flex items-center space-x-1">
            <span class="text-yellow-500">⭐</span>
            <span class="font-bold text-gray-700">{{ item.price.toLocaleString() }}</span>
          </div>
          <button 
            class="px-4 py-2 rounded-xl text-sm font-medium transition-all transform hover:scale-105"
            :class="userCoins >= item.price 
              ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg hover:shadow-xl' 
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'"
            :disabled="userCoins < item.price"
            @click="purchaseItem(item)"
          >
            {{ userCoins >= item.price ? 'Mua ngay' : 'Chưa đủ xu' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShopTab',
  data() {
    return {
      userCoins: 1284,
      shopItems: [
        { id: 1, icon: '🎨', name: 'Chủ đề màu sắc', description: 'Mở khóa chủ đề học mới với hình ảnh sinh động', price: 200 },
        { id: 2, icon: '🌟', name: 'Huy hiệu VIP', description: 'Huy hiệu đặc biệt cho thành viên tích cực', price: 500 },
        { id: 3, icon: '📖', name: 'Từ điển nâng cao', description: 'Mở khóa 500 từ vựng kèm ví dụ chi tiết', price: 300 },
        { id: 4, icon: '🎵', name: 'Bài hát tiếng Anh', description: 'Học tiếng Anh qua những bài hát yêu thích', price: 150 },
        { id: 5, icon: '🎯', name: 'Thử thách hàng tuần', description: 'Mở khóa thử thách đặc biệt với phần thưởng lớn', price: 100 },
        { id: 6, icon: '👑', name: 'Gói cao cấp', description: 'Tất cả tính năng đặc biệt trong 1 tháng', price: 1000 }
      ]
    }
  },
  methods: {
    purchaseItem(item) {
      if (this.userCoins >= item.price) {
        this.userCoins -= item.price
        alert(`🎉 Bạn đã mua thành công "${item.name}"!`)
      }
    }
  }
}
</script>