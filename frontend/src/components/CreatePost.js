import React, { useState } from 'react';
import { createPost } from '../api/userApi';

function CreatePost() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [contentImage, setContentImage] = useState(null);

    // 파일 변경 시 실행되는 함수
    const handleImageChange = (e) => {
        setContentImage(e.target.files[0]);
    };

    // 폼 제출 시 실행되는 함수
    const handleSubmit = async (e) => {
        e.preventDefault();

        // 로그인한 사용자의 이메일을 localStorage에서 가져옴
        const userEmail = localStorage.getItem('userEmail');
        if (!userEmail) {
            alert("로그인이 필요합니다.");  // 이메일이 없으면 로그인 경고
            return;
        }

        // FormData 객체 생성
        const formData = new FormData();
        formData.append("title", title);        // 제목 추가
        formData.append("content", content);    // 내용 추가
        formData.append("email", userEmail);    // 실제 사용자 이메일 추가

        // 이메일 로그로 확인
        console.log("FormData email:", formData.get("email"));  // 여기에 로그 추가

        if (contentImage) {
            formData.append("files", contentImage);  // 'files' 필드로 수정
        }

        // 서버로 요청 보내기
        try {
            const response = await createPost(formData);
            alert("게시물이 작성되었습니다!");
            console.log("Response from server:", response);
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
