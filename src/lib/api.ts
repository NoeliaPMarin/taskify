const configuredApiUrl = import.meta.env.VITE_API_URL?.trim();

export const API_URL = (configuredApiUrl || "http://localhost:4000").replace(/\/$/, "");

export function authHeaders(): HeadersInit {
  const token = localStorage.getItem("taskify_token") || sessionStorage.getItem("taskify_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}
