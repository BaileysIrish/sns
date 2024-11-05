import React from "react";
import { AiOutlineSetting } from "react-icons/ai";

export default function ProfileUserDetail() {
  return (
    <div className="py-10 w-full">
      <div className="flex items-center">
        <div className="w-[15%]">
          <img
            className="w-32 h-32 rounded-full"
            src="https://cdn.pixabay.com/photo/2020/06/20/11/09/cat-5320572_640.jpg"
            alt=""
          />
        </div>
        <div className="space-y-5">
          <div className="flex space-x-10 items-center">
            <p>username</p>
            <button>프로필 편집</button>
            <AiOutlineSetting />
          </div>
          <div className="flex space-x-10">
            <div>
              <span>게시물</span>
              <span className="font-semibold mr-2">10</span>
            </div>
            <div>
              <span>팔로워</span>
              <span className="font-semibold mr-2">5</span>
            </div>
            <div>
              <span>팔로우</span>
              <span className="font-semibold mr-2">15</span>
            </div>
          </div>
          <div>
            <p className="font-semibold text-sm">Full Name</p>
            <p className="font-thin text-sm">
              Engineering Grad 👨‍🎓 | Coder 👨‍💼| Party hunk 🎉 🎉 | Traveller 🏝️
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
