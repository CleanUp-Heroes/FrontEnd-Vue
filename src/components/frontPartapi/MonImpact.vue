
<template>
  <div class="impact-page-container">
    <h1>Mon Impact Environnemental</h1>

    <!-- Section 1 : Le compteur total -->
    <div v-if="summary.total !== null" class="total-impact-card">
      <div class="total-label">Total CO₂ évité</div>
      <div class="total-value">
        {{ summary.total.toFixed(2) }} {{ summary.unit }}
      </div>
      <div class="total-subtitle">Grâce à toutes vos actions !</div>
    </div>
    <div v-else class="loading-message">
      Chargement de vos données...
    </div>

    <!-- Section 2 : Le graphique -->
    <div class="chart-container" v-if="summary.series.length > 0">
      <h2>Évolution de votre impact</h2>
      <ImpactChart :series="summary.series" />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import ImpactChart from './ImpactChart.vue'; // importe le composant

export default {
  name: "MonImpact",
  components: { ImpactChart },
  data() {
    return {
      summary: {
        total: null,
        unit: 'kg',
        series: []
      }
    };
  },
  methods: {
    fetchImpactSummary() {
      axios.get('/api/users/me/impact/summary/?range=all')
        .then(response => {
          this.summary = response.data;
        })
        .catch(error => {
          console.error("Erreur lors de la récupération du résumé de l'impact:", error);
        });
    }
  },
  mounted() {
    this.fetchImpactSummary();
  }
};
</script>