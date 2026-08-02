import axios from "axios";

const API = axios.create({
    baseURL: '${import.meta.env.VITE_API_URL}'
});

export async function sendChat(message) {

    const res = await API.post("/chatbot", {
        message
    });

    return res.data;
}