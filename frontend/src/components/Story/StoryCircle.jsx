import React from "react";
import { useNavigate } from "react-router-dom";

export default function StoryCircle({ user }) {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/stories/${user.email}`);
  };
  return (
    <div
      onClick={handleNavigate}
      className="cursor-pointer flex flex-col items-center"
    >
      <img
        className="w-16 h-16 rounded-full"
        src={`http://localhost:8080${user.profileImage}`}
        alt=""
      />
      <p>{user.nickname}</p>
    </div>
  );
}
