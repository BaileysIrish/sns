import React, { useEffect, useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import "./ReqUserPostCard.css";
import { getFavoriteStatus } from "../../api/posts";
import { getCommentsByBoardId } from "../../api/comments";
import { useParams } from "react-router-dom";
import CommentModal from "../Comment/CommentModal";

export default function ReqUserPostCard({ post, profileImage }) {
  const [likeCount, setLikeCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const [comments, setComments] = useState([]); // 댓글 상태 추가
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태

  useEffect(() => {
    const fetchCountsAndComments = async () => {
      if (!post.boardNumber || !post.email) {
        console.warn("Invalid post data:", post);
        return; // boardNumber나 email이 없으면 API 호출 중단
      }
      try {
        const { favoriteCount } = await getFavoriteStatus(
          post.boardNumber,
          post.email
        );
        setLikeCount(favoriteCount);

        const fetchedComments = await getCommentsByBoardId(post.boardNumber);
        setComments(fetchedComments);
        setCommentCount(fetchedComments.length);
      } catch (error) {
        console.error("좋아요 및 댓글 데이터 가져오기 실패:", error);
      }
    };

    fetchCountsAndComments();
  }, [post.boardNumber, post.email]);
  console.log("Post 데이터:", post);

  return (
    <>
      <div className="p-2" onClick={() => setIsModalOpen(true)}>
        <div className="post w-60 h-60">
          {post.files?.[0]?.fileUrl ? (
            <img
              className="cursor-pointer w-full h-full object-cover"
              src={post.files[0].fileUrl}
              alt="게시물 이미지"
            />
          ) : post.content ? (
            <div className="flex items-center justify-center w-full h-full bg-gray-200">
              <p className="text-center text-gray-600 px-4">{post.content}</p>
            </div>
          ) : (
            <img
              className="cursor-pointer w-full h-full object-cover"
              src="https://via.placeholder.com/150"
              alt="기본 이미지"
            />
          )}
          <div className="overlay absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white">
            <div className="overlay-text flex space-x-4">
              <div className="flex items-center">
                <AiFillHeart />
                <span className="ml-1">{likeCount}</span>
              </div>
              <div className="flex items-center">
                <FaComment />
                <span className="ml-1">{commentCount}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CommentModal
        open={isModalOpen}
        setOpen={setIsModalOpen}
        boardNumber={post.boardNumber}
        comments={comments} // 댓글 상태 전달
        setComments={setComments} // 댓글 상태 업데이트 함수 전달
        likeCount={likeCount}
        commentCount={commentCount}
        profileImage={profileImage || "https://via.placeholder.com/150"}
        userEmail={post.email} // 게시물 작성자 이메일 전달
        boardEmail={post.email} // 게시물 작성자 이메일 전달
      />
    </>
  );
}
