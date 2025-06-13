<template>
  <div class="page-container">
    <h2>Mes Participations</h2>

    <div v-if="loading" class="loading-message">
      Chargement de vos participations...
    </div>

    <div v-else class="participations-list">
      <div v-for="participation in participations" :key="participation.id" class="participation-card">
        
        <div class="card-header">
          <h3>{{ participation.challenge_name }}</h3>
          <span
            class="status-badge"
            :class="{
              valid: participation.status === 'Validé',
              refused: participation.status === 'Refusé',
              pending: participation.status === 'En attente',
            }"
          >
            {{ participation.status }}
          </span>
        </div>

        <div class="card-body">
          <p><strong>Date :</strong> {{ new Date(participation.date).toLocaleDateString('fr-FR') }}</p>
          <p><strong>Quantité déclarée :</strong> {{ participation.action_quantity }}</p>
        </div>

        <div class="card-footer">
          <!-- SECTION POUR L'IMPACT (FEATURE 9) -->
          <div v-if="participation.status === 'Validé'" class="impact-section">
            <div v-if="participation.impact && participation.impact.value !== null" class="impact-success">
              <strong>Impact CO₂ évité :</strong>
              <span>-{{ participation.impact.value }} {{ participation.impact.unit }} CO₂</span>
            </div>
            <div v-else class="impact-pending">
              <span>⏳ Calcul de l'impact en cours...</span>
            </div>
          </div>

          <!-- SECTION POUR LA RESOUMISSION (FEATURE 8) -->
          <div v-if="participation.status === 'Refusé'" class="resubmit-section">
            <h4>Corriger et soumettre à nouveau</h4>
            <form @submit.prevent="resubmitParticipation(participation.id)">
              <div class="form-group">
                <label>Nouvelle quantité :</label>
                <input type="number" step="0.1" required />
              </div>
              <div class="form-group">
                <label>Nouvelle photo :</label>
                <input type="file" required />
              </div>
              <button type="submit" class="resubmit-button">Renvoyer</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from 'axios'; // En commentaire pour la simulation

export default {
  name: "MesParticipations",
  data() {
    return {
      participations: [],
      loading: true,
    };
  },
  methods: {
    fetchParticipations() {
      this.loading = true;

      // Simulation des données du back-end
      const mockParticipations = [
        {
          id: 101,
          challenge_name: "Nettoyage de la plage Océan",
          date: "2024-07-20",
          action_quantity: 1.7,
          status: "Validé",
          impact: { value: 2.89, unit: "kg" }
        },
        {
          id: 102,
          challenge_name: "Opération Forêt Propre",
          date: "2024-07-22",
          action_quantity: 2,
          status: "Validé",
          impact: null
        },
        {
          id: 103,
          challenge_name: "Défi Zéro Mégot",
          date: "2024-07-18",
          action_quantity: 500,
          status: "Refusé",
          impact: null 
        },
        {
          id: 104,
          challenge_name: "Collecte de piles usagées",
          date: "2024-07-15",
          action_quantity: 0.5,
          status: "En attente",
          impact: null
        }
      ];

      setTimeout(() => {
        this.participations = mockParticipations;
        this.loading = false;
      }, 500);
    },
    resubmitParticipation(participationId) {
      alert(`(Simulation) Participation ${participationId} resoumise pour validation !`);
      // Dans un cas réel, on enverrait les données du formulaire
    }
  },
  mounted() {
    this.fetchParticipations();
  }
};
</script>

<style scoped>
.page-container { max-width: 900px; margin: 2rem auto; padding: 1rem; }
.loading-message { text-align: center; padding: 2rem; color: #555; font-style: italic; }
.participation-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.07);
  margin-bottom: 1.5rem;
  overflow: hidden;
  border-left: 5px solid #ccc;
}
.card-header { display: flex; justify-content: space-between; align-items: center; padding: 1rem; background-color: #f9f9f9; }
.card-header h3 { margin: 0; font-size: 1.2rem; }
.card-body { padding: 1rem; }
.card-body p { margin: 0.5rem 0; }
.card-footer { padding: 1rem; background-color: #f9f9f9; border-top: 1px solid #eee; }

.status-badge { padding: 0.3rem 0.8rem; border-radius: 12px; color: white; font-weight: bold; font-size: 0.9em; }
.status-badge.valid { background-color: #27ae60; }
.status-badge.refused { background-color: #e74c3c; }
.status-badge.pending { background-color: #f39c12; }

.participation-card.status-valid { border-left-color: #27ae60; }
.participation-card.status-refused { border-left-color: #e74c3c; }
.participation-card.status-pending { border-left-color: #f39c12; }

.impact-success span { color: #27ae60; font-weight: bold; }
.impact-pending span { color: #e67e22; font-style: italic; }

.resubmit-section { margin-top: 1rem; padding-top: 1rem; border-top: 1px dashed #ccc; }
.form-group { margin-bottom: 1rem; }
.form-group label { display: block; margin-bottom: 0.5rem; font-weight: bold; }
.form-group input { width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px; }
.resubmit-button { background-color: #3498db; color: white; border: none; padding: 0.7rem 1.5rem; border-radius: 4px; cursor: pointer; }
.resubmit-button:hover { background-color: #2980b9; }
</style>
