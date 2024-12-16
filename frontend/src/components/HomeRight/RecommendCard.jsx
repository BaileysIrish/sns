import React from "react";
import { IoPersonCircle } from "react-icons/io5";

export default function RecommendCard({ user }) {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center">
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
