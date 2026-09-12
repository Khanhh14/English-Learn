<!-- src/components/Home/Footer.vue -->
<template>
  <footer class="relative z-10 bg-white/30 backdrop-blur-xl border-t border-white/30 py-12">
    <div class="container mx-auto px-4 max-w-6xl">
      <div class="grid md:grid-cols-4 gap-8">
        <div>
          <div class="flex items-center space-x-3 mb-4">
            <font-awesome-icon :icon="['fas', 'book-open']" class="text-2xl text-indigo-600" />
            <span class="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">LinguaFlow</span>
          </div>
          <p class="text-sm text-gray-600">Học tiếng Anh thông minh với công nghệ AI</p>
        </div>
        <div>
          <h4 class="font-bold text-gray-800 mb-3">Sản phẩm</h4>
          <ul class="space-y-2 text-sm text-gray-600">
            <li><a href="#" class="hover:text-indigo-600 transition-colors">Tính năng</a></li>
            <li><a href="#" class="hover:text-indigo-600 transition-colors">Lộ trình</a></li>
            <li><a href="#" class="hover:text-indigo-600 transition-colors">Bảng giá</a></li>
          </ul>
        </div>
        <div>
          <h4 class="font-bold text-gray-800 mb-3">Hỗ trợ</h4>
          <ul class="space-y-2 text-sm text-gray-600">
            <li><a href="#" class="hover:text-indigo-600 transition-colors">FAQ</a></li>
            <li><a href="#" class="hover:text-indigo-600 transition-colors">Liên hệ</a></li>
            <li><a href="#" class="hover:text-indigo-600 transition-colors">Blog</a></li>
          </ul>
        </div>
        <div>
          <h4 class="font-bold text-gray-800 mb-3">Kết nối</h4>
          <div class="flex space-x-3">
            <a href="#" class="h-9 w-9 rounded-full bg-slate-100 flex items-center justify-center text-gray-500 hover:bg-indigo-50 hover:text-indigo-600 transition-colors">
              <font-awesome-icon :icon="['fas', 'share-nodes']" />
            </a>
            <a href="#" class="h-9 w-9 rounded-full bg-slate-100 flex items-center justify-center text-gray-500 hover:bg-indigo-50 hover:text-indigo-600 transition-colors">
              <font-awesome-icon :icon="['fas', 'link']" />
            </a>
            <a href="#" class="h-9 w-9 rounded-full bg-slate-100 flex items-center justify-center text-gray-500 hover:bg-indigo-50 hover:text-indigo-600 transition-colors">
              <font-awesome-icon :icon="['fas', 'envelope']" />
            </a>
            <a href="#" class="h-9 w-9 rounded-full bg-slate-100 flex items-center justify-center text-gray-500 hover:bg-indigo-50 hover:text-indigo-600 transition-colors">
              <font-awesome-icon :icon="['fas', 'phone']" />
            </a>
          </div>
        </div>
      </div>
      <div class="border-t border-white/30 mt-8 pt-8 text-center text-sm text-gray-500">
        <p>© 2026 LinguaFlow. Made with <font-awesome-icon :icon="['fas', 'heart']" class="text-purple-600 inline-block" /></p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'HomeFooter'
}
</script>