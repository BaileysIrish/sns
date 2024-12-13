import React, { useEffect, useState } from 'react';
import {
    getPosts,
    toggleLike,
    getLikeCount,
    createComment,
    getCommentsByBoardId,
    toggleCommentLike,
    getCommentLikeCount,
    deletePost,
} from '../api/userApi';
import { useNavigate } from 'react-router-dom';

function BoardList() {
    const [posts, setPosts] = useState([]); // 게시글 상태
    const [loading, setLoading] = useState(true); // 로딩 상태
    const [error, setError] = useState(null); // 에러 상태
    const [likeCounts, setLikeCounts] = useState({}); // 좋아요 상태
    const [comments, setComments] = useState({}); // 댓글 상태
    const [newComment, setNewComment] = useState({}); // 새 댓글 입력 상태
    const [commentLikes, setCommentLikes] = useState({}); // 댓글 좋아요 상태
    const userEmail = localStorage.getItem('userEmail'); // 로컬 스토리지에서 사용자 이메일 가져오기
    const navigate = useNavigate(); // 페이지 이동을 위한 hook

    useEffect(() => {
        const fetchPostsAndComments = async () => {
            try {
                const postsData = await getPosts(); // 게시글 데이터 가져오기
                const likeCountsData = {};
                const commentsData = {};
                const commentLikesData = {};

                // 게시글별 좋아요와 댓글 데이터 가져오기
                await Promise.all(
                    postsData.map(async (post) => {
                        likeCountsData[post.boardNumber] = await getLikeCount(post.boardNumber);
                        commentsData[post.boardNumber] = await getCommentsByBoardId(post.boardNumber);

                        // 댓글별 좋아요 데이터 가져오기
                        const postComments = commentsData[post.boardNumber] || [];
                        await Promise.all(
                            postComments.map(async (comment) => {
                                commentLikesData[comment.id] = await getCommentLikeCount(comment.id);
                            })
                        );
                    })
                );

                setPosts(postsData);
                setLikeCounts(likeCountsData);
                setComments(commentsData);
                setCommentLikes(commentLikesData);
            } catch (err) {
                console.error("Error fetching posts or comments:", err);
                setError("게시글 데이터를 불러오는 중 오류가 발생했습니다.");
            } finally {
                setLoading(false); // 로딩 종료
            }
        };

        fetchPostsAndComments();
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

    const handleCommentLikeToggle = async (commentId) => {
        try {
            const newLikeCount = await toggleCommentLike(commentId, userEmail);
            setCommentLikes((prev) => ({
                ...prev,
                [commentId]: newLikeCount,
            }));
        } catch (error) {
            console.error("댓글 좋아요 토글 중 오류 발생:", error);
        }
    };

    const handleCommentChange = (boardNumber, value) => {
        setNewComment((prev) => ({
            ...prev,
            [boardNumber]: value,
        }));
    };

    const handleCommentSubmit = async (boardNumber) => {
        try {
            const commentData = {
                content: newComment[boardNumber],
                authorEmail: userEmail,
                board: { boardNumber },
            };
            const createdComment = await createComment(commentData);

            setComments((prev) => ({
                ...prev,
                [boardNumber]: [...(prev[boardNumber] || []), createdComment],
            }));

            setNewComment((prev) => ({
                ...prev,
                [boardNumber]: '',
            }));
        } catch (error) {
            console.error("댓글 작성 중 오류 발생:", error);
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
        navigate(`/edit-post/${boardNumber}`); // 게시물 수정 페이지로 이동
    };

    if (error) {
        return <div>{error}</div>;
    }

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
                        <div>
                            <h4>댓글</h4>
                            <ul>
                                {comments[post.boardNumber]?.map((comment) => (
                                    <li key={comment.id}>
                                        <strong>{comment.authorEmail}</strong>: {comment.content}
                                        <div>
                                            <button onClick={() => handleCommentLikeToggle(comment.id)}>좋아요</button>
                                            <span>{commentLikes[comment.id] || 0}</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <input
                                type="text"
                                value={newComment[post.boardNumber] || ''}
                                onChange={(e) => handleCommentChange(post.boardNumber, e.target.value)}
                                placeholder="댓글을 입력하세요."
                            />
                            <button onClick={() => handleCommentSubmit(post.boardNumber)}>댓글 작성</button>
                        </div>
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
