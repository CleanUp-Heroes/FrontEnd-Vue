<template>
  <div class="suivi-mission-page">
    <h1>Suivi des Missions</h1>
    <p>Remplissez un rapport après chaque mission et consultez les rapports soumis.</p>

    <!-- Formulaire de rapport pour les volontaires -->
    <section v-if="!isAdmin" class="rapport-form">
      <h2>Remplir un rapport de mission</h2>
      <form @submit.prevent="submitRapport">
        <div>
          <label for="missionId">Mission :</label>
          <select id="missionId" v-model="rapport.missionId" required>
            <option value="">Sélectionnez une mission</option>
            <option v-for="mission in missions" :key="mission.id" :value="mission.id">
              {{ mission.title }}
            </option>
          </select>
        </div>

        <div>
          <label for="travailEffectue">Travail effectué :</label>
          <textarea
            id="travailEffectue"
            v-model="rapport.travailEffectue"
            required
          ></textarea>
        </div>

        <div>
          <label for="difficultesRencontrees">Difficultés rencontrées :</label>
          <textarea
            id="difficultesRencontrees"
            v-model="rapport.difficultesRencontrees"
            required
          ></textarea>
        </div>

        <button type="submit">Soumettre le rapport</button>
      </form>
    </section>

    <!-- Filtres pour les administrateurs -->
    <section v-if="isAdmin" class="filters">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Rechercher par mission..."
        class="search-input"
      />
      <select v-model="selectedStatus" class="status-select">
        <option value="">Tous les statuts</option>
        <option value="En attente">En attente</option>
        <option value="Validé">Validé</option>
        <option value="Rejeté">Rejeté</option>
      </select>
    </section>

    <!-- Liste des rapports pour les administrateurs -->
    <section v-if="isAdmin" class="rapports-list">
      <h2>Rapports soumis</h2>
      <div v-for="rapport in filteredRapports" :key="rapport.id" class="rapport-card">
        <h3>Mission : {{ getMissionTitle(rapport.missionId) }}</h3>
        <p><strong>Travail effectué :</strong> {{ rapport.travailEffectue }}</p>
        <p><strong>Difficultés rencontrées :</strong> {{ rapport.difficultesRencontrees }}</p>
        <p>
          <strong>Statut :</strong>
          <span :class="['status', rapport.statut.toLowerCase()]">{{ rapport.statut }}</span>
        </p>

        <!-- Actions pour les administrateurs -->
        <div v-if="isAdmin" class="rapport-actions">
          <button
            v-if="rapport.statut !== 'Validé'"
            @click="openConfirmationModal(rapport.id, 'Validé')"
            class="validate-button"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
            </svg>
            Valider
          </button>
          <button
            v-if="rapport.statut !== 'Rejeté'"
            @click="openConfirmationModal(rapport.id, 'Rejeté')"
            class="reject-button"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
            </svg>
            Rejeter
          </button>
        </div>
      </div>

      <!-- Message si aucun rapport n'est disponible -->
      <p v-if="filteredRapports.length === 0" class="no-rapports">
        Aucun rapport ne correspond aux critères de recherche.
      </p>
    </section>

    <!-- Modale de confirmation -->
    <div v-if="showConfirmationModal" class="modal-overlay">
      <div class="modal">
        <h2>Confirmer l'action</h2>
        <p>Êtes-vous sûr de vouloir {{ actionToConfirm === "Validé" ? "valider" : "rejeter" }} ce rapport ?</p>
        <div class="modal-actions">
          <button @click="confirmAction" class="confirm-button">
            {{ actionToConfirm === "Validé" ? "Valider" : "Rejeter" }}
          </button>
          <button @click="closeConfirmationModal" class="cancel-button">Annuler</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SuiviMissionPage",
  data() {
    return {
      isAdmin: true, // Simule le rôle de l'utilisateur (volontaire ou admin)
      missions: [], // Liste des missions disponibles
      rapport: {
        missionId: "",
        travailEffectue: "",
        difficultesRencontrees: "",
      }, // Formulaire de rapport
      rapports: [], // Liste des rapports soumis
      searchQuery: "", // Requête de recherche
      selectedStatus: "", // Statut sélectionné pour le filtre
      showConfirmationModal: false, // Afficher la modale de confirmation
      actionToConfirm: "", // Action à confirmer (Validé ou Rejeté)
      selectedRapportId: null, // ID du rapport sélectionné
    };
  },
  computed: {
    // Filtrer les rapports en fonction des critères de recherche
    filteredRapports() {
      return this.rapports.filter((rapport) => {
        const matchesSearch = this.getMissionTitle(rapport.missionId)
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase());
        const matchesStatus = this.selectedStatus
          ? rapport.statut === this.selectedStatus
          : true;
        return matchesSearch && matchesStatus;
      });
    },
  },
  created() {
    this.fetchMissions(); // Charger les missions au chargement
    this.fetchRapports(); // Charger les rapports au chargement
    this.checkUserRole(); // Vérifier le rôle de l'utilisateur
  },
  methods: {
    // Charger les missions depuis une API ou une source locale
    async fetchMissions() {
      try {
        // Simuler une réponse API avec des données statiques
        this.missions = [
          {
            id: 1,
            title: "Nettoyage des plages de Marseille",
          },
          {
            id: 2,
            title: "Dépollution du canal Saint-Martin",
          },
          {
            id: 3,
            title: "Nettoyage des forêts de Fontainebleau",
          },
        ];
      } catch (error) {
        console.error("Erreur lors du chargement des missions:", error);
      }
    },
    // Charger les rapports depuis une API ou une source locale
    async fetchRapports() {
      try {
        // Simuler une réponse API avec des données statiques
        this.rapports = [
          {
            id: 1,
            missionId: 1,
            travailEffectue: "Nous avons collecté 50 kg de déchets plastiques.",
            difficultesRencontrees: "Manque de sacs poubelles.",
            statut: "En attente",
          },
          {
            id: 2,
            missionId: 2,
            travailEffectue: "Nettoyage des berges du canal.",
            difficultesRencontrees: "Difficulté à accéder à certaines zones.",
            statut: "En attente",
          },
        ];
      } catch (error) {
        console.error("Erreur lors du chargement des rapports:", error);
      }
    },
    // Soumettre un rapport
    async submitRapport() {
      try {
        // Simuler un appel API pour soumettre le rapport
        const newRapport = {
          id: this.rapports.length + 1,
          missionId: this.rapport.missionId,
          travailEffectue: this.rapport.travailEffectue,
          difficultesRencontrees: this.rapport.difficultesRencontrees,
          statut: "En attente",
        };
        this.rapports.push(newRapport);
        this.showNotification("Rapport soumis avec succès.", "success");
        this.resetRapportForm();
      } catch (error) {
        console.error("Erreur lors de la soumission du rapport:", error);
        this.showNotification("Une erreur est survenue. Veuillez réessayer plus tard.", "error");
      }
    },
    // Ouvrir la modale de confirmation
    openConfirmationModal(rapportId, action) {
      this.selectedRapportId = rapportId;
      this.actionToConfirm = action;
      this.showConfirmationModal = true;
    },
    // Fermer la modale de confirmation
    closeConfirmationModal() {
      this.showConfirmationModal = false;
      this.selectedRapportId = null;
      this.actionToConfirm = "";
    },
    // Confirmer l'action (validation ou rejet)
    confirmAction() {
      const rapport = this.rapports.find((r) => r.id === this.selectedRapportId);
      if (rapport) {
        rapport.statut = this.actionToConfirm;
        this.showNotification(
          `Rapport ${this.selectedRapportId} ${this.actionToConfirm === "Validé" ? "validé" : "rejeté"}.`,
          this.actionToConfirm === "Validé" ? "success" : "error"
        );
      }
      this.closeConfirmationModal();
    },
    // Réinitialiser le formulaire de rapport
    resetRapportForm() {
      this.rapport = {
        missionId: "",
        travailEffectue: "",
        difficultesRencontrees: "",
      };
    },
    // Récupérer le titre de la mission à partir de son ID
    getMissionTitle(missionId) {
      const mission = this.missions.find((m) => m.id === missionId);
      return mission ? mission.title : "Mission inconnue";
    },
    // Vérifier le rôle de l'utilisateur (simulé ici)
    checkUserRole() {
      // Simule un utilisateur admin (à remplacer par une logique réelle)
      this.isAdmin = true; // Changez à false pour simuler un volontaire
    },
    // Afficher une notification
    showNotification(message, type) {
      alert(`${type.toUpperCase()}: ${message}`); // Remplacez par un système de notifications plus élaboré si nécessaire
    },
  },
};
</script>

<style scoped>
.suivi-mission-page {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  font-family: "Poppins", sans-serif;
}

.suivi-mission-page h1 {
  color: #145d3c;
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 1rem;
}

.suivi-mission-page p {
  text-align: center;
  color: #666;
  margin-bottom: 2rem;
}

/* Formulaire de rapport */
.rapport-form {
  background: rgba(255, 255, 255, 0.9);
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

.rapport-form h2 {
  color: #145d3c;
  margin-bottom: 1.5rem;
}

.rapport-form label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: #333;
}

.rapport-form select,
.rapport-form textarea {
  width: 100%;
  padding: 0.8rem;
  border-radius: 10px;
  border: 1px solid #ccc;
  margin-bottom: 1rem;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.9);
}

.rapport-form textarea {
  resize: vertical;
  min-height: 100px;
}

.rapport-form button {
  background-color: #38bd94;
  color: white;
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

.rapport-form button:hover {
  background-color: #145d3c;
}

/* Filtres pour les administrateurs */
.filters {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.search-input,
.status-select {
  padding: 0.8rem;
  border-radius: 10px;
  border: 1px solid #ccc;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.9);
}

/* Liste des rapports */
.rapports-list {
  margin-top: 2rem;
}

.rapport-card {
  background: rgba(255, 255, 255, 0.9);
  padding: 1.5rem;
  border-radius: 15px;
  margin-bottom: 1rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.rapport-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}

.rapport-card h3 {
  color: #145d3c;
  margin-bottom: 0.5rem;
}

.rapport-card p {
  margin: 0.5rem 0;
}

.status {
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 0.9rem;
}

.status.en attente {
  background-color: #ffcc00;
  color: #000;
}

.status.validé {
  background-color: #38bd94;
  color: white;
}

.status.rejeté {
  background-color: #ff6b6b;
  color: white;
}

.rapport-actions {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
}

.validate-button,
.reject-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

.validate-button {
  background-color: #38bd94;
  color: white;
}

.validate-button:hover {
  background-color: #145d3c;
}

.reject-button {
  background-color: #ff6b6b;
  color: white;
}

.reject-button:hover {
  background-color: #cc0000;
}

/* Modale de confirmation */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: white;
  padding: 2rem;
  border-radius: 15px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.modal h2 {
  color: #145d3c;
  margin-bottom: 1rem;
}

.modal-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
}

.confirm-button {
  background-color: #38bd94;
  color: white;
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

.confirm-button:hover {
  background-color: #145d3c;
}

.cancel-button {
  background-color: #ff6b6b;
  color: white;
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

.cancel-button:hover {
  background-color: #cc0000;
}

/* Message si aucun rapport n'est disponible */
.no-rapports {
  text-align: center;
  color: #666;
  margin-top: 2rem;
}
</style>