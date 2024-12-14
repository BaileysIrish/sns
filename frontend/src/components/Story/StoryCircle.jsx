import React from "react";
import { useNavigate } from "react-router-dom";

export default function StoryCircle() {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/stories");
  };
  return (
    <div
      onClick={handleNavigate}
      className="cursor-pointer flex flex-col items-center"
    >
      <img
        className="w-16 h-16 rounded-full"
        src="https://cdn.pixabay.com/photo/2024/10/22/01/17/cat-9138461_640.jpg"
        alt=""
      />
      <p>username</p>
    </div>
  );
}
