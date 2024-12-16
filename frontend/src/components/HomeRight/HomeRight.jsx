import React, { useEffect, useState } from "react";
import RecommendCard from "./RecommendCard";
import { getAllUsers, getCurrentUser } from "../../api/User";
import { IoPersonCircle } from "react-icons/io5";

export default function HomeRight() {
  const [user, setUser] = useState(null); // 사용자 정보 상태
  const [error, setError] = useState(null); // 에러 메시지 상태
  const [users, setUsers] = useState([]); // 모든 사용자 정보 상태

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getCurrentUser(); // 현재 사용자 정보 가져오기
        setUser(userData); // 사용자 정보 저장
      } catch (err) {
        console.error("사용자 정보를 가져오는 중 오류:", err);
        setError("사용자 정보를 가져올 수 없습니다.");
      }
    };

    const fetchAllUsers = async () => {
      try {
        const allUsers = await getAllUsers(); // 모든 사용자 정보 가져오기
        setUsers(
          allUsers.filter((item) => item.email !== user?.email) // 현재 사용자 제외
        );
      } catch (err) {
        console.error("모든 사용자 정보를 가져오는 중 오류:", err);
        setError("모든 사용자 정보를 가져올 수 없습니다.");
      }
    };

    fetchUserData();
    fetchAllUsers();
  }, [user?.email]);

  // 랜덤으로 5명의 유저를 선택
  const getRandomUsers = (usersArray, count) => {
    const shuffled = [...usersArray].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const randomUsers = getRandomUsers(users, 5); // 5명의 유저 추천

  return (
    <div className="">
      <div>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div>
              {user?.profileImage ? (
                <img
                  className="w-12 h-12 rounded-full"
                  src={`http://localhost:8080${user.profileImage}`}
                  alt="프로필 이미지"
                />
              ) : (
                <IoPersonCircle className="w-12 h-12 text-gray-400" /> // 기본 아이콘 표시
              )}
            </div>
            <div className="ml-3">
              <p>{user?.email || "fullname"}</p>
              <p className="opacity-70 text-sm">
                {user?.nickname || "username"}
              </p>
            </div>
          </div>
        </div>
        <div className="space-y-5 mt-10">
          {randomUsers.map((randomUser) => (
            <RecommendCard key={randomUser.email} user={randomUser} />
          ))}
        </div>
      </div>
    </div>
  );
}
