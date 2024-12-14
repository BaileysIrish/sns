import React, { useState } from 'react';
import { signup } from '../api/userApi';

function SignupForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nickname, setNickname] = useState('');
    const [telNumber, setTelNumber] = useState('');
    const [profileImage, setProfileImage] = useState(null);

    const handleImageChange = (e) => {
        setProfileImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);
        formData.append("nickname", nickname);
        formData.append("telNumber", telNumber);
        if (profileImage) {
            formData.append("profileImage", profileImage);
        }
        try {
            const result = await signup(formData);
            alert(result);
        } catch (error) {
            alert("회원 가입에 실패했습니다.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <input type="text" placeholder="Nickname" value={nickname} onChange={(e) => setNickname(e.target.value)} required />
            <input type="tel" placeholder="Phone Number" value={telNumber} onChange={(e) => setTelNumber(e.target.value)} required />
            <input type="file" onChange={handleImageChange} />
            <button type="submit">회원 가입</button>
        </form>
    );
}

export default SignupForm;
