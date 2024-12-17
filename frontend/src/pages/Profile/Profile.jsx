import React, { useEffect, useState } from "react";
import ProfileUserDetail from "../../components/Profile/ProfileUserDetail";
import ReqUserPost from "../../components/Profile/ReqUserPost";
import { useLocation, useParams } from "react-router-dom";
import { getUserProfile } from "../../api/User";
import { getMyPosts, getSavedPosts } from "../../api/posts";

export default function Profile() {
  const { username } = useParams(); // URL에서 username 가져오기
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savedPosts, setSavedPosts] = useState([]); // 저장된 게시물

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        // 사용자 프로필과 게시물 가져오기
        const [userData, userPosts] = await Promise.all([
          getUserProfile(username),
          getMyPosts(username),
        ]);

        // 저장된 게시물 가져오기
        const savedPostsResponse = await getSavedPosts(username);
        console.log(savedPostsResponse);
        const formattedSavedPosts = savedPostsResponse.data.map((post) => ({
          boardNumber: post.boardNumber, // id를 boardNumber로 설정
          email: post.email || post.authorId || "", // authorId를 email로 설정
          content: post.content || "", // 기본값 설정
          files: post.files
            ? post.files.map((file) => ({
                fileUrl: file.fileUrl || "", // fileUrl이 있는 경우만 사용
                fileType: file.fileType || "image/png", // fileType이 없으면 기본값
              }))
            : [],
          writeDatetime: post.writeDatetime, // createdAt을 writeDatetime으로 설정
        }));

        // 상태 설정
        setUser(userData);
        setPosts(userPosts);
        setSavedPosts(formattedSavedPosts);
      } catch (error) {
        console.error("프로필 데이터를 불러오는 중 오류:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [username]); // username이 바뀌면 다시 실행

  if (loading) {
    return <div>프로필 데이터를 불러오는 중입니다...</div>; // 로딩 중 메시지
  }

  return (
    <div className="px-20">
      <div className="">
        <ProfileUserDetail user={user} postCount={posts.length} />
      </div>
      <div>
        <ReqUserPost posts={posts} savedPosts={savedPosts} user={user} />
      </div>
    </div>
  );
}
