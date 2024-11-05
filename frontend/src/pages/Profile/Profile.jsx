import React from "react";
import ProfileUserDetail from "../../components/Profile/ProfileUserDetail";
import ReqUserPost from "../../components/Profile/ReqUserPost";

export default function Profile() {
  return (
    <div className="px-20">
      <div className="">
        <ProfileUserDetail />
      </div>
      <div>
        <ReqUserPost />
      </div>
    </div>
  );
}
