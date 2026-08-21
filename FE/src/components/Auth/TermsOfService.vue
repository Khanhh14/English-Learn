<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
    @click.self="closeModal"
  >
    <div class="absolute inset-0 bg-slate-900/55 backdrop-blur-[2px]"></div>

    <div class="relative w-full max-w-3xl overflow-hidden rounded-[30px] border border-white/60 bg-white/90 shadow-[0_40px_120px_rgba(79,70,229,0.18)] backdrop-blur-xl animate-fadeIn">
      <div class="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200/80 bg-white/90 px-5 py-4 sm:px-6">
        <div class="flex items-center gap-3">
          <div class="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500 shadow-[0_16px_32px_rgba(99,102,241,0.28)]">
            <svg class="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div>
            <h2 class="text-lg font-bold text-slate-800 sm:text-xl">Điều khoản dịch vụ</h2>
            <p class="text-[11px] text-slate-500">Cập nhật lần cuối: 20 tháng 8, 2026</p>
          </div>
        </div>

        <button
          type="button"
          @click="closeModal"
          class="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-500 transition-all hover:border-slate-300 hover:bg-slate-100 hover:text-slate-700"
          aria-label="Đóng modal"
        >
          <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div class="max-h-[72vh] space-y-6 overflow-y-auto px-5 py-6 sm:px-7">
        <section>
          <h3 class="mb-2 flex items-center text-base font-bold text-slate-800 sm:text-lg">
            <span class="mr-3 h-6 w-1 rounded-full bg-gradient-to-b from-indigo-500 to-violet-500"></span>
            1. Giới thiệu
          </h3>
          <p class="text-sm leading-7 text-slate-600">
            Chào mừng bạn đến với LinguaFlow. Bằng việc sử dụng dịch vụ, bạn xác nhận đã đọc, hiểu và đồng ý với các điều khoản được nêu trong tài liệu này. Vui lòng đọc kỹ trước khi tiếp tục sử dụng nền tảng.
          </p>
        </section>

        <section>
          <h3 class="mb-2 flex items-center text-base font-bold text-slate-800 sm:text-lg">
            <span class="mr-3 h-6 w-1 rounded-full bg-gradient-to-b from-indigo-500 to-violet-500"></span>
            2. Chấp nhận điều khoản
          </h3>
          <p class="text-sm leading-7 text-slate-600">
            Khi đăng ký tài khoản hoặc sử dụng dịch vụ của LinguaFlow, bạn đồng ý tuân thủ toàn bộ các quy định, chính sách và điều kiện được ghi trong tài liệu này. Nếu không đồng ý, vui lòng ngừng sử dụng dịch vụ ngay lập tức.
          </p>
        </section>

        <section>
          <h3 class="mb-3 flex items-center text-base font-bold text-slate-800 sm:text-lg">
            <span class="mr-3 h-6 w-1 rounded-full bg-gradient-to-b from-indigo-500 to-violet-500"></span>
            3. Đăng ký tài khoản
          </h3>
          <ul class="space-y-2 text-sm text-slate-600">
            <li class="flex items-start gap-2">
              <svg class="mt-0.5 h-4 w-4 flex-shrink-0 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Bạn phải cung cấp thông tin chính xác, đầy đủ và cập nhật trong quá trình sử dụng.</span>
            </li>
            <li class="flex items-start gap-2">
              <svg class="mt-0.5 h-4 w-4 flex-shrink-0 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Bạn chịu trách nhiệm bảo mật thông tin đăng nhập và không chia sẻ cho bên thứ ba.</span>
            </li>
            <li class="flex items-start gap-2">
              <svg class="mt-0.5 h-4 w-4 flex-shrink-0 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Mỗi người dùng chỉ được sở hữu một tài khoản duy nhất trên hệ thống.</span>
            </li>
          </ul>
        </section>

        <section>
          <h3 class="mb-3 flex items-center text-base font-bold text-slate-800 sm:text-lg">
            <span class="mr-3 h-6 w-1 rounded-full bg-gradient-to-b from-indigo-500 to-violet-500"></span>
            4. Trách nhiệm của người dùng
          </h3>
          <ul class="space-y-2 text-sm text-slate-600">
            <li class="flex items-start gap-2">
              <svg class="mt-0.5 h-4 w-4 flex-shrink-0 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Sử dụng dịch vụ cho mục đích học tập cá nhân và không vi phạm pháp luật.</span>
            </li>
            <li class="flex items-start gap-2">
              <svg class="mt-0.5 h-4 w-4 flex-shrink-0 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Không sao chép, phân phối, khai thác trái phép nội dung hoặc tài nguyên trên nền tảng.</span>
            </li>
            <li class="flex items-start gap-2">
              <svg class="mt-0.5 h-4 w-4 flex-shrink-0 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Không gây hại, lừa đảo, phá hoại hoặc làm suy yếu hoạt động của hệ thống.</span>
            </li>
          </ul>
        </section>

        <section>
          <h3 class="mb-2 flex items-center text-base font-bold text-slate-800 sm:text-lg">
            <span class="mr-3 h-6 w-1 rounded-full bg-gradient-to-b from-indigo-500 to-violet-500"></span>
            5. Sở hữu trí tuệ
          </h3>
          <p class="text-sm leading-7 text-slate-600">
            Toàn bộ nội dung trên LinguaFlow, bao gồm nhưng không giới hạn ở văn bản, hình ảnh, âm thanh, video, giao diện và mã nguồn, thuộc quyền sở hữu của LinguaFlow và được bảo vệ theo quy định pháp luật về bản quyền và sở hữu trí tuệ.
          </p>
        </section>

        <section class="rounded-2xl border border-indigo-100 bg-gradient-to-r from-indigo-50 to-violet-50 p-4">
          <h3 class="mb-2 flex items-center text-base font-bold text-slate-800 sm:text-lg">
            <span class="mr-3 h-6 w-1 rounded-full bg-gradient-to-b from-indigo-500 to-violet-500"></span>
            6. Liên hệ
          </h3>
          <p class="text-sm leading-7 text-slate-600">
            Nếu bạn có bất kỳ thắc mắc nào về điều khoản dịch vụ, vui lòng gửi email đến:
            <a href="mailto:support@linguaflow.com" class="font-semibold text-indigo-600 transition-colors hover:text-indigo-700 hover:underline">
              support@linguaflow.com
            </a>
          </p>
        </section>
      </div>

      <div class="sticky bottom-0 flex justify-end border-t border-slate-200/80 bg-white/90 px-5 py-4 sm:px-6">
        <button
          type="button"
          @click="closeModal"
          class="rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_14px_26px_rgba(99,102,241,0.3)] transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_30px_rgba(99,102,241,0.35)]"
        >
          Đã hiểu
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TermsOfService',
  props: {
    isOpen: {
      type: Boolean,
      default: false
    }
  },
  emits: ['close'],
  methods: {
    closeModal() {
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(10px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.25s ease-out;
}

.max-h-\[72vh\]::-webkit-scrollbar {
  width: 6px;
}

.max-h-\[72vh\]::-webkit-scrollbar-track {
  background: rgba(148, 163, 184, 0.08);
  border-radius: 999px;
}

.max-h-\[72vh\]::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, #6366f1, #8b5cf6);
  border-radius: 999px;
}

.max-h-\[72vh\]::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to bottom, #4f46e5, #7c3aed);
}
</style>
