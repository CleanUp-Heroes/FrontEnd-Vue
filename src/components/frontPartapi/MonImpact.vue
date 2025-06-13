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
      <div class="chart-container">
        <h2>Évolution de votre impact</h2>
        <!-- Le graphique viendra s'insérer ici -->
        <p>(Le graphique sera ajouté à l'étape suivante)</p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios'; // N'oublie pas d'importer axios
  
  export default {
    name: "MonImpact",
    data() {
      return {
        // On prépare un objet pour stocker les données de l'API
        summary: {
          total: null,
          unit: 'kg',
          series: []
        }
      };
    },
    methods: {
      // La méthode pour appeler l'API de résumé d'Ibtissem
      fetchImpactSummary() {
        // L'endpoint défini dans le brief !
        const apiUrl = '/api/users/me/impact/summary/?range=all';
        
        axios.get(apiUrl)
          .then(response => {
            // On met à jour nos données avec la réponse de l'API
            this.summary = response.data;
          })
          .catch(error => {
            console.error("Erreur lors de la récupération du résumé de l'impact:", error);
            // Gérer l'erreur, par exemple afficher un message à l'utilisateur
          });
      }
    },
    // On appelle la méthode dès que le composant est "monté" (prêt à être affiché)
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
    background-color: #27ae60; /* Le même vert que l'impact réussi */
    color: white;
    border-radius: 12px;
    padding: 2rem;
    text-align: center;
    margin-bottom: 2rem;
  }
  
  .total-label {
    font-size: 1.2rem;
    opacity: 0.9;
  }
  
  .total-value {
    font-size: 3rem;
    font-weight: bold;
    margin: 0.5rem 0;
  }
  
  .chart-container {
    background-color: #fff;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  }
  
  .loading-message {
    text-align: center;
    padding: 2rem;
    color: #555;
    font-style: italic;
  }
  </style>