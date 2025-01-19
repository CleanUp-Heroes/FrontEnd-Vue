<template>
    <div class="leaderboard-page">
      <h1 class="page-title">Classement</h1>
      <div v-if="loading">Chargement des données...</div>
      <div v-else-if="leaderboard && leaderboard.length > 0">
        <table class="leaderboard-table">
          <thead>
            <tr>
              <th>Rang</th>
              <th>Utilisateur</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(user, index) in leaderboard"
              :key="user.id"
              :class="{ 'current-user': user.isCurrentUser }"
            >
              <td>{{ index + 1 }}</td>
              <td>{{ user.username }}</td>
              <td>{{ user.score }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p v-else>Aucune donnée de classement disponible.</p>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        leaderboard: [], // Contient les données de classement
        loading: true, // Indique si les données sont en cours de chargement
      };
    },
    mounted() {
      this.fetchLeaderboard(); // Récupère les données de classement dès que le composant est monté
    },
    methods: {
      async fetchLeaderboard() {
        try {
          const token = localStorage.getItem("token"); // Récupère le token depuis localStorage
          if (!token) {
            console.error("Token manquant dans localStorage");
            this.loading = false;
            return;
          }
  
          const response = await axios.get("http://127.0.0.1:8000/classement/", {
            headers: {
              Authorization: token,
            },
          });
  
          // Adapter aux données envoyées par l'API
          this.leaderboard = response.data.classement.map((user, index) => ({
            id: index + 1, // Génère un ID basé sur l'index
            username: user.username,
            score: user.total_score, // Utilise la clé `total_score` de l'API
            isCurrentUser: user.username === localStorage.getItem("username"), // Vérifie si c'est l'utilisateur actuel
          }));
        } catch (error) {
          console.error("Erreur lors de la récupération des classements :", error);
          this.leaderboard = [];
        } finally {
          this.loading = false; // Désactive l'état de chargement
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .leaderboard-page {
    padding: 2rem;
    background-color: #f7faff;
    min-height: 100vh;
    width: 80%; /* Augmenter la largeur de la page */
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .page-title {
    font-size: 3rem; /* Taille augmentée */
    font-weight: bold;
    color: #2c3e50;
    margin-bottom: 2rem;
  }
  
  .leaderboard-table {
    width: 100%; /* Utiliser tout l'espace disponible */
    max-width: 1200px; /* Augmenter la largeur maximale */
    border-collapse: collapse;
    background-color: #ffffff;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    font-size: 1.2rem; /* Taille augmentée pour les textes */
  }
  
  .leaderboard-table thead {
    background-color: #1abc9c;
    color: white;
  }
  
  .leaderboard-table th,
  .leaderboard-table td {
    padding: 1.5rem; /* Augmenter l'espacement */
    text-align: left;
    border-bottom: 1px solid #ddd;
    white-space: nowrap; /* Éviter que le texte soit coupé */
  }
  
  .leaderboard-table th {
    font-size: 1.4rem; /* Augmenter la taille des en-têtes */
  }
  
  .leaderboard-table tbody tr:last-child td {
    border-bottom: none;
  }
  
  .leaderboard-table tbody tr:hover {
    background-color: #f9f9f9;
  }
  
  .current-user {
    background-color: #e9f7ef;
    font-weight: bold;
  }
  
  .current-user:hover {
    background-color: #d4f0e4;
  }
  
  @media (max-width: 768px) {
    .leaderboard-table {
      font-size: 1rem; /* Réduire légèrement la taille pour les petits écrans */
    }
  
    .leaderboard-table th,
    .leaderboard-table td {
      padding: 1rem;
    }
  }
  </style>
  