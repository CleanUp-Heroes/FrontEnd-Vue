<template>
  <div class="impact-page-container">
    <h1>Mon Impact Environnemental</h1>

    <div v-if="loading" class="loading-message">
      Chargement de votre bilan d'impact...
    </div>

    <div v-else>
      <!-- Section 1 : Le compteur total -->
      <div class="total-impact-card">
        <div class="total-label">Total CO₂ évité</div>
        <div class="total-value">
          {{ summary.total.toFixed(2) }} {{ summary.unit }}
        </div>
        <div class="total-subtitle">Grâce à toutes vos actions !</div>
      </div>

      <!-- Section 2 : Le graphique -->
      <div class="chart-container">
        <h2>Évolution de votre impact</h2>
        <div class="chart-wrapper">
          <!-- Modification ici : on utilise <line-chart> -->
          <line-chart v-if="chartData.datasets.length" :data="chartData" :options="chartOptions" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// Modification ici : on importe Line
import { Line as LineChart } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale } from 'chart.js';

// On doit aussi enregistrer les éléments spécifiques à la courbe
ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale);

export default {
  name: "MonImpact",
  components: {
    // Modification ici : on déclare LineChart
    LineChart
  },
  data() {
    return {
      loading: true,
      summary: { total: null, unit: 'kg', series: [] },
      chartData: { labels: [], datasets: [] },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: { display: true, text: 'kg CO₂ évité' }
          },
          x: {
            title: { display: true, text: 'Date de la participation' }
          }
        }
      }
    };
  },
  methods: {
    fetchImpactSummary() {
      this.loading = true;
      
      // On ajoute plus de points pour que la courbe soit plus intéressante
      const mockSummary = {
        total: 42.3, 
        unit: "kg",
        series: [
          { "date": "2024-06-10", "kg": 1.68 },
          { "date": "2024-06-18", "kg": 5.40 },
          { "date": "2024-06-25", "kg": 2.10 },
          { "date": "2024-07-02", "kg": 11.50 },
          { "date": "2024-07-11", "kg": 8.20 },
          { "date": "2024-07-20", "kg": 13.42 }
        ]
      };

      setTimeout(() => {
        this.summary = mockSummary;
        this.prepareChartData(mockSummary.series);
        this.loading = false;
      }, 500);
    },
    prepareChartData(series) {
      const labels = series.map(item => new Date(item.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' }));
      const data = series.map(item => item.kg);

      this.chartData = {
        labels: labels,
        datasets: [
          {
            label: 'Impact CO₂ évité (en kg)',
            // Styles pour une belle courbe
            backgroundColor: 'rgba(39, 174, 96, 0.2)', // Couleur de remplissage sous la courbe
            borderColor: '#27ae60', // Couleur de la ligne
            tension: 0.1, // Pour une courbe légèrement arrondie
            fill: true, // Pour activer le remplissage
            pointBackgroundColor: '#27ae60',
            pointRadius: 5,
            data: data
          }
        ]
      };
    }
  },
  mounted() {
    this.fetchImpactSummary();
  }
};
</script>

<style scoped>
/* Les styles restent les mêmes, ils sont déjà parfaits pour ça */
.impact-page-container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 1rem;
}

.total-impact-card {
  background: linear-gradient(45deg, #27ae60, #2ecc71);
  color: white;
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  margin-bottom: 2rem;
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
}

.total-label { font-size: 1.2rem; opacity: 0.9; }
.total-value { font-size: 3.5rem; font-weight: bold; margin: 0.5rem 0; }
.total-subtitle { font-size: 1rem; opacity: 0.8; }

.chart-container {
  background-color: #fff;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.07);
}

.chart-wrapper {
  position: relative;
  height: 400px;
}

.loading-message {
  text-align: center;
  padding: 3rem;
  color: #555;
  font-style: italic;
  font-size: 1.2rem;
}
</style>