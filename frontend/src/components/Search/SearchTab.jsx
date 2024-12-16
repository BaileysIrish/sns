import React, { useEffect, useState } from "react";
import "./SearchTab.css";
import SearchUser from "./SearchUser";
import { getAllUsers } from "../../api/User";

export default function SearchTab({ open, setOpen }) {
  const [users, setUsers] = useState([]); // 전체 사용자 목록
  const [filteredUsers, setFilteredUsers] = useState([]); // 검색 결과
  const [searchQuery, setSearchQuery] = useState(""); // 검색어

  useEffect(() => {
    // 모든 사용자 데이터 가져오기
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data);
      } catch (error) {
        console.error("사용자 데이터를 가져오는 중 오류 발생:", error);
      }
    };

    fetchUsers();
  }, []);

  // 검색어 변경 시 필터링
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredUsers([]); // 검색어가 없으면 결과 비우기
      return;
    }

    const filtered = users.filter((user) => {
      const username = user.email;
      return (
        username.toLowerCase().includes(searchQuery.toLowerCase()) || // 아이디 검색
        user.nickname?.toLowerCase().includes(searchQuery.toLowerCase()) // 닉네임 검색
      );
    });

    setFilteredUsers(filtered);
  }, [searchQuery, users]);

  return (
    <div className="searchContainer">
      <div className="inputWrapper px-3 pb-5">
        <h1 className="text-2xl font-semibold mb-10 ml-3">검색</h1>
        <input
          type="text"
          placeholder="검색"
          className="searchInput"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // 검색어 업데이트
        />
      </div>
      <hr />
      <div className="px-3">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <SearchUser key={user.email} user={user} setOpen={setOpen} /> // 검색 결과 표시
          ))
        ) : (
          <p className="text-center text-gray-500 mt-5">
            검색 결과가 없습니다.
          </p>
        )}
      </div>
    </div>
  );
}
