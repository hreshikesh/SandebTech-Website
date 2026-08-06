// services/downloadService.js
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

const API = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

/**
 * Submits user info before allowing a PDF download.
 *
 * @param {Object} payload
 * @param {string}      payload.name           - Full name (required)
 * @param {string}      payload.email          - Email address (required)
 * @param {string|null} payload.phone          - Mobile number (optional)
 * @param {string}      payload.documentTitle  - Title of the document (required)
 * @returns {Promise<boolean>} true if saved successfully
 */
export async function submitDownloadInfo(payload) {
  if (!payload?.name?.trim()) throw new Error("Name is required.");
  if (!payload?.email?.trim()) throw new Error("Email is required.");
  if (!payload?.documentTitle?.trim())
    throw new Error("Document title is required.");

  const response = await API.post("/download/save", {
    name: payload.name.trim(),
    email: payload.email.trim(),
    phone: payload.phone?.trim() || null,
    documentTitle: payload.documentTitle.trim(),
  });

  if (response.data !== true) {
    throw new Error("Server did not confirm the save operation.");
  }

  return response.data;
}