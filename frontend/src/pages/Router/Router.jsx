import React, { useEffect, useRef, useState } from "react";
import { Alert } from "../../components/ui/alert";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import HomePage from "../HomePage/HomePage";
import Profile from "../Profile/Profile";
import Story from "../Story/Story";
import { ScrollTop } from "./ScrollToTop";
import Auth from "../Auth/Auth";
import WeatherEffect from "../../components/WeatherEffect/WeatherEffect";
import StoryViewer from "../../components/Story/StoryViewer";

export default function Router() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showAlert, setShowAlert] = useState(false); // 알림 상태
  const [fadeOut, setFadeOut] = useState(false);
  const isInitialLoad = useRef(true);

  useEffect(() => {
    const isAuthenticated = !!sessionStorage.getItem("userEmail"); // 로그인 여부 확인

    // 초기 로드 상태 처리
    if (isInitialLoad.current) {
      isInitialLoad.current = false; // 초기 로드 완료로 설정
      if (!isAuthenticated) {
        navigate("/login", { replace: true }); // 초기 로드 시 로그인 페이지로 이동
      }
      return; // 초기 로드에서는 알림 표시 방지
    }

    if (
      !isAuthenticated &&
      location.pathname !== "/login" &&
      location.pathname !== "/signup"
    ) {
      setShowAlert(true);
      navigate("/login", { replace: true });
    }
  }, [location.pathname, navigate]);

  useEffect(() => {
    if (showAlert) {
      const fadeOutTimer = setTimeout(() => setFadeOut(true), 2500);
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 3000);

      // 컴포넌트가 언마운트되거나 상태가 변경될 때 타이머 정리
      return () => {
        clearTimeout(fadeOutTimer);
        clearTimeout(timer);
      };
    }
  }, [showAlert]);

  return (
    <div>
      <WeatherEffect />
      {showAlert && (
        <Alert
          title="로그인이 필요합니다."
          icon={<span>⚠️</span>} // 경고 아이콘
          closable
          onClose={() => setShowAlert(false)} // 닫기 버튼 핸들러
          status="error"
          className={`w-[40vh] h-52 fixed top-16 flex left-[40%] z-10 transition-opacity duration-300 ${
            fadeOut ? "opacity-0" : "opacity-100"
          }`}
        >
          보호된 페이지에 접근하려면 로그인이 필요합니다.
        </Alert>
      )}

      {location.pathname !== "/login" && location.pathname !== "/signup" ? (
        <div className="flex">
          <div className="w-[22%]">
            <Sidebar />
          </div>
          <div className="w-full">
            <ScrollTop />
            <Routes>
              <Route path="/" element={<HomePage />}></Route>
              <Route path="/username" element={<Profile />}></Route>
              <Route path="/stories/:email" element={<StoryViewer />}></Route>
            </Routes>
          </div>
        </div>
      ) : (
        <div>
          <Routes>
            <Route path="/signup" element={<Auth />}></Route>
            <Route path="/login" element={<Auth />}></Route>
          </Routes>
        </div>
      )}
    </div>
  );
}
