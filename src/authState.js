// src/authState.js
import { reactive } from 'vue';

export const authState = reactive({
  isAuthenticated: false, // Par défaut, l'utilisateur n'est pas authentifié
});

export function login() {
  authState.isAuthenticated = true; // L'utilisateur est authentifié
}

export function logout() {
  authState.isAuthenticated = false; // L'utilisateur est déconnecté
  localStorage.removeItem('token');
}

export function updateAuthState() {
  // Vérifie si le token est présent dans localStorage
  authState.isAuthenticated = !!localStorage.getItem('token');
}