<!-- src/views/RoadmapView.vue -->
<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative pb-20">
    <!-- Animated Background -->
    <div class="fixed inset-0 pointer-events-none overflow-hidden">
      <div class="absolute -top-40 -right-40 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div class="absolute -bottom-40 -left-40 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
    </div>

    <!-- Header Component -->
    <Header />

    <main class="relative z-10 container mx-auto px-4 max-w-6xl pt-10">
      <!-- Section Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-indigo-100/60 pb-6 mb-8">
        <div>
          <h2 class="text-3xl font-extrabold text-slate-800">Chi tiết lộ trình A1 - Beginner</h2>
          <p class="text-sm text-slate-500 mt-1">Hoàn thành 6 chương nền tảng để làm chủ giao tiếp cơ bản</p>
        </div>
        <div>
          <span class="inline-flex items-center text-xs font-semibold px-3 py-1.5 bg-emerald-100/80 text-emerald-700 rounded-full border border-emerald-200">
            6 Chương • 24 Hoạt Động
          </span>
        </div>
      </div>

      <!-- 6 Chapters Grid -->
      <div class="grid md:grid-cols-2 gap-6">
        <div
          v-for="chap in a1Chapters"
          :key="chap.id"
          class="bg-white/70 backdrop-blur-xl rounded-3xl p-6 sm:p-7 shadow-lg hover:shadow-xl transition-all border border-white/80 flex flex-col justify-between"
        >
          <!-- Top Content -->
          <div>
            <div class="flex items-start justify-between gap-4 mb-3">
              <div>
                <span class="text-xs font-black text-indigo-600 tracking-wider uppercase">
                  CHƯƠNG {{ chap.id }} • {{ chap.wordCount }} TỪ
                </span>
                <h3 class="text-xl font-bold text-slate-800 mt-1">{{ chap.title }}</h3>
              </div>
              <div class="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-xl shrink-0">
                {{ chap.icon }}
              </div>
            </div>

            <p class="text-sm text-slate-600 leading-relaxed mb-6">
              {{ chap.description }}
            </p>
          </div>

          <!-- 4 Learning Parts -->
          <div>
            <p class="text-[11px] font-black text-slate-400 uppercase tracking-wider mb-3">
              4 PHẦN HỌC TẬP:
            </p>
            <div class="grid grid-cols-2 gap-2.5">
              <button
                v-for="part in learningParts"
                :key="part.type"
                @click="goToStudy(chap.id, part.type)"
                class="flex items-center space-x-2.5 px-3.5 py-2.5 rounded-xl bg-white/80 hover:bg-indigo-50 border border-slate-100 hover:border-indigo-200 text-slate-700 hover:text-indigo-600 transition-all shadow-sm text-left group"
              >
                <span class="text-base group-hover:scale-110 transition-transform">{{ part.icon }}</span>
                <span class="text-xs font-bold truncate">{{ part.title }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import Header from '@/components/Home/Header.vue'

export default {
  name: 'RoadmapView',
  components: {
    Header
  },
  data() {
    return {
      learningParts: [
        { type: 'vocab', title: 'Từ vựng', icon: '📖' },
        { type: 'listen', title: 'Nghe hiểu', icon: '🎧' },
        { type: 'sentence', title: 'Đặt câu', icon: '✍️' },
        { type: 'review', title: 'Ôn tập', icon: '🎯' }
      ],
      a1Chapters: [
        {
          id: 1,
          title: 'Gia đình',
          wordCount: 20,
          icon: '👨‍👩‍👧',
          description: 'Làm quen với các từ vựng chỉ thành viên trong gia đình, các mối quan hệ thân thiết và đại từ xưng hô cơ bản.'
        },
        {
          id: 2,
          title: 'Màu sắc',
          wordCount: 19,
          icon: '🎨',
          description: 'Học bảng màu sắc thông dụng, cách mô tả đặc điểm hình dáng, sắc thái đồ vật xung quanh bạn.'
        },
        {
          id: 3,
          title: 'Động vật',
          wordCount: 9,
          icon: '🐾',
          description: 'Tên gọi các loài thú cưng quen thuộc, động vật nông trại và cách diễn đạt sở thích về thú nuôi.'
        },
        {
          id: 4,
          title: 'Thức ăn',
          wordCount: 9,
          icon: '🍔',
          description: 'Từ vựng đồ ăn, thức uống thường ngày cùng các cấu trúc câu giao tiếp gọi món và biểu đạt khẩu vị.'
        },
        {
          id: 5,
          title: 'Công việc',
          wordCount: 5,
          icon: '💼',
          description: 'Tìm hiểu danh xưng nghề nghiệp phổ biến, nơi làm việc và mẫu câu giới thiệu công việc của bản thân.'
        },
        {
          id: 6,
          title: 'Cảm xúc',
          wordCount: 5,
          icon: '😊',
          description: 'Từ vựng diễn tả trạng thái cảm xúc, tâm trạng vui buồn, mệt mỏi và cách hỏi thăm người đối diện.'
        }
      ]
    }
  },
  methods: {
    checkIsLoggedIn() {
      const token = localStorage.getItem('token') || localStorage.getItem('access_token') || sessionStorage.getItem('token');
      const user = localStorage.getItem('user');
      return Boolean(token || user);
    },
    goToStudy(chapterId, partType) {
      const targetPath = `/study/a1/chapter-${chapterId}/${partType}`;
      if (this.checkIsLoggedIn()) {
        this.$router.push(targetPath);
      } else {
        this.$router.push({ path: '/login', query: { redirect: targetPath } });
      }
    }
  }
}
</script>

<style scoped>
@import "@/assets/View/HomeView.css";
</style>