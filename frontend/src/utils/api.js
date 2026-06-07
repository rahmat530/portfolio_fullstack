import axios from "axios";

const BASE_URL =
  import.meta.env.VITE_API_URL || "https://portfolio-backend-annb.onrender.com";

const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token");
  if (token) config.headers.Authorization = `Token ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("auth_token");
      window.location.href = "/admin-login";
    }
    return Promise.reject(err);
  },
);

export default api;
