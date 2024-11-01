import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignupForm from './components/SignupForm';
import LoginForm from './components/LoginForm';
import Home from './components/Home';
import BoardList from './components/BoardList';
import CreatePost from './components/CreatePost';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <Router>
            <div className="App">
                <h1>회원가입 및 로그인</h1>
                {isLoggedIn ? (
                    <Routes>
                        <Route path="/" element={<Home setIsLoggedIn={setIsLoggedIn} />} />
                        <Route path="/board" element={<BoardList />} />
                        <Route path="/create-post" element={<CreatePost />} /> {/* 게시물 작성 경로 추가 */}
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
