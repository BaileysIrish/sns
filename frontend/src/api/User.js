import axios from "axios";

export const getUserProfile = async (email) => {
  const response = await axios.get(`http://localhost:8080/api/users/${email}`);
  return response.data;
};

// 현재 로그인한 사용자 정보 가져오기
export const getCurrentUser = async () => {
  try {
    const response = await axios.get(
      "http://localhost:8080/api/users/current",
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // 세션을 사용하는 경우 필요
      }
    );
    return response.data; // 사용자 정보 반환
  } catch (error) {
    console.error("Failed to fetch current user:", error);
    throw error;
  }
};

// 모든 사용자 정보 가져오기
export const getAllUsers = async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/users/all", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data; // 모든 사용자 정보 반환
  } catch (error) {
    console.error("Failed to fetch all users:", error);
    throw error;
  }
};
