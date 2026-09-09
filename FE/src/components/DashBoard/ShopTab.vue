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
        <img :src="getAvatarUrl(item.avatar)" :alt="item.name" class="w-20 h-20 rounded-full object-cover mb-3 shadow-md" />
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
            :disabled="item.owned || purchasing === item.id || userCoins < item.price"
            @click="purchaseItem(item)"
          >
            {{ item.owned ? 'Đã sở hữu' : purchasing === item.id ? 'Đang mua...' : userCoins >= item.price ? 'Mua ngay' : 'Chưa đủ xu' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ShopTab',
  props: {
    user: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      userCoins: 0,
      purchasing: null,
      ownedAvatars: [],
      shopItems: [
        { id: 'avatar-tom', avatar: '/image/Tom Aura в TikTok.jpg', name: 'Avatar Tom', description: 'Avatar cá nhân độc đáo cho hồ sơ của bạn', price: 300 },
        { id: 'avatar-clutch', avatar: '/image/IShowClutch florkofcows logo.jpg', name: 'Avatar Clutch', description: 'Avatar cá nhân độc đáo cho hồ sơ của bạn', price: 300 },
        { id: 'avatar-download', avatar: '/image/download.jpg', name: 'Avatar Classic', description: 'Avatar cá nhân độc đáo cho hồ sơ của bạn', price: 300 },
        { id: 'avatar-shin', avatar: '/image/Avata shin.jpg', name: 'Avatar Shin', description: 'Avatar cá nhân độc đáo cho hồ sơ của bạn', price: 300 }
      ]
    }
  },
  watch: {
    user: {
      immediate: true,
      deep: true,
      handler(user) {
        this.userCoins = Number(user?.coins || 0);
        this.ownedAvatars = user?.ownedAvatars || [];
        this.shopItems = this.shopItems.map((item) => ({
          ...item,
          owned: Boolean(item.avatar && this.ownedAvatars.includes(item.avatar))
        }));
      }
    }
  },
  methods: {
    getAvatarUrl(avatar) {
      return encodeURI(avatar);
    },

    async purchaseItem(item) {
      if (item.owned || this.userCoins < item.price || this.purchasing) return;
      if (!item.avatar) {
        this.userCoins -= item.price;
        this.$emit('update-user', { coins: this.userCoins });
        alert(`🎉 Bạn đã mua thành công "${item.name}"!`);
        return;
      }
      try {
        this.purchasing = item.id;
        const token = localStorage.getItem('token') || localStorage.getItem('access_token');
        const response = await axios.post('/api/auth/avatars/purchase', { avatar: item.avatar }, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = response.data.data;
        this.userCoins = data.coins;
        this.ownedAvatars = data.ownedAvatars;
        this.$emit('update-user', { coins: data.coins, ownedAvatars: data.ownedAvatars });
        alert(`🎉 Bạn đã mua thành công "${item.name}"!`);
      } catch (error) {
        alert(error.response?.data?.message || 'Không thể mua avatar!');
      } finally {
        this.purchasing = null;
      }
    }
  }
}
</script>