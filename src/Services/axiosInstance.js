import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASEURL,
});

// Add token to every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("loginToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Handle expired token
let isLoggingOut = false;
console.log(isLoggingOut);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (!isLoggingOut) {
        isLoggingOut = true;

        localStorage.removeItem("loginToken");
        localStorage.removeItem("role");
        // window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);
export default axiosInstance;