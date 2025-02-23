<template>
  <div class="recrutement-page">
    <h1>Devenez un Héros de la Planète 🌍</h1>
    <p class="intro-text">
      Rejoignez notre équipe de volontaires pour nettoyer des endroits pollués et contribuer à un environnement plus propre.
      Découvrez nos missions et postulez dès maintenant !
    </p>

    <!-- Bouton pour afficher/masquer les missions -->
    <button class="toggle-missions-button" @click="toggleMissions">
      {{ showMissions ? "Masquer les missions" : "Voir les missions disponibles" }}
    </button>

    <!-- Filtres pour les missions -->
    <section v-if="showMissions" class="filters">
      <h2>Filtrer les missions</h2>
      <div class="filter-options">
        <label for="location">Localisation:</label>
        <select id="location" v-model="filters.location">
          <option value="">Toutes</option>
          <option v-for="loc in locations" :key="loc" :value="loc">{{ loc }}</option>
        </select>

        <label for="type">Type de pollution:</label>
        <select id="type" v-model="filters.type">
          <option value="">Tous</option>
          <option v-for="type in pollutionTypes" :key="type" :value="type">{{ type }}</option>
        </select>

        <label for="difficulty">Difficulté:</label>
        <select id="difficulty" v-model="filters.difficulty">
          <option value="">Tous</option>
          <option v-for="diff in difficultyLevels" :key="diff" :value="diff">{{ diff }}</option>
        </select>
      </div>
    </section>

    <!-- Liste des missions disponibles -->
    <section v-if="showMissions" class="missions-list">
      <h2>Missions disponibles</h2>
      <p>Choisissez une mission qui correspond à vos compétences et disponibilités.</p>

      <div v-for="mission in filteredMissions" :key="mission.id" class="mission">
        <h3>{{ mission.title }}</h3>
        <p>{{ mission.description }}</p>
        <p><strong>Localisation:</strong> {{ mission.location }}</p>
        <p><strong>Type de pollution:</strong> {{ mission.type }}</p>
        <p><strong>Difficulté:</strong> {{ mission.difficulty }}</p>
        <p><strong>Date:</strong> {{ mission.date }}</p>
        <button @click="applyForMission(mission.id)">Rejoindre cette mission</button>
      </div>
    </section>

    <!-- Formulaire de candidature -->
    <section v-if="application.missionId" class="candidature-form">
      <h2>Postuler pour la mission {{ application.missionId }}</h2>
      <form @submit.prevent="submitApplication">
        <div>
          <label for="fullName">Nom complet:</label>
          <input type="text" id="fullName" v-model="application.name" required />
        </div>

        <div>
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="application.email" required />
        </div>

        <div>
          <label for="phone">Téléphone:</label>
          <input type="tel" id="phone" v-model="application.phone" required />
        </div>

        <div>
          <label for="experience">Expérience (facultatif):</label>
          <textarea id="experience" v-model="application.experience"></textarea>
        </div>

        <div>
          <label for="availability">Disponibilités:</label>
          <input type="text" id="availability" v-model="application.availability" required />
        </div>

        <button type="submit">Envoyer ma candidature</button>
      </form>
    </section>

    <!-- Notification utilisateur -->
    <div v-if="notification" :class="['notification', notification.type]">
      {{ notification.message }}
    </div>
  </div>
</template>

<script>
export default {
  name: "RecrutementPage",
  data() {
    return {
      missions: [], // Liste des missions disponibles
      filters: {
        location: "",
        type: "",
        difficulty: "",
      },
      locations: ["Paris", "Lyon", "Marseille", "Bordeaux", "Nice", "Toulouse", "Annecy", "Nantes", "Fontainebleau"],
      pollutionTypes: ["Plastique", "Déchets industriels", "Eau polluée", "Air pollué", "Déchets organiques"],
      difficultyLevels: ["Facile", "Moyen", "Difficile"],
      application: {
        name: "",
        email: "",
        phone: "",
        experience: "",
        availability: "",
        missionId: null,
      },
      notification: null, // Notification utilisateur
      showMissions: false, // Contrôle l'affichage des missions
    };
  },
  computed: {
    // Filtre les missions en fonction des critères sélectionnés
    filteredMissions() {
      return this.missions.filter(mission => {
        return (
          (!this.filters.location || mission.location === this.filters.location) &&
          (!this.filters.type || mission.type === this.filters.type) &&
          (!this.filters.difficulty || mission.difficulty === this.filters.difficulty)
        );
      });
    },
  },
  created() {
    this.fetchMissions(); // Charger les missions au chargement
  },
  methods: {
    // Charger les missions depuis une source statique
    async fetchMissions() {
      // Simuler une réponse API avec une liste statique
      this.missions = [
        {
          id: 1,
          title: "Nettoyage des plages de Marseille",
          description: "Participez au nettoyage des plages de Marseille pour lutter contre la pollution plastique.",
          location: "Marseille",
          type: "Plastique",
          difficulty: "Moyen",
          date: "2023-11-15",
        },
        {
          id: 2,
          title: "Dépollution du canal Saint-Martin",
          description: "Aidez à retirer les déchets du canal Saint-Martin à Paris.",
          location: "Paris",
          type: "Déchets industriels",
          difficulty: "Difficile",
          date: "2023-11-20",
        },
        {
          id: 3,
          title: "Nettoyage des berges de la Garonne",
          description: "Rejoignez-nous pour nettoyer les berges de la Garonne à Toulouse.",
          location: "Toulouse",
          type: "Déchets organiques",
          difficulty: "Facile",
          date: "2023-11-25",
        },
        {
          id: 4,
          title: "Opération de nettoyage à Lyon",
          description: "Participez à une grande opération de nettoyage dans les parcs de Lyon.",
          location: "Lyon",
          type: "Plastique",
          difficulty: "Moyen",
          date: "2023-12-01",
        },
        {
          id: 5,
          title: "Nettoyage des rues de Bordeaux",
          description: "Aidez à nettoyer les rues de Bordeaux et à sensibiliser les habitants.",
          location: "Bordeaux",
          type: "Déchets industriels",
          difficulty: "Facile",
          date: "2023-12-05",
        },
        {
          id: 6,
          title: "Dépollution du lac d'Annecy",
          description: "Participez à la dépollution du lac d'Annecy pour préserver sa beauté naturelle.",
          location: "Annecy",
          type: "Eau polluée",
          difficulty: "Difficile",
          date: "2023-12-10",
        },
        {
          id: 7,
          title: "Nettoyage des forêts de Fontainebleau",
          description: "Rejoignez-nous pour nettoyer les forêts de Fontainebleau et protéger la biodiversité.",
          location: "Fontainebleau",
          type: "Déchets organiques",
          difficulty: "Moyen",
          date: "2023-12-15",
        },
        {
          id: 8,
          title: "Opération de nettoyage à Nice",
          description: "Participez à une grande opération de nettoyage sur les plages de Nice.",
          location: "Nice",
          type: "Plastique",
          difficulty: "Facile",
          date: "2023-12-20",
        },
        {
          id: 9,
          title: "Nettoyage des rives de la Seine",
          description: "Aidez à nettoyer les rives de la Seine à Paris.",
          location: "Paris",
          type: "Déchets industriels",
          difficulty: "Moyen",
          date: "2023-12-25",
        },
        {
          id: 10,
          title: "Dépollution du port de Marseille",
          description: "Participez à la dépollution du port de Marseille.",
          location: "Marseille",
          type: "Eau polluée",
          difficulty: "Difficile",
          date: "2024-01-01",
        },
        {
          id: 11,
          title: "Nettoyage des parcs de Lyon",
          description: "Rejoignez-nous pour nettoyer les parcs de Lyon et rendre la ville plus propre.",
          location: "Lyon",
          type: "Déchets organiques",
          difficulty: "Facile",
          date: "2024-01-05",
        },
        {
          id: 12,
          title: "Opération de nettoyage à Toulouse",
          description: "Participez à une grande opération de nettoyage dans les rues de Toulouse.",
          location: "Toulouse",
          type: "Plastique",
          difficulty: "Moyen",
          date: "2024-01-10",
        },
        {
          id: 13,
          title: "Nettoyage des plages de Nice",
          description: "Aidez à nettoyer les plages de Nice pour préserver leur beauté.",
          location: "Nice",
          type: "Plastique",
          difficulty: "Facile",
          date: "2024-01-15",
        },
        {
          id: 14,
          title: "Dépollution du Rhône",
          description: "Participez à la dépollution du Rhône à Lyon.",
          location: "Lyon",
          type: "Eau polluée",
          difficulty: "Difficile",
          date: "2024-01-20",
        },
        {
          id: 15,
          title: "Nettoyage des forêts de Bordeaux",
          description: "Rejoignez-nous pour nettoyer les forêts autour de Bordeaux.",
          location: "Bordeaux",
          type: "Déchets organiques",
          difficulty: "Moyen",
          date: "2024-01-25",
        },
        {
          id: 16,
          title: "Opération de nettoyage à Annecy",
          description: "Participez à une grande opération de nettoyage dans les rues d'Annecy.",
          location: "Annecy",
          type: "Plastique",
          difficulty: "Facile",
          date: "2024-02-01",
        },
        {
          id: 17,
          title: "Nettoyage des rives de la Loire",
          description: "Aidez à nettoyer les rives de la Loire à Nantes.",
          location: "Nantes",
          type: "Déchets industriels",
          difficulty: "Moyen",
          date: "2024-02-05",
        },
        {
          id: 18,
          title: "Dépollution du port de Bordeaux",
          description: "Participez à la dépollution du port de Bordeaux.",
          location: "Bordeaux",
          type: "Eau polluée",
          difficulty: "Difficile",
          date: "2024-02-10",
        },
        {
          id: 19,
          title: "Nettoyage des parcs de Paris",
          description: "Rejoignez-nous pour nettoyer les parcs de Paris et rendre la ville plus propre.",
          location: "Paris",
          type: "Déchets organiques",
          difficulty: "Facile",
          date: "2024-02-15",
        },
        {
          id: 20,
          title: "Opération de nettoyage à Marseille",
          description: "Participez à une grande opération de nettoyage dans les rues de Marseille.",
          location: "Marseille",
          type: "Plastique",
          difficulty: "Moyen",
          date: "2024-02-20",
        },
      ];
    },
    // Associer le formulaire à une mission spécifique
    applyForMission(missionId) {
      this.application.missionId = missionId;
      this.showNotification(`Vous postulez pour la mission ID : ${missionId}`, "info");
    },
    // Soumettre la candidature via une API
    async submitApplication() {
      try {
        const response = await fetch("https://api.example.com/applications", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(this.application),
        });

        if (response.ok) {
          this.showNotification("Candidature envoyée avec succès. Merci pour votre engagement !", "success");
          this.resetForm();
        } else {
          this.showNotification("Erreur lors de l’envoi de la candidature.", "error");
        }
      } catch (error) {
        console.error("Erreur:", error);
        this.showNotification("Une erreur est survenue. Veuillez réessayer plus tard.", "error");
      }
    },
    // Réinitialiser le formulaire après envoi
    resetForm() {
      this.application = {
        name: "",
        email: "",
        phone: "",
        experience: "",
        availability: "",
        missionId: null,
      };
    },
    // Afficher une notification à l'utilisateur
    showNotification(message, type) {
      this.notification = { message, type };
      setTimeout(() => {
        this.notification = null;
      }, 3000);
    },
    // Basculer l'affichage des missions
    toggleMissions() {
      this.showMissions = !this.showMissions;
    },
  },
};
</script>

<style scoped>
.recrutement-page {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
}

.intro-text {
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 2rem;
}

.toggle-missions-button {
  background-color: #38bd94;
  color: white;
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  margin-bottom: 2rem;
}

.toggle-missions-button:hover {
  background-color: #145d3c;
}

.filters {
  margin-bottom: 2rem;
}

.filter-options {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.filter-options label {
  margin-right: 0.5rem;
}

.missions-list {
  margin-bottom: 2rem;
}

.mission {
  background-color: #f4f4f4;
  margin-bottom: 1rem;
  padding: 1rem;
  border-radius: 5px;
}

.mission h3 {
  color: #145d3c;
}

button {
  background-color: #38bd94;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #145d3c;
}

.candidature-form {
  background-color: #f4f4f4;
  padding: 2rem;
  border-radius: 5px;
}

.candidature-form div {
  margin-bottom: 1rem;
}

.candidature-form label {
  display: block;
  margin-bottom: 0.5rem;
}

.candidature-form input,
.candidature-form textarea,
.candidature-form select {
  width: 100%;
  padding: 0.8rem;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.candidature-form button {
  background-color: #38bd94;
  color: white;
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
}

.candidature-form button:hover {
  background-color: #145d3c;
}

.notification {
  padding: 1rem;
  border-radius: 5px;
  margin-top: 1rem;
}

.notification.success {
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.notification.error {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

.notification.info {
  background-color: #d1ecf1;
  color: #0c5460;
  border: 1px solid #bee5eb;
}
</style>