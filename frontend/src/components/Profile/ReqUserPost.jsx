import React, { useEffect, useState } from "react";
import { AiOutlineTable } from "react-icons/ai";
import { CgBookmark } from "react-icons/cg";
import { PiUserRectangleLight } from "react-icons/pi";
import ReqUserPostCard from "./ReqUserPostCard";
import { getMyPosts, getSavedPosts } from "../../api/posts";

export default function ReqUserPost({ posts, savedPosts, user }) {
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
        {activeTab === "게시물" && (
          <div className="flex flex-wrap">
            {posts.map((post) => (
              <ReqUserPostCard
                key={post.boardNumber}
                post={post}
                profileImage={user.profileImage}
              />
            ))}
          </div>
        )}
        {activeTab === "저장됨" && (
          <div className="flex flex-wrap">
            {savedPosts.map((post) => (
              <ReqUserPostCard
                key={post.boardNumber}
                post={post}
                profileImage={user.profileImage}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
