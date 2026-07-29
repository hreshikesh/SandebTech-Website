import axios from "axios";
import toast from "react-hot-toast";
const API = axios.create({
    baseURL: "https://sandebtech-website.onrender.com/api/admin"
});

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

// --- Dashboard Matrix ---
export const getDashboard = () => API.get("/dashboard");

// --- Meetings Endpoint (Upgraded for Server-Side Pagination & Sorting) ---
export const getMeetings = (page = 0, size = 5, sortBy = "createdAt", direction = "desc") =>
    API.get("/meeting", {
        params: {
            page,
            size,
            sortBy,
            direction
        }
    });

export const updateMeetingStatus = (id, status, adminRemarks) =>
    API.patch(`/meeting/${id}/status`, {
        status,
        adminRemarks
    });

export const deleteMeeting = (id) => API.delete(`/meeting/${id}`);

// --- Users Endpoints ---
export const getUsers = (page = 0, size = 10) =>
    API.get("/users", {
        params: { page, size }
    });

export const getUser = (id) => API.get(`/users/${id}`);

export const updateUserRole = (id, role) =>
    API.patch(`/users/${id}/role`, {
        role
    });

export const deleteUser = (id) => API.delete(`/users/${id}`);

// --- Contacts Endpoints ---
export const getContacts = (page = 0, size = 10, sortBy = "createdAt", direction = "desc") =>
    API.get("/contact", { params: { page, size, sortBy, direction } });

export const updateContactStatus = (id, status) =>
    API.patch(`/contact/${id}/status`, {
        status
    });

export const deleteContact = (id) => API.delete(`/contact/${id}`);