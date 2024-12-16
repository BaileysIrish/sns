import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignupForm from './components/SignupForm';
import LoginForm from './components/LoginForm';
import Home from './components/Home';
import BoardList from './components/BoardList';
import CreatePost from './components/CreatePost';
import CreateStory from './components/CreateStory'; // 스토리 생성
import StoryList from './components/StoryList'; // 스토리 목록
import CalendarPage from './components/Calendar'; // 캘린더 페이지 추가

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <Router>
            <div className="App">
                <h1>회원가입 및 로그인</h1>
                {isLoggedIn ? (
                    <Routes>
                        {/* 홈 화면 */}
                        <Route path="/" element={<Home setIsLoggedIn={setIsLoggedIn} />} />

                        {/* 게시물 관련 */}
                        <Route path="/board" element={<BoardList />} />
                        <Route path="/create-post" element={<CreatePost />} />

                        {/* 스토리 관련 */}
                        <Route path="/create-story" element={<CreateStory userEmail={localStorage.getItem("userEmail")} />} />
                        <Route path="/stories" element={<StoryList userEmail={localStorage.getItem("userEmail")} />} />

                        {/* 캘린더 페이지 추가 */}
                        <Route path="/calendar" element={<CalendarPage />} />
                    </Routes>
                ) : (
                    <>
                        <SignupForm />
                        <LoginForm setIsLoggedIn={setIsLoggedIn} />
                    </>
                )}
            </div>
        </Router>
    );
}

export default App;
