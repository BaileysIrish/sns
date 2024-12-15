import axios from "axios";

export const getUserProfile = async (email) => {
  const response = await axios.get(`http://localhost:8080/api/users/${email}`);
  return response.data;
};

export const getCurrentUser = async () => {
  try {
    const userEmail = sessionStorage.getItem("userEmail");
    if (!userEmail) {
      throw new Error(
        "로그인된 사용자가 없습니다. 세션이 만료되었을 수 있습니다."
      );
    }

    const response = await axios.get(
      `http://localhost:8080/api/users/current/${userEmail}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
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
    console.error("모든 사용자 정보를 가져오는 데 실패했습니다:", error);
    throw error;
  }
};
