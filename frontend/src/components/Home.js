import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../api/userApi';
import BoardList from './BoardList';
import CreateStory from './CreateStory';
import StoryList from './StoryList';
import WeatherDisplay from './WeatherDisplay'; // WeatherDisplay 추가
import TodaySchedule from './TodaySchedule'; // 오늘 일정 표시 컴포넌트 추가

function Home({ setIsLoggedIn }) {
    const navigate = useNavigate();
    const userEmail = localStorage.getItem("userEmail");
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

    const goToCalendar = () => {
        navigate("/calendar");
    };

    const refreshStoryList = () => {
        setRefreshStories(!refreshStories);
    };

    return (
        <div>
            <h2>홈 화면</h2>

            {/* 날씨 정보 */}
            <WeatherDisplay />

            <button onClick={handleLogout}>로그아웃</button>
            <button onClick={goToCreatePost}>게시물 작성</button>
            <button onClick={goToCalendar}>캘린더로 이동</button>

            {/* 오늘 일정 표시 */}
            <TodaySchedule />

            {/* 스토리 생성 및 표시 */}
            <CreateStory userEmail={userEmail} onStoryCreated={refreshStoryList} />
            <StoryList userEmail={userEmail} key={refreshStories} />

            {/* 게시물 목록 */}
            <BoardList />
        </div>
    );
}

export default Home;
