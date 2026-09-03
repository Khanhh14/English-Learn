<!-- src/components/Header.vue -->
<template>
  <nav class="relative z-50 bg-white/40 backdrop-blur-xl border-b border-white/40 sticky top-0">
    <div class="container mx-auto px-4 py-3.5 max-w-6xl">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <router-link to="/" class="flex items-center space-x-3 group">
          <div class="w-11 h-11 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
            <span class="text-xl">📚</span>
          </div>
          <div>
            <h1 class="text-xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              LinguaFlow
            </h1>
            <p class="text-[11px] font-semibold text-slate-400">Học tiếng Anh thông minh</p>
          </div>
        </router-link>

        <!-- Navigation Links - Desktop -->
        <div class="hidden md:flex items-center space-x-7">
          <router-link 
            to="/" 
            class="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors"
            :class="{ 'text-indigo-600 font-bold border-b-2 border-indigo-600 pb-0.5': $route.path === '/' && !$route.hash }"
          >
            Trang chủ
          </router-link>
          
          <router-link 
            to="/about" 
            class="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors"
            :class="{ 'text-indigo-600 font-bold border-b-2 border-indigo-600 pb-0.5': $route.path === '/about' }"
          >
            Về chúng tôi
          </router-link>

          <!-- Nút Lộ trình Desktop -->
          <button 
            type="button"
            @click="navigateToRoadmap" 
            class="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors cursor-pointer"
          >
            Lộ trình
          </button>
          
          <!-- STATE: ĐÃ ĐĂNG NHẬP -->
          <div v-if="isLoggedIn" class="relative">
            <button 
              @click.stop="toggleUserDropdown" 
              class="flex items-center gap-2.5 rounded-full border border-white/80 bg-white/80 py-1.5 pl-1.5 pr-3 shadow-md backdrop-blur-md transition-all hover:bg-white hover:shadow-lg active:scale-95"
            >
              <!-- Avatar Circle -->
              <div class="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 text-xs font-black text-white shadow-sm ring-2 ring-indigo-100">
                {{ userInitials }}
              </div>
              
              <!-- Name -->
              <span class="max-w-[110px] truncate text-xs font-extrabold text-slate-700">{{ userDisplayName }}</span>
              
              <!-- Chevron -->
              <div class="flex h-5 w-5 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                <svg class="h-3 w-3 transition-transform duration-200" :class="{ 'rotate-180': isUserDropdownOpen }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </button>

            <!-- Floating Card Menu -->
            <transition
              enter-active-class="transition duration-200 ease-out"
              enter-from-class="transform scale-95 opacity-0 translate-y-2"
              enter-to-class="transform scale-100 opacity-100 translate-y-0"
              leave-active-class="transition duration-150 ease-in"
              leave-from-class="transform scale-100 opacity-100 translate-y-0"
              leave-to-class="transform scale-95 opacity-0 translate-y-2"
            >
              <div 
                v-if="isUserDropdownOpen" 
                class="absolute right-0 mt-3 w-60 rounded-3xl border border-white/80 bg-white/95 p-3.5 shadow-2xl shadow-indigo-500/10 backdrop-blur-2xl ring-1 ring-slate-900/5"
              >
                <!-- Compact User Card -->
                <div class="mb-3 flex items-center gap-3 px-1">
                  <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-600 font-black text-white text-sm shadow-md">
                    {{ userInitials }}
                  </div>
                  <div class="min-w-0 flex-1">
                    <h4 class="truncate text-xs font-black text-slate-800">{{ userDisplayName }}</h4>
                    <span class="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-600">
                      <span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span> Online
                    </span>
                  </div>
                </div>

                <div class="space-y-1">
                  <!-- Nút Xem thông tin cá nhân -->
                  <router-link 
                    :to="{ path: '/dashboard', query: { tab: 'profile' } }"
                    @click="closeUserDropdown"
                    class="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-extrabold text-slate-700 transition hover:bg-indigo-50 hover:text-indigo-600"
                  >
                    <span class="text-base">👤</span>
                    <span>Xem thông tin cá nhân</span>
                  </router-link>

                  <!-- Nút Đăng xuất -->
                  <button 
                    @click="handleLogout" 
                    class="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-extrabold text-rose-600 transition hover:bg-rose-50"
                  >
                    <span class="text-base">🚪</span>
                    <span>Đăng xuất</span>
                  </button>
                </div>
              </div>
            </transition>
          </div>

          <!-- STATE: CHƯA ĐĂNG NHẬP -->
          <router-link 
            v-else
            to="/login" 
            class="rounded-full border border-white/20 bg-gradient-to-r from-indigo-500 to-purple-500 px-6 py-2.5 text-xs font-bold text-white shadow-md transition-all hover:scale-105 hover:shadow-lg"
          >
            Đăng nhập
          </router-link>
        </div>

        <!-- Mobile Menu Toggle Button -->
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
            :class="{ 'text-indigo-600 font-bold bg-white/30': $route.path === '/' && !$route.hash }"
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

          <!-- Nút Lộ trình Mobile -->
          <button 
            type="button"
            @click="navigateToRoadmap" 
            class="text-left text-gray-600 hover:text-indigo-600 transition-colors font-medium px-4 py-2 hover:bg-white/30 rounded-xl cursor-pointer"
          >
            🗺️ Lộ trình
          </button>
          
          <!-- Mobile Logged In State -->
          <template v-if="isLoggedIn">
            <div class="flex items-center gap-3 px-4 py-3 bg-white/60 backdrop-blur-md rounded-2xl border border-white/50 mx-4">
              <div class="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 font-black text-white text-xs">
                {{ userInitials }}
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-xs font-bold text-gray-800 truncate">{{ userDisplayName }}</p>
                <p class="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                  <span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span> Online
                </p>
              </div>
            </div>
            
            <router-link 
              :to="{ path: '/dashboard', query: { tab: 'profile' } }"
              class="block font-bold text-slate-700 px-4 py-2 hover:bg-white/30 rounded-xl mx-4 text-xs"
              @click="closeMobileMenu"
            >
              👤 Xem thông tin cá nhân
            </router-link>

            <button 
              @click="handleLogout" 
              class="w-full text-left font-bold text-rose-600 px-4 py-2 hover:bg-white/30 rounded-xl mx-4 text-xs"
            >
              🚪 Đăng xuất
            </button>
          </template>

          <!-- Mobile Guest State -->
          <template v-else>
            <router-link 
              to="/login" 
              class="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-xl font-bold hover:shadow-xl transition-all text-center mx-4"
              @click="closeMobileMenu"
            >
              🔐 Đăng nhập
            </router-link>
            <router-link 
              to="/register" 
              class="text-center text-sm text-gray-600 hover:text-indigo-600 transition-colors py-2"
              @click="closeMobileMenu"
            >
              Chưa có tài khoản? <span class="font-bold text-indigo-600">Đăng ký</span>
            </router-link>
          </template>
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
      isMobileMenuOpen: false,
      isUserDropdownOpen: false,
      isLoggedIn: false,
      currentUser: null
    };
  },
  computed: {
    userDisplayName() {
      if (!this.currentUser) return 'Tài khoản';
      return this.currentUser.name || this.currentUser.username || this.currentUser.email?.split('@')[0] || 'Tài khoản';
    },
    userInitials() {
      const name = this.userDisplayName;
      return name.charAt(0).toUpperCase() || 'U';
    }
  },
  mounted() {
    this.checkAuthStatus();
    window.addEventListener('click', this.closeUserDropdown);
  },
  beforeUnmount() {
    window.removeEventListener('click', this.closeUserDropdown);
  },
  methods: {
    checkAuthStatus() {
      const token = localStorage.getItem('token') || localStorage.getItem('access_token') || sessionStorage.getItem('token');
      const userStr = localStorage.getItem('user') || sessionStorage.getItem('user');

      if (token || userStr) {
        this.isLoggedIn = true;
        try {
          this.currentUser = userStr ? JSON.parse(userStr) : null;
        } catch {
          this.currentUser = null;
        }
      } else {
        this.isLoggedIn = false;
        this.currentUser = null;
      }
    },
    navigateToRoadmap() {
      this.closeMobileMenu();

      if (this.$route.path === '/') {
        const element = document.getElementById('roadmap');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      } else {
        this.$router.push('/#roadmap').then(() => {
          this.$nextTick(() => {
            const element = document.getElementById('roadmap');
            if (element) {
              element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          });
        });
      }
    },
    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen;
    },
    closeMobileMenu() {
      this.isMobileMenuOpen = false;
    },
    toggleUserDropdown() {
      this.isUserDropdownOpen = !this.isUserDropdownOpen;
    },
    closeUserDropdown() {
      this.isUserDropdownOpen = false;
    },
    handleLogout() {
      localStorage.removeItem('token');
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
      sessionStorage.clear();

      this.isLoggedIn = false;
      this.currentUser = null;
      this.closeUserDropdown();
      this.closeMobileMenu();

      if (this.$router) {
        this.$router.push('/login');
      } else {
        window.location.href = '/login';
      }
    }
  },
  watch: {
    $route() {
      this.closeMobileMenu();
      this.closeUserDropdown();
      this.checkAuthStatus();
    }
  }
};
</script>