import React, { useEffect, useState } from "react";
import { getUserStories, deleteStory } from "../api/userApi";

function StoryList({ userEmail }) {
    const [stories, setStories] = useState([]);
    const [selectedStory, setSelectedStory] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchStories = async () => {
        try {
            const data = await getUserStories(userEmail);
            setStories(data);
        } catch (error) {
            console.error("스토리 조회 중 오류 발생:", error);
        }
    };

    useEffect(() => {
        fetchStories();
    }, [userEmail]);

    const openModal = (story) => {
        setSelectedStory(story);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedStory(null);
    };

    const handleDelete = async (storyId) => {
        try {
            await deleteStory(storyId);
            alert("스토리가 삭제되었습니다.");
            fetchStories();
            closeModal();
        } catch (error) {
            alert("스토리 삭제 중 오류가 발생했습니다.");
            console.error(error);
        }
    };

    return (
        <div>
            <h2>스토리 목록</h2>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                {stories.map((story) => (
                    <div
                        key={story.id}
                        style={{
                            width: "100px",
                            height: "100px",
                            borderRadius: "50%",
                            overflow: "hidden",
                            cursor: "pointer",
                            border: "2px solid #ddd",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                        onClick={() => openModal(story)}
                    >
                        {story.files[0] && (
                            <img
                                src={story.files[0].filePath}
                                alt="스토리 이미지"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                }}
                            />
                        )}
                    </div>
                ))}
            </div>

            {isModalOpen && selectedStory && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(0, 0, 0, 0.8)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 1000,
                    }}
                >
                    <div
                        style={{
                            background: "white",
                            padding: "20px",
                            borderRadius: "8px",
                            maxWidth: "80%",
                            maxHeight: "80%",
                            overflow: "auto",
                        }}
                    >
                        <h3>스토리 보기</h3>
                        <div>
                            {selectedStory.files.map((file) =>
                                file.fileType.startsWith("image") ? (
                                    <img
                                        key={file.id}
                                        src={file.filePath}
                                        alt="스토리 이미지"
                                        style={{
                                            width: "100%",
                                            maxHeight: "400px",
                                            borderRadius: "8px",
                                        }}
                                    />
                                ) : (
                                    <video
                                        key={file.id}
                                        controls
                                        style={{ width: "100%", maxHeight: "400px" }}
                                    >
                                        <source src={file.filePath} type={file.fileType} />
                                        비디오를 지원하지 않는 브라우저입니다.
                                    </video>
                                )
                            )}
                        </div>
                        <button onClick={closeModal} style={{ marginRight: "10px" }}>
                            닫기
                        </button>
                        <button onClick={() => handleDelete(selectedStory.id)}>삭제</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default StoryList;
