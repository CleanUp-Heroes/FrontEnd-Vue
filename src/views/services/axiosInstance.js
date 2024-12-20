import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000", // Base URL de votre API backend
});

// Ajouter un intercepteur pour inclure le token dans les en-têtes
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken"); // Récupérer le token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Ajouter l'en-tête Authorization
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default axiosInstance;
