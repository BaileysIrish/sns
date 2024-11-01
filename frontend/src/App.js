import React, { useState } from 'react';
import SignupForm from './components/SignupForm';
import LoginForm from './components/LoginForm';
import Home from './components/Home';
import BoardList from './components/BoardList';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <div className="App">
            <h1>회원가입 및 로그인</h1>
            {isLoggedIn ? (
                <>
                    <Home setIsLoggedIn={setIsLoggedIn} />
                    <BoardList />
                </>
            ) : (
                <>
                    <SignupForm />
                    <LoginForm setIsLoggedIn={setIsLoggedIn} />
                </>
            )}
        </div>
    );
}

export default App;
