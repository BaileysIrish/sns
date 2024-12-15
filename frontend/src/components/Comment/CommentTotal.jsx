import React, { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import {
  getCommentLikeCount,
  toggleCommentLike,
  getCommentLikeStatus,
} from "../../api/comments";

export default function CommentTotal({ comment, userEmail, onReply }) {
  const [isCommentLiked, setIsCommentLiked] = useState(
    comment.isLiked || false
  );
  const [likeCount, setLikeCount] = useState(0);

  const [showReplies, setShowReplies] = useState(false); // 대댓글 표시 여부

  // 좋아요 상태와 개수 가져오기
  useEffect(() => {
    const fetchLikeData = async () => {
      try {
        // 좋아요 개수와 상태를 비동기로 동시에 가져옴
        const [count, isLiked] = await Promise.all([
          getCommentLikeCount(comment.id),
          getCommentLikeStatus(comment.id, userEmail),
        ]);

        // 상태 업데이트
        setLikeCount(count);
        setIsCommentLiked(isLiked);
      } catch (error) {
        console.error("Failed to fetch like data:", error);
      }
    };

    fetchLikeData();
  }, [comment.id, userEmail]);

  // 좋아요 토글
  const handleLikeComment = async () => {
    if (!userEmail) {
      console.error("User email is missing!");
      return;
    }
    try {
      // 서버에서 반환된 좋아요 상태와 카운트 데이터
      const { isLiked, likeCount } = await toggleCommentLike(
        comment.id,
        userEmail
      );

      // 서버 응답을 바탕으로 즉시 클라이언트 상태 업데이트
      setIsCommentLiked(isLiked);
      setLikeCount(likeCount);
    } catch (error) {
      console.error("Failed to toggle like:", error);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between py-3 px-3">
        <div className="flex items-center">
          <div>
            <img
              className="w-9 h-9 rounded-full"
              src="https://cdn.pixabay.com/photo/2024/10/17/22/56/tree-9129005_640.jpg"
              alt=""
            />
          </div>
          <div className="ml-3">
            <p>
              <span className="font-semibold">{comment.authorEmail}</span>
              <span className="ml-2">{comment.content}</span>
            </p>
            <div className="flex items-center space-x-3 text-xs opacity-60 pt-1">
              <span>{comment.createdAt}</span>
              <span className="ml-2 text-sm">좋아요 {likeCount}개</span>
              <span className="cursor-pointer" onClick={() => onReply(comment)}>
                답글 달기
              </span>
              <span
                className="cursor-pointer"
                onClick={() => setShowReplies(!showReplies)}
              >
                답글 보기({comment.replies?.length || 0})
              </span>
            </div>
          </div>
        </div>
        {isCommentLiked ? (
          <AiFillHeart
            onClick={handleLikeComment}
            className="text-sm hover:opacity-50 cursor-pointer text-red-600"
          />
        ) : (
          <AiOutlineHeart
            onClick={handleLikeComment}
            className="text-sm hover:opacity-50 cursor-pointer"
          />
        )}
      </div>
      {showReplies &&
        comment.replies?.map((reply) => (
          <div key={reply.id} className="pl-8">
            <CommentTotal
              comment={reply}
              userEmail={userEmail}
              onReply={onReply}
            />
          </div>
        ))}
    </div>
  );
}
