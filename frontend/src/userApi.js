import axios from 'axios';

export const signup = async (userData) => {
    try {
        const response = await axios.post("http://localhost:8080/api/users/signup", userData);
        return response.data;
    } catch (error) {
        console.error("회원 가입 중 오류 발생:", error);
        throw error;
    }
};
