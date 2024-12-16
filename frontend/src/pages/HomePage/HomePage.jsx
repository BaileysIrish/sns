import React, { useEffect, useState } from "react";
import StoryCircle from "../../components/Story/StoryCircle";
import HomeRight from "../../components/HomeRight/HomeRight";
import PostCard from "../../components/Post/PostCard";
import { getPosts } from "../../api/posts";
import { getAllUsers } from "../../api/User";

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        // 사용자 목록 랜덤화
        const shuffledUsers = data.sort(() => 0.5 - Math.random()).slice(0, 5);
        setUsers(shuffledUsers);
      } catch (error) {
        console.error("사용자 정보를 가져오는 중 오류:", error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts(); // API 호출
        setPosts(data); // 데이터 상태에 저장
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  // 게시물 삭제 처리 함수
  const handleDeletePost = (boardNumber) => {
    setPosts((prevPosts) =>
      prevPosts.filter((post) => post.boardNumber !== boardNumber)
    );
  };

  return (
    <div>
      <div className="mt-10 flex w-[100%] justify-center py-4 px-5">
        <div className="w-[35%] px-5">
          <div className="storyDiv flex space-x-2 border p-4 rounded-md justify-start w-full ">
            {users.map((user) => (
              <StoryCircle key={user.email} user={user} />
            ))}
          </div>
          <ul className="space-y-10 w-full mt-10">
            {posts?.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onDeletePost={handleDeletePost}
              />
            ))}
          </ul>
        </div>
        <div className="w-[25%] pl-20">
          <HomeRight />
        </div>
      </div>
    </div>
  );
}
