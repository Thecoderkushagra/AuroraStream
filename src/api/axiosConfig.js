import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/user",
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Read token fresh on every request — no hooks needed
api.interceptors.request.use(
  (config) => {
    const storedUser = localStorage.getItem("user");
    const jwt = storedUser ? JSON.parse(storedUser).jwt : null;

    if (jwt) {
      config.headers.Authorization = `Bearer ${jwt}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;