// src/plugins/fontawesome.js
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// 1. Solid Icons (fas)
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
  faBook,
  faPenToSquare,
  faTrophy,
  faCartShopping,
  faBullseye,
  faHouse,
  faStar,
  faFire,
  faEye,
  faGem,
  faRocket,
  faEarthAmericas,
  faUserTie,
  faChalkboardUser,
  faCode,
  faLink,
  faLightbulb,
  faHandshake,
  faShareNodes,
  faSeedling,
  faLeaf,
  faTree,
  faHeadphones,
  faPenNib,
  faRotate,
  faArrowRight
} from '@fortawesome/free-solid-svg-icons'

// 2. Regular Icons (far)
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
  faBook,
  faPenToSquare,
  faTrophy,
  faCartShopping,
  faBullseye,
  faHouse,
  faStar,
  faFire,
  faEye,
  faGem,
  faRocket,
  faEarthAmericas,
  faUserTie,
  faChalkboardUser,
  faCode,
  faLink,
  faLightbulb,
  faHandshake,
  faShareNodes,
  faSeedling,
  faLeaf,
  faTree,
  faHeadphones,
  faPenNib,
  faRotate,
  faArrowRight
)

export default FontAwesomeIcon