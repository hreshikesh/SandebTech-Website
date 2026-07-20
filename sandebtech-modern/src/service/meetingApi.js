import axios from "axios";
import toast from "react-hot-toast";
import { toLocalDateString } from "../utils/dateUtils";

const API = axios.create({
    baseURL: "https://sandebtech-website.onrender.com/api"
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
        const data = error.response?.data;

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