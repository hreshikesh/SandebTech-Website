import axios from "axios";

const API = axios.create({

    baseURL: "http://localhost:8080/api/admin"

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

export const getDashboard = () => API.get("/dashboard");

export const getUsers = (page = 0) =>
    API.get(`/users?page=${page}&size=10`);

export const getMeetings = (page = 0) =>
    API.get(`/meeting?page=${page}&size=10`);

export const getContacts = (page = 0) =>
    API.get(`/contact?page=${page}&size=10`);

export const updateMeetingStatus = (

    id,

    status,

    adminRemarks

) =>

    API.patch(`/meeting/${id}/status`, {

        status,

        adminRemarks

    });
export const deleteUser = (id) =>
    API.delete(`/users/${id}`);

export const updateContactStatus = (

    id,

    status

) =>

    API.patch(`/contact/${id}/status`, {

        status

    });

export const deleteContact = (id) =>

    API.delete(`/contact/${id}`);

export const updateUserRole = (

    id,

    role

) =>

    API.patch(`/users/${id}/role`, {

        role

    });

export const getUser = (id) =>

    API.get(`/users/${id}`);


    