import React, { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import {
  getCommentLikeCount,
  toggleCommentLike,
  getCommentLikeStatus,
} from "../../api/comments";
import { getUserProfile } from "../../api/User";
import { IoPersonCircle } from "react-icons/io5";

export default function CommentTotal({ comment, userEmail, onReply }) {
  const [isCommentLiked, setIsCommentLiked] = useState(
    comment.isLiked || false
  );
  const [likeCount, setLikeCount] = useState(0);

  const [showReplies, setShowReplies] = useState(false); // 대댓글 표시 여부
  const [profileImage, setProfileImage] = useState(null); // 댓글 작성자의 프로필 이미지

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

  // 프로필 이미지 가져오기
  useEffect(() => {
    let isMounted = true; // 컴포넌트가 언마운트된 경우 fetch 취소
    const fetchProfileImage = async () => {
      try {
        const userProfile = await getUserProfile(comment.authorEmail);
        if (isMounted) {
          setProfileImage(userProfile.profileImage);
        }
      } catch (error) {
        console.error("프로필 이미지 가져오기 실패:", error);
      }
    };
    fetchProfileImage();
    return () => {
      isMounted = false; // 언마운트 시 상태 업데이트 방지
    };
  }, [comment.authorEmail]);

  return (
    <div>
      <div className="flex items-center justify-between py-3 px-3">
        <div className="flex items-center">
          <div>
            {profileImage ? (
              <img
                className="w-9 h-9 rounded-full"
                src={`http://localhost:8080${profileImage}`}
                alt=""
              />
            ) : (
              <IoPersonCircle className="h-9 w-9 text-gray-500" />
            )}
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
