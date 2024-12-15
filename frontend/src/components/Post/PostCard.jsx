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
import { IoPaperPlaneOutline, IoPersonCircle } from "react-icons/io5";
import CommentModal from "../Comment/CommentModal";
import { toggleFavorite, getFavoriteStatus } from "../../api/posts";
import { createComment, getCommentsByBoardId } from "../../api/comments";
import { getUserProfile } from "../../api/User";

export default function PostCard({ post }) {
  const { title, email, content, boardNumber, files } = post;
  const [showDropDown, setShowDropDown] = useState(false);
  const [isPostLiked, setIsPostLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  const [open, setOpen] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [comments, setComments] = useState([]); // 댓글 상태 추가
  // 현재 사용자 이메일을 sessionStorage에서 가져오기
  const currentUserEmail = sessionStorage.getItem("userEmail");

  // 좋아요 및 댓글 초기화
  useEffect(() => {
    const fetchPostData = async () => {
      try {
        // 좋아요 상태 및 개수 가져오기
        const { isLiked, favoriteCount } = await getFavoriteStatus(
          boardNumber,
          currentUserEmail
        );
        setIsPostLiked(isLiked);
        setLikeCount(favoriteCount);

        // 댓글 개수 가져오기
        const fetchedComments = await getCommentsByBoardId(boardNumber);
        setComments(fetchedComments);
        setCommentCount(fetchedComments.length);
      } catch (error) {
        console.error("게시물 데이터 초기화 실패:", error);
        alert("게시물을 불러오는 중 오류가 발생했습니다.");
      }
    };

    fetchPostData();
  }, [boardNumber, currentUserEmail]);

  // 프로필 이미지 가져오기
  useEffect(() => {
    let isMounted = true; // 컴포넌트가 언마운트된 경우 fetch 취소
    const fetchProfileImage = async () => {
      try {
        const userProfile = await getUserProfile(email);
        if (isMounted) {
          setProfileImage(userProfile.profileImage);
        }
      } catch (error) {
        console.error("프로필 이미지 가져오기 실패:", error);
      }
    };

    if (email) fetchProfileImage();

    return () => {
      isMounted = false; // 언마운트 시 상태 업데이트 방지
    };
  }, [email]);

  const handleSavePost = () => {
    setIsSaved(!isSaved);
  };

  const handlePostLike = async () => {
    try {
      // 서버로 좋아요 토글 요청
      await toggleFavorite(boardNumber, currentUserEmail);

      // 서버에서 최신 상태 가져오기
      const { isLiked, favoriteCount } = await getFavoriteStatus(
        boardNumber,
        currentUserEmail
      );

      // 서버 응답을 기반으로 좋아요 상태 및 개수 업데이트
      setIsPostLiked(isLiked);
      setLikeCount(favoriteCount);
    } catch (error) {
      console.error("좋아요 처리 중 오류:", error);
    }
  };

  // 새로운 댓글 생성
  const handleCreateComment = async () => {
    if (!newComment.trim()) return; // 공백 댓글 방지

    try {
      const commentData = {
        boardId: boardNumber,
        content: newComment,
        authorEmail: currentUserEmail, // 작성자 이메일 사용
        parentCommentId: null,
      };

      await createComment(commentData);
      setNewComment(""); // 입력창 초기화

      const updatedComments = await getCommentsByBoardId(boardNumber);
      setComments(updatedComments); // 댓글 상태 업데이트
      setCommentCount(updatedComments.length); // 댓글 수 업데이트
    } catch (error) {
      console.error("Failed to create comment:", error);
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
            {profileImage ? (
              <img
                className="h-12 w-12 rounded-full"
                src={profileImage}
                alt="Profile"
              />
            ) : (
              <IoPersonCircle className="h-12 w-12 text-gray-500" />
            )}
            <div className="pl-2">
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
          {files?.length > 0 &&
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
            ))}
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
              value={newComment}
              onChange={(e) => {
                setNewComment(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleCreateComment();
                }
              }}
            />
            <BsEmojiSmile />
          </div>
        </div>
      </div>
      <CommentModal
        comments={comments} // 댓글 상태 전달
        setComments={setComments} // 댓글 상태 업데이트 함수 전달
        handlePostLike={handlePostLike}
        handleSavePost={handleSavePost}
        isPostLiked={isPostLiked}
        isSaved={isSaved}
        open={open}
        setOpen={setOpen}
        boardNumber={boardNumber}
        likeCount={likeCount}
        commentCount={commentCount}
        profileImage={profileImage}
        userEmail={currentUserEmail}
      />
    </li>
  );
}
