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
        const userEmail = response.data;  // 서버에서 반환된 이메일
        if (userEmail) {
            console.log("User email saved to localStorage:", userEmail);  // 콘솔 로그로 이메일 확인
            localStorage.setItem('userEmail', userEmail);  // 로컬 스토리지에 저장
        } else {
            console.error("Login response does not contain email");
        }
        return response.data;
    } catch (error) {
        console.error("로그인 중 오류 발생:", error);
        throw error;
    }
};

export const logout = async () => {
    try {
        const response = await axios.post("http://localhost:8080/api/users/logout", {}, { withCredentials: true });
        localStorage.removeItem('userEmail');  // 로그아웃 시 이메일 삭제
        return response.data;
    } catch (error) {
        console.error("로그아웃 중 오류 발생:", error);
        throw error;
    }
};
export const createPost = async (postData) => {
    const response = await axios.post("http://localhost:8080/api/board/create", postData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
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

export const deletePost = async (boardNumber) => {
    await axios.delete(`http://localhost:8080/api/board/delete/${boardNumber}`);
};

export const updatePost = async (boardNumber, formData) => {
    try {
        const response = await axios.put(`http://localhost:8080/api/board/update/${boardNumber}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error("게시물 수정 중 오류 발생:", error);
        throw error;
    }
};
export const toggleLike = async (boardNumber, email) => {
    const response = await axios.post(`http://localhost:8080/api/likes/${boardNumber}`, null, {
        params: { email },
    });
    return response.data; // 좋아요 개수 반환
};

export const getLikeCount = async (boardNumber) => {
    const response = await axios.get(`http://localhost:8080/api/likes/${boardNumber}`);
    return response.data; // 좋아요 개수 반환
};

export const createComment = async (commentData) => {
    const response = await axios.post("http://localhost:8080/api/comments", commentData);
    return response.data;
};

export const getCommentsByBoardId = async (boardId) => {
    const response = await axios.get(`http://localhost:8080/api/comments/${boardId}`);
    return response.data;
};

// 추가된 대댓글 생성 함수
export const createReply = async (replyData) => {
    const response = await axios.post("http://localhost:8080/api/comments", replyData);
    return response.data;
};

// 추가된 대댓글 포함 댓글 조회 함수
export const getCommentsWithRepliesByBoardId = async (boardId) => {
    const response = await axios.get(`http://localhost:8080/api/comments/${boardId}`);
    return response.data;
};

export const updateComment = async (commentId, newContent) => {
    try {
        const response = await axios.put(`http://localhost:8080/api/comments/${commentId}`, {
            content: newContent,
        });
        return response.data;
    } catch (error) {
        console.error("댓글 수정 중 오류 발생:", error);
        throw error;
    }
};
export const deleteComment = async (commentId) => {
    await axios.delete(`http://localhost:8080/api/comments/${commentId}`);
};

export const toggleCommentLike = async (commentId, email) => {
    const response = await axios.post(`http://localhost:8080/api/comment-likes/${commentId}`, null, {
        params: { email },
    });
    return response.data; // 댓글 좋아요 개수 반환
};

export const getCommentLikeCount = async (commentId) => {
    const response = await axios.get(`http://localhost:8080/api/comment-likes/${commentId}`);
    return response.data; // 댓글 좋아요 개수 반환
};


