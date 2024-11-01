import React, { useState } from 'react';
import { login } from '../api/userApi';

function LoginForm({ setIsLoggedIn }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await login({ email, password });
            alert(result); // 로그인 성공 메시지 표시
            setIsLoggedIn(true); // 로그인 상태 설정
        } catch (error) {
            alert("로그인에 실패했습니다.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button type="submit">로그인</button>
        </form>
    );
}

export default LoginForm;
