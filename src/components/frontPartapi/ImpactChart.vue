<template>
  <div class="chart-wrapper">
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script>
import { Chart } from 'chart.js/auto';

export default {
  name: "ImpactChart",
  props: {
    series: {
      type: Array,
      required: true
    }
  },
  mounted() {
    const labels = this.series.map(item => item.date);
    const data = this.series.map(item => item.value);

    new Chart(this.$refs.chartCanvas, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Impact CO₂ (kg)',
          data: data,
          backgroundColor: 'rgba(39, 174, 96, 0.2)', // vert transparent
          borderColor: '#27ae60', // vert foncé
          borderWidth: 2,
          pointBackgroundColor: '#fff',
          pointBorderColor: '#27ae60',
          pointRadius: 5,
          pointHoverRadius: 7,
          tension: 0.4, // courbe lissée
          fill: true // remplissage sous la courbe
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            labels: {
              color: '#2c3e50',
              font: {
                size: 14,
                weight: 'bold'
              }
            }
          },
          tooltip: {
            callbacks: {
              label: (context) => ` ${context.parsed.y} kg CO₂`
            }
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Date',
              color: '#34495e',
              font: {
                size: 16,
                weight: 'bold'
              }
            },
            ticks: {
              color: '#2c3e50'
            },
            grid: {
              display: false
            }
          },
          y: {
            title: {
              display: true,
              text: 'CO₂ évité (kg)',
              color: '#34495e',
              font: {
                size: 16,
                weight: 'bold'
              }
            },
            ticks: {
              color: '#2c3e50',
              beginAtZero: true
            },
            grid: {
              color: '#ecf0f1'
            }
          }
        }
      }
    });
  }
};
</script>

<style scoped>
.chart-wrapper {
  position: relative;
  width: 100%;
  height: 400px;
  margin-top: 2rem;
}
</style>
