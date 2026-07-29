import axios from "axios";
import toast from "react-hot-toast";

const API = axios.create({
    baseURL: "https://sandebtech-website.onrender.com/api/admin"
});

// ADD THIS
API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

API.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error.response?.status;

        if (status === 401 && localStorage.getItem("token")) {
            window.dispatchEvent(new Event("forceLogout"));

            toast.error("Session expired. Please login again.");

            window.location.href = "/";
        }

        return Promise.reject(error);
    }
);

export default API;