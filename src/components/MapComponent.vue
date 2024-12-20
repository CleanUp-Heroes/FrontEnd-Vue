<template>
  <div class="list-reports-container">
    <h2 class="list-reports-title">📋 Liste des Signalements</h2>

    <!-- Liste des signalements -->
    <div v-if="reports.length > 0">
      <div v-for="(report, index) in reports" :key="index" class="report-card">
        <h3>{{ report.description }}</h3>
        <p><strong>Emplacement :</strong> {{ report.location }}</p>
        <p v-if="report.photo"><strong>Photo :</strong> <img :src="report.photo" alt="Signalement Photo" class="report-photo" /></p>
        <p><strong>Date :</strong> {{ new Date(report.created_at).toLocaleString() }}</p>
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
      reports: [], // Liste des signalements
    };
  },
  mounted() {
    this.fetchReports();
  },
  methods: {
    // Récupérer les signalements depuis le backend
    async fetchReports() {
      const token = localStorage.getItem('token'); // Vérifier le token
      if (!token) {
        alert('⚠️ Vous devez être connecté pour voir les signalements.');
        this.$router.push('/login'); // Redirection si pas de token
        return;
      }

      try {
        const response = await axios.get('http://127.0.0.1:8000/reports/get_reports/', {
          headers: {
            Authorization: token,
          },
        });
        this.reports = response.data; // Assigner les données récupérées à la variable `reports`
      } catch (error) {
        console.error('Erreur lors de la récupération des signalements:', error);
        alert('⚠️ Une erreur est survenue lors de la récupération des signalements.');
      }
    },
  },
};
</script>

<style scoped>
.list-reports-container {
  max-width: 900px;
  margin: 20px auto;
  padding: 30px;
  background: #f7f7f7;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}
.list-reports-title {
  font-size: 32px;
  margin-bottom: 30px;
}
.report-card {
  background: #ffffff;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  text-align: left;
}
.report-photo {
  max-width: 200px;
  max-height: 150px;
  object-fit: cover;
  margin-top: 10px;
}
hr {
  margin-top: 15px;
  border: 0;
  border-top: 1px solid #ddd;
}
</style>
