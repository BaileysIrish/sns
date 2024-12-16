import React, { useEffect, useState } from "react";
import "./WeatherEffect.css";
import FallingSnow from "./FallingSnow";
import FallingRain from "./FallingRain";

const WeatherEffect = () => {
  const [weather, setWeather] = useState(null); // 날씨 상태만 저장
  const [isFetching, setIsFetching] = useState(false);
  const apiKey = "95bbe36fa5ad05b88de45b4bad06c657";

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) =>
          fetchWeather(position.coords.latitude, position.coords.longitude),
        () => handleLocationError()
      );
    } else {
      setWeather("clear"); // 브라우저가 위치 서비스를 지원하지 않을 경우 기본값
    }
  }, []);

  const fetchWeather = async (latitude, longitude) => {
    if (isFetching) return;
    setIsFetching(true);

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

    try {
      const response = await fetch(url);
      console.log(response);
      if (!response.ok) {
        console.error("API 호출 실패:", response.status, response.statusText);
        throw new Error("API 호출 실패");
      }

      const data = await response.json();
      console.log(data);
      const weatherCondition = data.weather[0].main.toLowerCase(); // 날씨 상태
      setWeather(weatherCondition); // 'rain', 'snow', 'clear' 등
    } catch (err) {
      console.error("날씨 정보를 가져오는 중 오류 발생:", err);
      setWeather("clear"); // 기본값
    } finally {
      setIsFetching(false);
    }
  };

  const handleLocationError = () => {
    setWeather("clear"); // 위치 권한 거부 시 기본값
  };

  return (
    <div>
      {weather === "clear" && <FallingSnow />} {/* 눈이 내리는 효과 */}
      {weather === "rain" && <FallingRain />}
    </div>
  );
};

export default WeatherEffect;
