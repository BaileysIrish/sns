import React from "react";
import "./SearchTab.css";
import SearchUser from "./SearchUser";

export default function SearchTab({ open, setOpen }) {
  return (
    <div className="searchContainer">
      <div className="inputWrapper px-3 pb-5">
        <h1 className="text-2xl font-semibold mb-10 ml-3">검색</h1>
        <input type="text" placeholder="검색" className="searchInput" />
      </div>
      <hr />
      <div className="px-3">
        {Array(6)
          .fill(1)
          .map((item) => (
            <SearchUser />
          ))}
      </div>
    </div>
  );
}
