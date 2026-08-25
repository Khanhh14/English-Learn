<!-- src/components/Auth/Login.vue -->
<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
    <div class="fixed inset-0 pointer-events-none overflow-hidden">
      <div class="absolute -top-40 -right-40 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div class="absolute -bottom-40 -left-40 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
    </div>

    <Header />

    <section class="relative z-10 flex items-center justify-center min-h-[calc(100vh-80px)] py-12">
      <div class="container mx-auto px-4 max-w-5xl">
        <div class="auth-panel overflow-hidden rounded-[32px] border border-white/60 bg-white/45 shadow-[0_40px_120px_rgba(99,102,241,0.15)] backdrop-blur-2xl lg:grid lg:grid-cols-[1.05fr_1fr]">
          <div class="auth-hero hidden p-10 lg:flex lg:flex-col">
            <div class="hero-pill inline-flex w-fit items-center gap-2 rounded-full border border-white/50 bg-white/20 px-4 py-2 text-sm font-medium text-indigo-700 backdrop-blur-sm">
              <span>⭐</span>
              <span>Hơn 10,000+ học viên tin tưởng</span>
            </div>

            <div class="mt-10">
              <div class="mb-4 flex items-center gap-3">
                <span class="text-3xl">📚</span>
                <span class="text-2xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">LinguaFlow</span>
              </div>
              <h1 class="text-4xl font-black leading-tight text-slate-800">Tiếp tục hành trình<br>học tiếng Anh của bạn</h1>
              <p class="mt-4 max-w-md text-base leading-7 text-slate-600">
                Học qua từng bài ngắn, luyện tập thông minh và củng cố từ vựng theo nhịp độ riêng của bạn.
              </p>
            </div>

            <div class="mt-8 space-y-4">
              <!-- Lộ trình cá nhân hóa -->
              <div class="hero-item">
                <div class="hero-item-icon bg-indigo-500 text-white flex items-center justify-center">
                  <font-awesome-icon :icon="['fas', 'route']" />
                </div>
                <div>
                  <p class="font-semibold text-slate-800">Lộ trình cá nhân hóa</p>
                  <p class="text-sm text-slate-600">Khoá học được đề xuất theo trình độ hiện tại.</p>
                </div>
              </div>

              <!-- Ghi nhớ theo phương pháp AI -->
              <div class="hero-item">
                <div class="hero-item-icon bg-gradient-to-br from-purple-500 to-pink-500 text-white flex items-center justify-center">
                  <font-awesome-icon :icon="['fas', 'brain']" />
                </div>
                <div>
                  <p class="font-semibold text-slate-800">Ghi nhớ theo phương pháp AI</p>
                  <p class="text-sm text-slate-600">Ôn tập thông minh giúp bạn tiến bộ nhanh hơn.</p>
                </div>
              </div>
            </div>

            <div class="mt-auto pt-8">
              <div class="metric-card rounded-2xl border border-white/50 bg-white/25 p-5 backdrop-blur-xl shadow-lg">
                <div class="flex items-end justify-between">
                  <div>
                    <p class="text-3xl font-black text-slate-800">8,234+</p>
                    <p class="mt-1 text-sm text-slate-600">học viên đang học cùng bạn</p>
                  </div>
                  <div class="flex -space-x-2">
                    <span class="avatar-ring">A</span>
                    <span class="avatar-ring bg-gradient-to-br from-purple-400 to-pink-400">B</span>
                    <span class="avatar-ring bg-gradient-to-br from-pink-400 to-rose-400">C</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="relative p-6 sm:p-8 lg:p-10">
            <div class="mb-8 text-center">
              <div class="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-[24px] bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 shadow-[0_20px_40px_rgba(99,102,241,0.35)]">
                <svg class="h-10 w-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                </svg>
              </div>
              <h2 class="text-3xl font-black text-slate-800">Chào mừng trở lại</h2>
              <p class="mt-2 text-sm text-slate-500">Đăng nhập để tiếp tục hành trình học tập</p>
            </div>

            <form @submit.prevent="handleLogin" class="space-y-5">
              <div v-if="errorMessage" class="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl">
                {{ errorMessage }}
              </div>

              <div class="space-y-2">
                <label class="block text-sm font-semibold text-slate-700">Email</label>
                <div class="field-shell">
                  <span class="field-icon">
                    <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                  </span>
                  <input v-model="email" type="email" placeholder="nhap@email.com" class="field-input" required />
                </div>
              </div>

              <div class="space-y-2">
                <label class="block text-sm font-semibold text-slate-700">Mật khẩu</label>
                <div class="field-shell">
                  <span class="field-icon">
                    <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                    </svg>
                  </span>
                  <input v-model="password" :type="showPassword ? 'text' : 'password'" placeholder="••••••••" class="field-input pr-12" required />
                  <button type="button" @click="togglePasswordVisibility" class="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 transition-colors hover:text-slate-600">
                    <svg v-if="!showPassword" class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                    </svg>
                    <svg v-else class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
                    </svg>
                  </button>
                </div>
              </div>

              <div class="flex items-center justify-between gap-3 pt-1">
                <label for="remember" class="inline-flex cursor-pointer items-center gap-2 text-sm text-slate-600">
                  <input v-model="rememberMe" type="checkbox" id="remember" class="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                  Ghi nhớ đăng nhập
                </label>
                <router-link to="/forgot-password" class="text-sm font-semibold text-indigo-600 transition-colors hover:text-indigo-700 hover:underline">
                  Quên mật khẩu?
                </router-link>
              </div>

              <button 
                type="submit" 
                :disabled="isLoading"
                class="submit-btn mt-2 w-full rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 px-6 py-4 text-base font-bold text-white shadow-[0_20px_30px_rgba(124,58,237,0.35)] transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_24px_40px_rgba(124,58,237,0.45)] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {{ isLoading ? 'Đang xử lý...' : 'Đăng nhập' }}
              </button>

              <div class="relative my-5">
                <div class="absolute inset-0 flex items-center">
                  <div class="w-full border-t border-slate-200"></div>
                </div>
                <div class="relative flex justify-center">
                  <span class="bg-white/60 px-3 text-xs font-medium uppercase tracking-[0.2em] text-slate-500">Hoặc</span>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-3">
                <button type="button" class="social-btn">
                  <svg class="h-5 w-5" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  <span>Google</span>
                </button>

                <button type="button" class="social-btn">
                  <svg class="h-5 w-5 text-sky-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
                  </svg>
                  <span>Twitter</span>
                </button>
              </div>

              <p class="pt-2 text-center text-sm text-slate-600">
                Chưa có tài khoản?
                <router-link to="/register" class="ml-1 font-semibold text-indigo-600 transition-colors hover:text-indigo-700 hover:underline">Đăng ký ngay</router-link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>

    <footer class="relative z-10 border-t border-white/30 bg-white/30 py-6 backdrop-blur-xl">
      <div class="container mx-auto px-4 text-center text-sm text-slate-500">
        <p>© 2026 LinguaFlow. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script>
import Header from '@/components/Home/Header.vue'

export default {
  name: 'LoginView',
  components: {
    Header
  },
  data() {
    return {
      email: '',
      password: '',
      rememberMe: true,
      showPassword: false,
      isLoading: false,
      errorMessage: ''
    }
  },
  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword
    },
    async handleLogin() {
      this.errorMessage = ''
      this.isLoading = true

      try {
        const response = await fetch('http://localhost:4000/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: this.email,
            password: this.password
          })
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.message || 'Email hoặc mật khẩu không chính xác!')
        }

        const rawUser = data.user || data.data?.user || data.data || {}

        const userObj = {
          id: rawUser.id,
          name: rawUser.name || rawUser.username || 'Người dùng',
          username: rawUser.username || '',
          email: rawUser.email || this.email,
          role: rawUser.role || 'user',
          streak: rawUser.streak || rawUser.streak_count || 0,
          level: rawUser.level || 1,
          points: rawUser.points || rawUser.xp || 0,
          totalWords: rawUser.totalWords || rawUser.total_words || 0,
          totalLessons: rawUser.totalLessons || rawUser.total_lessons || 0,
          joinDate: rawUser.joinDate || rawUser.created_at || rawUser.createdAt || new Date().toISOString()
        }

        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(userObj))

        // Toast XANH LÁ (Mặc định)
        this.$toast.success('Đăng nhập thành công!')

        const redirectPath = this.$route.query.redirect || '/dashboard'
        this.$router.push(redirectPath)
      } catch (err) {
        this.errorMessage = err.message || 'Không thể kết nối đến máy chủ!'
        // Toast ĐỎ (Mặc định)
        this.$toast.error(this.errorMessage)
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>

<style scoped>
@import "@/assets/Auth/Login.css";
</style>