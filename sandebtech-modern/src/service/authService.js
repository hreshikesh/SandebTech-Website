import axios from "axios";
import toast from "react-hot-toast";

const API = axios.create({
    baseURL: "https://sandebtech-website.onrender.com/api/auth"
});

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
        const data = error.response?.data;

        if (status === 401 && localStorage.getItem("token")) {
            localStorage.removeItem("token");

            toast.error("Session expired. Please login again.");

            window.location.href = "/";

            return Promise.reject(error);
        }

        return Promise.reject(error);
    }
);

export async function sendOTP(email) {
    const response = await API.post("/login", { email });
    return response.data;
}

export async function verifyOTP(email, otp) {
    const response = await API.post("/verify", {
        email,
        otp
    });

    return response.data;
}

export async function register(data) {
    const response = await API.post("/register", data);
    return response.data;
}