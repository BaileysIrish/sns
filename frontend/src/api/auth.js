import axios from "axios";

export const signup = async (userData) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/users/signup",
      userData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("회원 가입 중 오류 발생:", error);
    throw error;
  }
};

export const login = async (userData) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/users/login",
      userData,
      { withCredentials: true }
    );

    return response.data;
  } catch (error) {
    // 에러 구체화
    if (error.response) {
      // 서버가 에러를 반환한 경우
      console.error(
        `Login failed with status ${error.response.status}:`,
        error.response.data
      );
    } else if (error.request) {
      // 요청은 보내졌지만 응답이 없는 경우
      console.error("No response received from server:", error.request);
    } else {
      // 기타 클라이언트 에러
      console.error("Unexpected error during login:", error.message);
    }
    throw error; // 에러 재던짐
  }
};

export const logout = async () => {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/users/logout",
      {},
      { withCredentials: true }
    );
    sessionStorage.removeItem("userEmail"); // 로그아웃 시 이메일 삭제
    sessionStorage.removeItem("authToken"); // 추가적으로 토큰 삭제
    return response.data;
  } catch (error) {
    console.error("로그아웃 중 오류 발생:", error);
    throw error;
  }
};
