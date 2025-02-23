<template>
  <div class="formation-page">
    <h1>Formation des Héros de la Planète 🌍</h1>
    <p class="intro-text">
      Préparez-vous à sauver le monde, une formation à la fois ! Devenez un expert du nettoyage écologique avec nos modules ludiques et instructifs.
    </p>

    <!-- Liste des formations disponibles -->
    <div v-if="formations.length > 0" class="formations-list">
      <div
        v-for="formation in formations"
        :key="formation.id"
        class="formation-card"
        :class="{ completed: formation.isCompleted }"
      >
        <h3>{{ formation.title }}</h3>
        <p>{{ formation.description }}</p>

        <!-- Citation humoristique ou inspirante -->
        <p class="quote" v-if="formation.quote">« {{ formation.quote }} »</p>

        <!-- Section du guide -->
        <div class="guide-section">
          <a
            v-if="formation.documentUrl"
            @click="toggleDocumentInfo(formation.id)"
            class="document-link"
          >
            📖 Cliquez ici pour lire le guide
          </a>
          <div
            v-if="activeDocumentId === formation.id"
            class="document-info"
          >
            <h4>📚 Le Guide du Héros : Tout ce que vous devez savoir</h4>
            <p>
              Voici quelques infos utiles (et drôles) pour vous préparer :
            </p>
            <ul>
              <li>✅ <strong>Astuce n°1 :</strong> Portez des gants. Les déchets ne sont pas toujours coopératifs.</li>
              <li>✅ <strong>Astuce n°2 :</strong> Hydratez-vous. Un héros déshydraté est un héros moins efficace.</li>
              <li>✅ <strong>Astuce n°3 :</strong> Travaillez en équipe. Même les super-héros ont besoin d'amis !</li>
              <!-- Ajoutez les autres astuces ici -->
            </ul>
          </div>
        </div>

        <!-- Section vidéo YouTube -->
        <div v-if="formation.videoUrls" class="video-section">
          <div class="video-info">
            <p>
              Vous allez visualiser une vidéo YouTube pour en savoir plus sur cette formation. Prêt à devenir un héros ? 🎥
            </p>
          </div>
          <div class="video-container">
            <iframe
              v-for="(videoUrl, index) in formation.videoUrls"
              :key="index"
              :src="videoUrl"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
              class="formation-video"
            ></iframe>
          </div>
        </div>

        <!-- Bouton de confirmation -->
        <button
          v-if="!formation.isCompleted"
          @click="markFormationAsCompleted(formation.id)"
          class="complete-button"
        >
          🎓 J'ai terminé cette formation !
        </button>
        <p v-else class="completed-message">✅ Mission accomplie !</p>
      </div>
    </div>

    <!-- Message si aucune formation n'est disponible -->
    <p v-else class="no-formations">
      Oups ! Aucune formation n'est disponible pour le moment. Revenez plus tard, héros !
    </p>

    <!-- Notification dynamique -->
    <div v-if="notification" :class="['notification', notification.type]">
      {{ notification.message }}
    </div>
  </div>
</template>

<script>
export default {
  name: "FormationPage",
  data() {
    return {
      formations: [], // Liste des formations disponibles
      notification: null, // Notification utilisateur
      activeDocumentId: null, // ID de la formation dont le document est ouvert
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
            title: "Nettoyage Écologique 101 : Devenir un Super Héros Vert 🦸‍♂️",
            description:
              "Apprenez les bases du nettoyage écologique et comment éviter de glisser sur une peau de banane (oui, c'est important).",
            documentUrl: "/documents/introduction-nettoyage.pdf",
            videoUrls: [
              "https://www.youtube.com/embed/sVIimzkcLwo", // Lien YouTube
            ],
            isCompleted: false, // Statut de la formation
            quote: "Un héros ne laisse jamais traîner ses déchets... ni ses chaussettes.",
          },
          {
            id: 2,
            title: "Gestion des Déchets Plastiques : Le Combat contre le Plastique 🥊",
            description:
              "Découvrez comment identifier, collecter et recycler les déchets plastiques. Spoiler : le plastique ne se recycle pas tout seul !",
            documentUrl: "/documents/gestion-plastique.pdf",
            videoUrls: [
              "https://www.youtube.com/embed/REh-GAV1cfA", // Lien YouTube
            ],
            isCompleted: false, // Statut de la formation
            quote: "Le plastique, c'est pas fantastique... mais le recyclage, si !",
          },
        ];
      } catch (error) {
        console.error("Erreur lors du chargement des formations:", error);
      }
    },
    // Afficher ou masquer les informations du document
    toggleDocumentInfo(formationId) {
      this.activeDocumentId = this.activeDocumentId === formationId ? null : formationId;
    },
    // Marquer une formation comme terminée
    async markFormationAsCompleted(formationId) {
  const formation = this.formations.find((f) => f.id === formationId);
  if (formation) {
    try {
      const token = localStorage.getItem("authToken"); // Supposons que tu stockes le token dans le localStorage
      if (!token) {
        throw new Error("Token is missing"); // Assure-toi que le token est disponible
      }

      const response = await fetch(`http://localhost:8000/formations/${formationId}/complete/`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` // Ajoute le token ici
        },
        body: JSON.stringify({ userId: 123 }), // Remplace par la bonne information si nécessaire
      });

      if (response.ok) {
        formation.isCompleted = true;
        this.showNotification(
          `Félicitations ! Vous avez terminé la formation "${formation.title}". 🎉`,
          "success"
        );
      } else {
        const errorData = await response.json();
        console.error("Erreur lors de la confirmation de la formation:", errorData.error);
        this.showNotification(
          "Oups ! Une erreur est survenue. Veuillez réessayer plus tard.",
          "error"
        );
      }
    } catch (error) {
      console.error("Erreur lors de la confirmation de la formation:", error);
      this.showNotification(
        "Oups ! Une erreur est survenue. Veuillez réessayer plus tard.",
        "error"
      );
    }
  }
},
    // Afficher une notification
    showNotification(message, type) {
      this.notification = { message, type };
      setTimeout(() => {
        this.notification = null;
      }, 3000);
    },
  },
};
</script>

<style scoped>
.formation-page {
  padding: 2rem;
  min-height: 100vh;
  background-color: #f9f9f9;
  font-family: Arial, sans-serif;
}

.formation-page h1 {
  color: #145d3c;
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.intro-text {
  text-align: center;
  color: #666;
  margin-bottom: 2rem;
}

.formations-list {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  max-width: 1200px;
  margin: 0 auto;
}

.formation-card {
  background-color: #fff;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.formation-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.formation-card h3 {
  color: #145d3c;
  margin-bottom: 0.5rem;
}

.formation-card p {
  color: #666;
  margin-bottom: 1rem;
}

.quote {
  font-style: italic;
  color: #38bd94;
  margin: 1rem 0;
}

.guide-section {
  margin-bottom: 1.5rem;
}

.document-link {
  display: inline-block;
  background-color: #38bd94;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  text-decoration: none;
  margin-right: 1rem;
  transition: background-color 0.3s ease;
  cursor: pointer;
}

.document-link:hover {
  background-color: #145d3c;
}

.document-info {
  margin-top: 1rem;
  padding: 1rem;
  background-color: #f4f4f4;
  border-radius: 5px;
  animation: fadeIn 0.5s ease;
}

.document-info h4 {
  color: #145d3c;
  margin-bottom: 1rem;
}

.document-info ul {
  list-style-type: none;
  padding: 0;
}

.document-info li {
  margin-bottom: 0.5rem;
}

.video-section {
  margin-top: 1.5rem;
}

.video-info {
  background-color: #f4f4f4;
  padding: 1rem;
  border-radius: 5px;
  text-align: center;
}

.video-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
}

.formation-video {
  width: 100%;
  height: 200px;
  border-radius: 5px;
  border: none;
}

.complete-button {
  background-color: #38bd94;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.complete-button:hover {
  background-color: #145d3c;
}

.completed-message {
  color: #38bd94;
  font-weight: bold;
  text-align: center;
}

.no-formations {
  text-align: center;
  color: #666;
  margin-top: 2rem;
}

.notification {
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 1rem;
  border-radius: 5px;
  color: white;
  animation: slideIn 0.5s ease;
}

.notification.success {
  background-color: #38bd94;
}

.notification.error {
  background-color: #ff6b6b;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>