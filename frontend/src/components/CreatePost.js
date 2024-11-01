import React, { useState } from 'react';
import { createPost } from '../api/userApi';

function CreatePost() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createPost({ title, content, email: "user@example.com" });
        alert("게시물 작성 완료");
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="제목" value={title} onChange={(e) => setTitle(e.target.value)} required />
            <textarea placeholder="내용" value={content} onChange={(e) => setContent(e.target.value)} required />
            <button type="submit">작성</button>
        </form>
    );
}

export default CreatePost;
