import React, { useEffect, useState } from "react";
import "./Progressbar.css";

export default function Progrssbar({ idx, activeIdx, duration }) {
  const [progress, setProgress] = useState(0);
  const isActive = idx === activeIdx;
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress < 100) {
          return prevProgress + 1;
        }
        clearInterval(interval);
        return prevProgress;
      });
    }, duration / 100);
    return () => {
      clearInterval(interval);
    };
  }, [duration, activeIdx]);

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
