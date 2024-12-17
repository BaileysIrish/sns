import axios from "axios";

export const createPost = async (postData) => {
  const response = await axios.post(
    "http://localhost:8080/api/board/create",
    postData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};

export const getPosts = async () => {
  const response = await axios.get("http://localhost:8080/api/board/posts");
  return response.data;
};

export const getPostById = async (id) => {
  const response = await axios.get(
    `http://localhost:8080/api/board/posts/${id}`
  );
  return response.data;
};

export const deletePost = async (boardNumber) => {
  await axios.delete(`http://localhost:8080/api/board/delete/${boardNumber}`);
};

export const updatePost = async (boardNumber, formData) => {
  try {
    const response = await axios.put(
      `http://localhost:8080/api/board/update/${boardNumber}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("게시물 수정 중 오류 발생:", error);
    throw error;
  }
};

export const toggleFavorite = async (boardNumber, email) => {
  try {
    const response = await axios.post(
      `http://localhost:8080/api/board/${boardNumber}/favorite`,
      null,
      { params: { email } }
    );
    return response.data; // { isLiked: true/false, favoriteCount: number }
  } catch (error) {
    console.error("좋아요 토글 중 오류:", error);
    throw error;
  }
};

// 좋아요 상태 및 개수 가져오기
export const getFavoriteStatus = async (boardNumber, email) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/board/${boardNumber}/favorite-status`,
      { params: { email } }
    );
    return response.data; // { isLiked: true/false, favoriteCount: number }
  } catch (error) {
    console.error("좋아요 상태 가져오기 중 오류:", error);
    throw error;
  }
};

export const getMyPosts = async (email) => {
  try {
    const response = await axios.get(
      "http://localhost:8080/api/board/my-posts",
      {
        params: { email },
      }
    );
    console.log("API 응답 데이터:", response.data); // API 데이터 출력
    return response.data;
  } catch (error) {
    console.error("API 호출 중 오류:", error);
    throw error;
  }
};

export const savePost = async (postData) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/saved-posts/save",
      postData,
      {
        headers: {
          "Content-Type": "application/json", // multipart-form-data로 바꾸기 전 확인 필요
        },
      }
    );
    console.log("저장된 게시물:", response.data);
    return response.data;
  } catch (error) {
    console.error("게시물 저장 실패:", error);
    throw error;
  }
};
export const getSavedPosts = async (userId) => {
  const encodedUserId = encodeURIComponent(userId); // userId를 URL-safe하게 인코딩
  return await axios.get(
    `http://localhost:8080/api/saved-posts/${encodedUserId}`
  );
};
export const checkIfPostSaved = async (userId, content) => {
  const response = await axios.get(
    "http://localhost:8080/api/saved-posts/is-saved",
    {
      params: { userId, content },
    }
  );
  return response.data; // true 또는 false 반환
};

export const deleteSavedPost = async (userId, content) => {
  return await axios.delete("http://localhost:8080/api/saved-posts/delete", {
    params: { userId, content },
  });
};
