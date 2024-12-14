import axios from "axios";

export const toggleLike = async (boardNumber, email) => {
  const response = await axios.post(
    `http://localhost:8080/api/likes/${boardNumber}`,
    null,
    {
      params: { email },
    }
  );
  return response.data; // 좋아요 추가/삭제
};

export const getLikeCount = async (boardNumber) => {
  const response = await axios.get(
    `http://localhost:8080/api/likes/${boardNumber}`
  );
  return response.data; // 좋아요 개수 반환
};
