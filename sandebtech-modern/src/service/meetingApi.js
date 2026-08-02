import axios from "axios";
import toast from "react-hot-toast";
import { toLocalDateString } from "../utils/dateUtils";

const API = axios.create({
    baseURL: '${import.meta.env.VITE_API_URL}'
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

        // Session expired
        if (status === 401 && localStorage.getItem("token")) {

            window.dispatchEvent(new Event("forceLogout"));

            toast.error("Session expired. Please login again.");

            window.location.href = "/";

            return Promise.reject(error);
        }
        if (data?.errors && Object.keys(data.errors).length > 0) {
            Object.values(data.errors).forEach((msg) => toast.error(msg));
        } else {
            toast.error(data?.message || "Something went wrong. Please try again.");
        }

        return Promise.reject(error);
    }
);

export async function getAvailableSlots(date) {
    const formattedDate = toLocalDateString(date);

    const response = await API.get(
        `/meeting/available-slots?date=${formattedDate}`
    );

    return response.data;
}

export async function bookMeeting(data) {
    const response = await API.post(
        "/meeting",
        data
    );

    toast.success("Meeting booked successfully!");

    return response.data;
}