import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080", // Pastikan port BE kamu sesuai (8080 / 5000)
});

api.interceptors.request.use((config) => {
  // Ambil token langsung atau dari object user
  const rawToken = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  
  const token = rawToken || user?.token || user?.accessToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;