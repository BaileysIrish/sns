import React from "react";
import { IoPersonCircle } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function SearchUser({ user, setOpen }) {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate(`/profile/${user.email}`); // 프로필로 이동
    setOpen(false); // 검색창 닫기
  };

  return (
    <div className="py-2 cursor-pointer" onClick={handleProfileClick}>
      <div className="flex items-center">
        {user.profileImage ? (
          <img
            className="w-10 h-10 rounded-full"
            src={`http://localhost:8080${user.profileImage}`}
            alt="프로필 이미지"
          />
        ) : (
          <IoPersonCircle className="w-10 h-10 text-gray-400" /> // 기본 이미지
        )}
        <div className="ml-3">
          <p>{user.nickname || "닉네임 없음"}</p>
          <p className="opacity-70">{user.email}</p> {/* 이메일 앞부분 */}
        </div>
      </div>
    </div>
  );
}
