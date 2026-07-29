import axios from "axios";
import toast from "react-hot-toast";

const API = axios.create({
  baseURL: "https://sandebtech-website.onrender.com/api",
});

// Send JWT with every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Handle expired sessions and other errors
API.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const data = error.response?.data;

   if (status === 401 && localStorage.getItem("token")) {

    window.dispatchEvent(new Event("forceLogout"));

    toast.error("Session expired. Please login again.");

    window.location.href = "/";

    return Promise.reject(error);
}

    if (data?.errors && Object.keys(data.errors).length > 0) {
      Object.values(data.errors).forEach((msg) => toast.error(msg));
    } else {
      toast.error(data?.message || "Something went wrong.");
    }

    return Promise.reject(error);
  }
);

export async function submitContact(data) {
  const response = await API.post("/contact", data);
  return response.data;
}