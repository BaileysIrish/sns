import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../api/userApi';
import BoardList from './BoardList'; // BoardList 컴포넌트 가져오기

function Home({ setIsLoggedIn }) {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            setIsLoggedIn(false); // 로그인 상태 해제
            alert("로그아웃 성공");
        } catch (error) {
            alert("로그아웃에 실패했습니다.");
        }
    };

    const goToCreatePost = () => {
        navigate("/create-post"); // 게시물 작성 페이지로 이동
    };

    return (
        <div>
            <h2>홈 화면</h2>
            <button onClick={handleLogout}>로그아웃</button>
            <button onClick={goToCreatePost}>게시물 작성</button>

            {/* 작성된 게시물 목록 표시 */}
            <BoardList />
        </div>
    );
}

export default Home;
