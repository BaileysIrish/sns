import React, { useEffect, useState } from 'react';
import { getPosts, toggleLike, getLikeCount, deletePost } from '../api/userApi';
import { useNavigate } from 'react-router-dom';
import Comment from './Comment'; // Comment.js 파일 import

function BoardList() {
    const [posts, setPosts] = useState([]);
    const [likeCounts, setLikeCounts] = useState({});
    const userEmail = localStorage.getItem('userEmail');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const postsData = await getPosts();
                const likeCountsData = {};

                await Promise.all(
                    postsData.map(async (post) => {
                        likeCountsData[post.boardNumber] = await getLikeCount(post.boardNumber);
                    })
                );

                setPosts(postsData);
                setLikeCounts(likeCountsData);
            } catch (error) {
                console.error("게시글 데이터를 불러오는 중 오류가 발생했습니다:", error);
            }
        };

        fetchPosts();
    }, []);

    const handleLikeToggle = async (boardNumber) => {
        try {
            const newLikeCount = await toggleLike(boardNumber, userEmail);
            setLikeCounts((prev) => ({
                ...prev,
                [boardNumber]: newLikeCount,
            }));
        } catch (error) {
            console.error("좋아요 토글 중 오류 발생:", error);
        }
    };

    const handleDeletePost = async (boardNumber) => {
        try {
            await deletePost(boardNumber);
            setPosts((prev) => prev.filter((post) => post.boardNumber !== boardNumber));
        } catch (error) {
            console.error("게시물 삭제 중 오류 발생:", error);
        }
    };

    const goToEditPost = (boardNumber) => {
        navigate(`/edit-post/${boardNumber}`);
    };

    return (
        <div>
            <h2>게시판</h2>
            <ul>
                {posts.map((post) => (
                    <li key={post.boardNumber}>
                        <h3>{post.title}</h3>
                        <p>{post.content}</p>
                        {post.files && post.files.length > 0 && (
                            <div>
                                {post.files.map((file, index) => (
                                    <div key={index}>
                                        {file.fileType.startsWith('image/') ? (
                                            <img
                                                src={file.fileUrl}
                                                alt={`게시물 이미지 ${index}`}
                                                style={{ maxWidth: '100%', height: 'auto' }}
                                            />
                                        ) : file.fileType.startsWith('video/') ? (
                                            <video
                                                src={file.fileUrl}
                                                controls
                                                style={{ maxWidth: '100%', height: 'auto' }}
                                            />
                                        ) : null}
                                    </div>
                                ))}
                            </div>
                        )}
                        <div>
                            <button onClick={() => handleLikeToggle(post.boardNumber)}>좋아요</button>
                            <span>{likeCounts[post.boardNumber] || 0}</span>
                        </div>
                        <Comment boardNumber={post.boardNumber} userEmail={userEmail} />
                        {post.email === userEmail && (
                            <>
                                <button onClick={() => goToEditPost(post.boardNumber)}>수정</button>
                                <button onClick={() => handleDeletePost(post.boardNumber)}>삭제</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default BoardList;
