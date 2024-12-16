import React from "react";
import { AiOutlineSetting } from "react-icons/ai";
import { IoPersonCircle } from "react-icons/io5";

export default function ProfileUserDetail({ user, postCount }) {
  if (!user) {
    return <div>프로필 정보를 불러오는 중입니다...</div>; // user가 없을 때 기본 메시지
  }
  return (
    <div className="py-10 w-full">
      <div className="flex items-center">
        <div className="w-[15%]">
          {user.profileImage ? (
            <img
              className="w-32 h-32 rounded-full"
              src={`http://localhost:8080${user.profileImage}`}
              alt="프로필 이미지"
            />
          ) : (
            <IoPersonCircle className="w-32 h-32 text-gray-400" />
          )}
        </div>
        <div className="space-y-5">
          <div className="flex space-x-10 items-center">
            <p>{user.nickname}</p>
            <button>프로필 편집</button>
            <AiOutlineSetting />
          </div>
          <div className="flex space-x-10">
            <div>
              <span>게시물</span>
              <span className="font-semibold mr-2">{postCount}</span>
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
            <p className="font-semibold text-sm">{user.email}</p>
            <p className="font-thin text-sm">
              Engineering Grad 👨‍🎓 | Coder 👨‍💼| Party hunk 🎉 🎉 | Traveller 🏝️{" "}
              {user.bio}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
