import axios from "axios";

export const createComment = async (commentData) => {
  const response = await axios.post(
    "http://localhost:8080/api/comments",
    commentData
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
  const response = await axios.post(
    `http://localhost:8080/api/comment-likes/${commentId}`,
    null,
    {
      params: { email },
    }
  );
  return response.data; // 댓글 좋아요 추가/삭제
};

export const getCommentLikeCount = async (commentId) => {
  const response = await axios.get(
    `http://localhost:8080/api/comment-likes/${commentId}`
  );
  return response.data; // 댓글 좋아요 개수 반환
};
