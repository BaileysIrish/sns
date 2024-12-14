import React, { useEffect } from "react";
import ProfileUserDetail from "../../components/Profile/ProfileUserDetail";
import ReqUserPost from "../../components/Profile/ReqUserPost";
import { useLocation } from "react-router-dom";

export default function Profile() {
  const location = useLocation();
  useEffect(() => {}, [location.key]);
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
