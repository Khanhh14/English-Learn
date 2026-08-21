<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
    @click.self="closeModal"
  >
    <div class="absolute inset-0 bg-slate-900/55 backdrop-blur-[2px]"></div>

    <div class="relative w-full max-w-3xl overflow-hidden rounded-[30px] border border-white/60 bg-white/90 shadow-[0_40px_120px_rgba(15,23,42,0.18)] backdrop-blur-xl animate-fadeIn">
      <div class="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200/80 bg-white/90 px-5 py-4 sm:px-6">
        <div class="flex items-center gap-3">
          <div class="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 shadow-[0_16px_32px_rgba(16,185,129,0.28)]">
            <svg class="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <div>
            <h2 class="text-lg font-bold text-slate-800 sm:text-xl">Chính sách bảo mật</h2>
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
            <span class="mr-3 h-6 w-1 rounded-full bg-gradient-to-b from-emerald-500 to-teal-500"></span>
            1. Giới thiệu
          </h3>
          <p class="text-sm leading-7 text-slate-600">
            LinguaFlow cam kết bảo vệ quyền riêng tư của bạn. Chính sách bảo mật này giải thích cách chúng tôi thu thập, sử dụng và bảo vệ thông tin cá nhân khi bạn sử dụng dịch vụ của mình.
          </p>
        </section>

        <section>
          <h3 class="mb-3 flex items-center text-base font-bold text-slate-800 sm:text-lg">
            <span class="mr-3 h-6 w-1 rounded-full bg-gradient-to-b from-emerald-500 to-teal-500"></span>
            2. Thông tin chúng tôi thu thập
          </h3>
          <div class="space-y-3">
            <div class="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
              <h4 class="mb-2 text-sm font-semibold text-slate-800">Thông tin cá nhân bạn cung cấp</h4>
              <ul class="space-y-2 text-sm text-slate-600">
                <li class="flex items-start gap-2">
                  <svg class="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Họ và tên, địa chỉ email và mật khẩu khi đăng ký tài khoản.</span>
                </li>
                <li class="flex items-start gap-2">
                  <svg class="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Thông tin về tiến độ học tập, kết quả kiểm tra và sở thích cá nhân.</span>
                </li>
              </ul>
            </div>

            <div class="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
              <h4 class="mb-2 text-sm font-semibold text-slate-800">Thông tin tự động thu thập</h4>
              <ul class="space-y-2 text-sm text-slate-600">
                <li class="flex items-start gap-2">
                  <svg class="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Địa chỉ IP, loại trình duyệt và thiết bị bạn đang sử dụng.</span>
                </li>
                <li class="flex items-start gap-2">
                  <svg class="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Thời gian, thời lượng và các hoạt động tương tác trên nền tảng.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h3 class="mb-2 flex items-center text-base font-bold text-slate-800 sm:text-lg">
            <span class="mr-3 h-6 w-1 rounded-full bg-gradient-to-b from-emerald-500 to-teal-500"></span>
            3. Cách chúng tôi sử dụng thông tin
          </h3>
          <ul class="space-y-2 text-sm text-slate-600">
            <li class="flex items-start gap-2">
              <svg class="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Cá nhân hóa lộ trình học tập và đề xuất nội dung phù hợp với mục tiêu của bạn.</span>
            </li>
            <li class="flex items-start gap-2">
              <svg class="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Theo dõi tiến độ học tập để hỗ trợ bạn hiệu quả hơn trong quá trình rèn luyện.</span>
            </li>
            <li class="flex items-start gap-2">
              <svg class="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Cải thiện trải nghiệm người dùng và phát triển các tính năng mới phù hợp.</span>
            </li>
          </ul>
        </section>

        <section>
          <h3 class="mb-2 flex items-center text-base font-bold text-slate-800 sm:text-lg">
            <span class="mr-3 h-6 w-1 rounded-full bg-gradient-to-b from-emerald-500 to-teal-500"></span>
            4. Chia sẻ dữ liệu
          </h3>
          <p class="text-sm leading-7 text-slate-600">
            Chúng tôi không bán hoặc chia sẻ thông tin cá nhân của bạn với bên thứ ba, trừ khi có sự đồng ý rõ ràng hoặc theo yêu cầu pháp lý có thẩm quyền.
          </p>
          <ul class="mt-2 space-y-2 text-sm text-slate-600">
            <li class="flex items-start gap-2">
              <svg class="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Bạn đồng ý cho phép chúng tôi chia sẻ thông tin với đối tác hỗ trợ dịch vụ.</span>
            </li>
            <li class="flex items-start gap-2">
              <svg class="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Yêu cầu từ cơ quan pháp lý hoặc cơ quan nhà nước có thẩm quyền.</span>
            </li>
          </ul>
        </section>

        <section>
          <h3 class="mb-2 flex items-center text-base font-bold text-slate-800 sm:text-lg">
            <span class="mr-3 h-6 w-1 rounded-full bg-gradient-to-b from-emerald-500 to-teal-500"></span>
            5. Cookie
          </h3>
          <p class="text-sm leading-7 text-slate-600">
            LinguaFlow sử dụng cookie để ghi nhớ cài đặt, tối ưu trải nghiệm và phân tích hành vi người dùng. Bạn có thể điều chỉnh cài đặt cookie trong trình duyệt của mình.
          </p>
        </section>

        <section class="rounded-2xl border border-emerald-100 bg-gradient-to-r from-emerald-50 to-teal-50 p-4">
          <h3 class="mb-2 flex items-center text-base font-bold text-slate-800 sm:text-lg">
            <span class="mr-3 h-6 w-1 rounded-full bg-gradient-to-b from-emerald-500 to-teal-500"></span>
            6. Liên hệ
          </h3>
          <p class="text-sm leading-7 text-slate-600">
            Nếu bạn có bất kỳ câu hỏi nào về chính sách bảo mật, vui lòng liên hệ qua email:
            <a href="mailto:privacy@linguaflow.com" class="font-semibold text-indigo-600 transition-colors hover:text-indigo-700 hover:underline">
              privacy@linguaflow.com
            </a>
          </p>
        </section>
      </div>

      <div class="sticky bottom-0 flex justify-end border-t border-slate-200/80 bg-white/90 px-5 py-4 sm:px-6">
        <button
          type="button"
          @click="closeModal"
          class="rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_14px_26px_rgba(16,185,129,0.3)] transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_30px_rgba(16,185,129,0.35)]"
        >
          Đã hiểu
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PrivacyPolicy',
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
  background: linear-gradient(to bottom, #10b981, #14b8a6);
  border-radius: 999px;
}

.max-h-\[72vh\]::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to bottom, #059669, #0f766e);
}
</style>
