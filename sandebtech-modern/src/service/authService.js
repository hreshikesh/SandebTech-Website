import axios from "axios";

const API = axios.create({

    baseURL: "http://localhost:8080/api/auth"

});

export async function sendOTP(email) {

    const response = await API.post("/login", {

        email

    });

    return response.data;

}

export async function verifyOTP(email, otp) {

    const response = await API.post("/verify", {

        email,

        otp

    });

    return response.data;

}

export async function register(data) {

    const response = await API.post("/register", data);

    return response.data;

}

