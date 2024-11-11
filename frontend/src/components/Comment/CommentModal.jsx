import {
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerRoot,
} from "@chakra-ui/react";
import { CloseButton } from "../ui/close-button";
import React, { useState } from "react";
import {
  BsBookmark,
  BsBookmarkFill,
  BsEmojiSmile,
  BsThreeDots,
} from "react-icons/bs";
import CommentTotal from "./CommentTotal";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { IoPaperPlaneOutline } from "react-icons/io5";
import "./CommentModal.css";

export default function CommentModal({
  isSaved,
  isPostLiked,
  handlePostLike,
  handleSavePost,
  open,
  setOpen,
}) {
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
                    <img
                      className="w-9 h-9 rounded-full"
                      src="https://cdn.pixabay.com/photo/2024/04/18/09/44/polar-bear-8703907_640.jpg"
                      alt=""
                    />
                  </div>
                  <div className="ml-2">
                    <p>username</p>
                  </div>
                </div>
                <BsThreeDots />
              </div>
              <hr />
              <div className="comment">
                {Array(20)
                  .fill(1)
                  .map((item) => (
                    <CommentTotal />
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
                  <p>10명이 좋아합니다</p>
                  <p className="opacity-50 text-sm">1일전</p>
                </div>

                <div className="border-t">
                  <div className="flex w-full items-center px-2 py-2">
                    <BsEmojiSmile className="mr-2 text-lg" />
                    <input
                      className="commentInputs"
                      type="text"
                      placeholder="댓글 달기..."
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
