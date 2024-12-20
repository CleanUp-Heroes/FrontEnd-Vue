<template>
  <div class="stats-page">
    <h2 class="stats-title">Statistiques des défis</h2>
    <div v-if="loading">Chargement des données...</div>
    <div v-else-if="stats">
      <div class="stats-summary">
        <div class="stats-item">
          <h3>Nombre total de défis accomplis :</h3>
          <p>{{ stats.completedChallengesCount }}</p>
        </div>
        <div class="stats-item">
          <h3>Quantité totale réalisée :</h3>
          <p>{{ stats.totalQuantity }}</p>
        </div>
        <div class="stats-item">
          <h3>Score total :</h3>
          <p>{{ stats.totalScore }}</p>
        </div>
        <div class="stats-item">
          <h3>Progression :</h3>
          <p>{{ stats.progress }}%</p>
        </div>
      </div>
      <div class="chart-container">
        <canvas id="chart"></canvas>
      </div>
    </div>
    <p v-else>Aucune donnée statistique disponible.</p>
  </div>
</template>

<script>
import Chart from "chart.js/auto";

export default {
  data() {
    return {
      stats: null, // Contient les statistiques récupérées depuis le backend
      loading: true, // Indique si les données sont en cours de chargement
      chartInstance: null, // Stocke l'instance du graphique pour une gestion propre
    };
  },
  mounted() {
    this.fetchStats(); // Récupère les statistiques dès que le composant est monté
  },
  methods: {
    async fetchStats() {
      try {
        const response = await fetch("http://127.0.0.1:8000/challenges/statistics/");
        if (!response.ok) throw new Error("Erreur lors de la récupération des données.");

        const data = await response.json();

        // Mapper les données pour les utiliser dans le composant
        this.stats = {
          completedChallengesCount: data.completed_challenges_count,
          completedChallenges: data.completed_challenges_list,
          totalQuantity: data.quantities.reduce((sum, item) => sum + item.quantity, 0),
          totalScore: data.total_score,
          progress: data.progress,
        };

        // Render le graphique une fois les données chargées
        this.renderChart();
      } catch (error) {
        console.error("Erreur :", error);
        this.stats = null; // Si une erreur survient, pas de données
      } finally {
        this.loading = false; // Désactive l'état de chargement
      }
    },
    renderChart() {
      if (!this.stats || !this.stats.completedChallenges) {
        console.warn("Pas de données disponibles pour le graphique.");
        return;
      }

      // Détruire l'ancien graphique si nécessaire
      if (this.chartInstance) {
        this.chartInstance.destroy();
      }

      const ctx = document.getElementById("chart").getContext("2d");
      this.chartInstance = new Chart(ctx, {
        type: "bar",
        data: {
          labels: this.stats.completedChallenges.map((challenge) => challenge.name),
          datasets: [
            {
              label: "Quantité réalisée",
              data: this.stats.completedChallenges.map((challenge) => challenge.quantity),
              backgroundColor: "rgba(56, 189, 148, 0.2)", // Couleur verte pastel
              borderColor: "rgba(56, 189, 148, 1)", // Bordure verte
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: { position: "top" },
          },
        },
      });
    },
  },
  beforeUnmount() {
    // Détruire le graphique avant de démonter le composant
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }
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
