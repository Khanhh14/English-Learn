<!-- src/components/Auth/Register.vue -->
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
            <div class="hero-pill inline-flex w-fit items-center gap-2 rounded-full border border-white/50 bg-white/20 px-4 py-2 text-sm font-medium text-emerald-700 backdrop-blur-sm">
              <span>⭐</span>
              <span>Bắt đầu miễn phí ngay hôm nay</span>
            </div>

            <div class="mt-10">
              <div class="mb-4 flex items-center gap-3">
                <span class="text-3xl">📚</span>
                <span class="text-2xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">LinguaFlow</span>
              </div>
              <h1 class="text-4xl font-black leading-tight text-slate-800">Tạo tài khoản<br>để bắt đầu học</h1>
              <p class="mt-4 max-w-md text-base leading-7 text-slate-600">
                Học tiếng Anh hiệu quả hơn với lộ trình cá nhân hóa, bài tập tương tác và hệ thống nhắc nhở thông minh.
              </p>
            </div>

            <div class="mt-8 space-y-4">
              <!-- Mục 1: Icon cuốn sách (book-open) -->
              <div class="hero-item">
                <div class="hero-item-icon bg-gradient-to-br from-emerald-500 to-teal-500 text-white flex items-center justify-center">
                  <font-awesome-icon :icon="['fas', 'book-open']" />
                </div>
                <div>
                  <p class="font-semibold text-slate-800">Tạo nền tảng học vững chắc</p>
                  <p class="text-sm text-slate-600">Khoá học và nhận gợi ý phù hợp ngay từ đầu.</p>
                </div>
              </div>

              <!-- Mục 2: Icon cầu thang (stairs) -->
              <div class="hero-item">
                <div class="hero-item-icon bg-gradient-to-br from-violet-500 to-pink-500 text-white flex items-center justify-center">
                  <font-awesome-icon :icon="['fas', 'stairs']" />
                </div>
                <div>
                  <p class="font-semibold text-slate-800">Học từng bước dễ dàng</p>
                  <p class="text-sm text-slate-600">Những bài học ngắn gọn, dễ tiếp cận và cực kỳ hiệu quả.</p>
                </div>
              </div>
            </div>

            <div class="mt-auto pt-8">
              <div class="metric-card rounded-2xl border border-white/50 bg-white/25 p-5 backdrop-blur-xl shadow-lg">
                <div class="flex items-end justify-between gap-4">
                  <div>
                    <p class="text-3xl font-black text-slate-800">92%</p>
                    <p class="mt-1 text-sm text-slate-600">người dùng cảm thấy tiến bộ rõ rệt sau 4 tuần</p>
                  </div>
                  <div class="flex -space-x-2">
                    <span class="avatar-ring">A</span>
                    <span class="avatar-ring bg-gradient-to-br from-emerald-400 to-teal-400">B</span>
                    <span class="avatar-ring bg-gradient-to-br from-violet-400 to-pink-400">C</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="relative p-6 sm:p-8 lg:p-10">
            <div class="mb-8 text-center">
              <div class="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-[24px] bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 shadow-[0_20px_40px_rgba(16,185,129,0.35)]">
                <svg class="h-10 w-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/>
                </svg>
              </div>
              <h2 class="text-3xl font-black text-slate-800">Tạo tài khoản</h2>
              <p class="mt-2 text-sm text-slate-500">Bắt đầu hành trình học tiếng Anh của bạn</p>
            </div>

            <!-- Thông báo lỗi hiển thị inline nếu có -->
            <div v-if="errorMessage" class="mb-4 rounded-xl bg-rose-50 border border-rose-200 p-3 text-sm text-rose-600 text-center">
              {{ errorMessage }}
            </div>

            <form @submit.prevent="handleRegister" class="space-y-5">
              <div class="space-y-2">
                <label class="block text-sm font-semibold text-slate-700">Họ và tên</label>
                <div class="field-shell">
                  <span class="field-icon">
                    <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                    </svg>
                  </span>
                  <input v-model="fullName" type="text" placeholder="Nguyễn Văn A" class="field-input" required />
                </div>
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

              <!-- Ô MẬT KHẨU -->
              <div class="space-y-2">
                <label class="block text-sm font-semibold text-slate-700">Mật khẩu</label>
                <div class="field-shell">
                  <span class="field-icon">
                    <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                    </svg>
                  </span>
                  <input v-model="password" :type="showPassword ? 'text' : 'password'" placeholder="Tối thiểu 8 ký tự" class="field-input pr-12" required minlength="8" />
                  <button type="button" @click="showPassword = !showPassword" class="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 transition-colors hover:text-slate-600">
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

              <!-- Ô XÁC NHẬN MẬT KHẨU -->
              <div class="space-y-2">
                <label class="block text-sm font-semibold text-slate-700">Xác nhận mật khẩu</label>
                <div class="field-shell">
                  <span class="field-icon">
                    <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                    </svg>
                  </span>
                  <input v-model="confirmPassword" :type="showConfirmPassword ? 'text' : 'password'" placeholder="Nhập lại mật khẩu" class="field-input pr-12" required />
                  <button type="button" @click="showConfirmPassword = !showConfirmPassword" class="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 transition-colors hover:text-slate-600">
                    <svg v-if="!showConfirmPassword" class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                    </svg>
                    <svg v-else class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
                    </svg>
                  </button>
                </div>
              </div>

              <div class="pt-2">
                <label for="terms" class="inline-flex cursor-pointer items-start gap-3 text-sm leading-6 text-slate-600">
                  <input v-model="agreeTerms" type="checkbox" id="terms" class="mt-1 h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" required />
                  <span>
                    Tôi đồng ý với
                    <button type="button" @click="openTermsModal" class="font-semibold text-indigo-600 transition-colors hover:text-indigo-700 hover:underline focus:outline-none">Điều khoản dịch vụ</button>
                    và
                    <button type="button" @click="openPrivacyModal" class="font-semibold text-indigo-600 transition-colors hover:text-indigo-700 hover:underline focus:outline-none">Chính sách bảo mật</button>
                  </span>
                </label>
              </div>

              <button 
                type="submit" 
                :disabled="isLoading" 
                class="submit-btn mt-2 w-full rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 px-6 py-4 text-base font-bold text-white shadow-[0_20px_35px_rgba(16,185,129,0.35)] transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_24px_40px_rgba(16,185,129,0.45)] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                <span v-if="isLoading">Đang xử lý...</span>
                <span v-else>Đăng ký</span>
              </button>

              <p class="pt-2 text-center text-sm text-slate-600">
                Đã có tài khoản?
                <router-link to="/login" class="ml-1 font-semibold text-indigo-600 transition-colors hover:text-indigo-700 hover:underline">Đăng nhập</router-link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>

    <TermsOfService :is-open="showTermsOfService" @close="closeTermsModal" />
    <PrivacyPolicy :is-open="showPrivacyPolicy" @close="closePrivacyModal" />

    <footer class="relative z-10 border-t border-white/30 bg-white/30 py-6 backdrop-blur-xl">
      <div class="container mx-auto px-4 text-center text-sm text-slate-500">
        <p>© 2026 LinguaFlow. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script>
import Header from '@/components/Home/Header.vue'
import TermsOfService from '@/components/Auth/TermsOfService.vue'
import PrivacyPolicy from '@/components/Auth/PrivacyPolicy.vue'

export default {
  name: 'RegisterView',
  components: {
    Header,
    TermsOfService,
    PrivacyPolicy
  },
  data() {
    return {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      agreeTerms: false,
      showPassword: false,
      showConfirmPassword: false,
      showTermsOfService: false,
      showPrivacyPolicy: false,
      isLoading: false,
      errorMessage: ''
    }
  },
  methods: {
    openTermsModal() {
      this.showTermsOfService = true
    },
    closeTermsModal() {
      this.showTermsOfService = false
    },
    openPrivacyModal() {
      this.showPrivacyPolicy = true
    },
    closePrivacyModal() {
      this.showPrivacyPolicy = false
    },
    async handleRegister() {
      this.errorMessage = ''

      if (this.password !== this.confirmPassword) {
        this.errorMessage = 'Mật khẩu xác nhận không khớp!'
        this.$toast.error(this.errorMessage)
        return
      }

      if (!this.agreeTerms) {
        this.errorMessage = 'Vui lòng đồng ý với điều khoản & chính sách!'
        this.$toast.warning(this.errorMessage)
        return
      }

      this.isLoading = true

      try {
        const response = await fetch('/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: this.fullName,
            email: this.email,
            password: this.password
          })
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.message || 'Đăng ký thất bại, vui lòng thử lại!')
        }

        // Toast thông báo thành công
        this.$toast.success(data.message || 'Đăng ký tài khoản thành công!')
        
        // Điều hướng sang trang đăng nhập
        this.$router.push('/login')
      } catch (error) {
        this.errorMessage = error.message || 'Không thể kết nối đến máy chủ!'
        // Toast thông báo lỗi
        this.$toast.error(this.errorMessage)
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>

<style scoped>
@import "@/assets/Auth/Register.css";
</style>