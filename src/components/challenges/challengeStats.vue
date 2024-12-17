<template>
  <div class="stats-page">
    <h2 class="stats-title">Statistiques des défis</h2>
    <div class="stats-summary" v-if="stats">
      <div class="stats-item">
        <h3>Nombre total de défis accomplis :</h3>
        <p>{{ stats.totalChallenges }}</p>
      </div>
      <div class="stats-item">
        <h3>Quantité totale réalisée :</h3>
        <p>{{ stats.totalQuantity }}</p>
      </div>
    </div>
    <div class="chart-container">
      <canvas id="chart"></canvas>
    </div>
  </div>
</template>

<script>
import Chart from "chart.js/auto";

export default {
  props: ["stats"],
  watch: {
    stats: "renderChart",
  },
  methods: {
    renderChart() {
      const ctx = document.getElementById("chart").getContext("2d");
      new Chart(ctx, {
        type: "bar",
        data: {
          labels: this.stats.users.map((user) => user.name),
          datasets: [
            {
              label: "Quantité réalisée",
              data: this.stats.users.map((user) => user.quantity),
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
};
</script>

<style scoped>
/* Conteneur général pour la page */
.stats-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw; /* Occupe toute la largeur de l'écran */
  height: 100vh; /* Occupe toute la hauteur de l'écran */
  background-color: #f6fdfb; /* Fond vert pâle */
  padding: 2rem;
  box-sizing: border-box;
  overflow: hidden; /* Évite les débordements */
}

/* Titre principal */
.stats-title {
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  color: #1a6f4b; /* Vert foncé pour rappel écologique */
  margin-bottom: 2rem;
}

/* Résumé des statistiques */
.stats-summary {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1.5rem;
  width: 100%;
  max-width: 1200px; /* Largeur maximale pour limiter l'étirement */
  margin-bottom: 2rem;
  box-sizing: border-box;
}

.stats-item {
  background: #ffffff; /* Fond blanc pour contraste */
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
  flex: 1;
  max-width: 300px; /* Taille maximale des items */
  min-width: 250px; /* Taille minimale pour une bonne responsivité */
  box-sizing: border-box;
}

.stats-item h3 {
  font-size: 1.3rem;
  margin-bottom: 1rem;
  color: #3a3a3a; /* Gris foncé pour lisibilité */
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
  background: #ffffff; /* Fond blanc pour contraste */
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
}

/* Responsivité */
@media (max-width: 768px) {
  .stats-summary {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .stats-item {
    max-width: 100%; /* Les items prennent toute la largeur */
  }
}
</style>
