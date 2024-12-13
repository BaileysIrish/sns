import React from "react";

export default function SearchUser() {
  return (
    <div className="py-2 cursor-pointer">
      <div className="flex items-center">
        <img
          className="w-10 h-10 rounded-full"
          src="https://cdn.pixabay.com/photo/2024/07/01/07/11/cats-8864617_640.jpg"
          alt=""
        />
        <div className="ml-3">
          <p>Full name</p>
          <p className="opacity-70">username</p>
        </div>
      </div>
    </div>
  );
}
