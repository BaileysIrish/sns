import React from "react";
import { AiFillHeart } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import "./ReqUserPostCard.css";

export default function ReqUserPostCard() {
  return (
    <div className="p-2">
      <div className="post w-60 h-60">
        <img
          className="cursor-pointer"
          src="https://cdn.pixabay.com/photo/2023/09/21/11/30/cat-8266486_640.jpg"
          alt=""
        />
        <div className="overlay">
          <div className="overlay-text flex justify-between">
            <div>
              <AiFillHeart />
              <span>10</span>
            </div>
            <div>
              <FaComment />
              <span>30</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
