import React, { useEffect, useState } from "react";

const WeatherDisplay = () => {
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);
    const apiKey = "95bbe36fa5ad05b88de45b4bad06c657"; // OpenWeatherMap API 키 입력

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(fetchWeather, showError);
        } else {
            setError("위치 정보를 사용할 수 없습니다.");
        }
    }, []);

    const fetchWeather = (position) => {
        const { latitude, longitude } = position.coords;
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&lang=kr&appid=${apiKey}`;

        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("API 호출 실패");
                }
                return response.json();
            })
            .then((data) => {
                setWeather(data);
            })
            .catch(() => {
                setError("날씨 정보를 가져오는 데 실패했습니다.");
            });
    };

    const showError = () => {
        setError("위치 권한이 거부되었습니다.");
    };

    return (
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <h3>현재 위치의 날씨</h3>
            {error && <p>{error}</p>}
            {weather ? (
                <div>
                    <p>도시: {weather.name || "알 수 없음"}</p>
                    <p>온도: {weather.main?.temp ?? "데이터 없음"}°C</p>
                    <p>날씨: {weather.weather?.[0]?.description ?? "데이터 없음"}</p>
                    <p>습도: {weather.main?.humidity ?? "데이터 없음"}%</p>
                </div>
            ) : (
                !error && <p>날씨 정보를 가져오는 중...</p>
            )}
        </div>
    );
};

export default WeatherDisplay;
