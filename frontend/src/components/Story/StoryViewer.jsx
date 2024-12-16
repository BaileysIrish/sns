import React, { useEffect, useState } from "react";
import Progrssbar from "./Progrssbar";
import { useParams } from "react-router-dom";
import { getUserStories } from "../../api/User";

export default function StoryViewer() {
  const { email } = useParams();
  const [stories, setStories] = useState([]);
  const [currentStoryIdx, setCurrentStoryIdx] = useState(0);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const data = await getUserStories(email);
        setStories(data);
      } catch (err) {
        console.error("스토리 데이터를 가져오는 중 오류:", err);
      }
    };

    fetchStories();
  }, [email]);

  useEffect(() => {
    if (stories.length > 1) {
      const interval = setInterval(() => {
        setCurrentStoryIdx((prevIdx) =>
          prevIdx < stories.length - 1 ? prevIdx + 1 : 0
        );
      }, 3000); // 3초마다 스토리 변경

      return () => clearInterval(interval); // 컴포넌트 언마운트 시 클리어
    }
  }, [stories, currentStoryIdx]);

  return (
    <div className="relative w-full">
      <div className="flex justify-center items-center h-[100vh] bg-black">
        {stories.length > 0 ? (
          <>
            <img
              className="max-h-[90vh] object-contain"
              src={stories?.[currentStoryIdx]?.fileUrl}
              alt=""
            />

            <div className="absolute top-0 flex w-full">
              {stories.map((item, idx) => (
                <Progrssbar
                  key={idx}
                  idx={idx}
                  duration={3000}
                  activeIdx={currentStoryIdx}
                />
              ))}
            </div>
          </>
        ) : (
          <p className="text-white text-center text-lg">
            스토리가 존재하지 않습니다.
          </p>
        )}
      </div>
    </div>
  );
}
