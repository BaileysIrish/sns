import React, { useState } from "react";
import { BsList } from "react-icons/bs";
import { sidebarMenu } from "./SidebarConfig";
import { useNavigate } from "react-router-dom";
import CreatePost from "../Post/CreatePost";

export default function Sidebar() {
  const [activeTab, setActiveTab] = useState();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const handleTabClick = (title) => {
    setActiveTab(title);
    if (title === "프로필") {
      navigate("/username");
    } else if (title === "홈") {
      navigate("/");
    } else if (title === "만들기") {
      setOpen(true);
    }
  };
  return (
    <div className="sticky top-0 h-[100vh]">
      <div className="flex flex-col justify-between h-full px-5">
        <div>
          <div className="pt-10">
            <img
              onClick={() => navigate("/")}
              className="w-40 cursor-pointer"
              src="https://i.imgur.com/zqpwkLQ.png"
              alt=""
            />
          </div>
          <div className="mt-10">
            {sidebarMenu.map((item) => (
              <div
                onClick={() => handleTabClick(item.title)}
                className="flex items-center mb-7 cursor-pointer text-base"
              >
                {activeTab === item.title ? item.activeIcon : item.icon}
                <p
                  className={`${
                    activeTab === item.title ? "font-semibold" : "font-normal"
                  }`}
                >
                  {item.title}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center cursor-pointer pb-10">
          <BsList className="text-2xl" />
          <p className="ml-5">더 보기</p>
        </div>
      </div>

      <CreatePost open={open} setOpen={setOpen} />
    </div>
  );
}
