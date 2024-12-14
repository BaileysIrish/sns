import React, { useEffect, useState } from "react";
import StoryCircle from "../../components/Story/StoryCircle";
import HomeRight from "../../components/HomeRight/HomeRight";
import PostCard from "../../components/Post/PostCard";
import { getPosts } from "../../api/posts";

export default function HomePage() {
  const [posts, setPosts] = useState([]);

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
  return (
    <div>
      <div className="mt-10 flex w-[100%] justify-center py-4 px-5">
        <div className="w-[35%] px-5">
          <div className="storyDiv flex space-x-2 border p-4 rounded-md justify-start w-full ">
            {[1, 1, 11].map((item) => (
              <StoryCircle />
            ))}
          </div>
          <ul className="space-y-10 w-full mt-10">
            {[1, 1].map((post) => (
              <PostCard key={post.id} post={post} />
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
