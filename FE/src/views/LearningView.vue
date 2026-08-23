<!-- src/components/Learning/LearningView.vue -->
<template>
  <div class="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-4">
            <button @click="goBack" class="p-2 hover:bg-gray-100 rounded-xl transition-colors">
              <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
              </svg>
            </button>
            <div>
              <h1 class="text-xl font-bold text-gray-800">{{ effectiveDeckTitle }}</h1>
              <p class="text-sm text-gray-500">{{ currentWords.length }} từ vựng</p>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <span class="text-sm bg-blue-100 text-blue-700 px-3 py-1.5 rounded-full font-medium">
              ⭐ {{ score }} XP
            </span>
            <span class="text-sm bg-green-100 text-green-700 px-3 py-1.5 rounded-full font-medium">
              🔥 {{ streak }} ngày
            </span>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      <!-- Mode Selection Tabs -->
      <div class="bg-white rounded-2xl shadow-sm border border-gray-200 p-2 mb-8">
        <div class="grid grid-cols-3 gap-1">
          <button
            v-for="mode in modes"
            :key="mode.id"
            @click="switchMode(mode.id)"
            :class="[
              'py-3 px-4 rounded-xl font-medium text-sm transition-all duration-200',
              currentMode === mode.id 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
                : 'text-gray-600 hover:bg-gray-50'
            ]"
          >
            <span class="flex items-center justify-center gap-2">
              <span>{{ mode.icon }}</span>
              <span class="hidden sm:inline">{{ mode.label }}</span>
            </span>
          </button>
        </div>
      </div>

      <!-- Mode Content -->
      <div class="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 sm:p-8">
        
        <!-- ============ MODE 1: Từ vựng - Chọn đáp án ============ -->
        <div v-if="currentMode === 'vocab'" class="space-y-6">
          <div class="flex items-center justify-between">
            <h2 class="text-2xl font-bold text-gray-800">📚 Từ vựng - Chọn đáp án</h2>
            <div class="flex items-center gap-4">
              <span class="text-sm text-gray-500">
                {{ vocabCurrentIndex + 1 }}/{{ vocabQuestions.length }}
              </span>
              <button @click="resetVocab" class="text-sm text-gray-500 hover:text-blue-600 transition-colors">
                🔄 Làm lại
              </button>
            </div>
          </div>

          <!-- Progress -->
          <div class="flex items-center gap-4">
            <div class="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div class="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-700"
                   :style="{ width: `${vocabProgress}%` }"></div>
            </div>
            <span class="text-sm font-medium text-gray-600 min-w-fit">
              {{ vocabCorrectAnswers }}/{{ vocabQuestions.length }}
            </span>
          </div>

          <!-- Question -->
          <div v-if="!vocabCompleted" class="space-y-6">
            <div class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 text-center border-2 border-blue-100">
              <p class="text-sm text-gray-500 mb-2">Chọn đáp án đúng</p>
              <h3 class="text-3xl md:text-4xl font-bold text-gray-800">
                {{ vocabQuestions[vocabCurrentIndex]?.question }}
              </h3>
              <p class="text-sm text-gray-400 mt-2">
                {{ vocabQuestions[vocabCurrentIndex]?.hint || 'Chọn 1 trong 4 đáp án' }}
              </p>
            </div>

            <!-- Options -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
              <button
                v-for="(option, idx) in vocabQuestions[vocabCurrentIndex]?.options || []"
                :key="idx"
                @click="selectVocabAnswer(idx)"
                :class="[
                  'px-6 py-4 rounded-xl border-2 transition-all font-medium text-left',
                  vocabSelectedOption === idx && !vocabShowResult ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50',
                  vocabShowResult && idx === vocabQuestions[vocabCurrentIndex]?.correct ? 'border-green-500 bg-green-50 text-green-700' : '',
                  vocabShowResult && vocabSelectedOption === idx && idx !== vocabQuestions[vocabCurrentIndex]?.correct ? 'border-red-500 bg-red-50 text-red-700' : '',
                  vocabShowResult && idx !== vocabQuestions[vocabCurrentIndex]?.correct ? 'opacity-60' : ''
                ]"
                :disabled="vocabShowResult"
              >
                <span class="flex items-center gap-3">
                  <span class="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-sm font-bold text-gray-600">
                    {{ String.fromCharCode(65 + idx) }}
                  </span>
                  {{ option }}
                </span>
              </button>
            </div>

            <!-- Result & Next -->
            <div v-if="vocabShowResult" class="flex items-center justify-between gap-4">
              <div class="flex items-center gap-3">
                <span v-if="vocabQuestions[vocabCurrentIndex]?.isCorrect" class="text-green-600 font-semibold text-lg">
                  ✅ Đúng rồi!
                </span>
                <span v-else class="text-red-600 font-semibold text-lg">
                  ❌ Sai rồi! Đáp án đúng là: {{ vocabQuestions[vocabCurrentIndex]?.options[vocabQuestions[vocabCurrentIndex]?.correct] }}
                </span>
                <button @click="playPronunciation(vocabQuestions[vocabCurrentIndex]?.word)" 
                        class="text-blue-500 hover:text-blue-600 transition-colors text-2xl">
                  🔊
                </button>
              </div>
              <button @click="nextVocabQuestion" 
                      class="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all font-medium shadow-lg shadow-blue-200">
                {{ vocabCurrentIndex < vocabQuestions.length - 1 ? 'Câu tiếp theo →' : 'Xem kết quả' }}
              </button>
            </div>
          </div>

          <!-- Vocab Result -->
          <div v-else class="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 text-center border border-green-200">
            <span class="text-6xl block mb-4">🎉</span>
            <h3 class="text-2xl font-bold text-gray-800 mb-2">Hoàn thành!</h3>
            <p class="text-gray-600 mb-4">
              Bạn đã trả lời đúng <span class="font-bold text-green-600">{{ vocabCorrectAnswers }}</span> / {{ vocabQuestions.length }} câu
            </p>
            <div class="flex gap-4 justify-center flex-wrap">
              <button @click="resetVocab" 
                      class="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all font-medium shadow-lg shadow-blue-200">
                🔄 Làm lại
              </button>
              <button @click="switchMode('listening')" 
                      class="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl transition-all font-medium">
                🎧 Luyện nghe tiếp
              </button>
            </div>
          </div>
        </div>

        <!-- ============ MODE 2: Luyện nghe ============ -->
        <div v-if="currentMode === 'listening'" class="space-y-6">
          <div class="flex items-center justify-between">
            <h2 class="text-2xl font-bold text-gray-800">🎧 Luyện nghe - Chọn đáp án</h2>
            <div class="flex items-center gap-4">
              <span class="text-sm text-gray-500">
                {{ listenCurrentIndex + 1 }}/{{ listenQuestions.length }}
              </span>
              <button @click="resetListening" class="text-sm text-gray-500 hover:text-blue-600 transition-colors">
                🔄 Làm lại
              </button>
            </div>
          </div>

          <!-- Progress -->
          <div class="flex items-center gap-4">
            <div class="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div class="h-full bg-gradient-to-r from-purple-500 to-pink-600 rounded-full transition-all duration-700"
                   :style="{ width: `${listenProgress}%` }"></div>
            </div>
            <span class="text-sm font-medium text-gray-600 min-w-fit">
              {{ listenCorrectAnswers }}/{{ listenQuestions.length }}
            </span>
          </div>

          <!-- Question -->
          <div v-if="!listenCompleted" class="space-y-6">
            <div class="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 text-center border-2 border-purple-100">
              <p class="text-sm text-gray-500 mb-2">👂 Nghe và chọn đáp án đúng</p>
              <button @click="playListenAudio" 
                      class="w-24 h-24 bg-purple-500 hover:bg-purple-600 text-white rounded-full flex items-center justify-center text-4xl transition-all shadow-lg shadow-purple-200 mx-auto mb-4 hover:scale-110">
                {{ isListenPlaying ? '⏸️' : '🔊' }}
              </button>
              <p class="text-sm text-gray-400">Bấm vào loa để nghe</p>
              <div class="mt-4 flex items-center justify-center gap-4">
                <span class="text-sm bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-medium">
                  Đã nghe: {{ listenPlayCount }}/3
                </span>
              </div>
            </div>

            <!-- Options -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
              <button
                v-for="(option, idx) in listenQuestions[listenCurrentIndex]?.options || []"
                :key="idx"
                @click="selectListenAnswer(idx)"
                :class="[
                  'px-6 py-4 rounded-xl border-2 transition-all font-medium text-left',
                  listenSelectedOption === idx && !listenShowResult ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-purple-300 hover:bg-gray-50',
                  listenShowResult && idx === listenQuestions[listenCurrentIndex]?.correct ? 'border-green-500 bg-green-50 text-green-700' : '',
                  listenShowResult && listenSelectedOption === idx && idx !== listenQuestions[listenCurrentIndex]?.correct ? 'border-red-500 bg-red-50 text-red-700' : '',
                  listenShowResult && idx !== listenQuestions[listenCurrentIndex]?.correct ? 'opacity-60' : ''
                ]"
                :disabled="listenShowResult"
              >
                <span class="flex items-center gap-3">
                  <span class="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-sm font-bold text-gray-600">
                    {{ String.fromCharCode(65 + idx) }}
                  </span>
                  {{ option }}
                </span>
              </button>
            </div>

            <!-- Result & Next -->
            <div v-if="listenShowResult" class="flex items-center justify-between gap-4">
              <div class="flex items-center gap-3">
                <span v-if="listenQuestions[listenCurrentIndex]?.isCorrect" class="text-green-600 font-semibold text-lg">
                  ✅ Đúng rồi!
                </span>
                <span v-else class="text-red-600 font-semibold text-lg">
                  ❌ Sai rồi! Đáp án đúng là: {{ listenQuestions[listenCurrentIndex]?.options[listenQuestions[listenCurrentIndex]?.correct] }}
                </span>
              </div>
              <button @click="nextListenQuestion" 
                      class="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl transition-all font-medium shadow-lg shadow-purple-200">
                {{ listenCurrentIndex < listenQuestions.length - 1 ? 'Câu tiếp theo →' : 'Xem kết quả' }}
              </button>
            </div>
          </div>

          <!-- Listen Result -->
          <div v-else class="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 text-center border border-purple-200">
            <span class="text-6xl block mb-4">🎧</span>
            <h3 class="text-2xl font-bold text-gray-800 mb-2">Hoàn thành luyện nghe!</h3>
            <p class="text-gray-600 mb-4">
              Bạn đã trả lời đúng <span class="font-bold text-purple-600">{{ listenCorrectAnswers }}</span> / {{ listenQuestions.length }} câu
            </p>
            <div class="flex gap-4 justify-center flex-wrap">
              <button @click="resetListening" 
                      class="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl transition-all font-medium shadow-lg shadow-purple-200">
                🔄 Làm lại
              </button>
              <button @click="switchMode('sentence')" 
                      class="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-all font-medium">
                ✍️ Luyện câu tiếp
              </button>
            </div>
          </div>
        </div>

        <!-- ============ MODE 3: Luyện câu - Ghép từ ============ -->
        <div v-if="currentMode === 'sentence'" class="space-y-6">
          <div class="flex items-center justify-between">
            <h2 class="text-2xl font-bold text-gray-800">✍️ Luyện câu - Ghép từ</h2>
            <div class="flex items-center gap-4">
              <span class="text-sm text-gray-500">
                {{ sentenceCurrentIndex + 1 }}/{{ sentenceQuestions.length }}
              </span>
              <button @click="resetSentence" class="text-sm text-gray-500 hover:text-blue-600 transition-colors">
                🔄 Làm lại
              </button>
            </div>
          </div>

          <!-- Progress -->
          <div class="flex items-center gap-4">
            <div class="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div class="h-full bg-gradient-to-r from-green-500 to-emerald-600 rounded-full transition-all duration-700"
                   :style="{ width: `${sentenceProgress}%` }"></div>
            </div>
            <span class="text-sm font-medium text-gray-600 min-w-fit">
              {{ sentenceCompleted }}/{{ sentenceQuestions.length }}
            </span>
          </div>

          <!-- Question -->
          <div v-if="!sentenceAllCompleted" class="space-y-6">
            <div class="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-100">
              <p class="text-sm text-gray-500 mb-2">🔀 Ghép các từ thành câu hoàn chỉnh</p>
              <p class="text-lg font-medium text-gray-700 mb-4">
                {{ sentenceQuestions[sentenceCurrentIndex]?.question }}
              </p>

              <!-- Word Bank -->
              <div class="flex flex-wrap gap-2 mb-4 p-4 bg-white rounded-xl min-h-[60px] border-2 border-dashed border-gray-300">
                <span
                  v-for="(word, idx) in sentenceQuestions[sentenceCurrentIndex]?.availableWords || []"
                  :key="'avail-' + idx"
                  @click="selectWord(idx)"
                  class="px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg cursor-pointer transition-all text-sm font-medium hover:scale-105"
                >
                  {{ word }}
                </span>
              </div>

              <!-- Selected Words -->
              <div class="flex flex-wrap gap-2 p-4 bg-white rounded-xl min-h-[60px] border-2 border-green-300">
                <span
                  v-for="(word, idx) in sentenceQuestions[sentenceCurrentIndex]?.selectedWords || []"
                  :key="'sel-' + idx"
                  @click="removeWord(idx)"
                  class="px-4 py-2 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg cursor-pointer transition-all text-sm font-medium hover:scale-105"
                >
                  {{ word }}
                  <span class="text-xs ml-1">✕</span>
                </span>
                <span v-if="sentenceQuestions[sentenceCurrentIndex]?.selectedWords?.length === 0" 
                      class="text-gray-400 text-sm">
                  Bấm vào từ ở trên để ghép câu...
                </span>
              </div>
            </div>

            <!-- Actions -->
            <div class="flex items-center justify-between gap-4">
              <div class="flex gap-2">
                <button @click="clearSentenceSelection" 
                        class="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-all text-sm font-medium">
                  🗑️ Xóa hết
                </button>
                <button @click="shuffleSentenceWords" 
                        class="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-all text-sm font-medium">
                  🔀 Xáo trộn
                </button>
              </div>
              <button @click="checkSentence" 
                      class="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-all font-medium shadow-lg shadow-green-200">
                ✅ Kiểm tra
              </button>
            </div>

            <!-- Result -->
            <div v-if="sentenceQuestions[sentenceCurrentIndex]?.showResult" 
                 class="p-4 rounded-xl" 
                 :class="sentenceQuestions[sentenceCurrentIndex]?.isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'">
              <div class="flex items-center justify-between">
                <div>
                  <span v-if="sentenceQuestions[sentenceCurrentIndex]?.isCorrect" class="text-green-600 font-semibold">
                    ✅ Đúng rồi! Câu hoàn chỉnh: 
                  </span>
                  <span v-else class="text-red-600 font-semibold">
                    ❌ Câu đúng là: 
                  </span>
                  <span class="font-bold text-gray-800">
                    {{ sentenceQuestions[sentenceCurrentIndex]?.correctAnswer }}
                  </span>
                </div>
                <button @click="playPronunciation(sentenceQuestions[sentenceCurrentIndex]?.correctAnswer)" 
                        class="text-blue-500 hover:text-blue-600 transition-colors text-2xl">
                  🔊
                </button>
              </div>
              <button v-if="sentenceQuestions[sentenceCurrentIndex]?.showResult" 
                      @click="nextSentenceQuestion"
                      class="mt-3 w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all font-medium shadow-lg shadow-blue-200">
                {{ sentenceCurrentIndex < sentenceQuestions.length - 1 ? 'Câu tiếp theo →' : 'Xem kết quả' }}
              </button>
            </div>
          </div>

          <!-- Sentence Result -->
          <div v-else class="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 text-center border border-green-200">
            <span class="text-6xl block mb-4">✍️</span>
            <h3 class="text-2xl font-bold text-gray-800 mb-2">Hoàn thành luyện câu!</h3>
            <p class="text-gray-600 mb-4">
              Bạn đã hoàn thành <span class="font-bold text-green-600">{{ sentenceCompleted }}</span> / {{ sentenceQuestions.length }} câu
            </p>
            <div class="flex gap-4 justify-center flex-wrap">
              <button @click="resetSentence" 
                      class="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-all font-medium shadow-lg shadow-green-200">
                🔄 Làm lại
              </button>
              <button @click="switchMode('vocab')" 
                      class="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all font-medium">
                📚 Về từ vựng
              </button>
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
  name: 'LearningView',
  props: {
    deckId: {
      type: [String, Number],
      required: true
    },
    deckTitle: {
      type: String,
      default: 'Bài học'
    }
  },
  data() {
    return {
      // Data
      currentWords: [],
      score: 0,
      streak: 3,
      
      // Modes
      currentMode: 'vocab',
      modes: [
        { id: 'vocab', label: 'Từ vựng', icon: '📚' },
        { id: 'listening', label: 'Luyện nghe', icon: '🎧' },
        { id: 'sentence', label: 'Luyện câu', icon: '✍️' }
      ],
      
      // ===== VOCAB =====
      vocabQuestions: [],
      vocabCurrentIndex: 0,
      vocabSelectedOption: null,
      vocabShowResult: false,
      vocabCorrectAnswers: 0,
      vocabCompleted: false,
      
      // ===== LISTENING =====
      listenQuestions: [],
      listenCurrentIndex: 0,
      listenSelectedOption: null,
      listenShowResult: false,
      listenCorrectAnswers: 0,
      listenCompleted: false,
      listenPlayCount: 0,
      isListenPlaying: false,
      
      // ===== SENTENCE =====
      sentenceQuestions: [],
      sentenceCurrentIndex: 0,
      sentenceCompleted: 0,
      sentenceAllCompleted: false,
      
      loading: false
    };
  },
  computed: {
    vocabProgress() {
      if (this.vocabQuestions.length === 0) return 0;
      return Math.round((this.vocabCorrectAnswers / this.vocabQuestions.length) * 100);
    },
    listenProgress() {
      if (this.listenQuestions.length === 0) return 0;
      return Math.round((this.listenCorrectAnswers / this.listenQuestions.length) * 100);
    },
    sentenceProgress() {
      if (this.sentenceQuestions.length === 0) return 0;
      return Math.round((this.sentenceCompleted / this.sentenceQuestions.length) * 100);
    },
    effectiveDeckTitle() {
      // Prefer explicit query param deckTitle, otherwise use the prop
      return (this.$route && this.$route.query && this.$route.query.deckTitle) || this.deckTitle || 'Bài học';
    }
  },

  mounted() {
    // If a mode is provided via the route query (e.g. ?mode=listening), apply it before fetching data
    const qMode = this.$route && this.$route.query && this.$route.query.mode;
    if (qMode && ['vocab', 'listening', 'sentence'].includes(qMode)) {
      this.currentMode = qMode;
    }

    this.fetchData();
  },

  beforeUnmount() {
    // Cleanup
  },
  methods: {
    // ============ FETCH DATA ============
    async fetchData() {
      try {
        this.loading = true;
        const res = await axios.get(`http://localhost:4000/api/vocab/decks/${this.deckId}/words`);
        this.currentWords = res.data.data || [];
        
        this.generateVocabQuestions();
        this.generateListenQuestions();
        this.generateSentenceQuestions();
        
      } catch (error) {
        console.error('Lỗi tải dữ liệu:', error);
        // Mock data for demo
        this.currentWords = [
          { id: 1, term: 'father', definition: 'bố' },
          { id: 2, term: 'mother', definition: 'mẹ' },
          { id: 3, term: 'brother', definition: 'anh trai' },
          { id: 4, term: 'sister', definition: 'chị gái' },
          { id: 5, term: 'grandfather', definition: 'ông' },
          { id: 6, term: 'grandmother', definition: 'bà' }
        ];
        this.generateVocabQuestions();
        this.generateListenQuestions();
        this.generateSentenceQuestions();
      } finally {
        this.loading = false;
      }
    },

    // ============ NAVIGATION ============
    goBack() {
      this.$router.back();
    },

    switchMode(mode) {
      this.currentMode = mode;
    },

    // ============ PRONUNCIATION ============
    async playPronunciation(text) {
      if (!text) return;
      try {
        const res = await axios.get(`http://localhost:4000/api/vocab/word/${text.split(' ')[0]}`);
        const wordData = res.data?.data;
        const hasAudioUrl = wordData?.audio_url && typeof wordData.audio_url === 'string' && wordData.audio_url.trim().length > 0;

        if (hasAudioUrl) {
          const audio = new Audio(wordData.audio_url);
          audio.play().catch(() => this.speakWithBrowser(text));
        } else {
          this.speakWithBrowser(text);
        }
      } catch (error) {
        this.speakWithBrowser(text);
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

    // ============ VOCAB ============
    generateVocabQuestions() {
      this.vocabQuestions = this.currentWords.map(word => {
        const isEnglish = Math.random() > 0.5;
        const question = isEnglish ? word.term : word.definition;
        const correctAnswer = isEnglish ? word.definition : word.term;
        
        // Generate wrong options
        const otherWords = this.currentWords.filter(w => w.id !== word.id);
        const shuffled = otherWords.sort(() => Math.random() - 0.5).slice(0, 3);
        const wrongOptions = shuffled.map(w => isEnglish ? w.definition : w.term);
        
        const options = [correctAnswer, ...wrongOptions];
        // Shuffle options
        for (let i = options.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [options[i], options[j]] = [options[j], options[i]];
        }
        
        return {
          word: word.term,
          question: question,
          options: options,
          correct: options.indexOf(correctAnswer),
          isCorrect: false,
          hint: isEnglish ? 'Chọn nghĩa tiếng Việt' : 'Chọn nghĩa tiếng Anh'
        };
      });
    },

    selectVocabAnswer(index) {
      if (this.vocabShowResult) return;
      
      this.vocabSelectedOption = index;
      this.vocabShowResult = true;
      
      const question = this.vocabQuestions[this.vocabCurrentIndex];
      if (index === question.correct) {
        question.isCorrect = true;
        this.vocabCorrectAnswers++;
        this.score += 10;
      }
    },

    nextVocabQuestion() {
      if (this.vocabCurrentIndex < this.vocabQuestions.length - 1) {
        this.vocabCurrentIndex++;
        this.vocabSelectedOption = null;
        this.vocabShowResult = false;
      } else {
        this.vocabCompleted = true;
      }
    },

    resetVocab() {
      this.vocabCurrentIndex = 0;
      this.vocabSelectedOption = null;
      this.vocabShowResult = false;
      this.vocabCorrectAnswers = 0;
      this.vocabCompleted = false;
      this.generateVocabQuestions();
    },

    // ============ LISTENING ============
    generateListenQuestions() {
      this.listenQuestions = this.currentWords.map(word => {
        const options = [word.term];
        const otherWords = this.currentWords.filter(w => w.id !== word.id);
        const shuffled = otherWords.sort(() => Math.random() - 0.5).slice(0, 3);
        options.push(...shuffled.map(w => w.term));
        
        // Shuffle options
        for (let i = options.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [options[i], options[j]] = [options[j], options[i]];
        }
        
        return {
          word: word.term,
          definition: word.definition,
          options: options,
          correct: options.indexOf(word.term),
          isCorrect: false
        };
      });
    },

    playListenAudio() {
      const question = this.listenQuestions[this.listenCurrentIndex];
      if (!question) return;
      
      this.isListenPlaying = true;
      this.listenPlayCount++;
      this.playPronunciation(question.word);
      setTimeout(() => {
        this.isListenPlaying = false;
      }, 3000);
    },

    selectListenAnswer(index) {
      if (this.listenShowResult) return;
      
      this.listenSelectedOption = index;
      this.listenShowResult = true;
      
      const question = this.listenQuestions[this.listenCurrentIndex];
      if (index === question.correct) {
        question.isCorrect = true;
        this.listenCorrectAnswers++;
        this.score += 10;
      }
    },

    nextListenQuestion() {
      if (this.listenCurrentIndex < this.listenQuestions.length - 1) {
        this.listenCurrentIndex++;
        this.listenSelectedOption = null;
        this.listenShowResult = false;
        this.listenPlayCount = 0;
      } else {
        this.listenCompleted = true;
      }
    },

    resetListening() {
      this.listenCurrentIndex = 0;
      this.listenSelectedOption = null;
      this.listenShowResult = false;
      this.listenCorrectAnswers = 0;
      this.listenCompleted = false;
      this.listenPlayCount = 0;
      this.generateListenQuestions();
    },

    // ============ SENTENCE ============
    generateSentenceQuestions() {
      const sentences = [
        { vi: 'Tôi yêu gia đình của tôi', en: 'I love my family' },
        { vi: 'Mẹ tôi nấu ăn rất ngon', en: 'My mother cooks very well' },
        { vi: 'Anh trai tôi thích đá bóng', en: 'My brother likes playing soccer' },
        { vi: 'Em gái tôi học giỏi', en: 'My sister studies well' },
        { vi: 'Ông bà tôi sống ở nông thôn', en: 'My grandparents live in the countryside' }
      ];

      this.sentenceQuestions = sentences.map((s, idx) => {
        const words = s.en.split(' ');
        const shuffled = [...words].sort(() => Math.random() - 0.5);
        return {
          id: idx,
          question: `Sắp xếp thành câu tiếng Anh: "${s.vi}"`,
          correctAnswer: s.en,
          availableWords: shuffled,
          selectedWords: [],
          showResult: false,
          isCorrect: false
        };
      });
    },

    selectWord(index) {
      const question = this.sentenceQuestions[this.sentenceCurrentIndex];
      if (question.showResult) return;
      
      const word = question.availableWords[index];
      if (word) {
        question.selectedWords.push(word);
        question.availableWords.splice(index, 1);
      }
    },

    removeWord(index) {
      const question = this.sentenceQuestions[this.sentenceCurrentIndex];
      if (question.showResult) return;
      
      const word = question.selectedWords[index];
      if (word) {
        question.availableWords.push(word);
        question.selectedWords.splice(index, 1);
        // Sort to maintain consistency
        question.availableWords.sort(() => Math.random() - 0.5);
      }
    },

    clearSentenceSelection() {
      const question = this.sentenceQuestions[this.sentenceCurrentIndex];
      if (question.showResult) return;
      
      question.availableWords = [...question.availableWords, ...question.selectedWords];
      question.selectedWords = [];
      question.availableWords.sort(() => Math.random() - 0.5);
    },

    shuffleSentenceWords() {
      const question = this.sentenceQuestions[this.sentenceCurrentIndex];
      if (question.showResult) return;
      
      const allWords = [...question.availableWords, ...question.selectedWords];
      const shuffled = allWords.sort(() => Math.random() - 0.5);
      question.availableWords = shuffled;
      question.selectedWords = [];
    },

    checkSentence() {
      const question = this.sentenceQuestions[this.sentenceCurrentIndex];
      if (question.showResult) return;
      
      const userAnswer = question.selectedWords.join(' ').trim();
      question.isCorrect = userAnswer.toLowerCase() === question.correctAnswer.toLowerCase();
      question.showResult = true;
      
      if (question.isCorrect) {
        this.sentenceCompleted++;
        this.score += 15;
      }
    },

    nextSentenceQuestion() {
      if (this.sentenceCurrentIndex < this.sentenceQuestions.length - 1) {
        this.sentenceCurrentIndex++;
      } else {
        this.sentenceAllCompleted = true;
      }
    },

    resetSentence() {
      this.sentenceCurrentIndex = 0;
      this.sentenceCompleted = 0;
      this.sentenceAllCompleted = false;
      this.generateSentenceQuestions();
    }
  }
};
</script>

<style scoped>
/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Responsive */
@media (max-width: 640px) {
  .grid-cols-3 {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* Animation */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.bg-gradient-to-br {
  animation: fadeIn 0.3s ease-out;
}

/* Button hover effects */
button:active {
  transform: scale(0.97);
}
</style>