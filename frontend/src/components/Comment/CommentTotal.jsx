import React, { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

export default function CommentTotal() {
  const [isCommentLiked, setIsCommentLiked] = useState();
  const handleLikeComment = () => {
    setIsCommentLiked(!isCommentLiked);
  };
  return (
    <div>
      <div className="flex items-center justify-between py-3">
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
              <span className="font-semibold">username</span>
              <span className="ml-2">good!</span>
            </p>
            <div className="flex items-center space-x-3 text-xs opacity-60 pt-1">
              <span>1분전</span>
              <span>좋아요 23개</span>
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
    </div>
  );
}
