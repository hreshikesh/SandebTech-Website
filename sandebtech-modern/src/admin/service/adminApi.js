import axios from "axios";
import toast from "react-hot-toast";

const API = axios.create({
    baseURL: '${import.meta.env.VITE_API_URL}'
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
export const getDashboard = () => API.get("api/admin/dashboard");

// --- Meetings Endpoint (Upgraded for Server-Side Pagination & Sorting) ---
export const getMeetings = (page = 0, size = 5, sortBy = "createdAt", direction = "desc") =>
    API.get("api/admin/meeting", {
        params: {
            page,
            size,
            sortBy,
            direction
        }
    });

export const updateMeetingStatus = (id, status, adminRemarks) =>
    API.patch(`api/admin/meeting/${id}/status`, {
        status,
        adminRemarks
    });

export const deleteMeeting = (id) => API.delete(`api/admin/meeting/${id}`);

// --- Users Endpoints ---
export const getUsers = (page = 0, size = 10) =>
    API.get("api/admin/users", {
        params: { page, size }
    });

export const getUser = (id) => API.get(`api/admin/users/${id}`);

export const updateUserRole = (id, role) =>
    API.patch(`api/admin/users/${id}/role`, {
        role
    });

export const deleteUser = (id) => API.delete(`api/admin/users/${id}`);

// --- Contacts Endpoints ---
export const getContacts = (page = 0, size = 10, sortBy = "createdAt", direction = "desc") =>
    API.get("api/admin/contact", { params: { page, size, sortBy, direction } });

export const updateContactStatus = (id, status) =>
    API.patch(`api/admin/contact/${id}/status`, {
        status
    });

export const deleteContact = (id) => API.delete(`api/admin/contact/${id}`);