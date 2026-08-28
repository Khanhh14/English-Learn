<template>
  <div class="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
    <div class="space-y-8">
      <!-- Header -->
      <header class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 class="text-3xl font-black tracking-tight text-slate-800">Bài học</h1>
          <p class="mt-1 text-sm font-semibold text-slate-400">
            {{ totalAvailableWords }} từ vựng sẵn sàng luyện tập
          </p>
        </div>

        <div class="flex items-center gap-3">
          <div class="flex items-center gap-2 rounded-2xl border-2 border-amber-200 bg-amber-50/80 px-4 py-2 text-sm font-black text-amber-700 shadow-xs">
            <span>{{ totalXp }} <span class="text-xs uppercase">XP</span></span>
          </div>
          <div class="flex items-center gap-2 rounded-2xl border-2 border-orange-200 bg-orange-50/80 px-4 py-2 text-sm font-black text-orange-700 shadow-xs">
            <span>{{ streak }} <span class="text-xs uppercase">ngày streak</span></span>
          </div>
        </div>
      </header>

      <!-- Loading State -->
      <div v-if="loading" class="flex min-h-[300px] flex-col items-center justify-center rounded-3xl border-2 border-slate-100 bg-white p-8 shadow-sm">
        <div class="h-12 w-12 animate-spin rounded-full border-4 border-slate-100 border-t-indigo-600"></div>
        <p class="mt-4 text-sm font-bold text-slate-400">Đang tải danh sách bài học...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="errorMessage" class="rounded-3xl border-2 border-rose-100 bg-rose-50/60 p-8 text-center shadow-sm">
        <p class="font-bold text-rose-600">{{ errorMessage }}</p>
        <button 
          @click="fetchLearningData" 
          class="mt-4 rounded-xl border-b-4 border-indigo-700 bg-indigo-600 px-5 py-2 text-xs font-black text-white hover:bg-indigo-500 active:translate-y-0.5 cursor-pointer"
        >
          Thử lại
        </button>
      </div>

      <!-- Content Area -->
      <div v-else class="space-y-8">
        <!-- Chapter Selector Grid -->
        <div>
          <div class="mb-4 flex items-center justify-between">
            <h2 class="text-xs font-black uppercase tracking-wider text-slate-400">Lộ trình học tập</h2>
            <span class="text-xs font-bold text-slate-400">{{ chapters.length }} chương</span>
          </div>

          <div class="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
            <button
              v-for="(chapter, idx) in chapters"
              :key="chapter.id"
              @click="selectChapter(chapter.id)"
              :disabled="!isChapterUnlocked(chapter, idx)"
              :class="[
                'group relative flex flex-col items-center justify-center rounded-2xl border-2 p-4 text-center transition-all active:translate-y-0.5 cursor-pointer',
                selectedChapterId === chapter.id
                  ? 'border-indigo-600 bg-indigo-50/40 border-b-4 shadow-sm'
                  : isChapterUnlocked(chapter, idx)
                    ? 'border-slate-200/80 bg-white hover:border-slate-300 hover:bg-slate-50'
                    : 'border-slate-200/80 bg-slate-100/70 opacity-60 cursor-not-allowed'
              ]"
            >
              <span 
                class="mb-2 flex h-7 w-7 items-center justify-center rounded-full text-xs font-black"
                :class="selectedChapterId === chapter.id ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'"
              >
                {{ idx + 1 }}
              </span>
              <span class="text-sm font-extrabold text-slate-800 line-clamp-1">{{ chapter.name }}</span>
              <span class="mt-1 text-[11px] font-bold text-slate-400">{{ chapter.totalWords || 0 }} từ</span>
              <span v-if="!isChapterUnlocked(chapter, idx)" class="mt-1 text-[10px] font-black text-slate-400">🔒 Hoàn thành chương trước</span>
            </button>
          </div>
        </div>

        <!-- Selected Chapter Detail -->
        <div v-if="selectedChapter" class="space-y-5">
          <!-- Chapter Banner -->
          <div class="rounded-3xl border-2 border-slate-100 bg-gradient-to-r from-indigo-50/70 via-sky-50/40 to-white p-6 sm:p-7 shadow-xs">
            <div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <span class="inline-block rounded-lg bg-indigo-600 px-2.5 py-1 text-[10px] font-black tracking-wider text-white uppercase">
                  Chương {{ selectedChapter.chapterNumber }}
                </span>
                <h3 class="mt-2 text-2xl font-black text-slate-800 sm:text-3xl">
                  {{ selectedChapter.name }}
                </h3>
                <p class="mt-1 text-xs sm:text-sm font-medium text-slate-500">{{ selectedChapter.description }}</p>
              </div>

              <div class="self-start sm:self-center">
                <span class="rounded-xl border border-slate-200 bg-white/80 px-3 py-1.5 text-xs font-extrabold text-slate-600 shadow-xs">
                  {{ selectedChapter.lessons.length }} bài học
                </span>
              </div>
            </div>
          </div>

          <!-- Lesson Cards -->
          <div class="grid grid-cols-1 gap-3.5">
            <div
              v-for="lesson in selectedChapter.lessons"
              :key="lesson.id"
              @click="handleStartLesson(selectedChapter.id, lesson.id)"
              :class="[
                'group relative flex flex-col justify-between gap-4 rounded-2xl border-2 bg-white p-4 transition-all sm:flex-row sm:items-center sm:p-5 cursor-pointer',
                !isLessonUnlocked(selectedChapter, lesson)
                  ? 'border-slate-200 bg-slate-100/70 opacity-60 cursor-not-allowed'
                  : isLessonCompleted(selectedChapter.id, lesson.id)
                  ? 'border-emerald-200/80 hover:border-emerald-400 hover:shadow-md'
                  : 'border-slate-100 hover:border-indigo-200 hover:shadow-md'
              ]"
            >
              <!-- Left: Lesson Index & Info -->
              <div class="flex items-center gap-4">
                <div 
                  :class="[
                    'flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl font-black text-sm transition-all',
                    !isLessonUnlocked(selectedChapter, lesson)
                      ? 'bg-slate-200 text-slate-400'
                      : isLessonCompleted(selectedChapter.id, lesson.id)
                      ? 'bg-emerald-500 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-700 group-hover:bg-indigo-50 group-hover:text-indigo-600'
                  ]"
                >
                  <span v-if="!isLessonUnlocked(selectedChapter, lesson)">🔒</span>
                  <span v-else-if="isLessonCompleted(selectedChapter.id, lesson.id)">✓</span>
                  <span v-else>{{ lesson.index }}</span>
                </div>

                <div>
                  <div class="flex flex-wrap items-center gap-2">
                    <h4 
                      :class="[
                        'text-base font-extrabold transition-colors',
                        !isLessonUnlocked(selectedChapter, lesson)
                          ? 'text-slate-400'
                          : isLessonCompleted(selectedChapter.id, lesson.id)
                          ? 'text-slate-800 group-hover:text-emerald-600'
                          : 'text-slate-800 group-hover:text-indigo-600'
                      ]"
                    >
                      {{ lesson.title }}
                    </h4>

                    <span 
                      :class="[
                        'rounded-md px-2 py-0.5 text-[10px] font-black uppercase tracking-wider',
                        lesson.type === 'Mới' ? 'bg-sky-100 text-sky-700' : '',
                        lesson.type === 'Ôn tập' ? 'bg-amber-100 text-amber-700' : '',
                        lesson.type === 'Tổng kết' ? 'bg-indigo-100 text-indigo-700' : ''
                      ]"
                    >
                      {{ lesson.type }}
                    </span>

                    <span 
                      v-if="isLessonCompleted(selectedChapter.id, lesson.id)"
                      class="rounded-md bg-emerald-100 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-emerald-700"
                    >
                      Đã hoàn thành
                    </span>
                    <span
                      v-else-if="!isLessonUnlocked(selectedChapter, lesson)"
                      class="rounded-md bg-slate-200 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-slate-500"
                    >
                      Đang khóa
                    </span>
                  </div>
                  <p class="mt-0.5 text-xs font-semibold text-slate-400">
                    {{ lesson.description }}
                  </p>
                </div>
              </div>

              <!-- Right: Questions count & Action Button -->
              <div class="flex items-center justify-between gap-4 border-t border-slate-100 pt-3 sm:border-0 sm:pt-0">
                <span class="text-xs font-bold text-slate-400">
                  {{ lesson.questions }} câu
                </span>

                <button
                  v-if="!isLessonUnlocked(selectedChapter, lesson)"
                  type="button"
                  disabled
                  class="flex items-center gap-1 rounded-xl bg-slate-200 px-5 py-2 text-xs font-black text-slate-500 cursor-not-allowed"
                >
                  <span>🔒</span>
                  <span>Đã khóa</span>
                </button>

                <button 
                  v-else-if="isLessonCompleted(selectedChapter.id, lesson.id)"
                  type="button"
                  class="flex items-center gap-1 rounded-xl border-b-4 border-emerald-700 bg-emerald-600 px-5 py-2 text-xs font-black text-white shadow-xs transition hover:bg-emerald-500 active:border-b-0 active:translate-y-1 cursor-pointer"
                >
                  <span>Ôn tập</span>
                  <span>↺</span>
                </button>

                <button 
                  v-else
                  type="button"
                  class="flex items-center gap-1 rounded-xl border-b-4 border-indigo-700 bg-indigo-600 px-5 py-2 text-xs font-black text-white shadow-xs transition hover:bg-indigo-500 active:border-b-0 active:translate-y-1 cursor-pointer"
                >
                  <span>Bắt đầu</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'LearningTab',
  props: {
    userId: {
      type: [Number, String],
      default: 1
    }
  },
  emits: ['start-learning'],
  data() {
    return {
      chapters: [],
      selectedChapterId: null,
      selectedChapter: null,
      totalAvailableWords: 0,
      loading: true,
      errorMessage: '',
      streak: 0,
      totalXp: 0,
      completedLessonKeys: []
    };
  },
  watch: {
    userId() {
      this.fetchLearningData();
    }
  },
  mounted() {
    this.fetchLearningData();
  },
  activated() {
    this.fetchUserProgress();
  },
  methods: {
    // 1. Kiểm tra trạng thái hoàn thành bài học
    isLessonCompleted(chapterId, lessonId) {
      return this.completedLessonKeys.includes(`${chapterId}-${lessonId}`);
    },

    isLessonUnlocked(chapter, lesson) {
      if (!chapter || !lesson) return false;
      if (chapter.chapterNumber > 1 && !this.isChapterUnlocked(chapter, chapter.chapterNumber - 1)) {
        return false;
      }

      const lessonIndex = chapter.lessons.findIndex((item) => item.id === lesson.id);
      if (lessonIndex <= 0) return true;
      return chapter.lessons
        .slice(0, lessonIndex)
        .every((previousLesson) => this.isLessonCompleted(chapter.id, previousLesson.id));
    },

    isChapterUnlocked(chapter, chapterIndex = chapter?.chapterNumber - 1) {
      if (!chapter || chapterIndex <= 0) return true;
      const previousChapter = this.chapters[chapterIndex - 1];
      if (!previousChapter) return false;
      return previousChapter.lessons.every((lesson) =>
        this.isLessonCompleted(previousChapter.id, lesson.id)
      );
    },

    // 2. Lấy dữ liệu tiến độ từ backend
    async fetchUserProgress() {
      try {
        const res = await axios.get('http://localhost:4000/api/vocab-progress/user-progress', {
          params: { userId: this.userId }
        });
        if (res.data?.success && Array.isArray(res.data.data)) {
          this.completedLessonKeys = res.data.data;
        }
      } catch (error) {
        console.warn('Lỗi khi tải tiến độ học:', error);
      }
    },

    // 3. Tải danh sách bộ chủ đề (decks) và số từ của từng chủ đề
    async fetchLearningData() {
      try {
        this.loading = true;
        this.errorMessage = '';

        const [decksRes] = await Promise.all([
          axios.get('http://localhost:4000/api/vocab/decks'),
          this.fetchUserProgress()
        ]);

        const rawDecks = decksRes.data?.data || decksRes.data || [];
        
        // Nạp và lấy chính xác số từ của từng chương từ API
        const chaptersWithCount = await Promise.all(
          rawDecks.map(async (deck, index) => {
            let count = 0;
            try {
              const countRes = await axios.get(`http://localhost:4000/api/vocab/decks/${deck.id}/words`);
              const list = countRes.data?.data || countRes.data || [];
              count = list.length;
            } catch {
              count = 0;
            }
            return this.buildChapter(deck, index + 1, count);
          })
        );

        this.chapters = chaptersWithCount;

        if (this.chapters.length > 0) {
          const currentId = this.selectedChapterId || this.chapters[0].id;
          await this.selectChapter(currentId);
        }
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu bài học:', error);
        this.errorMessage = 'Không thể tải danh sách bài học từ máy chủ.';
      } finally {
        this.loading = false;
      }
    },

    // 4. Chọn chương
    async selectChapter(chapterId) {
      const chapterIndex = this.chapters.findIndex((chapter) => chapter.id === chapterId);
      const chapter = this.chapters[chapterIndex];
      if (!this.isChapterUnlocked(chapter, chapterIndex)) return;

      this.selectedChapterId = chapterId;
      this.selectedChapter = chapter || null;

      if (!this.selectedChapter) return;

      try {
        const wordsRes = await axios.get(`http://localhost:4000/api/vocab/decks/${chapterId}/words`);
        const words = wordsRes.data?.data || wordsRes.data || [];
        this.totalAvailableWords = words.length;
        this.selectedChapter.totalWords = words.length;
      } catch {
        this.totalAvailableWords = this.selectedChapter.totalWords || 0;
      }
    },

    // 5. Phát sự kiện bắt đầu học
    handleStartLesson(chapterId, lessonId) {
      const chapter = this.chapters.find((item) => item.id === chapterId);
      const lesson = chapter?.lessons.find((item) => item.id === lessonId);
      if (!this.isLessonUnlocked(chapter, lesson)) return;

      this.$emit('start-learning', { 
        chapterId, 
        lessonId, 
        deckId: chapterId,
        deckTitle: this.selectedChapter ? this.selectedChapter.name : 'Bài học',
        isReview: this.isLessonCompleted(chapterId, lessonId)
      });
    },

    // 6. Hàm hỗ trợ component cha gọi trực tiếp để cập nhật ngay state
    async markLessonComplete(chapterId, lessonId) {
      const lessonKey = `${chapterId}-${lessonId}`;
      try {
        await axios.post('http://localhost:4000/api/vocab-progress/complete-lesson', {
          deckId: chapterId,
          lessonId: lessonId,
          userId: this.userId
        });

        if (!this.completedLessonKeys.includes(lessonKey)) {
          this.completedLessonKeys.push(lessonKey);
        }
      } catch (error) {
        console.error('Lỗi khi lưu tiến độ bài học:', error);
      }
    },

    buildChapter(deck, chapterNumber, totalWords = 0) {
      return {
        id: deck.id,
        name: deck.title || `Chương ${chapterNumber}`,
        description: deck.description || '',
        chapterNumber,
        totalWords,
        lessons: this.createLessonSequence(chapterNumber, deck.title)
      };
    },

    createLessonSequence(chapterNumber, deckTitle = '') {
      const titleSuffix = deckTitle ? ` · ${deckTitle}` : ` · Chương ${chapterNumber}`;
      return [
        { id: 'new-1', type: 'Mới', title: `Khám phá từ mới${titleSuffix}`, description: 'Học phát âm và ghi nhớ mặt chữ.', questions: 6 },
        { id: 'new-2', type: 'Mới', title: `Luyện nghe phản xạ${titleSuffix}`, description: 'Nhận biết từ vựng qua âm thanh.', questions: 6 },
        { id: 'review-1', type: 'Ôn tập', title: `Ghép câu & Ngữ cảnh`, description: 'Thực hành sắp xếp câu chuẩn cấu trúc.', questions: 5 },
        { id: 'summary', type: 'Tổng kết', title: `Thử thách vượt ải`, description: 'Tổng hợp từ vựng và câu của bài.', questions: 8 }
      ].map((lesson, index) => ({
        ...lesson,
        index: index + 1
      }));
    }
  }
};
</script>