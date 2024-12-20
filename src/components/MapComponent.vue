<template>
  <div class="list-reports-container">
    <h2 class="list-reports-title">📝 Liste des Signalements</h2>

    <!-- Liste des signalements -->
    <div v-if="reports.length > 0">
      <div v-for="(report, index) in reports" :key="report.id" class="report-card">
        <!-- Affichage de l'index (numéro de signalement) et de la description -->
        <h3>{{ index + 1 }}. {{ report.description }}</h3>
        <p><strong>📍 Emplacement :</strong> {{ report.location }}</p>
        
        <!-- Si une photo est disponible, affiche-la -->
        <p v-if="report.photo_url">
          <strong>📸 Photo :</strong>
          <img :src="report.photo_url" alt="Signalement Photo" class="report-photo" />
        </p>
        
        <p><strong>📅 Date du signalement :</strong> {{ formatDate(report.created_at) }}</p>
        
        <!-- Bouton pour marquer le signalement comme ouvert ou fermé -->
        <button 
          :class="report.isResolved ? 'resolved' : 'open'" 
          @click="toggleStatus(report)">
          {{ report.isResolved ? '✔️ Fermé' : '🔓 Ouvert' }}
        </button>
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
        this.reports = response.data.reports.map(report => ({
          ...report,
          isResolved: report.isResolved || false, // Initialiser isResolved si non fourni
        }));
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

    // Fonction pour alterner le statut de résolution (ouvert/fermé)
    toggleStatus(report) {
      report.isResolved = !report.isResolved;
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
  width: 70%; /* Réduit la largeur de la liste */
  margin: 0 auto;
  height: calc(100vh - 40px);
  overflow-y: auto;
}

.list-reports-title {
  text-align: center;
  font-size: 28px; /* Réduit légèrement la taille du titre */
  color: #333;
  margin-bottom: 20px;
}

.report-card {
  background-color: #fff;
  padding: 15px; /* Réduit l'espacement à l'intérieur de chaque carte */
  margin-bottom: 15px; /* Réduit l'espacement entre les cartes */
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.report-card h3 {
  font-size: 20px; /* Réduit la taille du titre dans la carte */
  color: #333;
}

.report-card p {
  font-size: 14px; /* Réduit la taille du texte dans la carte */
  color: #666;
}

.report-photo {
  max-width: 100%;
  max-height: 200px; /* Réduit la taille maximale des photos */
  margin-top: 10px;
  border-radius: 5px;
}

.report-card button {
  padding: 8px 16px; /* Réduit l'espacement du bouton */
  margin-top: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  align-self: flex-end;
}

.report-card button.open {
  background-color: #d3266e;
  color: white;
}

.report-card button.resolved {
  background-color: #4caf50;
  color: white;
}

@media (max-width: 768px) {
  .list-reports-container {
    width: 90%; /* Ajuste la largeur pour les écrans plus petits */
  }
  .list-reports-title {
    font-size: 24px; /* Réduit la taille du titre sur mobile */
  }
  .report-card {
    padding: 12px; /* Réduit l'espacement sur mobile */
  }
  .report-card button {
    font-size: 14px; /* Réduit la taille du texte du bouton sur mobile */
  }
}
</style>
