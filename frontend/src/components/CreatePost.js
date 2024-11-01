import React, { useState } from 'react';
import { createPost } from '../api/userApi';

function CreatePost() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [contentImage, setContentImage] = useState(null);

    const handleImageChange = (e) => {
        setContentImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // FormData 객체 생성
        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        formData.append("email", "user@example.com"); // 실제 사용자 이메일을 넣어야 함
        if (contentImage) {
            formData.append("content_image", contentImage);
        }

        // 서버에 요청 보내기
        try {
            const response = await createPost(formData);
            alert("게시물이 작성되었습니다!");
            // 필요 시 이후 추가 동작 (예: 게시물 목록 새로고침) 수행
        } catch (error) {
            console.error("게시물 작성 중 오류가 발생했습니다:", error);
            alert("게시물 작성에 실패했습니다.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="제목"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <textarea
                placeholder="내용"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
            />
            <input
                type="file"
                accept="image/*,video/*"
                onChange={handleImageChange}
            />
            <button type="submit">게시물 작성</button>
        </form>
    );
}

export default CreatePost;
