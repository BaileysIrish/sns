import React, { useEffect, useState } from "react";
import "./Progressbar.css";

export default function Progrssbar({ idx, activeIdx, duration }) {
  const [progress, setProgress] = useState(0);
  const isActive = idx === activeIdx;

  useEffect(() => {
    if (isActive) {
      setProgress(0); // 활성화 시 진행도 초기화
      const interval = setInterval(() => {
        setProgress((prevProgress) =>
          prevProgress < 100 ? prevProgress + 1 : 100
        );
      }, duration / 100);

      return () => clearInterval(interval); // 컴포넌트 언마운트 시 정리
    } else {
      setProgress(0); // 비활성화 시 초기화
    }
  }, [isActive, duration]);

  useEffect(() => {
    setProgress(0);
  }, [activeIdx]);

  return (
    <div className={`progress-bar-container ${isActive ? "active" : ""}`}>
      <div
        className={`${isActive ? "progress-bar" : ""}`}
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
}
