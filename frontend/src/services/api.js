import axios from "axios";

const api = axios.create({
  baseURL: "https://garima-heart-backend-2026.onrender.com/api",
});

export default api;