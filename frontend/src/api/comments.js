import axios from "axios";

export const createComment = async (commentData) => {
  const response = await axios.post(
    "http://localhost:8080/api/comments",
    commentData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export const getCommentsByBoardId = async (boardId) => {
  const response = await axios.get(
    `http://localhost:8080/api/comments/${boardId}`
  );
  return response.data;
};

export const deleteComment = async (commentId) => {
  await axios.delete(`http://localhost:8080/api/comments/${commentId}`);
};

export const toggleCommentLike = async (commentId, email) => {
  try {
    const response = await axios.post(
      `http://localhost:8080/api/comment-likes/${commentId}`,
      null,
      { params: { email } }
    );
    console.log("Full Response:", response);
    console.log("Response Data:", response.data);

    // 응답 데이터 검증
    if (
      response.data &&
      typeof response.data.isLiked !== "undefined" &&
      typeof response.data.likeCount !== "undefined"
    ) {
      return response.data; // { isLiked, likeCount }
    } else {
      throw new Error(
        `Invalid response format: ${JSON.stringify(response.data)}`
      );
    }
  } catch (error) {
    console.error("Request failed:", error.response?.data || error.message);
    throw error;
  }
};

export const getCommentLikeCount = async (commentId) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/comment-likes/${commentId}`
    );
    return response.data; // 좋아요 개수 반환
  } catch (error) {
    console.error("Failed to fetch comment like count:", error);
    throw error;
  }
};

// 좋아요 상태 확인 API
export const getCommentLikeStatus = async (commentId, email) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/comment-likes/status/${commentId}`,
      { params: { email } }
    );
    return response.data; // true 또는 false 반환
  } catch (error) {
    console.error(
      "Failed to fetch comment like status:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// 추가된 대댓글 생성 함수
export const createReply = async (replyData) => {
  const response = await axios.post(
    "http://localhost:8080/api/comments",
    replyData
  );
  return response.data;
};

// 추가된 대댓글 포함 댓글 조회 함수
export const getCommentsWithRepliesByBoardId = async (boardId) => {
  const response = await axios.get(
    `http://localhost:8080/api/comments/${boardId}`
  );
  return response.data;
};
