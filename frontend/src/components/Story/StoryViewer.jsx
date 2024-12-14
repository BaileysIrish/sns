import React, { useEffect, useState } from "react";
import Progrssbar from "./Progrssbar";

export default function StoryViewer({ stories }) {
  const [currentStoryIdx, setCurrentStoryIdx] = useState(0);
  const [activeIdx, setActiveIdx] = useState(0);

  const handleNextStory = () => {
    if (currentStoryIdx < stories.length - 1) {
      setCurrentStoryIdx(currentStoryIdx + 1);
      setActiveIdx(activeIdx + 1);
    } else if (currentStoryIdx === stories.length - 1) {
      setCurrentStoryIdx(0);
      setActiveIdx(0);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNextStory();
    }, 3000);

    return () => clearInterval(interval);
  }, [currentStoryIdx]);

  return (
    <div className="relative w-full">
      <div className="flex justify-center items-center h-[100vh] bg-black">
        <img
          className="max-h-[90vh] object-contain"
          src={stories?.[currentStoryIdx].img}
          alt=""
        />
        <div className="absolute top-0 flex w-full">
          {stories.map((item, idx) => (
            <Progrssbar
              key={idx}
              idx={idx}
              duration={3000}
              activeIdx={activeIdx}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
