<!-- src/components/Dashboard/PracticeTab.vue -->
<template>
  <div class="space-y-6 pb-12">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
      <div>
        <h2 class="text-2xl font-bold text-gray-800">✍️ Trung tâm Ôn tập</h2>
        <p class="text-sm text-gray-500 mt-0.5">Luyện tập lại các kỹ năng từ các bài học bạn đã hoàn thành</p>
      </div>
      <div class="flex items-center gap-2">
        <span class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-100">
          📚 {{ availableChapters.length }} chương có thể ôn tập
        </span>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex flex-col items-center justify-center p-12 bg-white/70 backdrop-blur-sm rounded-3xl border border-gray-200">
      <div class="h-10 w-10 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600"></div>
      <p class="mt-3 text-sm font-semibold text-gray-500">Đang tải dữ liệu bài ôn tập...</p>
    </div>

    <!-- Empty State -->
    <div v-else-if="!availableChapters.length" class="text-center p-10 bg-white/70 backdrop-blur-sm rounded-3xl border border-gray-200">
      <div class="text-5xl mb-3">🔒</div>
      <h3 class="text-lg font-bold text-gray-800">Chưa có bài ôn tập nào được mở khóa</h3>
      <p class="text-sm text-gray-500 mt-1 max-w-md mx-auto">
        Hãy vào mục <strong>Học ngay</strong> và hoàn thành các bài học để kích hoạt phần ôn tập tương ứng tại đây!
      </p>
    </div>

    <!-- Danh sách các chương ôn tập -->
    <div v-else class="space-y-6">
      <div 
        v-for="chapter in availableChapters" 
        :key="chapter.id"
        class="bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-gray-200 shadow-xs"
      >
        <div class="flex items-center justify-between pb-4 mb-5 border-b border-gray-100">
          <div class="flex items-center gap-3">
            <span class="text-2xl p-2.5 bg-indigo-50 rounded-2xl">📖</span>
            <div>
              <h3 class="text-lg font-bold text-gray-800">{{ chapter.title || chapter.name }}</h3>
              <p class="text-xs text-gray-500">{{ chapter.description || 'Ôn tập củng cố phản xạ' }}</p>
            </div>
          </div>
        </div>

        <div class="rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50/70 via-white to-purple-50/70 p-5">
          <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h4 class="font-black text-gray-800">Ôn tập tổng hợp</h4>
              <p class="mt-1 text-xs text-gray-500">Gồm 3 phần: từ vựng, luyện nghe và ghép câu trong cùng một bài ôn tập.</p>
            </div>
            <span
              :class="[
                'inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-bold',
                getCompletedCount(chapter.id) > 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-500'
              ]"
            >
              {{ getCompletedCount(chapter.id) > 0 ? 'Sẵn sàng' : 'Chưa học' }}
            </span>
          </div>

          <div class="mt-4 flex flex-wrap gap-2">
            <span class="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700">📝 Từ vựng</span>
            <span class="rounded-full border border-indigo-200 bg-indigo-50 px-2.5 py-1 text-[11px] font-bold text-indigo-700">🔊 Nghe</span>
            <span class="rounded-full border border-purple-200 bg-purple-50 px-2.5 py-1 text-[11px] font-bold text-purple-700">🧩 Ghép câu</span>
          </div>

          <div class="mt-4 flex items-center justify-between border-t border-indigo-100 pt-4">
            <span class="text-xs font-bold text-amber-600">⭐ +10 XP</span>
            <button
              @click="startReview(chapter, 'review-1', 'Ôn tập tổng hợp')"
              class="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-xs font-black rounded-xl shadow-xs transition-all cursor-pointer"
            >
              Ôn tập ↺
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'PracticeTab',
  props: {
    userId: {
      type: [Number, String],
      default: 1
    }
  },
  data() {
    return {
      allChapters: [],
      completedLessonKeys: [],
      loading: true,
      currentUserId: 1
    };
  },
  computed: {
    availableChapters() {
      return this.allChapters.filter((chapter) => {
        return (
          this.isCompleted(chapter.id, 'new-1') &&
          this.isCompleted(chapter.id, 'new-2') &&
          this.isCompleted(chapter.id, 'review-1')
        );
      });
    }
  },
  created() {
    this.initUser();
    this.fetchData();
  },
  activated() {
    this.fetchData();
  },
  methods: {
    initUser() {
      const stored = localStorage.getItem('user');
      if (stored) {
        try {
          const u = JSON.parse(stored);
          this.currentUserId = u.id || this.userId || 1;
        } catch {
          this.currentUserId = this.userId || 1;
        }
      } else {
        this.currentUserId = this.userId || 1;
      }
    },

    getAuthHeaders() {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      return token ? { Authorization: `Bearer ${token}` } : {};
    },

    isCompleted(deckId, lessonId) {
      return this.completedLessonKeys.includes(`${deckId}-${lessonId}`);
    },

    getCompletedCount(deckId) {
      let count = 0;
      if (this.isCompleted(deckId, 'new-1')) count++;
      if (this.isCompleted(deckId, 'new-2')) count++;
      if (this.isCompleted(deckId, 'review-1')) count++;
      return count;
    },

    async fetchData() {
      try {
        this.loading = true;

        const [decksRes, progressRes] = await Promise.all([
          axios.get('/api/vocab/decks', {
            headers: this.getAuthHeaders()
          }),
          axios.get('/api/vocab-progress/user-progress', {
            params: { userId: this.currentUserId },
            headers: this.getAuthHeaders()
          })
        ]);

        this.allChapters = decksRes.data?.data || decksRes.data || [];
        this.completedLessonKeys = progressRes.data?.data || [];
      } catch (error) {
        console.error('Lỗi tải dữ liệu ôn tập:', error);
      } finally {
        this.loading = false;
      }
    },

    startReview(chapter, lessonId, title) {
      const fullTitle = `${chapter.title || chapter.name} · ${title}`;
      const routeData = {
        name: 'learning',
        params: { deckId: String(chapter.id) },
        query: {
          deckId: chapter.id,
          lessonId,
          deckTitle: fullTitle,
          userId: this.currentUserId,
          isReview: 'true'
        }
      };

      if (this.$router) {
        this.$router.push(routeData);
      } else {
        window.location.href = `/learning/${chapter.id}?deckId=${chapter.id}&lessonId=${lessonId}&deckTitle=${encodeURIComponent(fullTitle)}&userId=${this.currentUserId}&isReview=true`;
      }
    }
  }
};
</script>