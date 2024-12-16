import React, { useEffect, useState } from "react";
import ProfileUserDetail from "../../components/Profile/ProfileUserDetail";
import ReqUserPost from "../../components/Profile/ReqUserPost";
import { useLocation, useParams } from "react-router-dom";
import { getUserProfile } from "../../api/User";
import { getMyPosts } from "../../api/posts";

export default function Profile() {
  const { username } = useParams(); // URL에서 username 가져오기
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const [userData, userPosts] = await Promise.all([
          getUserProfile(username), // 사용자 정보 가져오기
          getMyPosts(username), // 사용자의 게시물 가져오기
        ]);
        setUser(userData);
        setPosts(userPosts);
      } catch (error) {
        console.error("프로필 데이터를 불러오는 중 오류:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [username]); // username을 의존성으로 설정

  if (loading) {
    return <div>프로필 데이터를 불러오는 중입니다...</div>; // 로딩 중 메시지
  }

  return (
    <div className="px-20">
      <div className="">
        <ProfileUserDetail user={user} postCount={posts.length} />
      </div>
      <div>
        <ReqUserPost posts={posts} user={user} />
      </div>
    </div>
  );
}
