import axios from "axios";
import toast from "react-hot-toast";

const API = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}`
});

// Request Interceptor: Attach JWT Token
API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

// Response Interceptor: Handle Token Expiration
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
export const getDashboard = () => API.get("/admin/dashboard");

// --- Downloads Endpoint ---
export const getDownloadData = (page = 0, size = 10, sortBy = "downloadedAt", direction = "desc") =>
    API.get("/admin/download", {
        params: {
            page,
            size,
            sortBy,
            direction
        }
    });

// --- Meetings Endpoint ---
export const getMeetings = (page = 0, size = 5, sortBy = "createdAt", direction = "desc") =>
    API.get("/admin/meeting", {
        params: {
            page,
            size,
            sortBy,
            direction
        }
    });

export const updateMeetingStatus = (id, status, adminRemarks) =>
    API.patch(`/admin/meeting/${id}/status`, {
        status,
        adminRemarks
    });

export const deleteMeeting = (id) => API.delete(`/admin/meeting/${id}`);

// --- Users Endpoints ---
export const getUsers = (page = 0, size = 10) =>
    API.get("/admin/users", {
        params: { page, size }
    });

export const getUser = (id) => API.get(`/admin/users/${id}`);

export const updateUserRole = (id, role) =>
    API.patch(`/admin/users/${id}/role`, {
        role
    });

export const deleteUser = (id) => API.delete(`/admin/users/${id}`);

// --- Contacts Endpoints ---
export const getContacts = (page = 0, size = 10, sortBy = "createdAt", direction = "desc") =>
    API.get("/admin/contact", { params: { page, size, sortBy, direction } });

export const updateContactStatus = (id, status) =>
    API.patch(`/admin/contact/${id}/status`, {
        status
    });

export const deleteContact = (id) => API.delete(`/admin/contact/${id}`);