<template>
  <div class="validation-page">
    <h1>Validation et Affectation des Candidatures</h1>
    <p>Validez ou rejetez les candidatures et affectez-les à des missions.</p>

    <!-- Liste des candidatures -->
    <div v-for="candidature in candidatures" :key="candidature.id" class="candidature-card">
      <div class="candidature-info">
        <h3>{{ candidature.name }}</h3>
        <p><strong>Email:</strong> {{ candidature.email }}</p>
        <p><strong>Téléphone:</strong> {{ candidature.phone }}</p>
        <p><strong>Mission postulée:</strong> {{ getMissionTitle(candidature.missionId) }}</p>
        <p><strong>Message:</strong> {{ candidature.message }}</p>
        <p><strong>Expérience:</strong> {{ candidature.experience || "Non renseigné" }}</p>
        <p><strong>Disponibilités:</strong> {{ candidature.availability }}</p>
        <p><strong>Statut:</strong> {{ candidature.status || "En attente" }}</p>
      </div>

      <!-- Actions : Valider, Rejeter, Affecter -->
      <div class="candidature-actions">
        <button
          v-if="!candidature.status || candidature.status === 'En attente'"
          @click="validateCandidature(candidature.id)"
          class="validate-button"
        >
          Valider
        </button>
        <button
          v-if="!candidature.status || candidature.status === 'En attente'"
          @click="rejectCandidature(candidature.id)"
          class="reject-button"
        >
          Rejeter
        </button>
        <select
          v-if="candidature.status === 'Validée'"
          v-model="candidature.affectedMissionId"
          @change="affectCandidature(candidature.id, candidature.affectedMissionId)"
        >
          <option value="">Sélectionnez une mission</option>
          <option v-for="mission in missions" :key="mission.id" :value="mission.id">
            {{ mission.title }}
          </option>
        </select>
      </div>
    </div>

    <!-- Message si aucune candidature -->
    <p v-if="candidatures.length === 0" class="no-candidatures">
      Aucune candidature n'a été soumise pour le moment.
    </p>
  </div>
</template>

<script>
export default {
  name: "ValidationPage",
  data() {
    return {
      candidatures: [], // Liste des candidatures
      missions: [], // Liste des missions disponibles
    };
  },
  created() {
    this.fetchCandidatures(); // Charger les candidatures au chargement
    this.fetchMissions(); // Charger les missions pour l'affectation
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
            status: "En attente", // Statut initial
            affectedMissionId: null, // Mission affectée
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
            status: "En attente", // Statut initial
            affectedMissionId: null, // Mission affectée
          },
        ];
      } catch (error) {
        console.error("Erreur lors du chargement des candidatures:", error);
      }
    },
    // Charger les missions pour l'affectation
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
    // Valider une candidature
    validateCandidature(candidatureId) {
      const candidature = this.candidatures.find((c) => c.id === candidatureId);
      if (candidature) {
        candidature.status = "Validée";
        this.showNotification(`Candidature de ${candidature.name} validée.`, "success");
      }
    },
    // Rejeter une candidature
    rejectCandidature(candidatureId) {
      const candidature = this.candidatures.find((c) => c.id === candidatureId);
      if (candidature) {
        candidature.status = "Rejetée";
        this.showNotification(`Candidature de ${candidature.name} rejetée.`, "error");
      }
    },
    // Affecter une candidature à une mission
    affectCandidature(candidatureId, missionId) {
      const candidature = this.candidatures.find((c) => c.id === candidatureId);
      const mission = this.missions.find((m) => m.id === missionId);
      if (candidature && mission) {
        candidature.affectedMissionId = missionId;
        this.showNotification(
          `Candidature de ${candidature.name} affectée à la mission : ${mission.title}.`,
          "info"
        );
      }
    },
    // Récupérer le titre de la mission à partir de son ID
    getMissionTitle(missionId) {
      const mission = this.missions.find((m) => m.id === missionId);
      return mission ? mission.title : "Mission inconnue";
    },
    // Afficher une notification
    showNotification(message, type) {
      alert(`${type.toUpperCase()}: ${message}`); // Remplacez par un système de notifications plus élaboré si nécessaire
    },
  },
};
</script>

<style scoped>
.validation-page {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
}

.validation-page h1 {
  color: #145d3c;
}

.candidature-card {
  background-color: #f4f4f4;
  margin-bottom: 1rem;
  padding: 1rem;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.candidature-info {
  flex: 1;
}

.candidature-actions {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.validate-button {
  background-color: #38bd94;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.validate-button:hover {
  background-color: #145d3c;
}

.reject-button {
  background-color: #ff4d4d;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.reject-button:hover {
  background-color: #cc0000;
}

select {
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.no-candidatures {
  text-align: center;
  color: #666;
  margin-top: 2rem;
}
</style>