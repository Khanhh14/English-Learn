<template>
  <div class="min-h-screen bg-[#f8f9fd] py-10 px-4 md:px-12 font-sans">
    <div class="max-w-6xl mx-auto space-y-8">
      
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div class="flex items-center space-x-3">
            <button @click="$router.push('/')" class="p-2 rounded-xl bg-white shadow-sm hover:bg-gray-50 text-gray-600 transition">
              ←
            </button>
            <h1 class="text-3xl font-extrabold text-slate-800">Bài học A1 - Beginner</h1>
          </div>
          <p class="text-gray-500 mt-1 text-sm pl-11">
            {{ activeChapter.wordsCount }} từ vựng sẵn sàng luyện tập
          </p>
        </div>

        <div class="flex items-center space-x-3 self-end md:self-auto">
          <div class="flex items-center space-x-2 bg-amber-50 text-amber-600 font-bold px-4 py-2 rounded-2xl border border-amber-200/60 shadow-sm text-sm">
            <span>⭐</span>
            <span>20 XP</span>
          </div>
          <div class="flex items-center space-x-2 bg-rose-50 text-rose-500 font-bold px-4 py-2 rounded-2xl border border-rose-200/60 shadow-sm text-sm">
            <span>🔥</span>
            <span>1 NGÀY STREAK</span>
          </div>
        </div>
      </div>

      <div>
        <div class="flex justify-between items-center mb-4">
          <span class="text-xs font-bold uppercase tracking-wider text-gray-400">Lộ trình học tập</span>
          <span class="text-xs text-gray-400 font-medium">{{ chapters.length }} chương</span>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          <div
            v-for="chap in chapters"
            :key="chap.id"
            @click="selectChapter(chap)"
            :class="[
              'relative p-4 rounded-2xl cursor-pointer text-center transition-all duration-200 select-none flex flex-col items-center justify-between min-h-[120px]',
              chap.id === activeChapter.id
                ? 'bg-white ring-2 ring-indigo-500 shadow-lg shadow-indigo-100'
                : 'bg-white/80 border border-gray-100 hover:bg-white hover:shadow-md'
            ]"
          >
            <div
              :class="[
                'w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold mb-2',
                chap.id === activeChapter.id
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-500'
              ]"
            >
              <span v-if="!chap.isLocked">{{ chap.id }}</span>
              <span v-else class="text-[10px]">🔒</span>
            </div>

            <div class="my-auto">
              <p class="font-bold text-sm text-slate-800 line-clamp-1">{{ chap.title }}</p>
              <p class="text-xs text-gray-400 mt-0.5">{{ chap.wordsCount }} từ</p>
            </div>

            <p v-if="chap.isLocked" class="text-[10px] text-gray-400 mt-1 flex items-center gap-0.5">
              Hoàn thành trước
            </p>
          </div>
        </div>
      </div>

      <div class="bg-white/70 backdrop-blur-md rounded-3xl p-6 border border-gray-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span class="text-xs font-extrabold tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full uppercase">
            Chương {{ activeChapter.id }}
          </span>
          <h2 class="text-2xl font-bold text-slate-800 mt-2">{{ activeChapter.title }}</h2>
          <p class="text-sm text-gray-500 mt-1">{{ activeChapter.description }}</p>
        </div>
        <div class="text-xs font-medium text-gray-500 bg-gray-100 px-3 py-1.5 rounded-xl self-start md:self-auto">
          {{ activeChapter.lessons.length }} bài học
        </div>
      </div>

      <div class="space-y-4">
        <div
          v-for="lesson in activeChapter.lessons"
          :key="lesson.type"
          :class="[
            'p-5 rounded-3xl border transition-all duration-200 flex items-center justify-between',
            lesson.status === 'completed'
              ? 'bg-white border-emerald-200 shadow-sm'
              : 'bg-white border-gray-100 hover:shadow-md'
          ]"
        >
          <div class="flex items-center space-x-4">
            <div
              :class="[
                'w-11 h-11 rounded-2xl flex items-center justify-center text-base font-bold shadow-sm',
                lesson.status === 'completed' ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-600'
              ]"
            >
              <span v-if="lesson.status === 'completed'">✓</span>
              <span v-else>{{ lesson.icon }}</span>
            </div>

            <div>
              <div class="flex items-center space-x-2">
                <p class="font-bold text-slate-800 text-base">
                  {{ lesson.title }}
                </p>
                <span v-if="lesson.isNew" class="text-[10px] bg-blue-50 text-blue-600 font-bold px-2 py-0.5 rounded-full">
                  MỚI
                </span>
                <span v-if="lesson.status === 'completed'" class="text-[10px] bg-emerald-50 text-emerald-600 font-bold px-2 py-0.5 rounded-full">
                  ĐÃ HOÀN THÀNH
                </span>
              </div>
              <p class="text-xs text-gray-500 mt-0.5">{{ lesson.description }}</p>
            </div>
          </div>

          <div class="flex items-center space-x-4">
            <span class="text-xs text-gray-400 font-medium hidden sm:inline-block">
              {{ lesson.questionsCount }} câu
            </span>

            <button
              @click="startLesson(lesson)"
              :class="[
                'px-4 py-2 rounded-xl text-xs font-bold transition duration-200 flex items-center gap-1.5 shadow-sm',
                lesson.status === 'completed'
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white'
              ]"
            >
              <span>{{ lesson.status === 'completed' ? 'Ôn tập' : 'Bắt đầu' }}</span>
              <span v-if="lesson.status === 'completed'">↺</span>
              <span v-else>→</span>
            </button>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'RoadmapView',
  data() {
    return {
      chapters: [
        {
          id: 1,
          title: 'Gia đình',
          wordsCount: 20,
          isLocked: false,
          description: 'Các từ vựng cơ bản và xưng hô về chủ đề gia đình',
          lessons: [
            {
              type: 'vocabulary',
              title: 'Khám phá từ mới • Gia đình',
              description: 'Học phát âm và ghi nhớ mặt chữ.',
              questionsCount: 6,
              icon: '📖',
              status: 'completed',
              isNew: false
            },
            {
              type: 'listening',
              title: 'Luyện nghe phản xạ • Gia đình',
              description: 'Nghe nhận diện giọng đọc chuẩn và phân biệt từ dễ nhầm.',
              questionsCount: 8,
              icon: '🎧',
              status: 'pending',
              isNew: true
            },
            {
              type: 'sentence',
              title: 'Mẫu câu giao tiếp • Gia đình',
              description: 'Ghép từ thành câu hoàn chỉnh và diễn đạt ý cơ bản.',
              questionsCount: 5,
              icon: '💬',
              status: 'pending',
              isNew: false
            },
            {
              type: 'review',
              title: 'Ôn tập & Kiểm tra nhanh',
              description: 'Củng cố kiến thức toàn bộ chương 1 để mở khóa chương sau.',
              questionsCount: 10,
              icon: '🎯',
              status: 'pending',
              isNew: false
            }
          ]
        },
        {
          id: 2,
          title: 'Màu sắc',
          wordsCount: 19,
          isLocked: true,
          description: 'Học nhận biết và mô tả màu sắc của các đồ vật quen thuộc',
          lessons: [
            { type: 'vocabulary', title: 'Từ vựng Màu sắc', description: 'Tên các màu sắc cơ bản và sắc thái.', questionsCount: 6, icon: '📖', status: 'pending' },
            { type: 'listening', title: 'Luyện nghe Màu sắc', description: 'Nghe đoạn hội thoại mô tả màu.', questionsCount: 6, icon: '🎧', status: 'pending' },
            { type: 'sentence', title: 'Mẫu câu chỉ màu sắc', description: 'Cấu trúc miêu tả màu đồ vật.', questionsCount: 5, icon: '💬', status: 'pending' },
            { type: 'review', title: 'Ôn tập Chương 2', description: 'Bài kiểm tra tổng hợp chương Màu sắc.', questionsCount: 10, icon: '🎯', status: 'pending' }
          ]
        },
        {
          id: 3,
          title: 'Động vật',
          wordsCount: 9,
          isLocked: true,
          description: 'Tên các loài vật nuôi và động vật quen thuộc xung quanh bạn',
          lessons: [
            { type: 'vocabulary', title: 'Từ vựng Động vật', description: 'Thú cưng và động vật nông trại.', questionsCount: 6, icon: '📖', status: 'pending' },
            { type: 'listening', title: 'Luyện nghe Động vật', description: 'Nhận diện loài vật qua phát âm.', questionsCount: 6, icon: '🎧', status: 'pending' },
            { type: 'sentence', title: 'Mẫu câu miêu tả loài vật', description: 'Cách đặt câu đơn giản về thú cưng.', questionsCount: 5, icon: '💬', status: 'pending' },
            { type: 'review', title: 'Ôn tập Chương 3', description: 'Kiểm tra tổng hợp chương Động vật.', questionsCount: 10, icon: '🎯', status: 'pending' }
          ]
        },
        {
          id: 4,
          title: 'Thức ăn',
          wordsCount: 9,
          isLocked: true,
          description: 'Từ vựng về món ăn, hoa quả, đồ uống thường ngày',
          lessons: [
            { type: 'vocabulary', title: 'Từ vựng Thức ăn', description: 'Món ăn hàng ngày và đồ uống.', questionsCount: 6, icon: '📖', status: 'pending' },
            { type: 'listening', title: 'Luyện nghe Đồ ăn', description: 'Nghe gọi món cơ bản.', questionsCount: 6, icon: '🎧', status: 'pending' },
            { type: 'sentence', title: 'Mẫu câu Gọi món', description: 'Cấu trúc biểu đạt món ăn yêu thích.', questionsCount: 5, icon: '💬', status: 'pending' },
            { type: 'review', title: 'Ôn tập Chương 4', description: 'Kiểm tra từ vựng món ăn.', questionsCount: 10, icon: '🎯', status: 'pending' }
          ]
        },
        {
          id: 5,
          title: 'Công việc',
          wordsCount: 5,
          isLocked: true,
          description: 'Các chức danh, nghề nghiệp cơ bản và nơi làm việc',
          lessons: [
            { type: 'vocabulary', title: 'Từ vựng Nghề nghiệp', description: 'Nghề nghiệp phổ biến xã hội.', questionsCount: 5, icon: '📖', status: 'pending' },
            { type: 'listening', title: 'Luyện nghe Nghề nghiệp', description: 'Nghe người khác giới thiệu nghề.', questionsCount: 5, icon: '🎧', status: 'pending' },
            { type: 'sentence', title: 'Mẫu câu Hỏi nghề nghiệp', description: 'Hỏi và trả lời "Bạn làm nghề gì?".', questionsCount: 5, icon: '💬', status: 'pending' },
            { type: 'review', title: 'Ôn tập Chương 5', description: 'Bài tổng hợp kiến thức nghề nghiệp.', questionsCount: 10, icon: '🎯', status: 'pending' }
          ]
        },
        {
          id: 6,
          title: 'Cảm xúc',
          wordsCount: 5,
          isLocked: true,
          description: 'Biểu đạt tâm trạng vui, buồn, mệt mỏi và cảm xúc thường nhật',
          lessons: [
            { type: 'vocabulary', title: 'Từ vựng Cảm xúc', description: 'Tâm trạng và trạng thái cảm xúc.', questionsCount: 5, icon: '📖', status: 'pending' },
            { type: 'listening', title: 'Luyện nghe Cảm xúc', description: 'Cảm nhận giọng nói và trạng thái.', questionsCount: 5, icon: '🎧', status: 'pending' },
            { type: 'sentence', title: 'Mẫu câu Bày tỏ cảm xúc', description: 'Hỏi thăm và chia sẻ tâm trạng bản thân.', questionsCount: 5, icon: '💬', status: 'pending' },
            { type: 'review', title: 'Ôn tập Chương 6', description: 'Kiểm tra tốt nghiệp cấp độ A1.', questionsCount: 10, icon: '🎯', status: 'pending' }
          ]
        }
      ],
      activeChapter: null
    }
  },
  created() {
    this.activeChapter = this.chapters[0];
  },
  methods: {
    selectChapter(chap) {
      this.activeChapter = chap;
    },
    startLesson(lesson) {
      console.log('Bắt đầu phần học:', lesson.title);
      // Điều hướng vào màn làm bài, ví dụ: this.$router.push(`/study/${lesson.type}`);
    }
  }
}
</script>