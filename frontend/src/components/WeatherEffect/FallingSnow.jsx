import React from "react";
import "./FallingSnow.css";

// 눈송이 개별 컴포넌트
const Snowflake = ({ style }) => {
  return (
    <p className="snow-flake" style={style}>
      {"\u2745"}
    </p>
  );
};

// 여러 눈송이를 생성하는 함수
const makeSnowFlakes = () => {
  const animationDelay = "0s";
  const fontSize = "14px";
  const arr = Array.from({ length: 60 }); // 눈송이 개수는 30개로 설정

  return arr.map((_, i) => {
    const delay = `${(Math.random() * 16).toFixed(2)}s`; // 랜덤 딜레이
    const size = `${Math.floor(Math.random() * 30) + 1}px`; // 1부터 30까지
    const style = {
      animationDelay: delay,
      fontSize: size,
    };
    return <Snowflake key={i} style={style} />;
  });
};

// 눈 내리는 효과의 컨테이너
const FallingSnow = () => (
  <div className="snow-container">{makeSnowFlakes()}</div>
);

export default FallingSnow;
