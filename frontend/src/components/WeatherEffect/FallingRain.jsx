import React from "react";
import "./FallingRain.css"; // 비 전용 스타일

// 비방울 개별 컴포넌트
const Raindrop = ({ style }) => {
  return <p className="rain-drop" style={style}></p>;
};

// 여러 비방울을 생성하는 함수
const makeRaindrops = () => {
  const animationDelay = "0s";
  const fontSize = "14px";
  const arr = Array.from({ length: 60 }); // 비방울 개수는 80개로 설정

  return arr.map((_, i) => {
    const delay = `${(Math.random() * 16).toFixed(2)}s`; // 랜덤 딜레이
    const size = `${Math.floor(Math.random() * 20) + 1}px`; // 1부터 30까지
    const height = `${Math.random() * 20 + 1}px`; // 랜덤 높이 (1px ~ 21px)
    const style = {
      animationDelay: delay,
      fontSize: size,
      height: height,
    };
    return <Raindrop key={i} style={style} />;
  });
};

// 비 내리는 효과의 컨테이너
const FallingRain = () => (
  <div className="rain-container">{makeRaindrops()}</div>
);

export default FallingRain;
