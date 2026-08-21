// src/plugins/fontawesome.js
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// 1. Import các icon Solid (Nét đặc - fas)
import { 
  faBars, 
  faLocationDot, 
  faPhone, 
  faEnvelope,
  faBookOpen,         // Icon cuốn sách (fas)
  faStairs as fasStairs, // Icon cầu thang (fas)
  faHeart as fasHeart 
} from '@fortawesome/free-solid-svg-icons'

// 2. Import các icon Regular (Nét viền mảnh - far)
import { 
  faHeart as farHeart
  // faStairs as farStairs // (Chỉ mở nếu bạn dùng FontAwesome Pro)
} from '@fortawesome/free-regular-svg-icons'

// Đăng ký toàn bộ vào thư viện
library.add(
  faBars, 
  faLocationDot, 
  faPhone, 
  faEnvelope, 
  faBookOpen,
  fasStairs,
  fasHeart, 
  farHeart
)

export default FontAwesomeIcon