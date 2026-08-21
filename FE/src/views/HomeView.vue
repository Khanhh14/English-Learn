<!-- src/views/HomeView.vue -->
<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
    <!-- Animated Background -->
    <div class="fixed inset-0 pointer-events-none overflow-hidden">
      <div class="absolute -top-40 -right-40 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div class="absolute -bottom-40 -left-40 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
    </div>

    <!-- Header Component -->
    <Header />

    <!-- Hero Section -->
    <section class="relative z-10 pt-16 pb-20">
      <div class="container mx-auto px-4 max-w-6xl">
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <!-- Left Content -->
          <div class="space-y-8">
            <div class="inline-flex items-center space-x-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-white/50 shadow-lg">
              <span class="text-yellow-500">⭐</span>
              <span class="text-sm font-medium text-gray-700">Hơn 10,000+ học viên tin tưởng</span>
            </div>
            
            <h1 class="text-5xl md:text-6xl font-bold leading-tight">
              <span class="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Học tiếng Anh</span>
              <br>
              <span class="text-gray-800">dễ dàng hơn bao giờ hết</span>
            </h1>
            
            <p class="text-lg text-gray-600 leading-relaxed">
              Phương pháp học từ vựng thông minh với công nghệ AI, giúp bạn ghi nhớ nhanh gấp 3 lần. 
              Bắt đầu hành trình chinh phục tiếng Anh của bạn ngay hôm nay!
            </p>

            <div class="flex flex-wrap gap-4">
              <button @click="navigateToLearning" class="group bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all transform hover:scale-105 flex items-center space-x-3 relative overflow-hidden">
                <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                <span>🚀</span>
                <span>Học ngay</span>
                <span class="group-hover:translate-x-1 transition-transform">→</span>
              </button>
              <button @click="scrollToRoadmap" class="bg-white/70 backdrop-blur-xl text-gray-700 px-8 py-4 rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 flex items-center space-x-3 border-2 border-white/50 hover:border-indigo-200">
                <span>🗺️</span>
                <span>Xem lộ trình</span>
              </button>
            </div>

            <div class="flex items-center space-x-8 pt-4">
              <div class="flex -space-x-3">
                <div class="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 border-2 border-white flex items-center justify-center text-white font-bold text-sm">A</div>
                <div class="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 border-2 border-white flex items-center justify-center text-white font-bold text-sm">B</div>
                <div class="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-rose-400 border-2 border-white flex items-center justify-center text-white font-bold text-sm">C</div>
                <div class="w-10 h-10 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-gray-500 text-sm">+8K</div>
              </div>
              <div>
                <p class="text-sm font-bold text-gray-800">8,234 học viên</p>
                <p class="text-xs text-gray-500">đang học cùng bạn</p>
              </div>
            </div>
          </div>

          <!-- Right Content - Hero Image/Animation -->
          <div class="relative">
            <div class="relative bg-white/40 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50">
              <!-- Floating Elements -->
              <div class="absolute -top-6 -right-6 w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-2xl flex items-center justify-center text-3xl shadow-xl animate-float">
                ⭐
              </div>
              <div class="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-400 rounded-2xl flex items-center justify-center text-2xl shadow-xl animate-float animation-delay-1000">
                🎯
              </div>
              <div class="absolute top-1/2 -right-8 w-14 h-14 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full flex items-center justify-center text-xl shadow-xl animate-float animation-delay-2000">
                💡
              </div>

              <!-- Mock Learning Interface -->
              <div class="space-y-6">
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-2">
                    <div class="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div class="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div class="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                  <span class="text-xs text-gray-500">Lesson 2/10</span>
                </div>

                <div class="bg-white/60 backdrop-blur-sm rounded-2xl p-6 space-y-4">
                  <div class="flex items-center justify-between">
                    <span class="text-sm font-medium text-gray-600">Từ vựng hôm nay</span>
                    <span class="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">75%</span>
                  </div>
                  <div class="w-full bg-gray-200 rounded-full h-2">
                    <div class="bg-gradient-to-r from-indigo-400 to-purple-400 h-2 rounded-full" style="width: 75%"></div>
                  </div>
                  <div class="grid grid-cols-2 gap-3">
                    <div class="bg-white rounded-xl p-3 shadow-sm">
                      <p class="font-bold text-gray-800">Beautiful</p>
                      <p class="text-xs text-gray-500">/ˈbjuːtɪfl/</p>
                      <p class="text-xs text-gray-600 mt-1">Đẹp</p>
                    </div>
                    <div class="bg-white rounded-xl p-3 shadow-sm">
                      <p class="font-bold text-gray-800">Amazing</p>
                      <p class="text-xs text-gray-500">/əˈmeɪzɪŋ/</p>
                      <p class="text-xs text-gray-600 mt-1">Tuyệt vời</p>
                    </div>
                  </div>
                </div>

                <button @click="navigateToLearning" class="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                  Tiếp tục học →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="relative z-10 py-20 bg-white/30 backdrop-blur-sm">
      <div class="container mx-auto px-4 max-w-6xl">
        <div class="text-center mb-12">
          <h2 class="text-4xl font-bold text-gray-800 mb-4">Tại sao chọn LinguaFlow?</h2>
          <p class="text-gray-600 max-w-2xl mx-auto">Phương pháp học hiện đại giúp bạn tiến bộ nhanh chóng</p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <div class="group bg-white/60 backdrop-blur-xl rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2 border border-white/50">
            <div class="w-16 h-16 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-2xl flex items-center justify-center text-3xl shadow-lg mb-6 group-hover:scale-110 transition-transform">
              🧠
            </div>
            <h3 class="text-xl font-bold text-gray-800 mb-3">Học thông minh</h3>
            <p class="text-gray-600">AI phân tích điểm mạnh, yếu để tối ưu hóa lộ trình học cá nhân hóa</p>
          </div>

          <div class="group bg-white/60 backdrop-blur-xl rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2 border border-white/50">
            <div class="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center text-3xl shadow-lg mb-6 group-hover:scale-110 transition-transform">
              🎮
            </div>
            <h3 class="text-xl font-bold text-gray-800 mb-3">Học mà chơi</h3>
            <p class="text-gray-600">Game hóa việc học với điểm thưởng, cấp độ và thử thách hằng ngày</p>
          </div>

          <div class="group bg-white/60 backdrop-blur-xl rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2 border border-white/50">
            <div class="w-16 h-16 bg-gradient-to-br from-pink-400 to-rose-400 rounded-2xl flex items-center justify-center text-3xl shadow-lg mb-6 group-hover:scale-110 transition-transform">
              📱
            </div>
            <h3 class="text-xl font-bold text-gray-800 mb-3">Mọi lúc mọi nơi</h3>
            <p class="text-gray-600">Học trên mọi thiết bị, đồng bộ tiến độ và học mọi lúc bạn muốn</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Roadmap Section -->
    <section id="roadmap" class="relative z-10 py-20">
      <div class="container mx-auto px-4 max-w-6xl">
        <div class="text-center mb-12">
          <h2 class="text-4xl font-bold text-gray-800 mb-4">🗺️ Lộ trình học tập</h2>
          <p class="text-gray-600 max-w-2xl mx-auto">Từ cơ bản đến nâng cao, phù hợp với mọi trình độ</p>
        </div>

        <div class="grid md:grid-cols-4 gap-6">
          <div class="group bg-white/60 backdrop-blur-xl rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2 border border-white/50 text-center">
            <div class="w-20 h-20 bg-gradient-to-br from-emerald-400 to-green-400 rounded-full flex items-center justify-center text-3xl shadow-lg mx-auto mb-4 group-hover:scale-110 transition-transform">
              🌱
            </div>
            <h3 class="text-lg font-bold text-gray-800 mb-2">A1 - Beginner</h3>
            <p class="text-sm text-gray-600">Làm quen với bảng chữ cái, từ vựng cơ bản và câu đơn giản</p>
            <div class="mt-4 flex items-center justify-center space-x-1">
              <span class="text-xs text-gray-500">12 bài học</span>
              <span class="text-xs bg-gray-200 px-2 py-1 rounded-full">Mới bắt đầu</span>
            </div>
          </div>

          <div class="group bg-white/60 backdrop-blur-xl rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2 border border-white/50 text-center">
            <div class="w-20 h-20 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full flex items-center justify-center text-3xl shadow-lg mx-auto mb-4 group-hover:scale-110 transition-transform">
              🌿
            </div>
            <h3 class="text-lg font-bold text-gray-800 mb-2">A2 - Elementary</h3>
            <p class="text-sm text-gray-600">Mở rộng vốn từ, học các cấu trúc câu cơ bản và giao tiếp thường ngày</p>
            <div class="mt-4 flex items-center justify-center space-x-1">
              <span class="text-xs text-gray-500">15 bài học</span>
              <span class="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">Phổ biến</span>
            </div>
          </div>

          <div class="group bg-white/60 backdrop-blur-xl rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2 border border-white/50 text-center">
            <div class="w-20 h-20 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full flex items-center justify-center text-3xl shadow-lg mx-auto mb-4 group-hover:scale-110 transition-transform">
              🌳
            </div>
            <h3 class="text-lg font-bold text-gray-800 mb-2">B1 - Intermediate</h3>
            <p class="text-sm text-gray-600">Nâng cao từ vựng, học các chủ đề chuyên sâu và phát triển kỹ năng viết</p>
            <div class="mt-4 flex items-center justify-center space-x-1">
              <span class="text-xs text-gray-500">20 bài học</span>
              <span class="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded-full">Nâng cao</span>
            </div>
          </div>

          <div class="group bg-white/60 backdrop-blur-xl rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2 border border-white/50 text-center">
            <div class="w-20 h-20 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full flex items-center justify-center text-3xl shadow-lg mx-auto mb-4 group-hover:scale-110 transition-transform">
              🌴
            </div>
            <h3 class="text-lg font-bold text-gray-800 mb-2">B2 - Upper</h3>
            <p class="text-sm text-gray-600">Thành thạo giao tiếp, học thành ngữ và văn hóa Anh-Mỹ</p>
            <div class="mt-4 flex items-center justify-center space-x-1">
              <span class="text-xs text-gray-500">25 bài học</span>
              <span class="text-xs bg-pink-100 text-pink-600 px-2 py-1 rounded-full">Thử thách</span>
            </div>
          </div>
        </div>

        <div class="text-center mt-10">
          <button @click="navigateToLearning" class="bg-white/70 backdrop-blur-xl text-gray-700 px-10 py-4 rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 flex items-center space-x-2 border-2 border-white/50 hover:border-indigo-200 mx-auto">
            <span>📖</span>
            <span>Bắt đầu học ngay</span>
            <span>→</span>
          </button>
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="relative z-10 py-20 bg-white/30 backdrop-blur-sm">
      <div class="container mx-auto px-4 max-w-6xl">
        <div class="text-center mb-12">
          <h2 class="text-4xl font-bold text-gray-800 mb-4">💬 Học viên nói gì?</h2>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <div class="bg-white/60 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/50">
            <div class="flex items-center space-x-4 mb-4">
              <div class="w-12 h-12 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold">M</div>
              <div>
                <p class="font-bold text-gray-800">Minh Anh</p>
                <div class="flex text-yellow-400 text-sm">⭐⭐⭐⭐⭐</div>
              </div>
            </div>
            <p class="text-gray-600 text-sm">"Học được 3 tháng, từ vựng của mình cải thiện rõ rệt. Giao diện đẹp và dễ học!"</p>
          </div>

          <div class="bg-white/60 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/50">
            <div class="flex items-center space-x-4 mb-4">
              <div class="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold">T</div>
              <div>
                <p class="font-bold text-gray-800">Thanh Tùng</p>
                <div class="flex text-yellow-400 text-sm">⭐⭐⭐⭐⭐</div>
              </div>
            </div>
            <p class="text-gray-600 text-sm">"Phương pháp học thông minh, AI đề xuất từ vựng phù hợp với trình độ của tôi."</p>
          </div>

          <div class="bg-white/60 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/50">
            <div class="flex items-center space-x-4 mb-4">
              <div class="w-12 h-12 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full flex items-center justify-center text-white font-bold">H</div>
              <div>
                <p class="font-bold text-gray-800">Hà My</p>
                <div class="flex text-yellow-400 text-sm">⭐⭐⭐⭐⭐</div>
              </div>
            </div>
            <p class="text-gray-600 text-sm">"Giao diện đẹp, tính năng game hóa khiến việc học trở nên thú vị hơn bao giờ hết!"</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="relative z-10 py-20">
      <div class="container mx-auto px-4 max-w-4xl">
        <div class="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-12 text-center text-white shadow-3xl relative overflow-hidden">
          <div class="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div class="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
          
          <div class="relative z-10">
            <h2 class="text-4xl font-bold mb-4">Sẵn sàng chinh phục tiếng Anh?</h2>
            <p class="text-white/80 text-lg mb-8 max-w-2xl mx-auto">Tham gia cùng hàng ngàn học viên khác và bắt đầu hành trình học tập của bạn ngay hôm nay</p>
            <button @click="navigateToLearning" class="bg-white text-indigo-600 px-10 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 hover:bg-indigo-50">
              🚀 Bắt đầu ngay - Miễn phí
            </button>
            <p class="text-white/60 text-sm mt-4">Không cần thẻ tín dụng. Bắt đầu miễn phí ngay!</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="relative z-10 bg-white/30 backdrop-blur-xl border-t border-white/30 py-12">
      <div class="container mx-auto px-4 max-w-6xl">
        <div class="grid md:grid-cols-4 gap-8">
          <div>
            <div class="flex items-center space-x-3 mb-4">
              <span class="text-2xl">📚</span>
              <span class="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">LinguaFlow</span>
            </div>
            <p class="text-sm text-gray-600">Học tiếng Anh thông minh với công nghệ AI</p>
          </div>
          <div>
            <h4 class="font-bold text-gray-800 mb-3">Sản phẩm</h4>
            <ul class="space-y-2 text-sm text-gray-600">
              <li><a href="#" class="hover:text-indigo-600 transition-colors">Tính năng</a></li>
              <li><a href="#" class="hover:text-indigo-600 transition-colors">Lộ trình</a></li>
              <li><a href="#" class="hover:text-indigo-600 transition-colors">Bảng giá</a></li>
            </ul>
          </div>
          <div>
            <h4 class="font-bold text-gray-800 mb-3">Hỗ trợ</h4>
            <ul class="space-y-2 text-sm text-gray-600">
              <li><a href="#" class="hover:text-indigo-600 transition-colors">FAQ</a></li>
              <li><a href="#" class="hover:text-indigo-600 transition-colors">Liên hệ</a></li>
              <li><a href="#" class="hover:text-indigo-600 transition-colors">Blog</a></li>
            </ul>
          </div>
          <div>
            <h4 class="font-bold text-gray-800 mb-3">Kết nối</h4>
            <div class="flex space-x-4">
              <a href="#" class="text-2xl hover:text-indigo-600 transition-colors">📘</a>
              <a href="#" class="text-2xl hover:text-indigo-600 transition-colors">📸</a>
              <a href="#" class="text-2xl hover:text-indigo-600 transition-colors">🐦</a>
              <a href="#" class="text-2xl hover:text-indigo-600 transition-colors">▶️</a>
            </div>
          </div>
        </div>
        <div class="border-t border-white/30 mt-8 pt-8 text-center text-sm text-gray-500">
          <p>© 2026 LinguaFlow. Made with 💜</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import Header from '@/components/Home/Header.vue'

export default {
  name: 'HomeView',
  components: {
    Header
  },
  methods: {
    navigateToLearning() {
      // Chuyển hướng tới trang Dashboard (hoặc dùng this.$router.push({ name: 'Dashboard' }))
      this.$router.push('/dashboard')
    },
    scrollToRoadmap() {
      const element = document.getElementById('roadmap')
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }
}
</script>

<style scoped>
@keyframes blob {
  0% {
    transform: translate(0px, 0px) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
  100% {
    transform: translate(0px, 0px) scale(1);
  }
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(5deg);
  }
}

.animate-blob {
  animation: blob 7s infinite;
}

.animate-shimmer {
  animation: shimmer 2s infinite;
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

.animation-delay-1000 {
  animation-delay: 1s;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, #6366f1, #a855f7);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to bottom, #4f46e5, #9333ea);
}
</style>