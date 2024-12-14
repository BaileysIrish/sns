import React, { useEffect, useState } from "react";
import "./Auth.css";
import { motion, AnimatePresence } from "framer-motion";
import Signin from "../../components/Register/Signin";
import { useLocation } from "react-router-dom";
import Signup from "../../components/Register/Signup";
import ImageSlider from "./ImageSlider";

export default function Auth() {
  const location = useLocation();
  const images = [
    "https://cdn.pixabay.com/photo/2023/12/11/09/36/whisky-8443152_1280.jpg",
    "https://cdn.pixabay.com/photo/2022/12/28/18/02/christmas-7683520_640.jpg",
    "https://cdn.pixabay.com/photo/2023/02/10/18/05/architecture-7781432_640.jpg",
    "https://cdn.pixabay.com/photo/2024/10/25/18/54/celebration-9149600_640.jpg",
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div>
      <div className="flex items-center justify-center h-[100vh] space-x-5">
        <div className="flex items-stretch justify-center space-x-8 h-[35.3rem]">
          {/* 이미지 컨테이너 */}
          <ImageSlider images={images} />

          {/* Signin 컴포넌트 */}
          <div className="flex-1 h-full flex items-center justify-center rounded-lg border w-[23rem]">
            {location.pathname === "/login" ? <Signin /> : <Signup />}
          </div>
        </div>
      </div>
    </div>
  );
}
