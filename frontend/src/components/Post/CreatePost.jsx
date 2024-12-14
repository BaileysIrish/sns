import {
  Button,
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerRoot,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { TbPhotoVideo } from "react-icons/tb";
import { GrEmoji } from "react-icons/gr";
import { GoLocation } from "react-icons/go";
import { IoIosArrowRoundBack } from "react-icons/io";
import "./CreatePost.css";
import AlertDelete from "./AlertDelete";

export default function CreatePost({ open, setOpen }) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [isClosingDrawer, setIsClosingDrawer] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.file[0];
    if (
      droppedFile.type.startsWith("image/") ||
      droppedFile.type.startsWith("video/")
    ) {
      setFile(droppedFile);
    }
  };
  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
    setIsDragOver(true);
  };
  const handleDragLeave = () => {
    setIsDragOver(false);
  };
  const handleOnChange = (e) => {
    const file = e.target.files[0];
    if (
      (file && file.type.startsWith("image/")) ||
      file.type.startsWith("video/")
    ) {
      setFile(file);
    } else {
      setFile(null);
      alert("이미지나 비디오를 놓아주세요");
    }
  };

  const handleCaptionChange = (e) => {
    setCaption(e.target.value);
  };

  const handleDrawer = (e) => {
    if (!e.open) {
      if (file !== null || caption !== "") {
        setShowAlert(true);
        setIsClosingDrawer(true);
      } else {
        setFile(null);
        setCaption("");
        setOpen(false);
      }
    } else {
      setOpen(e.open);
    }
  };

  const handleDelete = () => {
    if (isClosingDrawer) {
      setFile(null);
      setCaption("");
      setOpen(false);
    } else {
      setFile(null);
    }
    setShowAlert(false);
  };

  const handleCancle = () => {
    setShowAlert(false);
  };

  const handleBackArrow = () => {
    setShowAlert(true);
    setIsClosingDrawer(false);
  };

  return (
    <div>
      <DrawerRoot size={"2xl"} open={open} onOpenChange={handleDrawer}>
        <DrawerBackdrop />
        <DrawerContent
          maxWidth={"65vw"}
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
          <div className="flex justify-between py-1 px-3  items-center">
            <IoIosArrowRoundBack
              className="text-4xl cursor-pointer"
              onClick={handleBackArrow}
            />
            <p className="font-semibold">새 게시물 만들기</p>
            <Button
              className="outline-none border-none"
              variant={"ghost"}
              size={"sm"}
              colorScheme={"blue"}
            >
              공유하기
            </Button>
          </div>
          <hr />
          <DrawerBody className="p-0">
            <div className="h-[70vh] justify-between pb-2 flex">
              <div className="w-[80%]">
                {!file && (
                  <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    className="drag-drop h-full"
                  >
                    <div>
                      <TbPhotoVideo className="text-3xl" />
                      <p>사진과 동영상을 여기에 끌어다 놓으세요</p>
                    </div>
                    <label htmlFor="file-upload" className="custom-file-upload">
                      컴퓨터에서 선택
                    </label>
                    <input
                      className="fileInput"
                      type="file"
                      id="file-upload"
                      accept="image/*, video/*"
                      onChange={handleOnChange}
                    />
                  </div>
                )}
                {file &&
                  (file.type.startsWith("video/") ? (
                    <video
                      className="h-full w-full"
                      src={URL.createObjectURL(file)}
                      controls
                    />
                  ) : (
                    <img
                      className="h-full w-full"
                      src={URL.createObjectURL(file)}
                      alt=""
                    />
                  ))}
              </div>
              <div className="w-[1px] border h-full"></div>
              <div className="w-[50%]">
                <div className="flex items-center px-2 py-2">
                  <img
                    className="w-7 h-7 rounded-full"
                    src="https://cdn.pixabay.com/photo/2024/01/29/20/04/mountains-8540737_640.jpg"
                    alt=""
                  />
                  <p className="font-semibold ml-4">username</p>
                </div>
                <div className="px-2">
                  <textarea
                    placeholder="내용을 입력하세요"
                    className="captionInput"
                    name="caption"
                    rows="8"
                    onChange={handleCaptionChange}
                  ></textarea>
                </div>

                <div className="flex justify-between px-2">
                  <GrEmoji />
                  <p className="opacity-70">{caption?.length} / 2200</p>
                </div>
                <hr />

                <div className="p-2 flex justify-between items-center">
                  <input
                    className="locationInput"
                    type="text"
                    placeholder="위치 추가"
                    name="location"
                  />
                  <GoLocation />
                </div>
                <hr />
              </div>
            </div>
          </DrawerBody>

          <DrawerCloseTrigger />
        </DrawerContent>
      </DrawerRoot>
      <AlertDelete
        onCancel={handleCancle}
        onDelete={handleDelete}
        open={showAlert}
        setOpen={setShowAlert}
      />
    </div>
  );
}
