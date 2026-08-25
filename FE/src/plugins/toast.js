// src/plugins/toast.js
import Toast, { useToast } from 'vue-toastification'
import 'vue-toastification/dist/index.css' // CSS mặc định có sẵn màu xanh/đỏ chuẩn

const options = {
  position: 'top-right',
  timeout: 3000,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  hideProgressBar: false
}

export default {
  install(app) {
    app.use(Toast, options)
    // Đăng ký toàn cục để component gọi qua this.$toast
    app.config.globalProperties.$toast = useToast()
  }
}