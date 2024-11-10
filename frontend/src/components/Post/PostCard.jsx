import React, { useState } from "react";
import {
  BsBookmark,
  BsBookmarkFill,
  BsThreeDots,
  BsEmojiSmile,
} from "react-icons/bs";
import "./PostCard.css";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { IoPaperPlaneOutline } from "react-icons/io5";
import CommentModal from "../Comment/CommentModal";

export default function PostCard() {
  const [showDropDown, setShowDropDown] = useState(false);
  const [isPostLiked, setIsPostLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSavePost = () => {
    setIsSaved(!isSaved);
  };

  const handlePostLike = () => {
    setIsPostLiked(!isPostLiked);
  };

  const handleClick = () => {
    setShowDropDown(!showDropDown);
  };
  return (
    <div>
      <div className="border rounded-md w-full">
        <div className="flex justify-between items-center py-4 px-5">
          <div className="flex items-center">
            <img
              className="h-12 w-12 rounded-full"
              src="https://cdn.pixabay.com/photo/2024/06/25/21/08/train-8853636_640.jpg"
              alt=""
            />
            <div className="pl-2">
              <p className="font-semibold text-sm">username</p>
              <p className="font-thin text-sm">location</p>
            </div>
          </div>
          <div>
            <BsThreeDots className="dots" onClick={handleClick} />
            <div className="dropdown-content">
              {showDropDown && (
                <p className="bg-black text-white py-1 px-4 rounded-md cursor-pointer">
                  삭제
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="w-full">
          <img
            className="w-full"
            src="https://cdn.pixabay.com/photo/2023/04/24/16/50/cake-7948556_640.jpg"
            alt=""
          />
        </div>
        <div className="flex justify-between items-center w-full px-1 py-4">
          <div className="flex items-center space-x-4">
            {isPostLiked ? (
              <AiFillHeart
                className="text-2xl cursor-pointer text-red-600"
                onClick={handlePostLike}
              />
            ) : (
              <AiOutlineHeart
                className="text-2xl hover:opacity-50 cursor-pointer"
                onClick={handlePostLike}
              />
            )}
            <FaRegComment
              onClick={() => setOpen(true)}
              className="text-2xl hover:opacity-50 cursor-pointer"
            />
            <IoPaperPlaneOutline className="text-2xl hover:opacity-50 cursor-pointer" />
          </div>
          <div className="cursor-pointer">
            {isSaved ? (
              <BsBookmarkFill
                onClick={handleSavePost}
                className="text-2xl hover:opacity-50 cursor-pointer"
              />
            ) : (
              <BsBookmark
                onClick={handleSavePost}
                className="text-2xl hover:opacity-50 cursor-pointer"
              />
            )}
          </div>
        </div>

        <div className="w-full py-2 px-2">
          <p>10명이 좋아합니다</p>
          <p
            onClick={() => setOpen(true)}
            className="text-gray-400 py-2 cursor-pointer"
          >
            댓글 131개 모두 보기
          </p>
        </div>
        <div className="border-b w-full">
          <div className="flex w-full items-center justify-between px-2 py-2">
            <input
              className="commentInput"
              type="text"
              placeholder="댓글 달기..."
            />
            <BsEmojiSmile />
          </div>
        </div>
      </div>
      <CommentModal
        handlePostLike={handlePostLike}
        handleSavePost={handleSavePost}
        isPostLiked={isPostLiked}
        isSaved={isSaved}
        open={open}
        setOpen={setOpen}
      />
    </div>
  );
}
