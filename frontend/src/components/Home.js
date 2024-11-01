import React from 'react';
import { logout } from '../api/userApi';

function Home({ setIsLoggedIn }) {
    const handleLogout = async () => {
        try {
            await logout();
            setIsLoggedIn(false); // 로그인 상태 해제
            alert("로그아웃 성공");
        } catch (error) {
            alert("로그아웃에 실패했습니다.");
        }
    };

    return (
        <div>
            <h2>홈 화면</h2>
            <button onClick={handleLogout}>로그아웃</button>
        </div>
    );
}

export default Home;
