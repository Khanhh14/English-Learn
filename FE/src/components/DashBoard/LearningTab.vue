<!-- src/components/Dashboard/LearningTab.vue -->
<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Dashboard Header -->
    <div class="mb-12">
      <div class="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
        <div>
          <div class="flex items-center gap-3 mb-2">
            <span class="text-4xl">📖</span>
            <h1 class="text-3xl lg:text-4xl font-light text-gray-900 tracking-tight">
              Học tập của tôi
            </h1>
          </div>
          <p class="text-gray-500 text-sm lg:text-base font-light">
            Theo dõi tiến độ học tập và ôn luyện mỗi ngày
          </p>
        </div>
        
        <!-- Stats Cards -->
        <div class="flex gap-4 flex-wrap">
          <div class="bg-white px-6 py-3 rounded-xl shadow-sm border border-gray-100 flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-xl">🔥</div>
            <div>
              <p class="text-xs text-gray-400 font-medium">STREAK</p>
              <p class="text-lg font-semibold text-gray-800">3 ngày</p>
            </div>
          </div>
          <div class="bg-white px-6 py-3 rounded-xl shadow-sm border border-gray-100 flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-xl">⭐</div>
            <div>
              <p class="text-xs text-gray-400 font-medium">ĐIỂM</p>
              <p class="text-lg font-semibold text-gray-800">1,250 XP</p>
            </div>
          </div>
          <div class="bg-white px-6 py-3 rounded-xl shadow-sm border border-gray-100 flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-xl">✅</div>
            <div>
              <p class="text-xs text-gray-400 font-medium">HOÀN THÀNH</p>
              <p class="text-lg font-semibold text-gray-800">{{ chapters.length }} chương</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex flex-col items-center justify-center py-32">
      <div class="relative">
        <div class="w-16 h-16 border-2 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
        <div class="absolute inset-0 flex items-center justify-center text-2xl">📚</div>
      </div>
      <p class="mt-6 text-gray-400 text-sm font-medium">Đang tải dữ liệu bài học...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="errorMessage" class="bg-red-50 rounded-2xl p-8 text-center border border-red-100">
      <span class="text-5xl block mb-4">😅</span>
      <p class="text-red-600 font-medium mb-3">{{ errorMessage }}</p>
      <button @click="fetchLearningData" class="text-blue-500 text-sm font-medium hover:underline">
        Thử lại
      </button>
    </div>

    <!-- Main Content -->
    <div v-else>
      <!-- Chapter Selection -->
      <div class="mb-8">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <span class="w-1 h-6 bg-blue-500 rounded-full"></span>
            Chọn chủ đề
          </h2>
          <span class="text-sm text-gray-400 font-medium">{{ chapters.length }} chủ đề</span>
        </div>
        
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          <button
            v-for="chapter in chapters"
            :key="chapter.id"
            @click="selectChapter(chapter.id)"
            :class="[
              'p-4 rounded-2xl border-2 transition-all duration-300 text-center group cursor-pointer',
              selectedChapterId === chapter.id 
                ? 'border-blue-500 bg-blue-50 shadow-lg shadow-blue-100' 
                : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
            ]"
          >
            <span class="text-3xl block mb-1 group-hover:scale-110 transition-transform">
              {{ chapter.icon }}
            </span>
            <span class="text-sm font-medium text-gray-700 line-clamp-1">{{ chapter.name }}</span>
            <span class="text-xs text-gray-400 mt-1 block">
              {{ chapter.totalWords }} từ
            </span>
          </button>
        </div>
      </div>

      <!-- Selected Chapter Content -->
      <div v-if="selectedChapter" class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Left Column: Lesson Activities -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:p-8">
            <div class="flex items-center justify-between mb-6">
              <div>
                <h2 class="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <span>{{ selectedChapter.icon }}</span>
                  {{ selectedChapter.name }}
                </h2>
                <p class="text-sm text-gray-500 mt-1">{{ selectedChapter.description }}</p>
              </div>
              <span class="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
                {{ currentWords.length }} từ vựng
              </span>
            </div>

            <!-- Lesson Modes -->
            <div class="space-y-4">
              <div 
                v-for="lesson in activeLessons" 
                :key="lesson.id"
                @click="handleStartLesson(selectedChapter.id, lesson.id)"
                class="group bg-gray-50 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 rounded-xl p-5 border-2 border-transparent hover:border-blue-200 transition-all duration-300 cursor-pointer"
              >
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-4 flex-1">
                    <div class="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                      {{ lesson.icon }}
                    </div>
                    <div>
                      <h3 class="font-semibold text-gray-800">{{ lesson.name }}</h3>
                      <p class="text-sm text-gray-500">{{ lesson.description }}</p>
                    </div>
                  </div>
                  <svg class="w-5 h-5 text-gray-300 group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column: Vocabulary List & Stats -->
        <div class="lg:col-span-1 space-y-6">
          <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div class="flex items-center justify-between mb-4">
              <h3 class="font-semibold text-gray-800 flex items-center gap-2">
                <span class="text-lg">📝</span>
                Danh sách từ vựng
              </h3>
              <span class="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600">
                {{ currentWords.length }}
              </span>
            </div>

            <div class="space-y-2 max-h-72 overflow-y-auto pr-1">
              <div
                v-for="item in currentWords"
                :key="item.id"
                @click="playPronunciation(item.term)"
                class="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-indigo-50 transition-colors group cursor-pointer border border-gray-50"
              >
                <span class="font-medium text-gray-700 capitalize text-sm">{{ item.term }}</span>
                <span class="text-gray-400 group-hover:text-indigo-600 transition-colors text-xs flex items-center gap-1">
                  🔊 Nghe
                </span>
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
      currentWords: [],
      loading: true,
      errorMessage: '',
      activeLessons: [
        { id: 'vocab', name: 'Luyện từ vựng qua Flashcard', icon: '🃏', description: 'Ghi nhớ mặt chữ và nghĩa từ vựng' },
        { id: 'listening', name: 'Luyện nghe & Chọn từ', icon: '🎧', description: 'Nghe phát âm chuẩn và nhận diện từ' },
        { id: 'quiz', name: 'Trắc nghiệm phản xạ', icon: '🧠', description: 'Ôn tập và kiểm tra trí nhớ tức thì' }
      ]
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
        
        // Gọi API lấy toàn bộ danh sách Deck trong DB
        const res = await axios.get('http://localhost:4000/api/vocab/decks');
        const rawDecks = res.data.data || [];

        // Map cấu trúc deck từ DB thành đối tượng chapter hoàn chỉnh
        this.chapters = rawDecks.map(deck => ({
          id: deck.id,
          name: deck.title,
          description: deck.description || 'Chủ đề từ vựng quen thuộc',
          icon: this.getDeckIcon(deck.title),
          totalWords: 0
        }));

        // Mặc định chọn chủ đề đầu tiên
        if (this.chapters.length > 0) {
          this.selectChapter(this.chapters[0].id);
        }
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu:', error);
        this.errorMessage = 'Không thể tải danh sách bài học từ máy chủ.';
      } finally {
        this.loading = false;
      }
    },

    async selectChapter(chapterId) {
      this.selectedChapterId = chapterId;
      this.selectedChapter = this.chapters.find(c => c.id === chapterId);
      
      try {
        // Tải danh sách từ tương ứng với Deck đã chọn
        const wordsRes = await axios.get(`http://localhost:4000/api/vocab/decks/${chapterId}/words`);
        this.currentWords = wordsRes.data.data || [];
        
        // Cập nhật số lượng từ hiển thị lên thẻ
        if (this.selectedChapter) {
          this.selectedChapter.totalWords = this.currentWords.length;
        }
      } catch (error) {
        console.error('Lỗi khi tải từ vựng của chủ đề:', error);
      }
    },

    handleStartLesson(chapterId, lessonType) {
      this.$emit('start-learning', { chapterId, lessonType });
    },

    async playPronunciation(term) {
      try {
        const res = await axios.get(`http://localhost:4000/api/vocab/word/${term}`);
        const wordData = res.data?.data;
        const hasAudioUrl = wordData?.audio_url && typeof wordData.audio_url === 'string' && wordData.audio_url.trim().length > 0;

        if (hasAudioUrl) {
          const audio = new Audio(wordData.audio_url);
          audio.play().catch(() => this.speakWithBrowser(term));
        } else {
          this.speakWithBrowser(term);
        }
      } catch (error) {
        this.speakWithBrowser(term);
      }
    },

    speakWithBrowser(text) {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
      }
    },

    getDeckIcon(title) {
      const lowerTitle = (title || '').toLowerCase();
      if (lowerTitle.includes('gia đình') || lowerTitle.includes('family')) return '👨‍👩‍👧‍👦';
      if (lowerTitle.includes('màu') || lowerTitle.includes('color')) return '🎨';
      if (lowerTitle.includes('động vật') || lowerTitle.includes('animal')) return '🦁';
      if (lowerTitle.includes('thức ăn') || lowerTitle.includes('food')) return '🍔';
      if (lowerTitle.includes('công việc') || lowerTitle.includes('job')) return '💼';
      if (lowerTitle.includes('cảm xúc') || lowerTitle.includes('emotion')) return '😊';
      return '📚';
    }
  }
};
</script>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>