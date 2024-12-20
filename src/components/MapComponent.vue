<template>
  <div class="list-reports-container">
    <h2 class="list-reports-title">📋 Liste des Signalements</h2>

    <!-- Liste des signalements -->
    <div v-if="reports.length > 0">
      <div v-for="(report, index) in reports" :key="report.id" class="report-card">
        <!-- Affichage de l'index (numéro de signalement) et de la description -->
        <h3>{{ index + 1 }}. {{ report.description }}</h3> <!-- Utilisation de 'index' pour afficher le numéro du signalement -->
        <p><strong>Emplacement :</strong> {{ report.location }}</p>
        
        <!-- Si une photo est disponible, affiche-la -->
        <p v-if="report.photo_url">
          <strong>Photo :</strong>
          <img :src="report.photo_url" alt="Signalement Photo" class="report-photo" />
        </p>
        
        <p><strong>Date du signalement :</strong> {{ formatDate(report.created_at) }}</p>
        <hr />
      </div>
    </div>

    <!-- Message si aucun signalement -->
    <p v-else>⚠️ Aucun signalement trouvé.</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      reports: [], // Liste des signalements récupérée depuis le backend
    };
  },
  mounted() {
    this.fetchReports(); // Récupérer les signalements dès le montage du composant
  },
  methods: {
    // Fonction pour récupérer les signalements depuis le backend
    async fetchReports() {
      const token = localStorage.getItem('token'); // Vérifier le token d'authentification
      if (!token) {
        alert('⚠️ Vous devez être connecté pour voir les signalements.');
        this.$router.push('/login'); // Rediriger l'utilisateur si pas de token
        return;
      }

      try {
        // Appel à l'API backend pour récupérer la liste des signalements
        const response = await axios.get('http://127.0.0.1:8000/reports/get_reports/', {
          headers: {
            Authorization: token, // En-tête avec le token d'authentification
          },
        });

        // Mettre à jour la liste des signalements avec les données reçues
        this.reports = response.data.reports; // Accéder à la clé 'reports' dans la réponse
      } catch (error) {
        console.error('Erreur lors de la récupération des signalements:', error);
        alert('⚠️ Une erreur est survenue lors de la récupération des signalements.');
      }
    },
    // Fonction pour formater la date (si elle est disponible)
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleString(); // Afficher la date sous forme lisible
    },
  },
};
</script>

<style scoped>
.list-reports-container {
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.list-reports-title {
  text-align: center;
  font-size: 28px;
  color: #333;
  margin-bottom: 20px;
}

.report-card {
  background-color: #fff;
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.report-card h3 {
  font-size: 22px;
  color: #333;
}

.report-card p {
  font-size: 16px;
  color: #666;
}

.report-photo {
  max-width: 100%;
  max-height: 200px;
  margin-top: 10px;
  border-radius: 5px;
}

@media (max-width: 768px) {
  .list-reports-container {
    width: 100%;
  }
  .list-reports-title {
    font-size: 24px;
  }
}
</style>
