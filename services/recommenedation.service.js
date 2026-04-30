import axios from "axios";

export const getRecommendations = async (userId) => {
  try {
    const res = await axios.post("http://localhost:8080/recommend", { userId });
    return res.data;
  } catch (err) {
    console.log(err.message);
    return [];
  }
};