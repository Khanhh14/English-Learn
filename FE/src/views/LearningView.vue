<template>
  <div class="min-h-screen bg-[#f8fafc] font-sans text-slate-800 antialiased selection:bg-indigo-500 selection:text-white pb-28">
    <!-- Header -->
    <header class="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
      <div class="mx-auto flex max-w-4xl items-center justify-between px-4 py-3.5 sm:px-6">
        <div class="flex items-center gap-3">
          <button 
            @click="goBack" 
            class="flex h-10 w-10 items-center justify-center rounded-2xl border-2 border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-800 active:translate-y-0.5 cursor-pointer"
            title="Quay lại"
          >
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div>
            <h1 class="text-base font-extrabold text-slate-800 sm:text-lg">{{ effectiveDeckTitle }}</h1>
            <p class="text-xs font-semibold text-slate-400">{{ currentWords.length }} từ vựng sẵn sàng</p>
          </div>
        </div>

        <!-- Badges -->
        <div class="flex items-center gap-2">
          <div class="flex items-center gap-1.5 rounded-2xl border-2 border-orange-200/80 bg-orange-50/80 px-3.5 py-1.5 text-xs font-black text-orange-700 shadow-xs sm:text-sm">
            <span>🔥</span>
            <span>{{ currentStreakCount }} <span class="text-[10px] font-bold uppercase sm:text-xs">ngày</span></span>
          </div>
        </div>
      </div>
    </header>

    <main class="mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-8">
      <!-- Loading State -->
      <div v-if="loading" class="flex min-h-[380px] flex-col items-center justify-center rounded-3xl border-2 border-slate-100 bg-white p-8 shadow-sm">
        <div class="relative flex items-center justify-center">
          <div class="h-16 w-16 animate-spin rounded-full border-4 border-slate-100 border-t-indigo-600"></div>
          <span class="absolute text-2xl">📚</span>
        </div>
        <p class="mt-4 font-bold text-slate-400">Đang tải dữ liệu từ CSDL...</p>
      </div>

      <!-- Empty State -->
      <div v-else-if="!currentWords.length" class="rounded-3xl border-2 border-rose-100 bg-rose-50/60 p-8 text-center shadow-sm">
        <p class="font-bold text-rose-600">Chủ đề này chưa có từ vựng nào trong CSDL!</p>
        <button 
          @click="goBack" 
          class="mt-4 rounded-xl border-b-4 border-indigo-700 bg-indigo-600 px-5 py-2 text-xs font-black text-white hover:bg-indigo-500 cursor-pointer"
        >
          Quay lại
        </button>
      </div>

      <!-- Exercise Area -->
      <div v-else class="space-y-6">
        <!-- Progress Bar Header -->
        <div v-if="!isFinished" class="space-y-2.5">
          <div class="flex items-center justify-between text-xs font-black tracking-wider uppercase">
            <span class="rounded-xl bg-indigo-50 px-3 py-1 text-indigo-600 ring-1 ring-indigo-500/10">
              {{ currentExercise?.typeLabel || 'Bài học' }}
            </span>
            <span class="text-slate-400">Câu {{ currentStep + 1 }} / {{ lessonQueue.length }}</span>
          </div>
          <div class="h-3.5 w-full overflow-hidden rounded-full bg-slate-200/70 p-0.5 shadow-inner">
            <div 
              class="h-full rounded-full bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-400 transition-all duration-500 ease-out" 
              :style="{ width: `${progress}%` }"
            ></div>
          </div>
        </div>

        <!-- Finished Screen -->
        <div v-if="isFinished" class="rounded-[32px] border-2 border-slate-100 bg-white p-8 text-center shadow-xl shadow-slate-200/50 sm:p-12">
          <div class="mx-auto mb-5 flex h-24 w-24 items-center justify-center rounded-full bg-emerald-50 text-5xl shadow-inner ring-8 ring-emerald-50/50 animate-bounce">
            🎉
          </div>
          <h2 class="text-3xl font-black text-slate-800">Hoàn thành bài học!</h2>
          <p class="mt-2 text-base font-medium text-slate-500">
            Bạn đã nhận <strong class="text-indigo-600">+10 XP</strong> và tăng chuỗi lên 🔥 <strong class="text-orange-600">{{ currentStreakCount }} ngày liên tiếp</strong>!
          </p>

          <div class="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <button 
              @click="resetLessonFlow" 
              class="rounded-2xl border-b-4 border-indigo-800 bg-indigo-600 px-7 py-3.5 font-black text-white shadow-lg shadow-indigo-100 transition hover:bg-indigo-500 active:border-b-0 active:translate-y-1 cursor-pointer"
            >
              Làm lại bài học
            </button>
            <button 
              @click="goBack" 
              class="rounded-2xl border-2 border-b-4 border-slate-200 bg-white px-7 py-3.5 font-black text-slate-700 transition hover:bg-slate-50 active:border-b-2 active:translate-y-0.5 cursor-pointer"
            >
              Trở về danh sách
            </button>
          </div>
        </div>

        <!-- Question Body -->
        <div v-else-if="currentExercise" class="rounded-[32px] border-2 border-slate-100 bg-white p-6 shadow-xl shadow-slate-100/80 sm:p-8">
          <!-- Vocab & Listening -->
          <div v-if="currentExercise.type === 'vocab' || currentExercise.type === 'listening'" class="space-y-6">
            <div class="flex flex-col items-center justify-center rounded-2xl bg-gradient-to-b from-slate-50/80 to-slate-100/40 px-6 py-8 text-center border border-slate-100">
              <span class="text-xs font-extrabold uppercase tracking-widest text-slate-400">
                {{ currentExercise.type === 'listening' ? 'Luyện nghe phản xạ (Nghe và chọn đáp án)' : 'Chọn nghĩa tiếng Anh tương ứng' }}
              </span>

              <!-- Speaker Button: Listening Mode Only -->
              <div v-if="currentExercise.type === 'listening'" class="my-6 flex flex-col items-center gap-3">
                <button 
                  @click="playPronunciation(currentExercise.audioTargetText, currentExercise.audioUrl)" 
                  :class="[
                    'group flex h-24 w-24 items-center justify-center rounded-3xl border-b-4 transition-all active:translate-y-1 active:border-b-0 shadow-md cursor-pointer',
                    isPlaying 
                      ? 'border-indigo-800 bg-indigo-600 text-white animate-pulse' 
                      : 'border-indigo-300 bg-indigo-50 text-indigo-600 hover:bg-indigo-100'
                  ]"
                >
                  <span class="text-4xl transition group-hover:scale-110">🔊</span>
                </button>
                <span class="text-xs font-bold text-indigo-600">Nhấn vào loa để nghe</span>
              </div>

              <!-- Question Prompt for Vocab Mode -->
              <h3 v-else class="mt-4 text-2xl font-black text-slate-800 sm:text-3xl">
                {{ currentExercise.prompt }}
              </h3>
            </div>

            <!-- Options Grid -->
            <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <button
                v-for="(option, idx) in currentExercise.options"
                :key="idx"
                type="button"
                @click="selectAnswer(idx)"
                :disabled="showResult"
                :class="[
                  'group flex items-center gap-3.5 rounded-2xl border-2 border-b-4 p-4 text-left font-bold transition-all active:border-b-2 active:translate-y-0.5 cursor-pointer',
                  !showResult && selectedAnswer !== idx ? 'border-slate-200 bg-white text-slate-700 hover:border-indigo-300 hover:bg-indigo-50/30' : '',
                  selectedAnswer === idx && !showResult ? 'border-indigo-600 bg-indigo-50 text-indigo-900 border-b-indigo-700' : '',
                  showResult && currentExercise.correct === idx ? 'border-emerald-500 bg-emerald-50 text-emerald-900 border-b-emerald-600' : '',
                  showResult && selectedAnswer === idx && selectedAnswer !== currentExercise.correct ? 'border-rose-500 bg-rose-50 text-rose-900 border-b-rose-600' : '',
                  showResult && selectedAnswer !== idx && currentExercise.correct !== idx ? 'opacity-40 border-slate-200 bg-slate-50 border-b-slate-200' : ''
                ]"
              >
                <span :class="[
                  'flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-black transition-colors',
                  showResult && currentExercise.correct === idx ? 'bg-emerald-500 text-white' : 
                  showResult && selectedAnswer === idx ? 'bg-rose-500 text-white' : 'bg-slate-100 text-slate-500 group-hover:bg-indigo-100 group-hover:text-indigo-700'
                ]">
                  {{ String.fromCharCode(65 + idx) }}
                </span>
                <span class="flex-1 text-base">{{ option }}</span>
              </button>
            </div>
          </div>

          <!-- Sentence Ordering -->
          <div v-else-if="currentExercise.type === 'sentence'" class="space-y-6">
            <div class="rounded-2xl border border-indigo-100/70 bg-gradient-to-br from-indigo-50/50 via-sky-50/30 to-transparent p-5">
              <span class="text-xs font-black uppercase tracking-widest text-indigo-500">Dịch câu sau:</span>
              <h3 class="mt-1 text-xl font-extrabold text-slate-800 sm:text-2xl">
                "{{ currentExercise.viPrompt }}"
              </h3>
            </div>

            <!-- Target Slot Area -->
            <div class="min-h-[110px] rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/60 p-4 transition-colors">
              <div class="flex flex-wrap gap-2.5">
                <button 
                  v-for="(word, index) in currentExercise.selectedWords" 
                  :key="`${word}-${index}`" 
                  @click="removeSentenceWord(index)" 
                  type="button" 
                  :disabled="currentExercise.showResult"
                  class="rounded-xl border-2 border-b-4 border-indigo-700 bg-indigo-600 px-4 py-2.5 text-sm font-extrabold text-white shadow-sm transition hover:bg-indigo-500 active:border-b-2 active:translate-y-0.5 cursor-pointer"
                >
                  {{ word }}
                </button>
                <div v-if="!currentExercise.selectedWords.length" class="flex h-16 w-full items-center justify-center text-sm font-bold text-slate-400">
                  Nhấp vào các từ bên dưới để ghép câu hoàn chỉnh
                </div>
              </div>
            </div>

            <!-- Word Bank -->
            <div class="flex min-h-[70px] flex-wrap justify-center gap-2.5 py-2">
              <button 
                v-for="(word, index) in currentExercise.availableWords" 
                :key="`${word}-${index}`" 
                @click="selectSentenceWord(index)" 
                type="button" 
                :disabled="currentExercise.showResult"
                class="rounded-xl border-2 border-b-4 border-slate-200 bg-white px-4 py-2.5 text-sm font-extrabold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 active:border-b-2 active:translate-y-0.5 cursor-pointer"
              >
                {{ word }}
              </button>
            </div>

            <!-- Single Check Button -->
            <div v-if="!currentExercise.showResult" class="pt-2">
              <button 
                @click="checkSentenceAnswer" 
                :disabled="!currentExercise.selectedWords.length"
                class="w-full rounded-2xl border-b-4 border-indigo-800 bg-indigo-600 py-3.5 text-center font-black text-white shadow-lg shadow-indigo-100 transition hover:bg-indigo-500 active:border-b-0 active:translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:border-b-0 cursor-pointer"
              >
                Kiểm tra đáp án
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Bottom Result Feedback Bar -->
    <footer 
      v-if="!isFinished && (showResult || (currentExercise && currentExercise.showResult))" 
      :class="[
        'fixed bottom-0 left-0 right-0 z-50 border-t-2 bg-white/95 px-4 py-4 shadow-2xl backdrop-blur-md transition-all sm:px-8',
        isCurrentAnswerCorrect 
          ? 'border-emerald-200 bg-emerald-50/90 text-emerald-950' 
          : 'border-rose-200 bg-rose-50/90 text-rose-950'
      ]"
    >
      <div class="mx-auto flex max-w-3xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div class="flex items-center gap-3">
          <div :class="[
            'flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-2xl',
            isCurrentAnswerCorrect ? 'bg-emerald-100' : 'bg-rose-100'
          ]">
            {{ isCurrentAnswerCorrect ? '🎉' : '💡' }}
          </div>
          <div>
            <h4 class="text-lg font-black">
              {{ isCurrentAnswerCorrect ? 'Chính xác! Làm rất tốt.' : 'Chưa đúng rồi, câu này sẽ xuất hiện lại ở cuối!' }}
            </h4>
            <p v-if="!isCurrentAnswerCorrect" class="text-xs font-semibold sm:text-sm text-rose-800">
              Đáp án đúng là: <span class="font-bold underline">{{ currentExercise.type === 'sentence' ? currentExercise.correctAnswer : currentExercise.options[currentExercise.correct] }}</span>
            </p>
          </div>
        </div>

        <button 
          @click="nextExercise" 
          :class="[
            'rounded-2xl border-b-4 px-8 py-3 text-center text-sm font-black text-white shadow-md transition active:border-b-0 active:translate-y-1 sm:w-auto cursor-pointer',
            isCurrentAnswerCorrect 
              ? 'border-emerald-700 bg-emerald-600 hover:bg-emerald-500' 
              : 'border-rose-700 bg-rose-600 hover:bg-rose-500'
          ]"
        >
          {{ currentStep < lessonQueue.length - 1 ? 'Tiếp tục →' : 'Xem tổng kết' }}
        </button>
      </div>
    </footer>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'LearningView',
  props: {
    deckId: { type: [Number, String], default: null },
    lessonId: { type: String, default: 'new-1' },
    deckTitle: { type: String, default: 'Bài học' },
    streak: { type: Number, default: 0 },
    userId: { type: [Number, String], default: 1 }
  },
  data() {
    return {
      currentWords: [],
      lessonWords: [],
      currentSentences: [],
      score: 10,
      loading: true,
      lessonQueue: [],
      currentStep: 0,
      selectedAnswer: null,
      showResult: false,
      isPlaying: false,
      isFinished: false,
      
      // Thống kê bài học để ghi nhận vào user_daily_stats
      correctCount: 0,
      wrongCount: 0,
      currentStreakCount: this.streak,
      hasIncreasedStreak: false
    };
  },
  computed: {
    currentExercise() {
      return this.lessonQueue[this.currentStep] || null;
    },
    progress() {
      if (!this.lessonQueue.length) return 0;
      return ((this.currentStep + 1) / this.lessonQueue.length) * 100;
    },
    isCorrectAnswer() {
      if (!this.currentExercise) return false;
      return this.selectedAnswer === this.currentExercise.correct;
    },
    isCurrentAnswerCorrect() {
      if (!this.currentExercise) return false;
      if (this.currentExercise.type === 'sentence') {
        return !!this.currentExercise.isCorrect;
      }
      return this.isCorrectAnswer;
    },
    resolvedDeckId() {
      return Number(this.deckId || (this.$route && this.$route.query && this.$route.query.deckId) || 4);
    },
    resolvedLessonId() {
      return (this.$route && this.$route.query && this.$route.query.lessonId) || this.lessonId || 'new-1';
    },
    effectiveDeckTitle() {
      if (this.$route && this.$route.query && this.$route.query.deckTitle) {
        return this.$route.query.deckTitle;
      }
      return this.deckTitle || 'Bài học';
    },
    resolvedUserId() {
      return (this.$route && this.$route.query && this.$route.query.userId) || this.userId || 1;
    }
  },
  mounted() {
    this.fetchData();
    this.fetchCurrentStreak();
  },
  methods: {
    async fetchCurrentStreak() {
      try {
        const res = await axios.get(`/api/streak?userId=${this.resolvedUserId}`);
        if (res.data?.success && res.data.data) {
          this.currentStreakCount = res.data.data.currentStreak ?? 0;
        }
      } catch (error) {
        console.error('Lỗi khi lấy thông tin streak:', error);
      }
    },

    async fetchData() {
      try {
        this.loading = true;
        const deckId = this.resolvedDeckId;

        const [wordsRes, sentencesRes] = await Promise.all([
          axios.get(`/api/vocab/decks/${deckId}/words`),
          axios.get(`/api/vocab/decks/${deckId}/sentences`)
        ]);

        const apiWords = wordsRes.data?.data || [];
        this.currentWords = apiWords.map((word) => ({
          id: word.id,
          term: word.term,
          vietnamese_meaning: word.vietnamese_meaning || word.definition || word.term,
          audio_url: word.audio_url || null
        }));

        this.currentSentences = sentencesRes.data?.data || [];

        this.generateLessonFlow();
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu từ CSDL:', error);
      } finally {
        this.loading = false;
      }
    },

    generateLessonFlow() {
      if (!this.currentWords.length) return;

      const targetPool = this.getLessonWords();
      this.lessonWords = targetPool;
      const queue = [];

      if (this.resolvedLessonId === 'new-1') {
        targetPool.forEach((w) => queue.push(this.buildQuestionCard('vocab', w)));
      } else if (this.resolvedLessonId === 'new-2') {
        targetPool.forEach((w) => queue.push(this.buildQuestionCard('listening', w)));
      } else if (this.resolvedLessonId === 'review-1' || this.resolvedLessonId === 'summary') {
        queue.push(...this.generateCombinedReviewQueue());
      } else {
        targetPool.slice(0, 4).forEach((w) => queue.push(this.buildQuestionCard('vocab', w)));
        queue.push(...this.generateSentenceQuestions().slice(0, 2));
      }

      this.lessonQueue = queue;
      this.currentStep = 0;
      this.selectedAnswer = null;
      this.showResult = false;
      this.isFinished = false;
      this.score = 10;
      this.correctCount = 0;
      this.wrongCount = 0;
    },

    generateCombinedReviewQueue() {
      const reviewWords = this.getLessonWords();
      const vocabQuestions = reviewWords.slice(0, 4).map((w) => this.buildQuestionCard('vocab', w));
      const listeningQuestions = reviewWords.slice(0, 4).map((w) => this.buildQuestionCard('listening', w));
      const sentenceQuestions = this.generateSentenceQuestions().slice(0, 3);

      return [...vocabQuestions, ...listeningQuestions, ...sentenceQuestions].sort(() => Math.random() - 0.5);
    },

    getLessonWords() {
      const words = [...this.currentWords].sort((a, b) => Number(a.id) - Number(b.id));
      if (this.resolvedLessonId === 'new-1' || this.resolvedLessonId === 'new-2') {
        const midpoint = Math.ceil(words.length / 2);
        const start = this.resolvedLessonId === 'new-1' ? 0 : midpoint;
        return words.slice(start, start + 6);
      }
      return words.sort(() => Math.random() - 0.5).slice(0, 6);
    },

    buildQuestionCard(type, word) {
      const prompt = word.vietnamese_meaning || word.term;
      const correctWord = word.term;
      const distractors = this.lessonWords
        .filter((candidate) => candidate.term !== correctWord)
        .map((candidate) => candidate.term)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);

      const options = [correctWord, ...distractors].sort(() => Math.random() - 0.5);

      return {
        type,
        typeLabel: type === 'vocab' ? 'Từ vựng' : 'Luyện nghe',
        word,
        audioTargetText: correctWord,
        audioUrl: word.audio_url || null,
        prompt: type === 'listening' ? '' : prompt,
        correct: options.indexOf(correctWord),
        options,
        isCorrect: false,
        showResult: false,
        selectedAnswer: null
      };
    },

    generateSentenceQuestions() {
      const sentences = this.currentSentences.slice(0, 4);

      return sentences.map((item) => {
        const cleanEnglish = (item.english || '').trim().replace(/[.?!]$/, '');
        const wordList = cleanEnglish.split(/\s+/).filter(Boolean);

        return {
          type: 'sentence',
          typeLabel: 'Ghép câu',
          viPrompt: item.vietnamese || '',
          correctAnswer: cleanEnglish,
          availableWords: [...wordList].sort(() => Math.random() - 0.5),
          selectedWords: [],
          showResult: false,
          isCorrect: false
        };
      });
    },

    selectAnswer(index) {
      if (this.showResult) return;
      this.selectedAnswer = index;
      this.showResult = true;

      const exercise = this.currentExercise;
      if (exercise) {
        exercise.selectedAnswer = index;
        exercise.showResult = true;
        if (index === exercise.correct) {
          exercise.isCorrect = true;
          this.correctCount += 1;
        } else {
          exercise.isCorrect = false;
          this.wrongCount += 1;
        }
      }
    },

    async nextExercise() {
      const currentEx = this.currentExercise;

      // Làm sai -> đẩy về cuối hàng đợi
      if (currentEx && !this.isCurrentAnswerCorrect) {
        if (currentEx.type === 'sentence') {
          const wordList = currentEx.correctAnswer.split(/\s+/).filter(Boolean);
          this.lessonQueue.push({
            type: 'sentence',
            typeLabel: 'Ghép câu (Làm lại)',
            viPrompt: currentEx.viPrompt,
            correctAnswer: currentEx.correctAnswer,
            availableWords: [...wordList].sort(() => Math.random() - 0.5),
            selectedWords: [],
            showResult: false,
            isCorrect: false
          });
        } else {
          const newCard = this.buildQuestionCard(currentEx.type, currentEx.word);
          newCard.typeLabel += ' (Làm lại)';
          this.lessonQueue.push(newCard);
        }
      }

      // Tiếp tục câu tiếp theo
      if (this.currentStep < this.lessonQueue.length - 1) {
        this.currentStep += 1;
        this.selectedAnswer = null;
        this.showResult = false;
        return;
      }

      // Hoàn tất toàn bộ câu trong buổi học
      this.isFinished = true;
      if (!this.hasIncreasedStreak) {
        this.currentStreakCount += 1;
        this.hasIncreasedStreak = true;
      }
      await this.saveLessonProgress();
    },

    async saveLessonProgress() {
      try {
        const wordsLearnedCount = this.lessonWords.length;

        const [progressRes, streakRes] = await Promise.all([
          axios.post('/api/vocab-progress/complete-lesson', {
            userId: this.resolvedUserId,
            deckId: this.resolvedDeckId,
            lessonId: this.resolvedLessonId
          }),
          axios.post('/api/streak/record', {
            userId: this.resolvedUserId,
            wordsLearned: wordsLearnedCount,
            correctAnswers: this.correctCount,
            wrongAnswers: this.wrongCount,
            earnedXp: 10,
            incrementStreak: true
          })
        ]);

        if (streakRes.data?.data?.currentStreak !== undefined) {
          this.currentStreakCount = streakRes.data.data.currentStreak;
        }

        if (progressRes?.data?.success === false) {
          console.warn('Progress save returned unsuccessful result', progressRes.data);
        }
      } catch (error) {
        console.error('Lỗi khi lưu tiến độ bài học & streak:', error);
      }
    },

    resetLessonFlow() {
      this.currentStep = 0;
      this.selectedAnswer = null;
      this.showResult = false;
      this.score = 10;
      this.isFinished = false;
      this.generateLessonFlow();
    },

    goBack() {
      this.$router ? this.$router.back() : window.history.back();
    },

    async playPronunciation(text, audioUrl = null) {
      if (!text && !audioUrl) return;
      this.isPlaying = true;

      try {
        if (audioUrl && typeof audioUrl === 'string' && audioUrl.trim().length > 0) {
          const audio = new Audio(audioUrl);
          await audio.play();
        } else {
          this.speakWithBrowser(text);
        }
      } catch {
        this.speakWithBrowser(text);
      } finally {
        setTimeout(() => {
          this.isPlaying = false;
        }, 1000);
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

    selectSentenceWord(index) {
      const exercise = this.currentExercise;
      if (!exercise || exercise.type !== 'sentence' || exercise.showResult) return;
      const selectedWord = exercise.availableWords[index];
      if (!selectedWord) return;
      exercise.availableWords.splice(index, 1);
      exercise.selectedWords.push(selectedWord);
    },

    removeSentenceWord(index) {
      const exercise = this.currentExercise;
      if (!exercise || exercise.type !== 'sentence' || exercise.showResult) return;
      const word = exercise.selectedWords[index];
      if (!word) return;
      exercise.selectedWords.splice(index, 1);
      exercise.availableWords.push(word);
    },

    checkSentenceAnswer() {
      const exercise = this.currentExercise;
      if (!exercise || exercise.type !== 'sentence' || exercise.showResult) return;
      const userAnswer = exercise.selectedWords.join(' ');
      exercise.isCorrect = userAnswer.trim().toLowerCase() === exercise.correctAnswer.trim().toLowerCase();
      exercise.showResult = true;
      if (exercise.isCorrect) {
        this.correctCount += 1;
      } else {
        this.wrongCount += 1;
      }
    }
  }
};
</script>