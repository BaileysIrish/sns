import React, { useState } from "react";
import { AiOutlineTable } from "react-icons/ai";
import { CgBookmark } from "react-icons/cg";
import { PiUserRectangleLight } from "react-icons/pi";
import ReqUserPostCard from "./ReqUserPostCard";

export default function ReqUserPost() {
  const [activeTab, setActiveTab] = useState("게시물");
  const tabs = [
    { tab: "게시물", icon: <AiOutlineTable /> },
    { tab: "저장됨", icon: <CgBookmark /> },
    { tab: "태그됨", icon: <PiUserRectangleLight /> },
  ];
  return (
    <div>
      <div className="flex space-x-14 border-t">
        {tabs.map((item) => (
          <div
            onClick={() => setActiveTab(item.tab)}
            className={`${
              activeTab === item.tab ? "border-t border-black" : "text-gray-600"
            } flex items-center cursor-pointer py-2 text-sm`}
          >
            <p>{item.icon}</p>
            <p className="ml-1 text-sm">{item.tab}</p>
          </div>
        ))}
      </div>
      <div>
        <div className="flex flex-wrap">
          {[1, 1, 1, 1, 1, 1].map((item) => (
            <ReqUserPostCard />
          ))}
        </div>
      </div>
    </div>
  );
}
