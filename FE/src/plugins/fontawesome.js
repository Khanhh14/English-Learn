// src/plugins/fontawesome.js
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// 1. Import các icon Solid (Nét đặc - fas)
import { 
  faBars, 
  faLocationDot, 
  faPhone, 
  faEnvelope,
  faBookOpen,
  faStairs as fasStairs,
  faHeart as fasHeart,
  faRoute,
  faBrain,
  faUser,
  faRightFromBracket,
  // Thêm các icon dùng cho DashboardView
  faBook,
  faPenToSquare,
  faTrophy,
  faCartShopping,
  faBullseye,
  faHouse
} from '@fortawesome/free-solid-svg-icons'

// 2. Import các icon Regular (Nét viền mảnh - far)
import { 
  faHeart as farHeart
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
  farHeart,
  faRoute,
  faBrain,
  faUser,
  faRightFromBracket,
  // Đăng ký các icon mới
  faBook,
  faPenToSquare,
  faTrophy,
  faCartShopping,
  faBullseye,
  faHouse
)

export default FontAwesomeIcon