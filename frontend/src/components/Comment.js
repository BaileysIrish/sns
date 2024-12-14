import React, { useState, useEffect } from 'react';
import {
    createComment,
    getCommentsByBoardId,
    deleteComment,
    toggleCommentLike,
    getCommentLikeCount,
    updateComment, // 댓글 수정 API 추가
} from '../api/userApi';

function Comment({ boardNumber, userEmail, postAuthorEmail }) {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [commentLikes, setCommentLikes] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [editCommentId, setEditCommentId] = useState(null); // 수정 중인 댓글 ID
    const [editContent, setEditContent] = useState(''); // 수정 내용

    useEffect(() => {
        let isMounted = true;

        const fetchComments = async () => {
            try {
                const commentsData = await getCommentsByBoardId(boardNumber);

                if (!isMounted) return;

                // 댓글 중복 제거 및 데이터 정리
                const uniqueComments = Array.from(new Map(
                    commentsData.map((comment) => [comment.id, comment])
                ).values());

                setComments(uniqueComments);

                // 좋아요 데이터 가져오기
                const likesData = {};
                for (const comment of uniqueComments) {
                    likesData[comment.id] = await getCommentLikeCount(comment.id);
                }
                setCommentLikes(likesData);
            } catch (error) {
                console.error("댓글 데이터 가져오기 오류:", error);
            }
        };

        fetchComments();

        return () => {
            isMounted = false;
        };
    }, [boardNumber]);

    const handleCommentSubmit = async () => {
        if (isSubmitting || !newComment.trim()) return;

        setIsSubmitting(true);

        try {
            const commentData = {
                content: newComment.trim(),
                authorEmail: userEmail,
                board: { boardNumber },
            };
            const createdComment = await createComment(commentData);

            // 댓글 추가 시 중복 제거 및 상태 업데이트
            setComments((prev) => {
                const updatedComments = [...prev, createdComment];
                return Array.from(new Map(
                    updatedComments.map((comment) => [comment.id, comment])
                ).values());
            });
            setNewComment('');
        } catch (error) {
            console.error("댓글 작성 오류:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCommentDelete = async (commentId) => {
        try {
            await deleteComment(commentId);
            setComments((prev) => prev.filter((comment) => comment.id !== commentId));
        } catch (error) {
            console.error("댓글 삭제 오류:", error);
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
            console.error("댓글 좋아요 토글 오류:", error);
        }
    };

    const handleEditClick = (commentId, currentContent) => {
        setEditCommentId(commentId); // 수정 모드 활성화
        setEditContent(currentContent); // 기존 댓글 내용을 수정 창에 채우기
    };

    const handleEditSave = async (commentId) => {
        if (!editContent.trim()) return; // 빈 댓글 저장 방지

        try {
            const updatedComment = await updateComment(commentId, editContent);
            setComments((prev) =>
                prev.map((comment) =>
                    comment.id === commentId ? { ...comment, content: updatedComment.content } : comment
                )
            );
            setEditCommentId(null); // 수정 모드 종료
            setEditContent('');
        } catch (error) {
            console.error("댓글 수정 중 오류 발생:", error);
        }
    };

    const handleEditCancel = () => {
        setEditCommentId(null); // 수정 모드 취소
        setEditContent('');
    };

    return (
        <div>
            <h4>댓글</h4>
            <ul>
                {comments.map((comment) => (
                    <li key={comment.id}>
                        {editCommentId === comment.id ? (
                            <div>
                                <input
                                    type="text"
                                    value={editContent}
                                    onChange={(e) => setEditContent(e.target.value)}
                                />
                                <button onClick={() => handleEditSave(comment.id)}>저장</button>
                                <button onClick={handleEditCancel}>취소</button>
                            </div>
                        ) : (
                            <div>
                                <strong>{comment.authorEmail}</strong>: {comment.content}
                                <div>
                                    <button onClick={() => handleCommentLikeToggle(comment.id)}>좋아요</button>
                                    <span>{commentLikes[comment.id] || 0}</span>
                                </div>
                                {(comment.authorEmail === userEmail || comment.authorEmail === postAuthorEmail) && (
                                    <>
                                        <button onClick={() => handleEditClick(comment.id, comment.content)}>수정</button>
                                        <button onClick={() => handleCommentDelete(comment.id)}>삭제</button>
                                    </>
                                )}
                            </div>
                        )}
                    </li>
                ))}
            </ul>
            <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="댓글을 입력하세요."
            />
            <button onClick={handleCommentSubmit} disabled={isSubmitting}>댓글 작성</button>
        </div>
    );
}

export default Comment;
