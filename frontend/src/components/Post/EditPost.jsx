import React from "react";
import {
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerRoot,
} from "@chakra-ui/react";
import "./EditPost.css";

export default function EditPost({
  open,
  setOpen,
  onUnfollow,
  onDelete,
  onEdit,
  currentUserEmail,
  postEmail,
}) {
  const isOwner = currentUserEmail === postEmail; // 조건 상위에서 처리
  return (
    <DrawerRoot size={"md"} open={open} onOpenChange={(e) => setOpen(e.open)}>
      <DrawerBackdrop />
      <DrawerContent
        maxWidth={"25vw"}
        position="fixed" // 화면을 기준으로 고정 위치
        top="50%" // 화면 상단에서 50% 아래
        left="50%" // 화면 좌측에서 50% 오른쪽
        transform="translate(-50%, -50%)" // 중앙 정렬을 위해 변환
        rounded={"2xl"}
      >
        <DrawerBody>
          <ul className="edit-post-menu">
            <li
              className="text-red-400 cursor-pointer"
              onClick={() => onUnfollow()}
            >
              팔로우 취소
            </li>
            <li className="cursor-pointer">즐겨찾기에 추가</li>
            {isOwner && (
              <>
                <li className="cursor-pointer" onClick={onEdit}>
                  수정
                </li>
                <li
                  className="cursor-pointer text-red-400 font-bold"
                  onClick={onDelete}
                >
                  삭제
                </li>
              </>
            )}
            <li className="cursor-pointer">이 계정 정보</li>
            <li
              className="cursor-pointer font-bold"
              onClick={() => setOpen(false)}
            >
              취소
            </li>
          </ul>
        </DrawerBody>
        <DrawerCloseTrigger />
      </DrawerContent>
    </DrawerRoot>
  );
}
