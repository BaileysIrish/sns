import axios from 'axios';

export const signup = async (userData) => {
    try {
        const response = await axios.post("http://localhost:8080/api/users/signup", userData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error("회원 가입 중 오류 발생:", error);
        throw error;
    }
};
export const login = async (userData) => {
    try {
        const response = await axios.post("http://localhost:8080/api/users/login", userData, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("로그인 중 오류 발생:", error);
        throw error;
    }
};

export const logout = async () => {
    try {
        const response = await axios.post("http://localhost:8080/api/users/logout", {}, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("로그아웃 중 오류 발생:", error);
        throw error;
    }
};


export const createPost = async (postData) => {
    const response = await axios.post("http://localhost:8080/api/board/create", postData);
    return response.data;
};

export const getPosts = async () => {
    const response = await axios.get("http://localhost:8080/api/board/posts");
    return response.data;
};

export const getPostById = async (id) => {
    const response = await axios.get(`http://localhost:8080/api/board/posts/${id}`);
    return response.data;
};

export const updatePost = async (postData) => {
    const response = await axios.put("http://localhost:8080/api/board/update", postData);
    return response.data;
};

export const deletePost = async (id) => {
    await axios.delete(`http://localhost:8080/api/board/delete/${id}`);
};

