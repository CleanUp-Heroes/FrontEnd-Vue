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
  
      <!-- Liste des rapports pour les administrateurs -->
      <section v-if="isAdmin" class="rapports-list">
        <h2>Rapports soumis</h2>
        <div v-for="rapport in rapports" :key="rapport.id" class="rapport-card">
          <h3>Mission : {{ getMissionTitle(rapport.missionId) }}</h3>
          <p><strong>Travail effectué :</strong> {{ rapport.travailEffectue }}</p>
          <p><strong>Difficultés rencontrées :</strong> {{ rapport.difficultesRencontrees }}</p>
          <p><strong>Statut :</strong> {{ rapport.statut || "En attente" }}</p>
  
          <!-- Actions pour les administrateurs -->
          <div v-if="isAdmin" class="rapport-actions">
            <button
              v-if="rapport.statut !== 'Validé'"
              @click="validateRapport(rapport.id)"
              class="validate-button"
            >
              Valider le rapport
            </button>
            <button
              v-if="rapport.statut !== 'Rejeté'"
              @click="rejectRapport(rapport.id)"
              class="reject-button"
            >
              Rejeter le rapport
            </button>
          </div>
        </div>
  
        <!-- Message si aucun rapport n'est disponible -->
        <p v-if="rapports.length === 0" class="no-rapports">
          Aucun rapport n'a été soumis pour le moment.
        </p>
      </section>
    </div>
  </template>
  
  <script>
  export default {
    name: "SuiviMissionPage",
    data() {
      return {
        isAdmin: false, // Simule le rôle de l'utilisateur (volontaire ou admin)
        missions: [], // Liste des missions disponibles
        rapport: {
          missionId: "",
          travailEffectue: "",
          difficultesRencontrees: "",
        }, // Formulaire de rapport
        rapports: [], // Liste des rapports soumis
      };
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
      // Valider un rapport (pour les administrateurs)
      async validateRapport(rapportId) {
        const rapport = this.rapports.find((r) => r.id === rapportId);
        if (rapport) {
          rapport.statut = "Validé";
          this.showNotification(`Rapport ${rapportId} validé.`, "success");
        }
      },
      // Rejeter un rapport (pour les administrateurs)
      async rejectRapport(rapportId) {
        const rapport = this.rapports.find((r) => r.id === rapportId);
        if (rapport) {
          rapport.statut = "Rejeté";
          this.showNotification(`Rapport ${rapportId} rejeté.`, "error");
        }
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
    font-family: Arial, sans-serif;
  }
  
  .suivi-mission-page h1 {
    color: #145d3c;
  }
  
  .rapport-form {
    margin-bottom: 2rem;
  }
  
  .rapport-form label {
    display: block;
    margin-bottom: 0.5rem;
  }
  
  .rapport-form select,
  .rapport-form textarea {
    width: 100%;
    padding: 0.8rem;
    border-radius: 5px;
    border: 1px solid #ccc;
    margin-bottom: 1rem;
  }
  
  .rapport-form button {
    background-color: #38bd94;
    color: white;
    padding: 0.8rem 1.5rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
  }
  
  .rapport-form button:hover {
    background-color: #145d3c;
  }
  
  .rapports-list {
    margin-top: 2rem;
  }
  
  .rapport-card {
    background-color: #f4f4f4;
    padding: 1.5rem;
    border-radius: 5px;
    margin-bottom: 1rem;
  }
  
  .rapport-card h3 {
    color: #145d3c;
    margin-bottom: 0.5rem;
  }
  
  .rapport-actions {
    margin-top: 1rem;
  }
  
  .validate-button {
    background-color: #38bd94;
    color: white;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-right: 1rem;
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
  
  .no-rapports {
    text-align: center;
    color: #666;
    margin-top: 2rem;
  }
  </style>