import {
  AiOutlineHome,
  AiFillHome,
  AiOutlineHeart,
  AiFillHeart,
} from "react-icons/ai";
import {
  IoCompassOutline,
  IoCompass,
  IoPaperPlaneOutline,
  IoPaperPlaneSharp,
  IoSearchOutline,
  IoSearchSharp,
} from "react-icons/io5";
import { BiMoviePlay, BiSolidMoviePlay } from "react-icons/bi";
import { LuPlusSquare } from "react-icons/lu";
import { CgProfile } from "react-icons/cg";

export const sidebarMenu = [
  {
    title: "홈",
    icon: <AiOutlineHome className="text-2xl mr-5" />,
    activeIcon: <AiFillHome className="text-2xl mr-5" />,
  },
  {
    title: "검색",
    icon: <IoSearchOutline className="text-2xl mr-5" />,
    activeIcon: <IoSearchSharp className="text-2xl mr-5" />,
  },
  {
    title: "만들기",
    icon: <LuPlusSquare className="text-2xl mr-5" />,
    activeIcon: <LuPlusSquare className="text-2xl mr-5" />,
  },
  {
    title: "프로필",
    icon: <CgProfile className="text-2xl mr-5" />,
    activeIcon: <CgProfile className="text-2xl mr-5" />,
  },
];
