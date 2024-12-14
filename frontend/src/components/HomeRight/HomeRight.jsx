import React from "react";
import RecommendCard from "./RecommendCard";

export default function HomeRight() {
  return (
    <div className="">
      <div>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div>
              <img
                className="w-12 h-12 rounded-full"
                src="https://cdn.pixabay.com/photo/2023/01/16/22/48/bird-7723465_640.jpg"
                alt=""
              />
            </div>
            <div className="ml-3">
              <p>fullname</p>
              <p className="opacity-70 text-sm">username</p>
            </div>
          </div>
          <div>
            <p className="text-blue-700 font-semibold">전환</p>
          </div>
        </div>
        <div className="space-y-5 mt-10">
          {Array(5)
            .fill(1)
            .map((item) => (
              <RecommendCard />
            ))}
        </div>
      </div>
    </div>
  );
}
