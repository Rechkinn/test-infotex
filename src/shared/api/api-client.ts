import axios from "axios";

const BASE_URL = "https://697720ba5b9c0aed1e856e75.mockapi.io/api/v1";
export const apiBackend = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiBackend.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export const authApi = {
  login: (credentials: { login: string; password: string }) =>
    apiBackend.get("/auth"),

  logout: () => {
    localStorage.removeItem("token");
    return Promise.resolve();
  },

  getMe: () => apiBackend.get("/auth"),
};
