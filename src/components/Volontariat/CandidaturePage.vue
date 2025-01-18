<template>
    <div class="candidature-page">
      <h1>Liste des Candidatures</h1>
      <p>Voici la liste des candidatures soumises par les volontaires pour les missions de nettoyage.</p>
  
      <!-- Tableau des candidatures -->
      <table class="candidature-table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Email</th>
            <th>Téléphone</th>
            <th>Mission</th>
            <th>Message</th>
            <th>Expérience</th>
            <th>Disponibilités</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="candidature in candidatures" :key="candidature.id">
            <td>{{ candidature.name }}</td>
            <td>{{ candidature.email }}</td>
            <td>{{ candidature.phone }}</td>
            <td>{{ getMissionTitle(candidature.missionId) }}</td>
            <td>{{ candidature.message }}</td>
            <td>{{ candidature.experience || "Non renseigné" }}</td>
            <td>{{ candidature.availability }}</td>
          </tr>
        </tbody>
      </table>
  
      <!-- Message si aucune candidature -->
      <p v-if="candidatures.length === 0" class="no-candidatures">
        Aucune candidature n'a été soumise pour le moment.
      </p>
    </div>
  </template>
  
  <script>
  export default {
    name: "CandidaturePage",
    data() {
      return {
        candidatures: [], // Liste des candidatures soumises par les volontaires
        missions: [], // Liste des missions pour récupérer les titres
      };
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
  
  .no-candidatures {
    text-align: center;
    color: #666;
    margin-top: 2rem;
  }
  </style>