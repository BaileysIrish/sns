import {
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerRoot,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {
  BsBookmark,
  BsBookmarkFill,
  BsEmojiSmile,
  BsThreeDots,
} from "react-icons/bs";
import CommentTotal from "./CommentTotal";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { IoPaperPlaneOutline, IoPersonCircle } from "react-icons/io5";
import "./CommentModal.css";
import { createComment, getCommentsByBoardId } from "../../api/comments";

export default function CommentModal({
  isSaved,
  isPostLiked,
  handlePostLike,
  handleSavePost,
  open,
  setOpen,
  boardNumber,
  likeCount,
  commentCount,
  profileImage,
}) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [replyTo, setReplyTo] = useState(null); // 대댓글 대상
  const userEmail = sessionStorage.getItem("userEmail");

  // 댓글 가져오기
  useEffect(() => {
    if (!boardNumber) return;

    const fetchComments = async () => {
      try {
        const data = await getCommentsByBoardId(boardNumber);
        // 좋아요 여부를 각 댓글에 추가
        const updatedComments = data.map((comment) => ({
          ...comment,
          isLiked: comment.likedUsers?.includes(userEmail), // likedUsers 배열에 userEmail이 포함되어 있으면 true
        }));
        setComments(updatedComments);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [boardNumber, userEmail]);

  // 새로운 댓글 생성
  const handleCreateComment = async () => {
    if (!newComment.trim()) return; // 공백 댓글 방지

    try {
      const sanitizedContent = replyTo
        ? newComment.replace(`@${replyTo.authorEmail}`, "").trim() // @username 제거
        : newComment;

      const commentData = {
        boardId: boardNumber,
        content: sanitizedContent,
        authorEmail: userEmail,
        parentCommentId: replyTo ? replyTo.id : null, // 대댓글일 경우 parentCommentId 추가
      };
      // 서버에 댓글 추가 요청
      const createdComment = await createComment(commentData);

      // 새로운 댓글을 상태에 추가
      setComments((prevComments) => [...prevComments, createdComment]);
      setNewComment(""); // 입력창 초기화
      setReplyTo(null); // 대댓글 대상 초기화

      const updatedComments = await getCommentsByBoardId(boardNumber); // 댓글 목록 갱신
      setComments(updatedComments);
    } catch (error) {
      console.error("Failed to create comment:", error);
    }
  };

  const handleReply = (comment) => {
    setReplyTo(comment); // 대댓글 대상 설정
    setNewComment(`@${comment.authorEmail} `); // 입력창에 ID 자동 추가
  };

  return (
    <DrawerRoot size={"2xl"} open={open} onOpenChange={(e) => setOpen(e.open)}>
      <DrawerBackdrop />
      <DrawerContent
        maxWidth={"75vw"}
        position="fixed" // 화면을 기준으로 고정 위치
        top="50%" // 화면 상단에서 50% 아래
        left="50%" // 화면 좌측에서 50% 오른쪽
        transform="translate(-50%, -50%)" // 중앙 정렬을 위해 변환
      >
        {/* <CloseButton
          position="fixed"
          top="20px" // 화면 상단에서 20px 아래에 위치
          right="20px" // 화면 오른쪽에서 20px 안쪽에 위치
          size="lg"
          onClick={() => setOpen(false)}
        /> */}
        <DrawerBody className="p-0">
          <div className="flex h-[93vh]">
            <div className="w-[96%] flex flex-col justify-center">
              <img
                className="h-full w-full object-cover block"
                src="https://cdn.pixabay.com/photo/2023/12/13/14/01/woman-8446980_640.png"
                alt=""
              />
            </div>
            <div className="w-[55%] relative">
              <div className="flex justify-between items-center py-3 px-3">
                <div className="flex items-center">
                  <div>
                    {profileImage ? (
                      <img
                        className="w-9 h-9 rounded-full"
                        src={profileImage}
                        alt="Profile"
                      />
                    ) : (
                      <IoPersonCircle className="w-9 h-9 text-gray-500" />
                    )}
                  </div>
                  <div className="ml-2">
                    <p>{userEmail}</p>
                  </div>
                </div>
                <BsThreeDots />
              </div>
              <hr />
              <div className="comment">
                {comments.map((comment) => (
                  <CommentTotal
                    key={comment.id}
                    comment={comment}
                    userEmail={userEmail} // 현재 사용자 이메일 전달
                    onReply={handleReply} // 대댓글 작성
                  />
                ))}
              </div>

              <div className="absolute bottom-0 w-full">
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
                    <FaRegComment className="text-2xl hover:opacity-50 cursor-pointer" />
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
                  <p>{likeCount}명이 좋아합니다</p> {/* 좋아요 개수 */}
                  <p className="text-gray-400 py-1 cursor-pointer">
                    댓글 {commentCount}개 모두 보기
                  </p>{" "}
                  {/* 댓글 개수 */}
                </div>

                <div className="border-t">
                  <div className="flex w-full items-center px-2 py-2">
                    <BsEmojiSmile className="mr-2 text-lg" />
                    <input
                      className="commentInputs"
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DrawerBody>

        <DrawerCloseTrigger />
      </DrawerContent>
    </DrawerRoot>
  );
}
