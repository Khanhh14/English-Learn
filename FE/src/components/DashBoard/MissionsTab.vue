<!-- src/components/Dashboard/MissionsTab.vue -->
<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-2xl font-bold text-gray-800">🎯 Nhiệm vụ</h2>
      <span class="text-sm text-gray-500">{{ completedMissions }}/{{ missions.length }} đã hoàn thành</span>
    </div>

    <div class="space-y-4">
      <div v-for="mission in missions" :key="mission.id" 
        class="flex items-center justify-between p-4 bg-white/70 backdrop-blur-sm rounded-2xl border hover:shadow-lg transition-all"
        :class="mission.completed ? 'border-green-200 bg-green-50/50' : 'border-gray-200'">
        <div class="flex items-center space-x-4 flex-1">
          <div class="w-12 h-12 rounded-full flex items-center justify-center text-2xl flex-shrink-0" 
            :class="mission.completed ? 'bg-green-100' : 'bg-indigo-100'">
            {{ mission.completed ? '✅' : mission.icon }}
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center space-x-2">
              <h3 class="font-bold text-gray-800">{{ mission.name }}</h3>
              <span v-if="mission.completed" class="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Hoàn thành</span>
            </div>
            <p class="text-sm text-gray-500">{{ mission.description }}</p>
            <div class="flex items-center space-x-4 mt-2">
              <span class="text-xs text-yellow-600 flex items-center space-x-1">
                <span>⭐</span>
                <span>+{{ mission.reward }} xu</span>
              </span>
              <div class="flex items-center space-x-2 flex-1 max-w-[200px]">
                <div class="flex-1 bg-gray-200 rounded-full h-2">
                  <div class="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all" 
                    :style="{ width: (mission.progress / mission.total * 100) + '%' }">
                  </div>
                </div>
                <span class="text-xs text-gray-400 whitespace-nowrap">{{ mission.progress }}/{{ mission.total }}</span>
              </div>
            </div>
          </div>
        </div>
        <button 
          v-if="!mission.completed && mission.progress === mission.total"
          @click="completeMission(mission)"
          class="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl text-sm font-medium shadow-lg hover:shadow-xl transition-all transform hover:scale-105 ml-4 flex-shrink-0"
        >
          Nhận thưởng
        </button>
        <span v-else-if="mission.completed" class="text-green-500 text-xl ml-4">✓</span>
      </div>
    </div>

    <div class="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border border-purple-100">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-gray-700">Tổng xu nhận được từ nhiệm vụ</p>
          <p class="text-2xl font-bold text-gray-800">+1,250 xu</p>
        </div>
        <div class="text-4xl">🎁</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MissionsTab',
  data() {
    return {
      missions: [
        { 
          id: 1, 
          icon: '📚', 
          name: 'Học 10 từ mới', 
          description: 'Hoàn thành bài học hôm nay', 
          reward: 50, 
          progress: 10, 
          total: 10,
          completed: true 
        },
        { 
          id: 2, 
          icon: '✍️', 
          name: 'Luyện tập 20 phút', 
          description: 'Dành thời gian luyện tập hàng ngày', 
          reward: 75, 
          progress: 20, 
          total: 20,
          completed: true 
        },
        { 
          id: 3, 
          icon: '🏆', 
          name: 'Đạt 1000 điểm', 
          description: 'Tích lũy điểm để lên hạng cao hơn', 
          reward: 200, 
          progress: 284, 
          total: 1000,
          completed: false 
        },
        { 
          id: 4, 
          icon: '🔥', 
          name: 'Duy trì chuỗi 7 ngày', 
          description: 'Học liên tục không ngắt quãng', 
          reward: 150, 
          progress: 7, 
          total: 7,
          completed: true 
        },
        { 
          id: 5, 
          icon: '👥', 
          name: 'Mời 3 bạn bè', 
          description: 'Giới thiệu LinguaFlow cho bạn bè', 
          reward: 300, 
          progress: 2, 
          total: 3,
          completed: false 
        },
        { 
          id: 6, 
          icon: '🎯', 
          name: 'Hoàn thành 5 bài tập', 
          description: 'Làm bài tập trong phần Luyện tập', 
          reward: 100, 
          progress: 3, 
          total: 5,
          completed: false 
        }
      ]
    }
  },
  computed: {
    completedMissions() {
      return this.missions.filter(m => m.completed).length
    }
  },
  methods: {
    completeMission(mission) {
      mission.completed = true
      alert(`🎉 Hoàn thành nhiệm vụ "${mission.name}"! Nhận được +${mission.reward} xu!`)
    }
  }
}
</script>