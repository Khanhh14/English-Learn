<!-- src/components/Dashboard/ProfileTab.vue -->
<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-2xl font-bold text-gray-800">👤 Hồ sơ của tôi</h2>
      <button 
        @click="toggleEdit"
        class="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
      >
        {{ isEditing ? 'Hủy' : 'Chỉnh sửa' }}
      </button>
    </div>

    <!-- Profile Info -->
    <div class="grid md:grid-cols-2 gap-6">
      <!-- Left Column - Avatar & Basic Info -->
      <div class="space-y-6">
        <div class="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
          <div class="text-center">
            <div class="relative inline-block">
              <div class="w-32 h-32 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full mx-auto flex items-center justify-center text-5xl text-white shadow-xl">
                <span v-if="!isEditing">{{ user.avatar || user.name.charAt(0) }}</span>
                <span v-else class="text-4xl">📷</span>
              </div>
              <button v-if="isEditing" class="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all">
                <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
              </button>
            </div>
            
            <div class="mt-4">
              <div v-if="!isEditing">
                <h3 class="text-2xl font-bold text-gray-800">{{ user.name }}</h3>
                <p class="text-gray-500">{{ user.email }}</p>
              </div>
              <div v-else class="space-y-3 text-left">
                <div>
                  <label class="block text-xs font-semibold text-gray-500 mb-1">Họ và tên</label>
                  <input 
                    v-model="editedUser.name" 
                    type="text" 
                    class="w-full px-4 py-2 bg-white/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-800"
                    placeholder="Họ và tên"
                  />
                </div>
                <div>
                  <label class="block text-xs font-semibold text-gray-500 mb-1">Email (không thể thay đổi)</label>
                  <input 
                    :value="user.email" 
                    type="email" 
                    disabled 
                    class="w-full px-4 py-2 bg-gray-100/80 border border-gray-200 rounded-xl text-gray-500 cursor-not-allowed"
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="mt-6 pt-6 border-t border-gray-200">
            <div class="grid grid-cols-2 gap-4">
              <div class="text-center">
                <p class="text-2xl font-bold text-indigo-600">{{ user.streak }}</p>
                <p class="text-xs text-gray-500">🔥 Chuỗi ngày</p>
              </div>
              <div class="text-center">
                <p class="text-2xl font-bold text-purple-600">{{ user.level }}</p>
                <p class="text-xs text-gray-500">🏆 Cấp độ</p>
              </div>
              <div class="text-center">
                <p class="text-2xl font-bold text-green-600">{{ user.totalWords }}</p>
                <p class="text-xs text-gray-500">📚 Từ vựng</p>
              </div>
              <div class="text-center">
                <p class="text-2xl font-bold text-blue-600">{{ user.totalLessons }}</p>
                <p class="text-xs text-gray-500">📖 Bài học</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Thông tin thêm -->
        <div class="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
          <h4 class="font-bold text-gray-800 mb-3">Thông tin chi tiết</h4>
          <div class="space-y-2 text-sm">
            <div class="flex justify-between py-2 border-b border-gray-100">
              <span class="text-gray-500">Ngày tham gia</span>
              <span class="font-medium text-gray-700">{{ user.joinDate }}</span>
            </div>
            <div class="flex justify-between py-2 border-b border-gray-100">
              <span class="text-gray-500">Tổng điểm</span>
              <span class="font-medium text-gray-700">{{ user.points?.toLocaleString() }}</span>
            </div>
            <div class="flex justify-between py-2 border-b border-gray-100">
              <span class="text-gray-500">Tiến độ</span>
              <span class="font-medium text-gray-700">{{ user.progress }}%</span>
            </div>
            <div class="flex justify-between py-2">
              <span class="text-gray-500">Hạng</span>
              <span class="font-medium text-gray-700">#{{ user.rank || 5 }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column - Edit Form / Password Change -->
      <div v-if="isEditing" class="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
        <h4 class="font-bold text-gray-800 mb-4">🔐 Đổi mật khẩu</h4>
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Mật khẩu hiện tại</label>
            <input 
              v-model="passwordForm.currentPassword" 
              type="password" 
              placeholder="Nhập mật khẩu hiện tại"
              class="w-full px-4 py-2.5 bg-white/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Mật khẩu mới</label>
            <input 
              v-model="passwordForm.newPassword" 
              type="password" 
              placeholder="Nhập mật khẩu mới"
              class="w-full px-4 py-2.5 bg-white/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Xác nhận mật khẩu mới</label>
            <input 
              v-model="passwordForm.confirmPassword" 
              type="password" 
              placeholder="Nhập lại mật khẩu mới"
              class="w-full px-4 py-2.5 bg-white/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <p class="text-xs text-gray-400 italic mt-1">* Để trống các ô mật khẩu nếu bạn chỉ muốn thay đổi tên.</p>

          <button 
            @click="saveProfile"
            class="w-full mt-4 px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
          >
            Lưu thay đổi
          </button>
        </div>
      </div>

      <!-- Stats when not editing -->
      <div v-if="!isEditing" class="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
        <h4 class="font-bold text-gray-800 mb-4">📊 Thống kê học tập</h4>
        
        <div class="space-y-4">
          <div>
            <div class="flex justify-between text-sm mb-1">
              <span class="text-gray-600">Từ vựng đã học</span>
              <span class="font-medium text-gray-700">{{ user.totalWords }}/500</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div class="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full" :style="{ width: (user.totalWords / 500 * 100) + '%' }"></div>
            </div>
          </div>
          <div>
            <div class="flex justify-between text-sm mb-1">
              <span class="text-gray-600">Bài học đã hoàn thành</span>
              <span class="font-medium text-gray-700">{{ user.totalLessons }}/100</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div class="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full" :style="{ width: (user.totalLessons / 100 * 100) + '%' }"></div>
            </div>
          </div>
          <div>
            <div class="flex justify-between text-sm mb-1">
              <span class="text-gray-600">Điểm tích lũy</span>
              <span class="font-medium text-gray-700">{{ user.points }}/5000</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div class="bg-gradient-to-r from-yellow-500 to-orange-500 h-2 rounded-full" :style="{ width: (user.points / 5000 * 100) + '%' }"></div>
            </div>
          </div>
          <div>
            <div class="flex justify-between text-sm mb-1">
              <span class="text-gray-600">Tiến độ lên cấp</span>
              <span class="font-medium text-gray-700">{{ user.progress }}%</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div class="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" :style="{ width: user.progress + '%' }"></div>
            </div>
          </div>
        </div>

        <div class="mt-6 pt-6 border-t border-gray-200">
          <div class="grid grid-cols-3 gap-3">
            <div class="text-center p-3 bg-indigo-50 rounded-xl">
              <p class="text-xs text-gray-500">Học</p>
              <p class="text-lg font-bold text-indigo-600">12h</p>
            </div>
            <div class="text-center p-3 bg-purple-50 rounded-xl">
              <p class="text-xs text-gray-500">Luyện tập</p>
              <p class="text-lg font-bold text-purple-600">8h</p>
            </div>
            <div class="text-center p-3 bg-pink-50 rounded-xl">
              <p class="text-xs text-gray-500">Tổng</p>
              <p class="text-lg font-bold text-pink-600">20h</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfileTab',
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  emits: ['update-user'],
  data() {
    return {
      isEditing: false,
      editedUser: {
        name: ''
      },
      passwordForm: {
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }
    }
  },
  watch: {
    user: {
      immediate: true,
      handler(val) {
        if (val) {
          this.editedUser = { name: val.name || '' }
        }
      }
    }
  },
  methods: {
    toggleEdit() {
      this.isEditing = !this.isEditing
      if (!this.isEditing) {
        this.resetForm()
      }
    },
    resetForm() {
      this.editedUser = { name: this.user.name || '' }
      this.passwordForm = {
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }
    },
    saveProfile() {
      if (!this.editedUser.name.trim()) {
        alert('Tên không được để trống!')
        return
      }

      const isChangingPassword = this.passwordForm.currentPassword || this.passwordForm.newPassword || this.passwordForm.confirmPassword

      if (isChangingPassword) {
        if (!this.passwordForm.currentPassword) {
          alert('Vui lòng nhập mật khẩu hiện tại!')
          return
        }
        if (!this.passwordForm.newPassword) {
          alert('Vui lòng nhập mật khẩu mới!')
          return
        }
        if (this.passwordForm.newPassword !== this.passwordForm.confirmPassword) {
          alert('Mật khẩu xác nhận không khớp!')
          return
        }
      }

      const payload = {
        name: this.editedUser.name
      }

      if (isChangingPassword) {
        payload.currentPassword = this.passwordForm.currentPassword
        payload.newPassword = this.passwordForm.newPassword
      }

      this.$emit('update-user', payload)
      this.isEditing = false
      this.resetForm()
      alert('✅ Cập nhật thông tin thành công!')
    }
  }
}
</script>