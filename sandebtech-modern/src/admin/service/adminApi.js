import axios from "axios";

const API = axios.create({
    baseURL: "https://sandebtech-website.onrender.com/api/admin"
});

API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    console.log("TOKEN =", token);

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    console.log(config.headers);
    return config;
});

export default API;

// --- Dashboard Matrix ---
export const getDashboard = () => API.get("/dashboard");

// --- Meetings Endpoint (Fully Upgraded for Sorting & Page Sizing) ---
export const getMeetings = (page = 0, size = 10, sortBy = "meetingDate", direction = "desc") =>
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

// --- Users Endpoints (Upgraded parameters for scaling) ---
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

// --- Contacts Endpoints (Upgraded parameters for scaling) ---
export const getContacts = (page = 0, size = 10, sortBy = "createdAt", direction = "desc") =>
    API.get("/contact", { params: { page, size, sortBy, direction } });

export const updateContactStatus = (id, status) =>
    API.patch(`/contact/${id}/status`, {
        status
    });

export const deleteContact = (id) => API.delete(`/contact/${id}`);