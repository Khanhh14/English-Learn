<!-- src/components/Dashboard/LearningTab.vue -->
<template>
  <div>
    <h2 class="text-2xl font-bold text-gray-800 mb-4">📚 Tiếp tục học</h2>
    
    <!-- Loading State -->
    <div v-if="loading" class="text-gray-500 py-8 text-center">
      Đang tải dữ liệu bài học...
    </div>

    <!-- Error State -->
    <div v-else-if="errorMessage" class="text-red-500 bg-red-50 p-4 rounded-xl mb-4">
      {{ errorMessage }}
    </div>

    <!-- Danh sách Deck (Bài học) lấy từ Database -->
    <div v-else class="grid md:grid-cols-2 gap-4">
      <div 
        v-for="(deck, index) in decks" 
        :key="deck.id"
        :class="[
          'rounded-2xl p-6 border transition-all',
          index === 0 
            ? 'bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-100' 
            : 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-100'
        ]"
      >
        <div class="flex items-start justify-between">
          <div>
            <p class="text-sm text-gray-500">{{ index === 0 ? 'Bài học hôm nay' : 'Bài học tiếp theo' }}</p>
            <h3 class="text-xl font-bold text-gray-800 mt-1">{{ deck.title }}</h3>
            <p class="text-sm text-gray-600 mt-2">{{ deck.description || 'Chủ đề từ vựng thông dụng' }}</p>
          </div>
          
          <button 
            @click="handleStartLearning(deck.id)"
            :class="[
              'px-4 py-2 rounded-xl font-medium shadow-md transition-all transform hover:scale-105',
              index === 0 
                ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:shadow-indigo-200' 
                : 'bg-white/80 backdrop-blur-sm text-gray-700 border border-gray-200 hover:bg-white'
            ]"
          >
            {{ index === 0 ? 'Học ngay' : 'Chuẩn bị' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Danh sách từ vựng của bài học đầu tiên (kèm phát âm) -->
    <div v-if="currentWords.length > 0" class="mt-8">
      <div class="flex items-center justify-between mb-3">
        <h3 class="text-lg font-bold text-gray-800">Từ vựng bài học (Bấm để nghe phát âm)</h3>
        <span class="text-xs text-gray-400 font-mono">🔊 Click vào từ để nghe</span>
      </div>

      <div class="flex flex-wrap gap-2">
        <button
          v-for="item in currentWords"
          :key="item.id"
          @click="playPronunciation(item.term)"
          class="flex items-center gap-1.5 px-3.5 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-medium rounded-full text-sm border border-indigo-200 transition-all hover:scale-105 active:scale-95"
        >
          <span class="capitalize">{{ item.term }}</span>
          <span class="text-xs opacity-75">🔊</span>
        </button>
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
      decks: [],
      currentWords: [],
      loading: true,
      errorMessage: ''
    };
  },
  mounted() {
    this.fetchLearningData();
  },
  methods: {
    // 1. Tải danh sách bài học và từ vựng từ Backend
    async fetchLearningData() {
      try {
        this.loading = true;
        const res = await axios.get('http://localhost:4000/api/vocab/decks');
        this.decks = res.data.data || [];

        if (this.decks.length > 0) {
          const firstDeckId = this.decks[0].id;
          const wordsRes = await axios.get(`http://localhost:4000/api/vocab/decks/${firstDeckId}/words`);
          this.currentWords = wordsRes.data.data || [];
        }
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu bài học:', error);
        this.errorMessage = 'Không thể tải danh sách bài học từ máy chủ.';
      } finally {
        this.loading = false;
      }
    },

    // 2. Tra cứu và phát âm an toàn (Hỗ trợ fallback khi mp3 không tải được)
    async playPronunciation(term) {
      try {
        const res = await axios.get(`http://localhost:4000/api/vocab/word/${term}`);
        const wordData = res.data?.data;

        const hasAudioUrl = wordData?.audio_url && typeof wordData.audio_url === 'string' && wordData.audio_url.trim().length > 0;

        if (hasAudioUrl) {
          const audio = new Audio(wordData.audio_url);
          audio.play().catch(() => {
            this.speakWithBrowser(term);
          });
        } else {
          this.speakWithBrowser(term);
        }
      } catch (error) {
        this.speakWithBrowser(term);
      }
    },

    // 3. Giọng đọc trình duyệt Web Speech API
    speakWithBrowser(text) {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
      }
    },

    handleStartLearning(deckId) {
      this.$emit('start-learning', deckId);
    }
  }
};
</script>