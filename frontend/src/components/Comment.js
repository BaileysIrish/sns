import React, { useState, useEffect } from 'react';
import {
    createComment,
    createReply,
    getCommentsWithRepliesByBoardId,
    deleteComment,
    toggleCommentLike,
    getCommentLikeCount,
    updateComment,
} from '../api/userApi';

function Comment({ boardNumber, userEmail, postAuthorEmail }) {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [replyContent, setReplyContent] = useState('');
    const [commentLikes, setCommentLikes] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [replyToId, setReplyToId] = useState(null);
    const [editCommentId, setEditCommentId] = useState(null);
    const [editContent, setEditContent] = useState('');

    // 댓글 및 대댓글 불러오기
    useEffect(() => {
        const fetchComments = async () => {
            try {
                const commentsData = await getCommentsWithRepliesByBoardId(boardNumber);

                const likesData = {};
                await Promise.all(
                    commentsData.map(async (comment) => {
                        likesData[comment.id] = await getCommentLikeCount(comment.id);
                        if (comment.replies) {
                            await Promise.all(
                                comment.replies.map(async (reply) => {
                                    likesData[reply.id] = await getCommentLikeCount(reply.id);
                                })
                            );
                        }
                    })
                );
                setComments(commentsData);
                setCommentLikes(likesData);
            } catch (error) {
                console.error("댓글 데이터 가져오기 오류:", error);
            }
        };

        fetchComments();
    }, [boardNumber]);

    // 댓글 작성
    const handleCommentSubmit = async () => {
        if (isSubmitting || !newComment.trim()) return;

        setIsSubmitting(true);
        try {
            const createdComment = await createComment({
                content: newComment.trim(),
                authorEmail: userEmail,
                board: { boardNumber },
            });
            setComments((prev) => [...prev, createdComment]);
            setNewComment('');
        } catch (error) {
            console.error("댓글 작성 오류:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    // 대댓글 작성
    const handleReplySubmit = async () => {
        if (!replyContent.trim() || !replyToId) return;

        try {
            const createdReply = await createReply({
                content: replyContent.trim(),
                authorEmail: userEmail,
                board: { boardNumber },
                parentComment: { id: replyToId },
            });

            setComments((prev) =>
                prev.map((comment) =>
                    comment.id === replyToId
                        ? { ...comment, replies: [...(comment.replies || []), createdReply] }
                        : comment
                )
            );

            setReplyContent('');
            setReplyToId(null);
        } catch (error) {
            console.error("대댓글 작성 오류:", error);
        }
    };

    // 댓글 및 대댓글 삭제
    const handleDelete = async (commentId, parentCommentId = null) => {
        try {
            await deleteComment(commentId);
            setComments((prev) =>
                parentCommentId
                    ? prev.map((comment) =>
                        comment.id === parentCommentId
                            ? { ...comment, replies: comment.replies.filter((r) => r.id !== commentId) }
                            : comment
                    )
                    : prev.filter((comment) => comment.id !== commentId)
            );
        } catch (error) {
            console.error("삭제 오류:", error);
        }
    };

    // 댓글 좋아요 토글
    const handleLikeToggle = async (commentId) => {
        try {
            const newLikeCount = await toggleCommentLike(commentId, userEmail);
            setCommentLikes((prev) => ({ ...prev, [commentId]: newLikeCount }));
        } catch (error) {
            console.error("좋아요 토글 오류:", error);
        }
    };

    // 수정 시작 및 취소
    const handleEditClick = (commentId, currentContent) => {
        setEditCommentId(commentId);
        setEditContent(currentContent);
    };

    const handleEditCancel = () => {
        setEditCommentId(null);
        setEditContent('');
    };

    // 수정 저장
    const handleEditSave = async (commentId, parentCommentId = null) => {
        if (!editContent.trim()) return;

        try {
            const updatedComment = await updateComment(commentId, editContent);
            setComments((prev) =>
                parentCommentId
                    ? prev.map((comment) =>
                        comment.id === parentCommentId
                            ? {
                                ...comment,
                                replies: comment.replies.map((r) =>
                                    r.id === commentId ? { ...r, content: updatedComment.content } : r
                                ),
                            }
                            : comment
                    )
                    : prev.map((comment) => (comment.id === commentId ? { ...comment, content: updatedComment.content } : comment))
            );
            setEditCommentId(null);
            setEditContent('');
        } catch (error) {
            console.error("수정 오류:", error);
        }
    };

    const renderComments = (commentsList, level = 0, parentCommentId = null) => {
        return (
            <ul style={{ marginLeft: level * 20 + "px" }}>
                {commentsList.map((comment) => (
                    <li key={comment.id}>
                        <div>
                            <strong>{comment.authorEmail}</strong>:
                            {editCommentId === comment.id ? (
                                <input
                                    type="text"
                                    value={editContent}
                                    onChange={(e) => setEditContent(e.target.value)}
                                />
                            ) : (
                                comment.content
                            )}
                            <div>
                                <span style={{ fontSize: "0.8rem", color: "gray" }}>
                                    {new Date(comment.createdAt).toLocaleString()}
                                </span>
                                <br />
                                <button onClick={() => handleLikeToggle(comment.id)}>좋아요</button>
                                <span>{commentLikes[comment.id] || 0}</span>
                                <button onClick={() => setReplyToId(comment.id)}>답글</button>
                                {comment.authorEmail === userEmail && (
                                    <>
                                        {editCommentId === comment.id ? (
                                            <>
                                                <button onClick={() => handleEditSave(comment.id, parentCommentId)}>저장</button>
                                                <button onClick={handleEditCancel}>취소</button>
                                            </>
                                        ) : (
                                            <button onClick={() => handleEditClick(comment.id, comment.content)}>수정</button>
                                        )}
                                        <button onClick={() => handleDelete(comment.id, parentCommentId)}>삭제</button>
                                    </>
                                )}
                            </div>
                            {replyToId === comment.id && (
                                <div>
                                    <input
                                        type="text"
                                        value={replyContent}
                                        onChange={(e) => setReplyContent(e.target.value)}
                                        placeholder="답글을 입력하세요."
                                    />
                                    <button onClick={handleReplySubmit}>답글 작성</button>
                                </div>
                            )}
                        </div>
                        {comment.replies &&
                            renderComments(comment.replies, level + 1, comment.id)}
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <div>
            <h4>댓글</h4>
            {renderComments(comments)}
            <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="댓글을 입력하세요."
            />
            <button onClick={handleCommentSubmit} disabled={isSubmitting}>
                댓글 작성
            </button>
        </div>
    );
}

export default Comment;
