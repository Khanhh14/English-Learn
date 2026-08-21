<!-- src/components/Header.vue -->
<template>
  <nav class="relative z-10 bg-white/30 backdrop-blur-xl border-b border-white/30">
    <div class="container mx-auto px-4 py-4 max-w-6xl">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <router-link to="/" class="flex items-center space-x-3 group">
          <div class="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-105 transition-transform">
            <span class="text-2xl font-bold text-white">📚</span>
          </div>
          <div>
            <h1 class="text-2xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">LinguaFlow</h1>
            <p class="text-xs text-gray-500">Học tiếng Anh thông minh</p>
          </div>
        </router-link>

        <!-- Navigation Links - Desktop -->
        <div class="hidden md:flex items-center space-x-8">
          <router-link 
            to="/" 
            class="text-gray-600 hover:text-indigo-600 transition-colors font-medium"
            :class="{ 'text-indigo-600 font-bold border-b-2 border-indigo-600 pb-1': $route.path === '/' }"
          >
            Trang chủ
          </router-link>
          <router-link 
            to="/about" 
            class="text-gray-600 hover:text-indigo-600 transition-colors font-medium"
            :class="{ 'text-indigo-600 font-bold border-b-2 border-indigo-600 pb-1': $route.path === '/about' }"
          >
            Về chúng tôi
          </router-link>
          <a href="#" class="text-gray-600 hover:text-indigo-600 transition-colors font-medium">Lộ trình</a>
          
          <!-- Login Button -->
          <router-link 
            to="/login" 
            class="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-2.5 rounded-full font-bold hover:shadow-xl transition-all transform hover:scale-105 border border-white/20"
          >
            Đăng nhập
          </router-link>
        </div>

        <!-- Mobile Menu Button -->
        <button @click="toggleMobileMenu" class="md:hidden text-gray-600 text-2xl hover:text-indigo-600 transition-colors">
          <span v-if="!isMobileMenuOpen">☰</span>
          <span v-else>✕</span>
        </button>
      </div>

      <!-- Mobile Menu -->
      <div v-if="isMobileMenuOpen" class="md:hidden mt-4 pt-4 border-t border-white/30">
        <div class="flex flex-col space-y-3">
          <router-link 
            to="/" 
            class="text-gray-600 hover:text-indigo-600 transition-colors font-medium px-4 py-2 hover:bg-white/30 rounded-xl"
            :class="{ 'text-indigo-600 font-bold bg-white/30': $route.path === '/' }"
            @click="closeMobileMenu"
          >
            🏠 Trang chủ
          </router-link>
          <router-link 
            to="/about" 
            class="text-gray-600 hover:text-indigo-600 transition-colors font-medium px-4 py-2 hover:bg-white/30 rounded-xl"
            :class="{ 'text-indigo-600 font-bold bg-white/30': $route.path === '/about' }"
            @click="closeMobileMenu"
          >
            ℹ️ Về chúng tôi
          </router-link>
          <a href="#" class="text-gray-600 hover:text-indigo-600 transition-colors font-medium px-4 py-2 hover:bg-white/30 rounded-xl">🗺️ Lộ trình</a>
          
          <!-- Mobile Login Button -->
          <router-link 
            to="/login" 
            class="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-xl font-bold hover:shadow-xl transition-all text-center mx-4"
            @click="closeMobileMenu"
          >
            🔐 Đăng nhập
          </router-link>
          
          <!-- Mobile Register Link -->
          <router-link 
            to="/register" 
            class="text-center text-sm text-gray-600 hover:text-indigo-600 transition-colors py-2"
            @click="closeMobileMenu"
          >
            Chưa có tài khoản? <span class="font-bold text-indigo-600">Đăng ký</span>
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'AppHeader',
  data() {
    return {
      isMobileMenuOpen: false
    }
  },
  methods: {
    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen
    },
    closeMobileMenu() {
      this.isMobileMenuOpen = false
    }
  },
  watch: {
    $route() {
      this.closeMobileMenu()
    }
  }
}
</script>