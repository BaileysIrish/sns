import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../api/userApi';
import BoardList from './BoardList';
import CreateStory from './CreateStory';
import StoryList from './StoryList';

function Home({ setIsLoggedIn }) {
    const navigate = useNavigate();
    const userEmail = localStorage.getItem("userEmail"); // 로그인한 사용자의 이메일
    const [refreshStories, setRefreshStories] = useState(false);

    const handleLogout = async () => {
        try {
            await logout();
            setIsLoggedIn(false);
            alert("로그아웃 성공");
        } catch (error) {
            alert("로그아웃에 실패했습니다.");
        }
    };

    const goToCreatePost = () => {
        navigate("/create-post");
    };

    const goToEditPost = (postId) => {
        navigate(`/edit-post/${postId}`);
    };

    const refreshStoryList = () => {
        setRefreshStories(!refreshStories);
    };

    return (
        <div>
            <h2>홈 화면</h2>
            <button onClick={handleLogout}>로그아웃</button>
            <button onClick={goToCreatePost}>게시물 작성</button>

            {/* 스토리 생성 기능 */}
            <CreateStory userEmail={userEmail} onStoryCreated={refreshStoryList} />

            {/* 스토리 목록 표시 */}
            <StoryList userEmail={userEmail} key={refreshStories} />

            {/* 게시물 목록 표시 */}
            <BoardList onEditPost={goToEditPost} />
        </div>
    );
}

export default Home;
