import axios from "axios";

export const getUserProfile = async (email) => {
  const response = await axios.get(`http://localhost:8080/api/users/${email}`);
  return response.data;
};
