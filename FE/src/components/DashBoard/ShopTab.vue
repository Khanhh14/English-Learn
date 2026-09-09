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

    <!-- Hiển thị khi đang tải dữ liệu -->
    <div v-if="loading" class="text-center py-10 text-gray-500">
      Đang tải danh sách vật phẩm...
    </div>

    <!-- Danh sách vật phẩm lấy từ DB -->
    <div v-else class="grid md:grid-cols-3 gap-4">
      <div 
        v-for="item in shopItems" 
        :key="item.id" 
        class="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 hover:shadow-xl transition-all hover:-translate-y-1"
      >
        <img :src="getAvatarUrl(item.avatar)" :alt="item.name" class="w-20 h-20 rounded-full object-cover mb-3 shadow-md" />
        <h3 class="text-lg font-bold text-gray-800">{{ item.name }}</h3>
        <p class="text-sm text-gray-500 mt-1 h-12">{{ item.description }}</p>
        <div class="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
          <div class="flex items-center space-x-1">
            <span class="text-yellow-500">⭐</span>
            <span class="font-bold text-gray-700">{{ Number(item.price).toLocaleString() }}</span>
          </div>
          <button
            class="px-4 py-2 rounded-xl text-sm font-medium transition-all transform hover:scale-105"
            :class="item.owned 
              ? 'bg-emerald-100 text-emerald-600 border border-emerald-300 cursor-default' 
              : userCoins >= item.price 
                ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg hover:shadow-xl cursor-pointer' 
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
      loading: false,
      ownedAvatars: [],
      shopItems: [] // Dữ liệu động được tải về từ CSDL
    };
  },
  watch: {
    user: {
      immediate: true,
      deep: true,
      handler(newUser) {
        this.userCoins = Number(newUser?.coins || 0);
        this.ownedAvatars = newUser?.ownedAvatars || [];
        this.syncOwnedStatus();
      }
    }
  },
  mounted() {
    this.fetchShopItems();
  },
  methods: {
    async fetchShopItems() {
      this.loading = true;
      try {
        const response = await axios.get('/api/auth/avatars/shop');
        const items = response.data?.data || [];
        this.shopItems = items;
        this.syncOwnedStatus();
      } catch (error) {
        console.error('Không tải được danh sách avatar:', error);
      } finally {
        this.loading = false;
      }
    },

    syncOwnedStatus() {
      if (!this.shopItems.length) return;
      this.shopItems = this.shopItems.map((item) => ({
        ...item,
        owned: Boolean(item.avatar && this.ownedAvatars.includes(item.avatar))
      }));
    },

    getAvatarUrl(avatar) {
      return encodeURI(avatar);
    },

    async purchaseItem(item) {
      if (item.owned || this.userCoins < item.price || this.purchasing) return;
      
      try {
        this.purchasing = item.id;
        const token = localStorage.getItem('token') || localStorage.getItem('access_token');
        const response = await axios.post(
          '/api/auth/avatars/purchase', 
          { avatar: item.avatar }, 
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const data = response.data.data;
        this.userCoins = data.coins;
        this.ownedAvatars = data.ownedAvatars;
        this.syncOwnedStatus();

        this.$emit('update-user', { coins: data.coins, ownedAvatars: data.ownedAvatars });
        alert(`🎉 Mua thành công "${item.name}"!`);
      } catch (error) {
        alert(error.response?.data?.message || 'Không thể mua avatar!');
      } finally {
        this.purchasing = null;
      }
    }
  }
};
</script>