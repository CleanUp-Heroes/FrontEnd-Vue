import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/", // URL de ton API Django
  timeout: 5000, // Temps d'attente maximal
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
