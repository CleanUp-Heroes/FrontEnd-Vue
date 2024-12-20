<template>
  <div class="stats-page">
    <h2 class="stats-title">Statistiques des défis</h2>
    <div v-if="loading">Chargement des données...</div>
    <div v-else-if="stats">
      <!-- Résumé des statistiques -->
      <div class="stats-summary">
        <div class="stats-item">
          <h3>Nombre total de défis accomplis :</h3>
          <p>{{ stats.completedChallengesCount }}</p>
        </div>
        <div class="stats-item">
          <h3>Quantité totale réalisée :</h3>
          <ul>
            <li v-for="(quantity, index) in stats.totalQuantity" :key="index">
              {{ quantity }}
            </li>
          </ul>
        </div>
        <div class="stats-item">
          <h3>Score total :</h3>
          <p>{{ stats.totalScore }}</p>
        </div>
      </div>

      <!-- Liste des progressions -->
      <div class="progress-section">
        <h3>Progression des défis en cours :</h3>
        <ul>
          <li v-for="(progressItem, index) in stats.progress" :key="index">
            <strong>{{ progressItem.challengeName }}</strong> : {{ progressItem.realizedQuantity }} ({{ progressItem.progressPercentage }}%)
          </li>
        </ul>
      </div>
    </div>
    <p v-else>Aucune donnée statistique disponible.</p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      stats: null, // Contient les statistiques récupérées depuis le backend
      loading: true, // Indique si les données sont en cours de chargement
    };
  },
  mounted() {
    this.fetchStats(); // Récupère les statistiques dès que le composant est monté
  },
  methods: {
    async fetchStats() {
      try {
        const token = localStorage.getItem("token"); // Récupère le token depuis localStorage
        if (!token) {
          console.error("Token manquant dans localStorage");
          this.loading = false;
          return;
        }

        // Ajouter le token dans l'en-tête Authorization
        const response = await fetch("http://127.0.0.1:8000/challenges/statistics/", {
          method: "GET",
          headers: {
            "Authorization": token,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) throw new Error("Erreur lors de la récupération des données.");

        const data = await response.json();

        // Mapper les données directement
        this.stats = {
          completedChallengesCount: data.completedChallengesCount,
          completedChallenges: data.completedChallenges,
          totalQuantity: data.totalQuantity,
          totalScore: data.totalScore,
          progress: data.progress,
        };
      } catch (error) {
        console.error("Erreur :", error);
        this.stats = null; // Si une erreur survient, pas de données
      } finally {
        this.loading = false; // Désactive l'état de chargement
      }
    },
  },
};
</script>

<style scoped>
/* Conteneur général pour la page */
.stats-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100%;
  background-color: #f6fdfb;
  padding: 2rem;
  box-sizing: border-box;
}

/* Titre principal */
.stats-title {
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  color: #1a6f4b;
  margin-bottom: 2rem;
}

/* Résumé des statistiques */
.stats-summary {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1.5rem;
  width: 100%;
  max-width: 1200px;
  margin-bottom: 2rem;
  box-sizing: border-box;
}

.stats-item {
  background: #ffffff;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
  flex: 1;
  max-width: 300px;
  min-width: 250px;
  box-sizing: border-box;
}

.stats-item h3 {
  font-size: 1.3rem;
  margin-bottom: 1rem;
  color: #3a3a3a;
}

.stats-item p {
  font-size: 1.8rem;
  font-weight: bold;
  color: #1a6f4b;
}

/* Conteneur du graphique */
.chart-container {
  width: 100%;
  max-width: 1200px;
  overflow-x: auto;
  padding: 2rem;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
}

@media (max-width: 768px) {
  .stats-summary {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .stats-item {
    max-width: 100%;
  }
}
</style>