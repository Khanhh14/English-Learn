<template>
  <div class="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
    <div class="space-y-8">
      <!-- Header -->
      <header class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div class="flex items-center gap-2.5">
            <span class="text-3xl">📖</span>
            <h1 class="text-3xl font-black tracking-tight text-slate-800">Bài học</h1>
          </div>
          <p class="mt-1 text-sm font-semibold text-slate-400">
            {{ totalAvailableWords }} từ vựng sẵn sàng luyện tập
          </p>
        </div>

        <div class="flex items-center gap-3">
          <div class="flex items-center gap-2 rounded-2xl border-2 border-amber-200 bg-amber-50/80 px-4 py-2 text-sm font-black text-amber-700 shadow-xs">
            <span>⭐</span>
            <span>{{ totalXp }} <span class="text-xs uppercase">XP</span></span>
          </div>
          <div class="flex items-center gap-2 rounded-2xl border-2 border-orange-200 bg-orange-50/80 px-4 py-2 text-sm font-black text-orange-700 shadow-xs">
            <span>🔥</span>
            <span>{{ streak }} <span class="text-xs uppercase">ngày</span></span>
          </div>
        </div>
      </header>

      <!-- Loading State -->
      <div v-if="loading" class="flex min-h-[300px] flex-col items-center justify-center rounded-3xl border-2 border-slate-100 bg-white p-8 shadow-sm">
        <div class="relative flex items-center justify-center">
          <div class="h-14 w-14 animate-spin rounded-full border-4 border-slate-100 border-t-indigo-600"></div>
          <span class="absolute text-xl">📚</span>
        </div>
        <p class="mt-4 text-sm font-bold text-slate-400">Đang tải danh sách bài học...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="errorMessage" class="rounded-3xl border-2 border-rose-100 bg-rose-50/60 p-8 text-center shadow-sm">
        <span class="mb-2 block text-4xl">😅</span>
        <p class="font-bold text-rose-600">{{ errorMessage }}</p>
        <button 
          @click="fetchLearningData" 
          class="mt-4 rounded-xl border-b-4 border-indigo-700 bg-indigo-600 px-5 py-2 text-xs font-black text-white hover:bg-indigo-500 active:translate-y-0.5"
        >
          Thử lại
        </button>
      </div>

      <!-- Content Area -->
      <div v-else class="space-y-8">
        <!-- Chapter Selector Pills/Grid -->
        <div>
          <div class="mb-4 flex items-center justify-between">
            <h2 class="text-xs font-black uppercase tracking-wider text-slate-400">Lộ trình học tập</h2>
            <span class="text-xs font-bold text-slate-400">{{ chapters.length }} chương</span>
          </div>

          <div class="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
            <button
              v-for="chapter in chapters"
              :key="chapter.id"
              @click="selectChapter(chapter.id)"
              :class="[
                'group relative flex flex-col items-center justify-center rounded-2xl border-2 p-3.5 text-center transition-all active:translate-y-0.5',
                selectedChapterId === chapter.id
                  ? 'border-indigo-600 bg-indigo-50/40 border-b-4 shadow-sm'
                  : 'border-slate-200/80 bg-white hover:border-slate-300 hover:bg-slate-50'
              ]"
            >
              <span class="mb-1 flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-[11px] font-black group-hover:bg-indigo-100 group-hover:text-indigo-600"
                :class="selectedChapterId === chapter.id ? 'bg-indigo-600 text-white group-hover:bg-indigo-600 group-hover:text-white' : 'text-slate-500'"
              >
                {{ chapter.chapterNumber }}
              </span>
              <span class="text-2xl transition group-hover:scale-110">{{ chapter.icon }}</span>
              <span class="mt-1.5 text-xs font-extrabold text-slate-800 line-clamp-1">{{ chapter.name }}</span>
              <span class="text-[10px] font-bold text-slate-400">{{ chapter.totalWords || 0 }} từ</span>
            </button>
          </div>
        </div>

        <!-- Selected Chapter Detail & Lesson List -->
        <div v-if="selectedChapter" class="space-y-5">
          <!-- Chapter Banner -->
          <div class="rounded-3xl border-2 border-slate-100 bg-gradient-to-r from-indigo-50/70 via-sky-50/40 to-white p-6 sm:p-7 shadow-xs">
            <div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <span class="inline-block rounded-lg bg-indigo-600 px-2.5 py-1 text-[10px] font-black tracking-wider text-white uppercase">
                  Chương {{ selectedChapter.chapterNumber }}
                </span>
                <h3 class="mt-2 text-2xl font-black text-slate-800 sm:text-3xl flex items-center gap-2">
                  <span>{{ selectedChapter.icon }}</span> {{ selectedChapter.name }}
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

          <!-- Redesigned Lesson Cards -->
          <div class="grid grid-cols-1 gap-3.5">
            <div
              v-for="lesson in selectedChapter.lessons"
              :key="lesson.id"
              @click="handleStartLesson(selectedChapter.id, lesson.id)"
              class="group relative flex flex-col justify-between gap-4 rounded-2xl border-2 border-slate-100 bg-white p-4 transition-all hover:border-indigo-200 hover:shadow-md sm:flex-row sm:items-center sm:p-5 cursor-pointer"
            >
              <!-- Left: Lesson Info -->
              <div class="flex items-center gap-4">
                <!-- Lesson Index Icon Box -->
                <div class="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-slate-50 border border-slate-100 text-2xl shadow-inner group-hover:scale-105 group-hover:bg-indigo-50 transition-all">
                  <span>{{ lesson.icon }}</span>
                  <span class="absolute -top-1.5 -left-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-slate-800 text-[10px] font-black text-white">
                    {{ lesson.index }}
                  </span>
                </div>

                <!-- Text Detail -->
                <div>
                  <div class="flex items-center gap-2">
                    <h4 class="text-base font-extrabold text-slate-800 group-hover:text-indigo-600 transition-colors">
                      {{ lesson.title }}
                    </h4>
                    <span 
                      :class="[
                        'rounded-md px-2 py-0.5 text-[10px] font-black uppercase tracking-wider',
                        lesson.type === 'Mới' ? 'bg-emerald-100 text-emerald-700' : '',
                        lesson.type === 'Ôn tập' ? 'bg-amber-100 text-amber-700' : '',
                        lesson.type === 'Tổng kết' ? 'bg-indigo-100 text-indigo-700' : ''
                      ]"
                    >
                      {{ lesson.type }}
                    </span>
                  </div>
                  <p class="mt-0.5 text-xs font-semibold text-slate-400">
                    {{ lesson.description }}
                  </p>
                </div>
              </div>

              <!-- Right: Meta & CTA Button -->
              <div class="flex items-center justify-between gap-4 border-t border-slate-100 pt-3 sm:border-0 sm:pt-0">
                <span class="flex items-center gap-1.5 text-xs font-bold text-slate-400">
                  <span>📝</span> {{ lesson.questions }} câu
                </span>

                <button 
                  type="button"
                  class="flex items-center gap-1 rounded-xl border-b-4 border-indigo-700 bg-indigo-600 px-5 py-2 text-xs font-black text-white shadow-xs transition hover:bg-indigo-500 active:border-b-0 active:translate-y-1"
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
  emits: ['start-learning'],
  data() {
    return {
      chapters: [],
      selectedChapterId: null,
      selectedChapter: null,
      totalAvailableWords: 0,
      loading: true,
      errorMessage: '',
      streak: 3,
      totalXp: 0
    };
  },
  mounted() {
    this.fetchLearningData();
  },
  methods: {
    async fetchLearningData() {
      try {
        this.loading = true;
        this.errorMessage = '';

        const res = await axios.get('http://localhost:4000/api/vocab/decks');
        const rawDecks = res.data?.data || res.data || [];

        this.chapters = rawDecks.length
          ? rawDecks.map((deck, index) => this.buildChapter(deck, index + 1))
          : this.getFallbackChapters();

        if (this.chapters.length > 0) {
          await this.selectChapter(this.chapters[0].id);
        }
      } catch (error) {
        console.warn('Lỗi khi tải dữ liệu từ API:', error);
        this.chapters = this.getFallbackChapters();
        if (this.chapters.length > 0) {
          this.selectChapter(this.chapters[0].id);
        }
      } finally {
        this.loading = false;
      }
    },

    async selectChapter(chapterId) {
      this.selectedChapterId = chapterId;
      this.selectedChapter = this.chapters.find((chapter) => chapter.id === chapterId) || null;

      if (!this.selectedChapter) return;

      try {
        const wordsRes = await axios.get(`http://localhost:4000/api/vocab/decks/${chapterId}/words`);
        const words = wordsRes.data?.data || wordsRes.data || [];
        this.totalAvailableWords = words.length;
        this.selectedChapter.totalWords = words.length;
      } catch {
        this.totalAvailableWords = this.selectedChapter.totalWords || 5;
      }
    },

    handleStartLesson(chapterId, lessonId) {
      this.$emit('start-learning', { 
        chapterId, 
        lessonId, 
        deckId: chapterId,
        deckTitle: this.selectedChapter ? this.selectedChapter.name : 'Bài học'
      });
    },

    buildChapter(deck, chapterNumber) {
      return {
        id: deck.id,
        name: deck.title || `Chương ${chapterNumber}`,
        description: deck.description || 'Chủ đề từ vựng mới và ôn tập theo từng bài học.',
        icon: this.getDeckIcon(deck.title),
        chapterNumber,
        totalWords: 5,
        lessons: this.createLessonSequence(chapterNumber, deck.title)
      };
    },

    createLessonSequence(chapterNumber, deckTitle = '') {
      const titleSuffix = deckTitle ? ` · ${deckTitle}` : ` · Chương ${chapterNumber}`;
      return [
        { id: 'new-1', type: 'Mới', title: `Khám phá từ mới${titleSuffix}`, description: 'Học phát âm và ghi nhớ mặt chữ.', icon: '🧩', questions: 6 },
        { id: 'new-2', type: 'Mới', title: `Luyện nghe phản xạ${titleSuffix}`, description: 'Nhận biết từ vựng qua âm thanh.', icon: '🔊', questions: 6 },
        { id: 'review-1', type: 'Ôn tập', title: `Ghép câu & Ngữ cảnh`, description: 'Thực hành sắp xếp câu chuẩn cấu trúc.', icon: '✍️', questions: 5 },
        { id: 'summary', type: 'Tổng kết', title: `Thử thách vượt ải`, description: 'Tổng hợp từ vựng và câu của bài.', icon: '🏆', questions: 8 }
      ].map((lesson, index) => ({
        ...lesson,
        index: index + 1
      }));
    },

    getFallbackChapters() {
      return [
        { id: 4, name: 'Gia đình', description: 'Các từ vựng cơ bản về chủ đề gia đình', icon: '👨‍👩‍👧‍👦', chapterNumber: 1, totalWords: 7, lessons: this.createLessonSequence(1, 'Gia đình') },
        { id: 5, name: 'Màu sắc', description: 'Từ vựng về các màu sắc quen thuộc', icon: '🎨', chapterNumber: 2, totalWords: 6, lessons: this.createLessonSequence(2, 'Màu sắc') },
        { id: 6, name: 'Động vật', description: 'Tên các loài động vật hoang dã và quen thuộc', icon: '🦁', chapterNumber: 3, totalWords: 6, lessons: this.createLessonSequence(3, 'Động vật') },
        { id: 7, name: 'Thức ăn', description: 'Từ vựng về món ăn, thức uống và ẩm thực', icon: '🍔', chapterNumber: 4, totalWords: 6, lessons: this.createLessonSequence(4, 'Thức ăn') },
        { id: 8, name: 'Công việc', description: 'Tên các nghề nghiệp phổ biến trong xã hội', icon: '💼', chapterNumber: 5, totalWords: 5, lessons: this.createLessonSequence(5, 'Công việc') },
        { id: 9, name: 'Cảm xúc', description: 'Từ vựng miêu tả cảm xúc và tâm trạng', icon: '😊', chapterNumber: 6, totalWords: 5, lessons: this.createLessonSequence(6, 'Cảm xúc') }
      ];
    },

    getDeckIcon(title) {
      const lower = (title || '').toLowerCase();
      if (lower.includes('gia đình') || lower.includes('family')) return '👨‍👩‍👧‍👦';
      if (lower.includes('màu') || lower.includes('color')) return '🎨';
      if (lower.includes('động vật') || lower.includes('animal')) return '🦁';
      if (lower.includes('thức ăn') || lower.includes('food')) return '🍔';
      if (lower.includes('công việc') || lower.includes('job')) return '💼';
      if (lower.includes('cảm xúc') || lower.includes('emotion')) return '😊';
      return '📚';
    }
  }
};
</script>