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
