<!-- src/components/Auth/ForgotPassword.vue -->
<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
    <div class="fixed inset-0 pointer-events-none overflow-hidden">
      <div class="absolute -top-40 -right-40 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div class="absolute -bottom-40 -left-40 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
    </div>

    <Header />

    <section class="relative z-10 flex items-center justify-center min-h-[calc(100vh-80px)] py-12">
      <div class="container mx-auto px-4 max-w-2xl">
        <div class="auth-panel overflow-hidden rounded-[24px] border border-white/60 bg-white/45 shadow-[0_40px_80px_rgba(99,102,241,0.12)] backdrop-blur-2xl p-8">
          <div class="text-center mb-6">
            <div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-[20px] bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 shadow-[0_20px_40px_rgba(99,102,241,0.18)]">
              <svg class="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12v1a4 4 0 01-4 4H8"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 11a4 4 0 10-8 0v1"/>
              </svg>
            </div>
            <h2 class="text-2xl font-black text-slate-800">Quên mật khẩu</h2>
            <p class="mt-2 text-sm text-slate-500">Nhập email để nhận mã xác thực và đổi mật khẩu</p>
          </div>

          <!-- BƯỚC 1: NHẬP EMAIL -->
          <div v-if="step === 1">
            <form @submit.prevent="sendCode" class="space-y-4">
              <div class="space-y-2">
                <label class="block text-sm font-semibold text-slate-700">Email</label>
                <div class="field-shell">
                  <span class="field-icon">
                    <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                  </span>
                  <input 
                    v-model.trim="email" 
                    type="email" 
                    placeholder="nhap@email.com" 
                    class="field-input" 
                    required 
                    :disabled="loading"
                  />
                </div>
              </div>

              <div class="flex items-center justify-between">
                <div class="text-sm text-slate-600">Bạn sẽ nhận mã OTP qua email</div>
                <router-link to="/login" class="text-sm font-semibold text-indigo-600 hover:text-indigo-700">Đăng nhập</router-link>
              </div>

              <div class="pt-2">
                <button 
                  :disabled="loading || !email" 
                  type="submit" 
                  class="submit-btn w-full rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 px-6 py-3 text-base font-bold text-white shadow-md hover:scale-[1.01] transition-all disabled:opacity-50 disabled:hover:scale-100"
                >
                  <span v-if="!loading">Gửi mã đến email</span>
                  <span v-else>Đang gửi mã...</span>
                </button>
              </div>

              <p v-if="message" class="text-sm mt-2 text-green-600">{{ message }}</p>
              <p v-if="error" class="text-sm mt-2 text-red-600">{{ error }}</p>
            </form>
          </div>

          <!-- BƯỚC 2: NHẬP OTP VÀ MẬT KHẨU MỚI -->
          <div v-else-if="step === 2">
            <form @submit.prevent="resetPassword" class="space-y-4">
              <div class="space-y-2">
                <label class="block text-sm font-semibold text-slate-700">Mã xác thực (6 số)</label>
                <div class="field-shell">
                  <input 
                    v-model.trim="code" 
                    type="text" 
                    maxlength="6"
                    placeholder="Nhập mã 6 chữ số" 
                    class="field-input" 
                    required 
                    :disabled="loading"
                  />
                </div>
              </div>

              <div class="space-y-2">
                <label class="block text-sm font-semibold text-slate-700">Mật khẩu mới</label>
                <div class="field-shell">
                  <input 
                    v-model="newPassword" 
                    type="password" 
                    placeholder="Tối thiểu 6 ký tự" 
                    class="field-input" 
                    required 
                    :disabled="loading"
                  />
                </div>
              </div>

              <div class="space-y-2">
                <label class="block text-sm font-semibold text-slate-700">Xác nhận mật khẩu mới</label>
                <div class="field-shell">
                  <input 
                    v-model="confirmPassword" 
                    type="password" 
                    placeholder="Nhập lại mật khẩu mới" 
                    class="field-input" 
                    required 
                    :disabled="loading"
                  />
                </div>
              </div>

              <div class="flex items-center justify-between">
                <div class="text-sm text-slate-600">
                  Mã hết hạn sau: <span class="font-bold text-indigo-600">{{ remaining }}s</span>
                </div>
                <button 
                  type="button" 
                  :disabled="resendDisabled || loading" 
                  @click="resendCode" 
                  class="text-sm font-semibold text-indigo-600 hover:text-indigo-700 disabled:text-slate-400 disabled:cursor-not-allowed"
                >
                  {{ resendDisabled ? `Gửi lại (${remaining}s)` : 'Gửi lại mã' }}
                </button>
              </div>

              <div class="pt-2">
                <button 
                  :disabled="loading" 
                  type="submit" 
                  class="submit-btn w-full rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 px-6 py-3 text-base font-bold text-white shadow-md hover:scale-[1.01] transition-all disabled:opacity-50 disabled:hover:scale-100"
                >
                  <span v-if="!loading">Đặt lại mật khẩu</span>
                  <span v-else>Đang xử lý...</span>
                </button>
              </div>

              <p v-if="message" class="text-sm mt-2 text-green-600">{{ message }}</p>
              <p v-if="error" class="text-sm mt-2 text-red-600">{{ error }}</p>
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

// Lấy biến URL từ Vite hoặc gán mặc định 
const API_BASE_URL = import.meta.env?.VITE_API_URL || ''

export default {
  name: 'ForgotPassword',
  components: { Header },
  data() {
    return {
      step: 1,
      email: '',
      code: '',
      newPassword: '',
      confirmPassword: '',
      loading: false,
      message: '',
      error: '',
      remaining: 0,
      timerId: null,
      resendDisabled: false
    }
  },
  methods: {
    // 1. GỬI MÃ OTP LẦN ĐẦU
    async sendCode() {
      this.error = ''
      this.message = ''

      if (!this.email) {
        this.error = 'Vui lòng nhập địa chỉ email.'
        return
      }

      this.loading = true
      try {
        const res = await fetch(`${API_BASE_URL}/api/auth/forgot-password`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: this.email })
        })

        const data = await res.json()
        if (!res.ok) {
          throw new Error(data.message || 'Không thể gửi mã xác nhận. Vui lòng thử lại.')
        }

        this.message = data.message || 'Mã xác thực đã được gửi tới email của bạn.'
        this.step = 2
        this.startTimer(120) // Đếm ngược 120 giây (khớp hạn OTP backend)
      } catch (err) {
        this.error = err.message || 'Có lỗi xảy ra khi kết nối máy chủ.'
      } finally {
        this.loading = false
      }
    },

    // 2. BỘ ĐẾM NGƯỢC THỜI GIAN
    startTimer(seconds) {
      this.remaining = seconds
      this.resendDisabled = true
      
      if (this.timerId) clearInterval(this.timerId)
      
      this.timerId = setInterval(() => {
        if (this.remaining > 0) {
          this.remaining -= 1
        } else {
          this.stopTimer()
          this.resendDisabled = false
        }
      }, 1000)
    },

    stopTimer() {
      if (this.timerId) {
        clearInterval(this.timerId)
        this.timerId = null
      }
    },

    // 3. GỬI LẠI MÃ OTP
    async resendCode() {
      if (this.resendDisabled) return
      
      this.error = ''
      this.message = ''
      this.loading = true

      try {
        const res = await fetch(`${API_BASE_URL}/api/auth/forgot-password`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: this.email })
        })

        const data = await res.json()
        if (!res.ok) {
          throw new Error(data.message || 'Không thể gửi lại mã xác nhận.')
        }

        this.message = 'Đã gửi mã xác thực mới vào email!'
        this.startTimer(120)
      } catch (err) {
        this.error = err.message || 'Lỗi khi gửi lại mã.'
      } finally {
        this.loading = false
      }
    },

    // 4. XÁC THỰC VÀ ĐẶT LẠI MẬT KHẨU
    async resetPassword() {
      this.error = ''
      this.message = ''

      if (!this.code) {
        this.error = 'Vui lòng nhập mã xác thực 6 số.'
        return
      }
      if (!this.newPassword || this.newPassword.length < 6) {
        this.error = 'Mật khẩu mới phải chứa ít nhất 6 ký tự.'
        return
      }
      if (this.newPassword !== this.confirmPassword) {
        this.error = 'Mật khẩu xác nhận không khớp.'
        return
      }

      this.loading = true
      try {
        const res = await fetch(`${API_BASE_URL}/api/auth/reset-password`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: this.email,
            code: this.code,
            newPassword: this.newPassword
          })
        })

        const data = await res.json()
        if (!res.ok) {
          throw new Error(data.message || 'Đặt lại mật khẩu thất bại.')
        }

        this.message = 'Đặt lại mật khẩu thành công! Đang chuyển hướng đăng nhập...'
        this.stopTimer()
        
        setTimeout(() => {
          this.$router.push('/login')
        }, 1500)
      } catch (err) {
        this.error = err.message || 'Có lỗi xảy ra khi đặt lại mật khẩu.'
      } finally {
        this.loading = false
      }
    }
  },
  beforeUnmount() {
    this.stopTimer()
  }
}
</script>

<style scoped>
@import "@/assets/Auth/Login.css";

.auth-panel { 
  max-width: 720px; 
  margin: 0 auto; 
}
</style>