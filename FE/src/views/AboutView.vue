<!-- src/views/AboutView.vue -->
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
        <div class="text-center max-w-4xl mx-auto">
          <div class="inline-flex items-center space-x-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-white/50 shadow-lg mb-6">
            <span class="text-2xl">🌟</span>
            <span class="text-sm font-medium text-gray-700">Câu chuyện của chúng tôi</span>
          </div>
          
          <h1 class="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            <span class="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Về LinguaFlow</span>
          </h1>
          
          <p class="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Chúng tôi tin rằng việc học tiếng Anh không chỉ là học từ vựng và ngữ pháp, 
            mà còn là mở ra cánh cửa đến với thế giới.
          </p>
        </div>
      </div>
    </section>

    <!-- Mission Section -->
    <section class="relative z-10 py-16">
      <div class="container mx-auto px-4 max-w-6xl">
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <div class="order-2 md:order-1">
            <div class="bg-white/40 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50">
              <div class="space-y-6">
                <div class="flex items-start space-x-4">
                  <div class="w-12 h-12 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-2xl flex items-center justify-center text-2xl shadow-lg flex-shrink-0">
                    🎯
                  </div>
                  <div>
                    <h3 class="text-lg font-bold text-gray-800">Sứ mệnh của chúng tôi</h3>
                    <p class="text-gray-600 text-sm">Giúp 1 triệu người Việt Nam tự tin giao tiếp tiếng Anh thông qua công nghệ AI và phương pháp học hiện đại.</p>
                  </div>
                </div>

                <div class="flex items-start space-x-4">
                  <div class="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center text-2xl shadow-lg flex-shrink-0">
                    👁️
                  </div>
                  <div>
                    <h3 class="text-lg font-bold text-gray-800">Tầm nhìn</h3>
                    <p class="text-gray-600 text-sm">Trở thành nền tảng học tiếng Anh hàng đầu Đông Nam Á, nơi mọi người đều có thể học mọi lúc, mọi nơi.</p>
                  </div>
                </div>

                <div class="flex items-start space-x-4">
                  <div class="w-12 h-12 bg-gradient-to-br from-pink-400 to-rose-400 rounded-2xl flex items-center justify-center text-2xl shadow-lg flex-shrink-0">
                    💎
                  </div>
                  <div>
                    <h3 class="text-lg font-bold text-gray-800">Giá trị cốt lõi</h3>
                    <p class="text-gray-600 text-sm">Đam mê - Sáng tạo - Chất lượng - Cộng đồng. Chúng tôi luôn đặt học viên làm trung tâm.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="order-1 md:order-2">
            <div class="relative">
              <div class="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-3xl p-1 shadow-2xl">
                <div class="bg-white/90 backdrop-blur-xl rounded-3xl p-8">
                  <div class="relative">
                    <div class="absolute -top-6 -right-6 w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-2xl flex items-center justify-center text-3xl shadow-xl animate-float">
                      🚀
                    </div>
                    <div class="text-center">
                      <div class="text-6xl mb-4">🌏</div>
                      <h3 class="text-2xl font-bold text-gray-800 mb-2">Con số ấn tượng</h3>
                      <div class="grid grid-cols-2 gap-4 mt-6">
                        <div class="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-4">
                          <p class="text-3xl font-bold text-indigo-600">10K+</p>
                          <p class="text-xs text-gray-600">Học viên</p>
                        </div>
                        <div class="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-4">
                          <p class="text-3xl font-bold text-purple-600">95%</p>
                          <p class="text-xs text-gray-600">Hài lòng</p>
                        </div>
                        <div class="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-4">
                          <p class="text-3xl font-bold text-pink-600">5K+</p>
                          <p class="text-xs text-gray-600">Từ vựng</p>
                        </div>
                        <div class="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4">
                          <p class="text-3xl font-bold text-emerald-600">4.8⭐</p>
                          <p class="text-xs text-gray-600">Đánh giá</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Team Section -->
    <section class="relative z-10 py-20 bg-white/30 backdrop-blur-sm">
      <div class="container mx-auto px-4 max-w-6xl">
        <div class="text-center mb-12">
          <h2 class="text-4xl font-bold text-gray-800 mb-4">👨‍💻 Đội ngũ của chúng tôi</h2>
          <p class="text-gray-600 max-w-2xl mx-auto">Những người đứng sau sự thành công của LinguaFlow</p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <div class="group bg-white/60 backdrop-blur-xl rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2 border border-white/50 text-center">
            <div class="relative inline-block">
              <div class="w-32 h-32 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full flex items-center justify-center text-5xl shadow-xl mx-auto mb-4 group-hover:scale-110 transition-transform">
                👨‍💼
              </div>
              <div class="absolute -bottom-1 -right-1 w-8 h-8 bg-green-400 rounded-full border-4 border-white"></div>
            </div>
            <h3 class="text-xl font-bold text-gray-800 mb-1">Nguyễn Văn An</h3>
            <p class="text-sm text-indigo-600 font-medium mb-3">CEO & Founder</p>
            <p class="text-sm text-gray-600">10 năm kinh nghiệm trong lĩnh vực giáo dục và công nghệ</p>
            <div class="flex justify-center space-x-3 mt-4">
              <a href="#" class="text-gray-400 hover:text-indigo-600 transition-colors">📘</a>
              <a href="#" class="text-gray-400 hover:text-indigo-600 transition-colors">🔗</a>
            </div>
          </div>

          <div class="group bg-white/60 backdrop-blur-xl rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2 border border-white/50 text-center">
            <div class="relative inline-block">
              <div class="w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-5xl shadow-xl mx-auto mb-4 group-hover:scale-110 transition-transform">
                👩‍🏫
              </div>
              <div class="absolute -bottom-1 -right-1 w-8 h-8 bg-green-400 rounded-full border-4 border-white"></div>
            </div>
            <h3 class="text-xl font-bold text-gray-800 mb-1">Trần Thị Mai</h3>
            <p class="text-sm text-purple-600 font-medium mb-3">Giám đốc Học thuật</p>
            <p class="text-sm text-gray-600">Chuyên gia ngôn ngữ với hơn 8 năm giảng dạy tiếng Anh</p>
            <div class="flex justify-center space-x-3 mt-4">
              <a href="#" class="text-gray-400 hover:text-purple-600 transition-colors">📘</a>
              <a href="#" class="text-gray-400 hover:text-purple-600 transition-colors">🔗</a>
            </div>
          </div>

          <div class="group bg-white/60 backdrop-blur-xl rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2 border border-white/50 text-center">
            <div class="relative inline-block">
              <div class="w-32 h-32 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full flex items-center justify-center text-5xl shadow-xl mx-auto mb-4 group-hover:scale-110 transition-transform">
                👨‍💻
              </div>
              <div class="absolute -bottom-1 -right-1 w-8 h-8 bg-green-400 rounded-full border-4 border-white"></div>
            </div>
            <h3 class="text-xl font-bold text-gray-800 mb-1">Lê Quang Huy</h3>
            <p class="text-sm text-pink-600 font-medium mb-3">Lead Developer</p>
            <p class="text-sm text-gray-600">Full-stack developer, đam mê xây dựng sản phẩm giáo dục</p>
            <div class="flex justify-center space-x-3 mt-4">
              <a href="#" class="text-gray-400 hover:text-pink-600 transition-colors">📘</a>
              <a href="#" class="text-gray-400 hover:text-pink-600 transition-colors">🔗</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Timeline Section -->
    <section class="relative z-10 py-20">
      <div class="container mx-auto px-4 max-w-6xl">
        <div class="text-center mb-12">
          <h2 class="text-4xl font-bold text-gray-800 mb-4">📅 Hành trình phát triển</h2>
          <p class="text-gray-600 max-w-2xl mx-auto">Những cột mốc quan trọng của LinguaFlow</p>
        </div>

        <div class="relative">
          <!-- Timeline Line -->
          <div class="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-indigo-400 via-purple-400 to-pink-400"></div>

          <div class="space-y-12">
            <!-- Timeline Item 1 -->
            <div class="relative flex items-center justify-between md:justify-normal">
              <div class="flex-1 md:text-right pr-8 md:pr-16">
                <div class="bg-white/60 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/50 hover:shadow-2xl transition-all hover:-translate-y-1">
                  <span class="text-sm text-indigo-600 font-bold">2024</span>
                  <h3 class="text-lg font-bold text-gray-800 mt-1">Thành lập LinguaFlow</h3>
                  <p class="text-sm text-gray-600 mt-1">Bắt đầu với sứ mệnh giúp người Việt học tiếng Anh hiệu quả hơn</p>
                </div>
              </div>
              <div class="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full border-4 border-white shadow-lg z-10"></div>
              <div class="flex-1 md:pl-16 hidden md:block"></div>
            </div>

            <!-- Timeline Item 2 -->
            <div class="relative flex items-center justify-between md:justify-normal">
              <div class="flex-1 hidden md:block"></div>
              <div class="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full border-4 border-white shadow-lg z-10"></div>
              <div class="flex-1 pl-8 md:pl-16">
                <div class="bg-white/60 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/50 hover:shadow-2xl transition-all hover:-translate-y-1">
                  <span class="text-sm text-purple-600 font-bold">2025</span>
                  <h3 class="text-lg font-bold text-gray-800 mt-1">Ra mắt phiên bản AI</h3>
                  <p class="text-sm text-gray-600 mt-1">Tích hợp trí tuệ nhân tạo để cá nhân hóa lộ trình học tập</p>
                </div>
              </div>
            </div>

            <!-- Timeline Item 3 -->
            <div class="relative flex items-center justify-between md:justify-normal">
              <div class="flex-1 md:text-right pr-8 md:pr-16">
                <div class="bg-white/60 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/50 hover:shadow-2xl transition-all hover:-translate-y-1">
                  <span class="text-sm text-pink-600 font-bold">2025</span>
                  <h3 class="text-lg font-bold text-gray-800 mt-1">10,000 học viên</h3>
                  <p class="text-sm text-gray-600 mt-1">Cột mốc quan trọng đánh dấu sự tin tưởng của cộng đồng</p>
                </div>
              </div>
              <div class="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full border-4 border-white shadow-lg z-10"></div>
              <div class="flex-1 md:pl-16 hidden md:block"></div>
            </div>

            <!-- Timeline Item 4 -->
            <div class="relative flex items-center justify-between md:justify-normal">
              <div class="flex-1 hidden md:block"></div>
              <div class="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-br from-rose-400 to-red-400 rounded-full border-4 border-white shadow-lg z-10"></div>
              <div class="flex-1 pl-8 md:pl-16">
                <div class="bg-white/60 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/50 hover:shadow-2xl transition-all hover:-translate-y-1">
                  <span class="text-sm text-rose-600 font-bold">2026</span>
                  <h3 class="text-lg font-bold text-gray-800 mt-1">Tương lai phía trước</h3>
                  <p class="text-sm text-gray-600 mt-1">Mở rộng hệ thống, ra mắt ứng dụng di động và nhiều tính năng mới</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Values Section -->
    <section class="relative z-10 py-20 bg-white/30 backdrop-blur-sm">
      <div class="container mx-auto px-4 max-w-6xl">
        <div class="text-center mb-12">
          <h2 class="text-4xl font-bold text-gray-800 mb-4">💪 Giá trị cốt lõi</h2>
          <p class="text-gray-600 max-w-2xl mx-auto">Những nguyên tắc định hướng mọi hoạt động của LinguaFlow</p>
        </div>

        <div class="grid md:grid-cols-4 gap-6">
          <div class="group bg-white/60 backdrop-blur-xl rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2 border border-white/50 text-center">
            <div class="w-20 h-20 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full flex items-center justify-center text-3xl shadow-lg mx-auto mb-4 group-hover:scale-110 transition-transform">
              ❤️
            </div>
            <h3 class="text-lg font-bold text-gray-800 mb-2">Đam mê</h3>
            <p class="text-sm text-gray-600">Yêu thích việc giúp đỡ người khác học tập và phát triển</p>
          </div>

          <div class="group bg-white/60 backdrop-blur-xl rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2 border border-white/50 text-center">
            <div class="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-3xl shadow-lg mx-auto mb-4 group-hover:scale-110 transition-transform">
              💡
            </div>
            <h3 class="text-lg font-bold text-gray-800 mb-2">Sáng tạo</h3>
            <p class="text-sm text-gray-600">Không ngừng đổi mới và cải tiến phương pháp học tập</p>
          </div>

          <div class="group bg-white/60 backdrop-blur-xl rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2 border border-white/50 text-center">
            <div class="w-20 h-20 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full flex items-center justify-center text-3xl shadow-lg mx-auto mb-4 group-hover:scale-110 transition-transform">
              ⭐
            </div>
            <h3 class="text-lg font-bold text-gray-800 mb-2">Chất lượng</h3>
            <p class="text-sm text-gray-600">Cam kết mang đến nội dung học tập tốt nhất cho học viên</p>
          </div>

          <div class="group bg-white/60 backdrop-blur-xl rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2 border border-white/50 text-center">
            <div class="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full flex items-center justify-center text-3xl shadow-lg mx-auto mb-4 group-hover:scale-110 transition-transform">
              🌍
            </div>
            <h3 class="text-lg font-bold text-gray-800 mb-2">Cộng đồng</h3>
            <p class="text-sm text-gray-600">Xây dựng một cộng đồng học tập tích cực và hỗ trợ nhau</p>
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
            <h2 class="text-4xl font-bold mb-4">🤝 Tham gia cùng chúng tôi</h2>
            <p class="text-white/80 text-lg mb-8 max-w-2xl mx-auto">Hãy là một phần của cộng đồng học tiếng Anh đang phát triển mỗi ngày</p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <button @click="navigateToLearning" class="bg-white text-indigo-600 px-8 py-4 rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 hover:bg-indigo-50">
                Bắt đầu học ngay
              </button>
              <button class="bg-white/20 backdrop-blur-sm border-2 border-white/30 px-8 py-4 rounded-2xl font-bold hover:bg-white/30 transition-all transform hover:scale-105">
                Liên hệ với chúng tôi
              </button>
            </div>
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
  name: 'AboutView',
  components: {
    Header
  },
  methods: {
    navigateToLearning() {
      this.$router.push('/learning')
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

.animate-float {
  animation: float 3s ease-in-out infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}

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