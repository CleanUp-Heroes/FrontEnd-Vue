
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
          <Bar v-if="chartData.datasets.length" :data="chartData" :options="chartOptions" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export default {
  name: "MonImpact",
  components: {
    Bar
  },
  data() {
    return {
      loading: true,
      summary: {
        total: null,
        unit: 'kg',
        series: []
      },
      chartData: {
        labels: [],
        datasets: []
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'kg CO₂ évité'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Date de la participation'
            }
          }
        }
      }
    };
  },
  methods: {
    fetchImpactSummary() {
      this.loading = true;
      
      // Simulation des données du back-end
      // Ces données sont cohérentes avec le mock de MesParticipations.vue
      const mockSummary = {
        total: 2.89, // Total des impacts calculés (un seul dans notre mock)
        unit: "kg",
        series: [
          { "date": "2024-07-20", "kg": 2.89 }
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
            backgroundColor: '#27ae60',
            borderColor: '#2ecc71',
            borderWidth: 1,
            borderRadius: 4,
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
  height: 400px; /* Hauteur fixe pour le graphique */
}

.loading-message {
  text-align: center;
  padding: 3rem;
  color: #555;
  font-style: italic;
  font-size: 1.2rem;
}
</style>