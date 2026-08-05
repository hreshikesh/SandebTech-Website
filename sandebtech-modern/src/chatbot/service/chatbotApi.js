import axios from "axios";

// ✅ Fallback so it never becomes "undefined"
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

const API = axios.create({
    baseURL: BASE_URL
});


export async function sendChat(message) {

    if (!message || !message.trim()) {
        throw new Error("Message cannot be empty");
    }

    const res = await API.post("/chatbot", {
        message
    });

    return res.data;
}