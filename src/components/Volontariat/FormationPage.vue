<template>
    <div class="formation-page">
      <h1>Formation des Volontaires</h1>
      <p>Accédez à la bibliothèque de formations et confirmez votre participation.</p>
  
      <!-- Liste des formations disponibles -->
      <div v-if="formations.length > 0" class="formations-list">
        <div v-for="formation in formations" :key="formation.id" class="formation-card">
          <h3>{{ formation.title }}</h3>
          <p>{{ formation.description }}</p>
          <div class="formation-media">
            <a
              v-if="formation.documentUrl"
              :href="formation.documentUrl"
              target="_blank"
              class="document-link"
            >
              📄 Télécharger le document
            </a>
            <video
              v-if="formation.videoUrl"
              :src="formation.videoUrl"
              controls
              class="formation-video"
            ></video>
          </div>
          <button
            v-if="!formation.isCompleted"
            @click="markFormationAsCompleted(formation.id)"
            class="complete-button"
          >
            Confirmer la formation
          </button>
          <p v-else class="completed-message">✅ Formation terminée</p>
        </div>
      </div>
  
      <!-- Message si aucune formation n'est disponible -->
      <p v-else class="no-formations">
        Aucune formation n'est disponible pour le moment.
      </p>
    </div>
  </template>
  
  <script>
  export default {
    name: "FormationPage",
    data() {
      return {
        formations: [], // Liste des formations disponibles
      };
    },
    created() {
      this.fetchFormations(); // Charger les formations au chargement
    },
    methods: {
      // Charger les formations depuis une API ou une source locale
      async fetchFormations() {
        try {
          // Simuler une réponse API avec des données statiques
          this.formations = [
            {
              id: 1,
              title: "Introduction au nettoyage écologique",
              description:
                "Découvrez les bases du nettoyage écologique et les bonnes pratiques.",
              documentUrl: "/documents/introduction-nettoyage.pdf",
              videoUrl: "/videos/introduction-nettoyage.mp4",
              isCompleted: false, // Statut de la formation
            },
            {
              id: 2,
              title: "Gestion des déchets plastiques",
              description:
                "Apprenez à identifier, collecter et recycler les déchets plastiques.",
              documentUrl: "/documents/gestion-plastique.pdf",
              videoUrl: null,
              isCompleted: false, // Statut de la formation
            },
            {
              id: 3,
              title: "Sécurité lors des opérations de nettoyage",
              description:
                "Connaissez les règles de sécurité pour éviter les accidents.",
              documentUrl: null,
              videoUrl: "/videos/securite-nettoyage.mp4",
              isCompleted: false, // Statut de la formation
            },
          ];
        } catch (error) {
          console.error("Erreur lors du chargement des formations:", error);
        }
      },
      // Marquer une formation comme terminée
      async markFormationAsCompleted(formationId) {
        const formation = this.formations.find((f) => f.id === formationId);
        if (formation) {
          formation.isCompleted = true;
          // Simuler un appel API pour mettre à jour le statut de la formation
          try {
            await fetch(`https://api.example.com/formations/${formationId}/complete`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ userId: 123 }), // Remplacez par l'ID de l'utilisateur connecté
            });
            this.showNotification(`Formation "${formation.title}" terminée.`, "success");
          } catch (error) {
            console.error("Erreur lors de la confirmation de la formation:", error);
            this.showNotification(
              "Une erreur est survenue. Veuillez réessayer plus tard.",
              "error"
            );
          }
        }
      },
      // Afficher une notification
      showNotification(message, type) {
        alert(`${type.toUpperCase()}: ${message}`); // Remplacez par un système de notifications plus élaboré si nécessaire
      },
    },
  };
  </script>
  
  <style scoped>
  .formation-page {
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
    font-family: Arial, sans-serif;
  }
  
  .formation-page h1 {
    color: #145d3c;
  }
  
  .formations-list {
    display: grid;
    gap: 1.5rem;
  }
  
  .formation-card {
    background-color: #f4f4f4;
    padding: 1.5rem;
    border-radius: 5px;
  }
  
  .formation-card h3 {
    color: #145d3c;
    margin-bottom: 0.5rem;
  }
  
  .formation-media {
    margin: 1rem 0;
  }
  
  .document-link {
    display: inline-block;
    background-color: #38bd94;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    text-decoration: none;
    margin-right: 1rem;
  }
  
  .document-link:hover {
    background-color: #145d3c;
  }
  
  .formation-video {
    width: 100%;
    max-width: 600px;
    height: auto;
    border-radius: 5px;
  }
  
  .complete-button {
    background-color: #38bd94;
    color: white;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .complete-button:hover {
    background-color: #145d3c;
  }
  
  .completed-message {
    color: #38bd94;
    font-weight: bold;
  }
  
  .no-formations {
    text-align: center;
    color: #666;
    margin-top: 2rem;
  }
  </style>