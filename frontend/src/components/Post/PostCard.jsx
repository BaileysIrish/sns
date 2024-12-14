import React, { useEffect, useState } from "react";
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
import { toggleLike, getLikeCount } from "../../api/likes";
import { getCommentsByBoardId } from "../../api/comments";

export default function PostCard({ post }) {
  const { title, email, content, boardNumber, files } = post;
  const [showDropDown, setShowDropDown] = useState(false);
  const [isPostLiked, setIsPostLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  const [open, setOpen] = useState(false);

  // 좋아요 개수 불러오기
  useEffect(() => {
    const fetchLikeCount = async () => {
      try {
        const count = await getLikeCount(boardNumber);
        setLikeCount(count);
      } catch (error) {
        console.error("좋아요 개수 불러오기 실패:", error);
      }
    };

    const fetchCommentCount = async () => {
      if (!boardNumber) {
        console.log("boardNumber가 존재하지 않습니다. 게시물이 없습니다.");
        setCommentCount(0); // 댓글 개수를 0으로 초기화
        return;
      }
      try {
        const comments = await getCommentsByBoardId(boardNumber);
        setCommentCount(Array.isArray(comments) ? comments.length : 0);
      } catch (error) {
        console.error("댓글 개수 불러오기 실패:", error);
        setCommentCount(0); // 실패한 경우에도 안전하게 초기화
      }
    };

    fetchLikeCount();
    fetchCommentCount();
  }, [boardNumber]);

  const handleSavePost = () => {
    setIsSaved(!isSaved);
  };

  const handlePostLike = async () => {
    try {
      await toggleLike(boardNumber, "user@example.com"); // 이메일은 실제 유저 정보로 대체
      setIsPostLiked(!isPostLiked);
      setLikeCount((prev) => (isPostLiked ? prev - 1 : prev + 1));
    } catch (error) {
      console.error("좋아요 처리 중 오류:", error);
    }
  };

  const handleClick = () => {
    setShowDropDown(!showDropDown);
  };
  return (
    <li key={boardNumber}>
      <div className="border rounded-md w-full">
        <div className="flex justify-between items-center py-4 px-5">
          <div className="flex items-center">
            <img
              className="h-12 w-12 rounded-full"
              src="https://cdn.pixabay.com/photo/2024/06/25/21/08/train-8853636_640.jpg"
              alt=""
            />
            <div className="pl-2">
              <p className="font-semibold text-sm">{title}</p>
              <p className="font-thin text-sm">{email}</p>
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
          {files?.length > 0 ? (
            files.map((file, index) => (
              <div key={index}>
                {file.fileType.startsWith("image/") ? (
                  <img
                    className="w-full"
                    src={file.fileUrl}
                    alt={`게시물 이미지 ${index}`}
                  />
                ) : file.fileType.startsWith("video/") ? (
                  <video className="w-full" src={file.fileUrl} controls />
                ) : null}
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400 py-4">
              첨부된 파일이 없습니다.
            </p>
          )}
          <div className="m-5">{content}</div>
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
          <p>{likeCount}명이 좋아합니다</p>
          <p
            onClick={() => setOpen(true)}
            className="text-gray-400 py-1 cursor-pointer"
          >
            댓글 {commentCount}개 모두 보기
          </p>
        </div>
        <div className="border-b w-full">
          <div className="flex w-full items-center justify-between px-2 pb-2">
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
        boardNumber={boardNumber}
      />
    </li>
  );
}
