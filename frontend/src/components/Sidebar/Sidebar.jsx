import React, { useEffect, useRef, useState } from "react";
import { BsList } from "react-icons/bs";
import { sidebarMenu } from "./SidebarConfig";
import { useNavigate } from "react-router-dom";
import CreatePost from "../Post/CreatePost";
import SearchTab from "../Search/SearchTab";
import { IoLogoInstagram } from "react-icons/io5";
import { AnimatePresence, motion } from "framer-motion";
import "./Sidebar.css";

export default function Sidebar() {
  const [activeTab, setActiveTab] = useState();
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();
  const sidebarRef = useRef(null);
  const searchContainerRef = useRef(null);

  const handleTabClick = (title) => {
    setActiveTab(title);

    if (title === "검색") {
      setSearchOpen((prev) => !prev);
      return;
    }

    setSearchOpen(false);

    switch (title) {
      case "프로필":
        navigate("/username");
        break;
      case "홈":
        navigate("/");
        window.scrollTo(0, 0);
        break;
      case "만들기":
        setOpen(true);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!searchOpen) {
      setActiveTab("홈");
    }
  }, [searchOpen]);
  return (
    <div className="sticky top-0 h-[100vh] flex">
      <motion.div
        ref={sidebarRef}
        className="flex flex-col justify-between h-full px-4 border border-l-slate-500"
        animate={{ width: searchOpen ? "80px" : "340px" }}
        transition={{
          duration: 0.4,
        }}
      >
        <div>
          <div className="pt-10">
            {!searchOpen ? (
              <img
                onClick={() => navigate("/")}
                className="w-28 cursor-pointer h-9"
                src="https://i.imgur.com/zqpwkLQ.png"
                alt=""
              />
            ) : (
              <IoLogoInstagram className="text-2xl ml-3 mt-3" />
            )}
          </div>
          <div className="mt-10">
            {sidebarMenu.map((item) => (
              <div
                onClick={() => handleTabClick(item.title)}
                className="flex items-center cursor-pointer p-3 text-base mb-2 w-full hover:bg-gray-100 duration-500 rounded-lg transition-all ease-out group"
              >
                <motion.span
                  className="transition-transform duration-200 group-hover:scale-110"
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {activeTab === item.title ? item.activeIcon : item.icon}
                </motion.span>
                {!searchOpen && (
                  <motion.p
                    className={`ml-2 sidebarText ${
                      activeTab === item.title ? "font-semibold" : "font-normal"
                    }`}
                    initial={{ opacity: 1, x: 0 }}
                    animate={{
                      opacity: searchOpen ? 0 : 1,
                      x: searchOpen ? -20 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {item.title}
                  </motion.p>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center cursor-pointer pb-10">
          <BsList className="text-2xl" />
          {!searchOpen && <p className="ml-5">더 보기</p>}
        </div>
      </motion.div>

      <AnimatePresence>
        {searchOpen && (
          <motion.div
            ref={searchContainerRef}
            className="absolute top-0 left-[80px] h-[100vh] bg-white searchtab"
            initial={{ width: 0, opacity: 0 }}
            animate={{
              width: "400px",
              opacity: 1,
              transition: { duration: 0.3, delay: 0.2 },
            }}
            exit={{
              width: 0,
              opacity: 0,
              transition: { duration: 0.3, delay: 0 },
            }}
          >
            <SearchTab open={searchOpen} setOpen={setSearchOpen} />
          </motion.div>
        )}
      </AnimatePresence>

      <CreatePost open={open} setOpen={setOpen} />
    </div>
  );
}
