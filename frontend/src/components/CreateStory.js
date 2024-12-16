import React, { useState } from "react";
import { createStory } from "../api/userApi";

function CreateStory({ userEmail, onStoryCreated }) {
    const [files, setFiles] = useState([]);

    const handleFileChange = (e) => {
        setFiles([...e.target.files]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createStory(userEmail, files);
            alert("스토리가 성공적으로 생성되었습니다.");
            onStoryCreated(); // 부모 컴포넌트에서 목록 갱신
        } catch (error) {
            alert("스토리 생성 중 오류가 발생했습니다.");
            console.error(error);
        }
    };

    return (
        <div>
            <h2>스토리 생성</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    파일 선택:
                    <input type="file" multiple onChange={handleFileChange} />
                </label>
                <button type="submit">스토리 생성</button>
            </form>
        </div>
    );
}

export default CreateStory;
