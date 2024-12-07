import Chart from 'chart.js/auto';


<template>
    <div>
      <h2>Statistiques des défis</h2>
      <div v-if="stats">
        <h3>Nombre total de défis accomplis : {{ stats.totalChallenges }}</h3>
        <h3>Quantité totale réalisée : {{ stats.totalQuantity }}</h3>
        <canvas id="chart"></canvas>
      </div>
    </div>
  </template>
  
  <script>
  import Chart from 'chart.js/auto';
  export default {
    props: ['stats'],
    watch: {
      stats: 'renderChart',
    },
    methods: {
      renderChart() {
        const ctx = document.getElementById('chart').getContext('2d');
        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: this.stats.users.map(user => user.name),
            datasets: [
              {
                label: 'Quantité réalisée',
                data: this.stats.users.map(user => user.quantity),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              legend: { position: 'top' },
            },
          },
        });
      },
    },
  };
  </script>
  