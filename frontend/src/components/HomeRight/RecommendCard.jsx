import React from "react";
import { IoPersonCircle } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function RecommendCard({ user }) {
  const navigate = useNavigate(); // useNavigate 훅 사용

  const handleProfileClick = () => {
    navigate(`/profile/${user.email}`); // 해당 사용자의 프로필 페이지로 이동
  };

  return (
    <div className="flex justify-between items-center">
      <div
        className="flex items-center cursor-pointer"
        onClick={handleProfileClick}
      >
        {user.profileImage ? (
          <img
            className="w-9 h-9 rounded-full"
            src={`http://localhost:8080${user.profileImage}`}
            alt="추천 사용자 프로필"
          />
        ) : (
          <IoPersonCircle className="w-9 h-9 text-gray-400" /> // 기본 아이콘
        )}
        <div className="ml-2">
          <p className="text-sm font-semibold">{user.email}</p>
          <p className="text-gray-500 text-sm">
            {user.nickname}님이 팔로우합니다
          </p>
        </div>
      </div>
      <p className="text-blue-700 text-sm font-semibold">follow</p>
    </div>
  );
}
