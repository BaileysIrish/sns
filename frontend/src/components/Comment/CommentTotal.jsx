import React, { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { toggleCommentLike } from "../../api/comments";

export default function CommentTotal({ comment, userEmail, onReply }) {
  const [isCommentLiked, setIsCommentLiked] = useState(
    comment.isLiked || false
  );

  const [showReplies, setShowReplies] = useState(false); // 대댓글 표시 여부

  const handleLikeComment = async () => {
    try {
      await toggleCommentLike(comment.id, userEmail); // 서버에 좋아요 요청
      setIsCommentLiked(!isCommentLiked); // 로컬 상태 업데이트
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
