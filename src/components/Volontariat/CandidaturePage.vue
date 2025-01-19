<template>
    <div class="candidature-page">
      <h1>Gestion des Candidatures</h1>
      <p>Gérez les candidatures soumises par les volontaires pour les missions de nettoyage.</p>
  
      <!-- Filtres et recherche -->
      <div class="filters">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Rechercher par nom ou email..."
          class="search-input"
        />
        <select v-model="selectedMission" class="mission-select">
          <option value="">Toutes les missions</option>
          <option v-for="mission in missions" :key="mission.id" :value="mission.id">
            {{ mission.title }}
          </option>
        </select>
        <select v-model="selectedStatus" class="status-select">
          <option value="">Tous les statuts</option>
          <option value="en attente">En attente</option>
          <option value="acceptée">Acceptée</option>
          <option value="refusée">Refusée</option>
        </select>
      </div>
  
      <!-- Tableau des candidatures -->
      <table class="candidature-table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Email</th>
            <th>Téléphone</th>
            <th>Mission</th>
            <th>Statut</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="candidature in filteredCandidatures" :key="candidature.id">
            <td>{{ candidature.name }}</td>
            <td>{{ candidature.email }}</td>
            <td>{{ candidature.phone }}</td>
            <td>{{ getMissionTitle(candidature.missionId) }}</td>
            <td>
              <span :class="['status', candidature.status]">{{ candidature.status }}</span>
            </td>
            <td>
              <button @click="viewDetails(candidature)" class="action-button details-button">
                👁️ Détails
              </button>
              <button
                @click="updateStatus(candidature.id, 'acceptée')"
                class="action-button accept-button"
              >
                ✅ Accepter
              </button>
              <button
                @click="updateStatus(candidature.id, 'refusée')"
                class="action-button reject-button"
              >
                ❌ Refuser
              </button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <!-- Message si aucune candidature -->
      <p v-if="filteredCandidatures.length === 0" class="no-candidatures">
        Aucune candidature ne correspond aux critères de recherche.
      </p>
  
      <!-- Modal pour afficher les détails de la candidature -->
      <div v-if="selectedCandidature" class="modal-overlay">
        <div class="modal">
          <h2>Détails de la candidature</h2>
          <p><strong>Nom :</strong> {{ selectedCandidature.name }}</p>
          <p><strong>Email :</strong> {{ selectedCandidature.email }}</p>
          <p><strong>Téléphone :</strong> {{ selectedCandidature.phone }}</p>
          <p><strong>Mission :</strong> {{ getMissionTitle(selectedCandidature.missionId) }}</p>
          <p><strong>Message :</strong> {{ selectedCandidature.message }}</p>
          <p><strong>Expérience :</strong> {{ selectedCandidature.experience || "Non renseigné" }}</p>
          <p><strong>Disponibilités :</strong> {{ selectedCandidature.availability }}</p>
          <button @click="closeModal" class="close-button">Fermer</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "CandidaturePage",
    data() {
      return {
        candidatures: [], // Liste des candidatures soumises par les volontaires
        missions: [], // Liste des missions pour récupérer les titres
        searchQuery: "", // Requête de recherche
        selectedMission: "", // Mission sélectionnée pour le filtre
        selectedStatus: "", // Statut sélectionné pour le filtre
        selectedCandidature: null, // Candidature sélectionnée pour afficher les détails
      };
    },
    computed: {
      // Filtrer les candidatures en fonction des critères de recherche
      filteredCandidatures() {
        return this.candidatures.filter((candidature) => {
          const matchesSearch =
            candidature.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            candidature.email.toLowerCase().includes(this.searchQuery.toLowerCase());
          const matchesMission = this.selectedMission
            ? candidature.missionId === this.selectedMission
            : true;
          const matchesStatus = this.selectedStatus
            ? candidature.status === this.selectedStatus
            : true;
          return matchesSearch && matchesMission && matchesStatus;
        });
      },
    },
    created() {
      this.fetchCandidatures(); // Charger les candidatures au chargement
      this.fetchMissions(); // Charger les missions pour récupérer les titres
    },
    methods: {
      // Charger les candidatures depuis une API ou une source locale
      async fetchCandidatures() {
        try {
          // Simuler une réponse API avec des données statiques
          this.candidatures = [
            {
              id: 1,
              name: "Jean Dupont",
              email: "jean.dupont@example.com",
              phone: "06 12 34 56 78",
              missionId: 1, // Référence à la mission ID 1
              message: "Je suis très motivé pour participer à cette mission !",
              experience: "J'ai déjà participé à des nettoyages de plages.",
              availability: "Week-ends",
              status: "en attente",
            },
            {
              id: 2,
              name: "Marie Martin",
              email: "marie.martin@example.com",
              phone: "07 89 01 23 45",
              missionId: 2, // Référence à la mission ID 2
              message: "Je souhaite contribuer à la dépollution du canal.",
              experience: "",
              availability: "En semaine",
              status: "en attente",
            },
            {
              id: 3,
              name: "Lucie Bernard",
              email: "lucie.bernard@example.com",
              phone: "06 98 76 54 32",
              missionId: 1, // Référence à la mission ID 1
              message: "Je veux aider à préserver l'environnement.",
              experience: "J'ai déjà participé à des actions de sensibilisation.",
              availability: "Week-ends",
              status: "en attente",
            },
          ];
        } catch (error) {
          console.error("Erreur lors du chargement des candidatures:", error);
        }
      },
      // Charger les missions pour récupérer les titres
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
      // Récupérer le titre de la mission à partir de son ID
      getMissionTitle(missionId) {
        const mission = this.missions.find((m) => m.id === missionId);
        return mission ? mission.title : "Mission inconnue";
      },
      // Afficher les détails d'une candidature
      viewDetails(candidature) {
        this.selectedCandidature = candidature;
      },
      // Fermer la modal
      closeModal() {
        this.selectedCandidature = null;
      },
      // Mettre à jour le statut d'une candidature
      updateStatus(candidatureId, status) {
        const candidature = this.candidatures.find((c) => c.id === candidatureId);
        if (candidature) {
          candidature.status = status;
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .candidature-page {
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
    font-family: Arial, sans-serif;
  }
  
  .candidature-page h1 {
    color: #145d3c;
  }
  
  .filters {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
  }
  
  .search-input,
  .mission-select,
  .status-select {
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 1rem;
  }
  
  .candidature-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 1rem;
  }
  
  .candidature-table th,
  .candidature-table td {
    padding: 0.8rem;
    border: 1px solid #ddd;
    text-align: left;
  }
  
  .candidature-table th {
    background-color: #38bd94;
    color: white;
  }
  
  .candidature-table tr:nth-child(even) {
    background-color: #f4f4f4;
  }
  
  .candidature-table tr:hover {
    background-color: #e0f7f0;
  }
  
  .status {
    padding: 0.3rem 0.6rem;
    border-radius: 5px;
    font-weight: bold;
  }
  
  .status.en attente {
    background-color: #ffcc00;
    color: #000;
  }
  
  .status.acceptée {
    background-color: #38bd94;
    color: white;
  }
  
  .status.refusée {
    background-color: #ff6b6b;
    color: white;
  }
  
  .action-button {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-right: 0.5rem;
    transition: background-color 0.3s ease;
  }
  
  .details-button {
    background-color: #38bd94;
    color: white;
  }
  
  .details-button:hover {
    background-color: #145d3c;
  }
  
  .accept-button {
    background-color: #38bd94;
    color: white;
  }
  
  .accept-button:hover {
    background-color: #145d3c;
  }
  
  .reject-button {
    background-color: #ff6b6b;
    color: white;
  }
  
  .reject-button:hover {
    background-color: #cc0000;
  }
  
  .no-candidatures {
    text-align: center;
    color: #666;
    margin-top: 2rem;
  }
  
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal {
    background-color: white;
    padding: 2rem;
    border-radius: 10px;
    max-width: 500px;
    width: 100%;
  }
  
  .modal h2 {
    color: #145d3c;
    margin-bottom: 1rem;
  }
  
  .close-button {
    background-color: #38bd94;
    color: white;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 1rem;
  }
  
  .close-button:hover {
    background-color: #145d3c;
  }
  </style>