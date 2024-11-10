import React from "react";

export default function RecommendCard() {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center">
        <img
          className="w-9 h-9 rounded-full"
          src="https://cdn.pixabay.com/photo/2022/01/26/11/20/house-6968620_640.png"
          alt=""
        />
        <div className="ml-2">
          <p className="text-sm font-semibold">username</p>
          <p className="text-gray-500 text-sm">username님이 팔로우 합니다</p>
        </div>
      </div>
      <p className="text-blue-700 text-sm font-semibold">follow</p>
    </div>
  );
}
