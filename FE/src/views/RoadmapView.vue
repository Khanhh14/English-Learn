<!-- src/views/RoadmapView.vue -->
<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
    <!-- Animated Background -->
    <div class="fixed inset-0 pointer-events-none overflow-hidden">
      <div class="absolute -top-40 -right-40 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div class="absolute -bottom-40 -left-40 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
    </div>

    <!-- Header -->
    <Header />

    <!-- Page Content -->
    <section class="relative z-10 py-16">
      <div class="container mx-auto px-4 max-w-6xl">
        <!-- Page Title -->
        <div class="text-center mb-12">
          <h1 class="text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-3">
            <font-awesome-icon :icon="['fas', 'book-open']" class="text-indigo-600" />
            <span class="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Lộ trình học tập
            </span>
          </h1>
          <p class="text-gray-600 text-lg">Từ cơ bản đến nâng cao, phù hợp với mọi trình độ</p>
        </div>

        <!-- Roadmap Cards -->
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <!-- A1 - Beginner -->
          <div class="bg-white/70 backdrop-blur-xl rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2 border border-white/50 flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-4">
                <div class="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600 text-2xl shadow-xs">
                  <font-awesome-icon :icon="['fas', 'seedling']" />
                </div>
                <span class="text-xs bg-emerald-100 text-emerald-600 px-3 py-1 rounded-full font-bold">A1</span>
              </div>
              <h3 class="text-xl font-bold text-gray-800 mb-2">Beginner</h3>
              <p class="text-sm text-gray-600 mb-4">Làm quen với bảng chữ cái, từ vựng cơ bản</p>
              
              <div class="space-y-3">
                <div class="flex items-center justify-between text-sm">
                  <span class="text-gray-600 flex items-center gap-2">
                    <font-awesome-icon :icon="['fas', 'book']" class="text-emerald-500 w-4" />
                    <span>Từ vựng</span>
                  </span>
                  <span class="font-semibold text-gray-800">200+ từ</span>
                </div>
                <div class="flex items-center justify-between text-sm">
                  <span class="text-gray-600 flex items-center gap-2">
                    <font-awesome-icon :icon="['fas', 'headphones']" class="text-emerald-500 w-4" />
                    <span>Luyện nghe</span>
                  </span>
                  <span class="font-semibold text-gray-800">12 bài</span>
                </div>
                <div class="flex items-center justify-between text-sm">
                  <span class="text-gray-600 flex items-center gap-2">
                    <font-awesome-icon :icon="['fas', 'pen-nib']" class="text-emerald-500 w-4" />
                    <span>Luyện câu</span>
                  </span>
                  <span class="font-semibold text-gray-800">50 câu</span>
                </div>
                <div class="flex items-center justify-between text-sm">
                  <span class="text-gray-600 flex items-center gap-2">
                    <font-awesome-icon :icon="['fas', 'rotate']" class="text-emerald-500 w-4" />
                    <span>Ôn tập</span>
                  </span>
                  <span class="font-semibold text-gray-800">8 bài</span>
                </div>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-gray-200/60 flex items-center justify-between">
              <span class="text-xs text-gray-500 font-medium">12 bài • 3 tuần</span>
              <button 
                @click="handleStartLearning('A1')" 
                class="text-sm bg-emerald-500 text-white px-4 py-2 rounded-xl font-bold hover:bg-emerald-600 transition-all hover:shadow-lg flex items-center gap-1 cursor-pointer"
              >
                <span>Bắt đầu</span>
                <font-awesome-icon :icon="['fas', 'arrow-right']" class="text-xs" />
              </button>
            </div>
          </div>

          <!-- A2 - Elementary -->
          <div class="bg-white/70 backdrop-blur-xl rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2 border border-white/50 flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-4">
                <div class="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 text-2xl shadow-xs">
                  <font-awesome-icon :icon="['fas', 'leaf']" />
                </div>
                <span class="text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full font-bold">A2</span>
              </div>
              <h3 class="text-xl font-bold text-gray-800 mb-2">Elementary</h3>
              <p class="text-sm text-gray-600 mb-4">Mở rộng vốn từ và giao tiếp thường ngày</p>
              
              <div class="space-y-3">
                <div class="flex items-center justify-between text-sm">
                  <span class="text-gray-600 flex items-center gap-2">
                    <font-awesome-icon :icon="['fas', 'book']" class="text-blue-500 w-4" />
                    <span>Từ vựng</span>
                  </span>
                  <span class="font-semibold text-gray-800">400+ từ</span>
                </div>
                <div class="flex items-center justify-between text-sm">
                  <span class="text-gray-600 flex items-center gap-2">
                    <font-awesome-icon :icon="['fas', 'headphones']" class="text-blue-500 w-4" />
                    <span>Luyện nghe</span>
                  </span>
                  <span class="font-semibold text-gray-800">15 bài</span>
                </div>
                <div class="flex items-center justify-between text-sm">
                  <span class="text-gray-600 flex items-center gap-2">
                    <font-awesome-icon :icon="['fas', 'pen-nib']" class="text-blue-500 w-4" />
                    <span>Luyện câu</span>
                  </span>
                  <span class="font-semibold text-gray-800">80 câu</span>
                </div>
                <div class="flex items-center justify-between text-sm">
                  <span class="text-gray-600 flex items-center gap-2">
                    <font-awesome-icon :icon="['fas', 'rotate']" class="text-blue-500 w-4" />
                    <span>Ôn tập</span>
                  </span>
                  <span class="font-semibold text-gray-800">10 bài</span>
                </div>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-gray-200/60 flex items-center justify-between">
              <span class="text-xs text-gray-500 font-medium">15 bài • 4 tuần</span>
              <button 
                @click="handleStartLearning('A2')" 
                class="text-sm bg-blue-500 text-white px-4 py-2 rounded-xl font-bold hover:bg-blue-600 transition-all hover:shadow-lg flex items-center gap-1 cursor-pointer"
              >
                <span>Bắt đầu</span>
                <font-awesome-icon :icon="['fas', 'arrow-right']" class="text-xs" />
              </button>
            </div>
          </div>

          <!-- B1 - Intermediate -->
          <div class="bg-white/70 backdrop-blur-xl rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2 border border-white/50 flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-4">
                <div class="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center text-purple-600 text-2xl shadow-xs">
                  <font-awesome-icon :icon="['fas', 'tree']" />
                </div>
                <span class="text-xs bg-purple-100 text-purple-600 px-3 py-1 rounded-full font-bold">B1</span>
              </div>
              <h3 class="text-xl font-bold text-gray-800 mb-2">Intermediate</h3>
              <p class="text-sm text-gray-600 mb-4">Nâng cao từ vựng và phát triển kỹ năng viết</p>
              
              <div class="space-y-3">
                <div class="flex items-center justify-between text-sm">
                  <span class="text-gray-600 flex items-center gap-2">
                    <font-awesome-icon :icon="['fas', 'book']" class="text-purple-500 w-4" />
                    <span>Từ vựng</span>
                  </span>
                  <span class="font-semibold text-gray-800">600+ từ</span>
                </div>
                <div class="flex items-center justify-between text-sm">
                  <span class="text-gray-600 flex items-center gap-2">
                    <font-awesome-icon :icon="['fas', 'headphones']" class="text-purple-500 w-4" />
                    <span>Luyện nghe</span>
                  </span>
                  <span class="font-semibold text-gray-800">20 bài</span>
                </div>
                <div class="flex items-center justify-between text-sm">
                  <span class="text-gray-600 flex items-center gap-2">
                    <font-awesome-icon :icon="['fas', 'pen-nib']" class="text-purple-500 w-4" />
                    <span>Luyện câu</span>
                  </span>
                  <span class="font-semibold text-gray-800">120 câu</span>
                </div>
                <div class="flex items-center justify-between text-sm">
                  <span class="text-gray-600 flex items-center gap-2">
                    <font-awesome-icon :icon="['fas', 'rotate']" class="text-purple-500 w-4" />
                    <span>Ôn tập</span>
                  </span>
                  <span class="font-semibold text-gray-800">12 bài</span>
                </div>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-gray-200/60 flex items-center justify-between">
              <span class="text-xs text-gray-500 font-medium">20 bài • 6 tuần</span>
              <button 
                @click="handleStartLearning('B1')" 
                class="text-sm bg-purple-500 text-white px-4 py-2 rounded-xl font-bold hover:bg-purple-600 transition-all hover:shadow-lg flex items-center gap-1 cursor-pointer"
              >
                <span>Bắt đầu</span>
                <font-awesome-icon :icon="['fas', 'arrow-right']" class="text-xs" />
              </button>
            </div>
          </div>

          <!-- B2 - Upper -->
          <div class="bg-white/70 backdrop-blur-xl rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2 border border-white/50 flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-4">
                <div class="w-12 h-12 rounded-2xl bg-pink-100 flex items-center justify-center text-pink-600 text-2xl shadow-xs">
                  <font-awesome-icon :icon="['fas', 'route']" />
                </div>
                <span class="text-xs bg-pink-100 text-pink-600 px-3 py-1 rounded-full font-bold">B2</span>
              </div>
              <h3 class="text-xl font-bold text-gray-800 mb-2">Upper</h3>
              <p class="text-sm text-gray-600 mb-4">Thành thạo giao tiếp và văn hóa Anh-Mỹ</p>
              
              <div class="space-y-3">
                <div class="flex items-center justify-between text-sm">
                  <span class="text-gray-600 flex items-center gap-2">
                    <font-awesome-icon :icon="['fas', 'book']" class="text-pink-500 w-4" />
                    <span>Từ vựng</span>
                  </span>
                  <span class="font-semibold text-gray-800">800+ từ</span>
                </div>
                <div class="flex items-center justify-between text-sm">
                  <span class="text-gray-600 flex items-center gap-2">
                    <font-awesome-icon :icon="['fas', 'headphones']" class="text-pink-500 w-4" />
                    <span>Luyện nghe</span>
                  </span>
                  <span class="font-semibold text-gray-800">25 bài</span>
                </div>
                <div class="flex items-center justify-between text-sm">
                  <span class="text-gray-600 flex items-center gap-2">
                    <font-awesome-icon :icon="['fas', 'pen-nib']" class="text-pink-500 w-4" />
                    <span>Luyện câu</span>
                  </span>
                  <span class="font-semibold text-gray-800">150 câu</span>
                </div>
                <div class="flex items-center justify-between text-sm">
                  <span class="text-gray-600 flex items-center gap-2">
                    <font-awesome-icon :icon="['fas', 'rotate']" class="text-pink-500 w-4" />
                    <span>Ôn tập</span>
                  </span>
                  <span class="font-semibold text-gray-800">15 bài</span>
                </div>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-gray-200/60 flex items-center justify-between">
              <span class="text-xs text-gray-500 font-medium">25 bài • 8 tuần</span>
              <button 
                @click="handleStartLearning('B2')" 
                class="text-sm bg-pink-500 text-white px-4 py-2 rounded-xl font-bold hover:bg-pink-600 transition-all hover:shadow-lg flex items-center gap-1 cursor-pointer"
              >
                <span>Bắt đầu</span>
                <font-awesome-icon :icon="['fas', 'arrow-right']" class="text-xs" />
              </button>
            </div>
          </div>
        </div>

        <!-- Quick Stats -->
        <div class="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="bg-white/50 backdrop-blur-sm rounded-xl p-4 text-center border border-white/30">
            <p class="text-2xl font-bold text-indigo-600">72</p>
            <p class="text-sm text-gray-600">Tổng bài học</p>
          </div>
          <div class="bg-white/50 backdrop-blur-sm rounded-xl p-4 text-center border border-white/30">
            <p class="text-2xl font-bold text-purple-600">2,000+</p>
            <p class="text-sm text-gray-600">Từ vựng</p>
          </div>
          <div class="bg-white/50 backdrop-blur-sm rounded-xl p-4 text-center border border-white/30">
            <p class="text-2xl font-bold text-pink-600">21</p>
            <p class="text-sm text-gray-600">Tuần học</p>
          </div>
          <div class="bg-white/50 backdrop-blur-sm rounded-xl p-4 text-center border border-white/30">
            <p class="text-2xl font-bold text-emerald-600">4</p>
            <p class="text-sm text-gray-600">Cấp độ</p>
          </div>
        </div>

        <!-- CTA -->
        <div class="text-center mt-10">
          <button 
            @click="handleStartLearning('all')" 
            class="inline-flex items-center gap-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-10 py-4 rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 cursor-pointer"
          >
            <font-awesome-icon :icon="['fas', 'rocket']" class="text-lg" />
            <span>Bắt đầu học ngay</span>
          </button>
        </div>
      </div>
    </section>

    <!-- Footer Component -->
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/Home/Header.vue'
import Footer from '@/components/Home/Footer.vue'

export default {
  name: 'RoadmapView',
  components: {
    Header,
    Footer
  },
  methods: {
    checkIsLoggedIn() {
      const token = localStorage.getItem('token') || localStorage.getItem('access_token') || sessionStorage.getItem('token');
      const user = localStorage.getItem('user');
      return Boolean(token || user);
    },
    handleStartLearning(level) {
      if (this.checkIsLoggedIn()) {
        this.$router.push({ path: '/dashboard', query: { tab: 'learning', level } });
      } else {
        this.$router.push({ path: '/login', query: { redirect: '/dashboard' } });
      }
    }
  }
}
</script>

<style scoped>
@import "@/assets/View/HomeView.css";
</style>