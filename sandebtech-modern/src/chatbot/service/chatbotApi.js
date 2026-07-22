import axios from "axios";

const API = axios.create({
    baseURL: "https://sandebtech-website.onrender.com"
});

export async function sendChat(message) {

    const res = await API.post("/api/chatbot", {
        message
    });

    return res.data;
}