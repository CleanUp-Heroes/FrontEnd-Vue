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
        <h3>{{ mission.titre }}</h3>
        <p>{{ mission.description }}</p>
        <p><strong>Localisation:</strong> {{ mission.localisation }}</p>
        <p><strong>Type de pollution:</strong> {{ mission.type_pollution }}</p>
        <p><strong>Difficulté:</strong> {{ mission.difficulte }}</p>
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
import axios from "axios";

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
      return this.missions.filter((mission) => {
        return (
          (!this.filters.location || mission.localisation === this.filters.location) &&
          (!this.filters.type || mission.type_pollution === this.filters.type) &&
          (!this.filters.difficulty || mission.difficulte === this.filters.difficulty)
        );
      });
    },
  },
  created() {
    this.fetchMissions(); // Charger les missions au chargement
  },
  methods: {
    // Charger les missions depuis le backend Django
    async fetchMissions() {
      try {
        const response = await axios.get("http://localhost:8000/volontariat/missions/");
        this.missions = response.data;
      } catch (error) {
        console.error("Erreur lors de la récupération des missions:", error);
        this.showNotification("Erreur lors de la récupération des missions.", "error");
      }
    },
    // Associer le formulaire à une mission spécifique
    applyForMission(missionId) {
      this.application.missionId = missionId;
      this.showNotification(`Vous postulez pour la mission ID : ${missionId}`, "info");
    },
    // Soumettre la candidature via l'API Django
    async submitApplication() {
      try {
        const response = await axios.post("http://localhost:8000/volontariat/candidatures/", {
          name: this.application.name,
          email: this.application.email,
          phone: this.application.phone,
          mission: this.application.missionId,
          experience: this.application.experience,
          availability: this.application.availability,
        });

        if (response.status === 201) {
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