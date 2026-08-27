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
            <p class="text-xs font-semibold text-slate-400">{{ currentWords.length }} từ vựng & câu trong bộ</p>
          </div>
        </div>

        <!-- Badges -->
        <div class="flex items-center gap-2">
          <div class="flex items-center gap-1.5 rounded-2xl border-2 border-amber-200/80 bg-amber-50/80 px-3.5 py-1.5 text-xs font-black text-amber-700 shadow-xs sm:text-sm">
            <span>⭐</span>
            <span>{{ score }} <span class="text-[10px] font-bold uppercase sm:text-xs">XP</span></span>
          </div>
          <div class="flex items-center gap-1.5 rounded-2xl border-2 border-orange-200/80 bg-orange-50/80 px-3.5 py-1.5 text-xs font-black text-orange-700 shadow-xs sm:text-sm">
            <span>🔥</span>
            <span>{{ streak }} <span class="text-[10px] font-bold uppercase sm:text-xs">ngày</span></span>
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
        <p class="mt-4 font-bold text-slate-400">Đang chuẩn bị bài học...</p>
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
          <!-- Trường hợp: ĐÚNG 100% -->
          <div v-if="isPassed">
            <div class="mx-auto mb-5 flex h-24 w-24 items-center justify-center rounded-full bg-emerald-50 text-5xl shadow-inner ring-8 ring-emerald-50/50 animate-bounce">
              🎉
            </div>
            <h2 class="text-3xl font-black text-slate-800">Xuất sắc! Hoàn thành bài học</h2>
            <p class="mt-2 text-base font-medium text-slate-500">
              Bạn đã trả lời đúng tuyệt đối <span class="font-extrabold text-emerald-600 text-lg">{{ totalCorrect }}/{{ lessonQueue.length }}</span> câu. Bài học đã được lưu tiến độ!
            </p>
          </div>

          <!-- Trường hợp: CHƯA ĐÚNG HẾT -->
          <div v-else>
            <div class="mx-auto mb-5 flex h-24 w-24 items-center justify-center rounded-full bg-amber-50 text-5xl shadow-inner ring-8 ring-amber-50/50">
              💪
            </div>
            <h2 class="text-3xl font-black text-slate-800">Cố gắng thêm một chút nữa!</h2>
            <p class="mt-2 text-base font-medium text-slate-500">
              Bạn đã trả lời đúng <span class="font-extrabold text-amber-600 text-lg">{{ totalCorrect }}/{{ lessonQueue.length }}</span> câu. Bạn cần trả lời đúng 100% câu hỏi để hoàn thành bài này.
            </p>
          </div>

          <!-- Action Buttons -->
          <div class="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <button 
              @click="resetLessonFlow" 
              class="rounded-2xl border-b-4 border-indigo-800 bg-indigo-600 px-7 py-3.5 font-black text-white shadow-lg shadow-indigo-100 transition hover:bg-indigo-500 active:border-b-0 active:translate-y-1 cursor-pointer"
            >
              {{ isPassed ? 'Ôn tập lại' : 'Thử lại để hoàn thành' }}
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
        (isCorrectAnswer || (currentExercise && currentExercise.isCorrect)) 
          ? 'border-emerald-200 bg-emerald-50/90 text-emerald-950' 
          : 'border-rose-200 bg-rose-50/90 text-rose-950'
      ]"
    >
      <div class="mx-auto flex max-w-3xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div class="flex items-center gap-3">
          <div :class="[
            'flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-2xl',
            (isCorrectAnswer || (currentExercise && currentExercise.isCorrect)) ? 'bg-emerald-100' : 'bg-rose-100'
          ]">
            {{ (isCorrectAnswer || (currentExercise && currentExercise.isCorrect)) ? '🎉' : '💡' }}
          </div>
          <div>
            <h4 class="text-lg font-black">
              {{ (isCorrectAnswer || (currentExercise && currentExercise.isCorrect)) ? 'Chính xác! Làm rất tốt.' : 'Chưa đúng rồi!' }}
            </h4>
            <p v-if="!(isCorrectAnswer || (currentExercise && currentExercise.isCorrect))" class="text-xs font-semibold sm:text-sm text-rose-800">
              Đáp án đúng là: <span class="font-bold underline">{{ currentExercise.type === 'sentence' ? currentExercise.correctAnswer : currentExercise.options[currentExercise.correct] }}</span>
            </p>
          </div>
        </div>

        <button 
          @click="nextExercise" 
          :class="[
            'rounded-2xl border-b-4 px-8 py-3 text-center text-sm font-black text-white shadow-md transition active:border-b-0 active:translate-y-1 sm:w-auto cursor-pointer',
            (isCorrectAnswer || (currentExercise && currentExercise.isCorrect)) 
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

const DECK_FALLBACKS = {
  4: {
    title: 'Gia đình',
    words: [
      { id: 1, term: 'family', vietnamese_meaning: 'gia đình' },
      { id: 2, term: 'mother', vietnamese_meaning: 'mẹ' },
      { id: 3, term: 'father', vietnamese_meaning: 'bố, cha' },
      { id: 4, term: 'sister', vietnamese_meaning: 'chị/em gái' },
      { id: 5, term: 'brother', vietnamese_meaning: 'anh/em trai' },
      { id: 19, term: 'grandfather', vietnamese_meaning: 'ông' },
      { id: 20, term: 'grandmother', vietnamese_meaning: 'bà' }
    ],
    sentences: [
      { id: 1, english: 'I love my family.', vietnamese: 'Tôi yêu gia đình của tôi.' },
      { id: 2, english: 'My mother is a teacher.', vietnamese: 'Mẹ tôi là một giáo viên.' },
      { id: 4, english: 'She has a younger sister.', vietnamese: 'Cô ấy có một người em gái.' }
    ]
  },
  5: {
    title: 'Màu sắc',
    words: [
      { id: 6, term: 'red', vietnamese_meaning: 'màu đỏ' },
      { id: 7, term: 'blue', vietnamese_meaning: 'màu xanh da trời' },
      { id: 8, term: 'green', vietnamese_meaning: 'màu xanh lá cây' },
      { id: 9, term: 'yellow', vietnamese_meaning: 'màu vàng' },
      { id: 24, term: 'black', vietnamese_meaning: 'màu đen' },
      { id: 25, term: 'white', vietnamese_meaning: 'màu trắng' }
    ],
    sentences: [
      { id: 3, english: 'His father drives a blue car.', vietnamese: 'Bố của anh ấy lái một chiếc xe màu xanh.' },
      { id: 5, english: 'The red apple is very sweet.', vietnamese: 'Quả táo màu đỏ rất ngọt.' },
      { id: 10, english: 'The night sky is completely black.', vietnamese: 'Bầu trời đêm hoàn toàn là màu đen.' }
    ]
  },
  6: {
    title: 'Động vật',
    words: [
      { id: 10, term: 'dog', vietnamese_meaning: 'con chó' },
      { id: 11, term: 'cat', vietnamese_meaning: 'con mèo' },
      { id: 12, term: 'lion', vietnamese_meaning: 'con sư tử' },
      { id: 13, term: 'tiger', vietnamese_meaning: 'con hổ' },
      { id: 29, term: 'elephant', vietnamese_meaning: 'con voi' },
      { id: 30, term: 'monkey', vietnamese_meaning: 'con khỉ' }
    ],
    sentences: [
      { id: 14, english: 'The elephant is the largest land animal.', vietnamese: 'Con voi là loài động vật trên cạn lớn nhất.' },
      { id: 15, english: 'A monkey is climbing the tall tree.', vietnamese: 'Một con khỉ đang leo trèo trên cái cây cao.' }
    ]
  },
  7: {
    title: 'Thức ăn',
    words: [
      { id: 14, term: 'bread', vietnamese_meaning: 'bánh mì' },
      { id: 15, term: 'rice', vietnamese_meaning: 'cơm, gạo' },
      { id: 16, term: 'water', vietnamese_meaning: 'nước' },
      { id: 17, term: 'coffee', vietnamese_meaning: 'cà phê' },
      { id: 34, term: 'noodles', vietnamese_meaning: 'mì, bún, phở' },
      { id: 35, term: 'meat', vietnamese_meaning: 'thịt' }
    ],
    sentences: [
      { id: 18, english: 'I usually have a bowl of noodles for breakfast.', vietnamese: 'Tôi thường ăn một bát mì vào bữa sáng.' },
      { id: 19, english: 'He does not eat red meat.', vietnamese: 'Anh ấy không ăn thịt đỏ.' }
    ]
  },
  8: {
    title: 'Công việc',
    words: [
      { id: 39, term: 'doctor', vietnamese_meaning: 'bác sĩ' },
      { id: 40, term: 'teacher', vietnamese_meaning: 'giáo viên' },
      { id: 41, term: 'engineer', vietnamese_meaning: 'kỹ sư' },
      { id: 42, term: 'developer', vietnamese_meaning: 'lập trình viên' },
      { id: 43, term: 'nurse', vietnamese_meaning: 'y tá' }
    ],
    sentences: [
      { id: 22, english: 'The doctor examined the patient carefully.', vietnamese: 'Bác sĩ đã khám cho bệnh nhân rất cẩn thận.' },
      { id: 23, english: 'She wants to become a software engineer.', vietnamese: 'Cô ấy muốn trở thành một kỹ sư phần mềm.' }
    ]
  },
  9: {
    title: 'Cảm xúc',
    words: [
      { id: 44, term: 'happy', vietnamese_meaning: 'vui vẻ, hạnh phúc' },
      { id: 45, term: 'sad', vietnamese_meaning: 'buồn bã' },
      { id: 46, term: 'angry', vietnamese_meaning: 'tức giận' },
      { id: 47, term: 'tired', vietnamese_meaning: 'mệt mỏi' },
      { id: 48, term: 'excited', vietnamese_meaning: 'hào hứng, phấn khích' }
    ],
    sentences: [
      { id: 26, english: 'They felt very happy after finishing the project.', vietnamese: 'Họ cảm thấy rất vui vẻ sau khi hoàn thành dự án.' },
      { id: 27, english: 'I am feeling so tired after a long day of work.', vietnamese: 'Tôi đang cảm thấy rất mệt mỏi sau một ngày làm việc dài.' }
    ]
  }
};

export default {
  name: 'LearningView',
  props: {
    deckId: { type: [Number, String], default: null },
    lessonId: { type: String, default: 'new-1' },
    deckTitle: { type: String, default: 'Bài học' },
    streak: { type: Number, default: 3 },
    userId: { type: [Number, String], default: 1 }
  },
  data() {
    return {
      currentWords: [],
      currentSentences: [],
      score: 0,
      loading: true,
      lessonQueue: [],
      currentStep: 0,
      selectedAnswer: null,
      showResult: false,
      totalCorrect: 0,
      isPlaying: false,
      isFinished: false
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
    resolvedDeckId() {
      return Number(this.deckId || (this.$route && this.$route.query && this.$route.query.deckId) || 4);
    },
    resolvedLessonId() {
      return this.lessonId || (this.$route && this.$route.query && this.$route.query.lessonId) || 'new-1';
    },
    effectiveDeckTitle() {
      if (this.$route && this.$route.query && this.$route.query.deckTitle) {
        return this.$route.query.deckTitle;
      }
      return DECK_FALLBACKS[this.resolvedDeckId]?.title || this.deckTitle || 'Bài học';
    },
    // Kiểm tra đã đúng 100% câu hỏi chưa
    isPassed() {
      return this.lessonQueue.length > 0 && this.totalCorrect === this.lessonQueue.length;
    }
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        this.loading = true;
        const deckId = this.resolvedDeckId;

        // 1. Lấy từ vựng
        try {
          const wordsRes = await axios.get(`http://localhost:4000/api/vocab/decks/${deckId}/words`);
          const apiWords = wordsRes.data?.data || wordsRes.data || [];
          if (Array.isArray(apiWords) && apiWords.length > 0) {
            this.currentWords = apiWords.map((word) => ({
              id: word.id,
              term: word.term,
              vietnamese_meaning: word.vietnamese_meaning || word.definition || word.meaning || word.term,
              audio_url: word.audio_url || null
            }));
          }
        } catch {
          console.warn('Không tải được words từ API, dùng fallback.');
        }

        // 2. Lấy câu luyện tập
        try {
          const sentencesRes = await axios.get(`http://localhost:4000/api/vocab/decks/${deckId}/sentences`);
          const apiSentences = sentencesRes.data?.data || sentencesRes.data || [];
          if (Array.isArray(apiSentences) && apiSentences.length > 0) {
            this.currentSentences = apiSentences;
          }
        } catch {
          console.warn('Không tải được sentences từ API, dùng fallback.');
        }

        // 3. Fallback
        const defaultDeckData = DECK_FALLBACKS[deckId] || DECK_FALLBACKS[4];
        if (!this.currentWords.length) {
          this.currentWords = [...defaultDeckData.words];
        }
        if (!this.currentSentences.length) {
          this.currentSentences = [...defaultDeckData.sentences];
        }

        this.generateLessonFlow();
      } catch (error) {
        console.error('Lỗi nạp dữ liệu bài học:', error);
        this.generateLessonFlow();
      } finally {
        this.loading = false;
      }
    },

    generateLessonFlow() {
      const words = [...this.currentWords].slice(0, 6);
      const queue = [];

      while (words.length) {
        const typePool = ['vocab', 'listening'];
        const chosenType = typePool[Math.floor(Math.random() * typePool.length)];
        const randomIndex = Math.floor(Math.random() * words.length);
        const word = words[randomIndex];
        queue.push(this.buildQuestionCard(chosenType, word));
        words.splice(randomIndex, 1);
      }

      const sentenceQuestions = this.generateSentenceQuestions();
      queue.push(...sentenceQuestions.map((sentence) => ({
        type: 'sentence',
        typeLabel: 'Luyện câu',
        ...sentence
      })));

      this.lessonQueue = queue;
      this.currentStep = 0;
      this.selectedAnswer = null;
      this.showResult = false;
      this.isFinished = false;
      this.totalCorrect = 0;
      this.score = 0;
    },

    buildQuestionCard(type, word) {
      const prompt = word.vietnamese_meaning || word.term;
      const correctWord = word.term;
      const distractors = this.currentWords
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
      const sentences = this.currentSentences.slice(0, 3);

      return sentences.map((item) => {
        const cleanEnglish = (item.english || '').trim().replace(/[.?!]$/, '');
        const wordList = cleanEnglish.split(/\s+/).filter(Boolean);

        return {
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
      if (exercise && index === exercise.correct) {
        exercise.isCorrect = true;
        this.totalCorrect += 1;
        this.score += 10;
      }
    },

    async nextExercise() {
      if (this.currentStep < this.lessonQueue.length - 1) {
        this.currentStep += 1;
        this.selectedAnswer = null;
        this.showResult = false;
        return;
      }

      // Khi kết thúc tất cả câu hỏi
      this.isFinished = true;

      // CHỈ LƯU TIẾN ĐỘ KHI ĐÚNG 100% SỐ CÂU
      if (this.isPassed) {
        await this.saveLessonProgress();
      }
    },

    async saveLessonProgress() {
      try {
        await axios.post('http://localhost:4000/api/vocab-progress/complete-lesson', {
          userId: this.userId || 1,
          deckId: this.resolvedDeckId,
          lessonId: this.resolvedLessonId
        });
        console.log(' Đã lưu hoàn thành bài học vào CSDL!');
      } catch (error) {
        console.error(' Lỗi khi lưu tiến độ vào CSDL:', error);
      }
    },

    resetLessonFlow() {
      this.currentStep = 0;
      this.selectedAnswer = null;
      this.showResult = false;
      this.totalCorrect = 0;
      this.score = 0;
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
        this.totalCorrect += 1;
        this.score += 15;
      }
    }
  }
};
</script>