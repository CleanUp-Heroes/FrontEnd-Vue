<template>
  <div class="participate-event">
    <h1>Participer à un événement</h1>
    <ul>
      <li v-for="event in events" :key="event.id">
        <h3>{{ event.title }}</h3>
        <p>{{ event.description }}</p>
        <p>Date : {{ event.date }}</p>
        <p>Lieu : {{ event.location }}</p>
        <button @click="openParticipationForm(event.id)">Participer</button>
      </li>
    </ul>

    <!-- Formulaire modal de participation -->
    <div v-if="showParticipationForm" class="modal-overlay">
      <div class="modal">
        <form @submit.prevent="handleParticipation">
          <h2 class="form-title">Rejoindre l'événement</h2>

          <!-- Nom d'utilisateur -->
          <div class="form-group">
            <label for="username">Nom d'utilisateur</label>
            <input
              type="text"
              id="username"
              v-model="participant.username"
              class="form-input"
              required
            />
            <span v-if="errors.username" class="error-message">{{ errors.username }}</span>
          </div>

          <!-- Boutons -->
          <div class="form-actions">
            <button type="submit" class="form-button">Rejoindre</button>
            <button type="button" class="cancel-button" @click="closeParticipationForm">
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      events: [], // Liste des événements
      showParticipationForm: false, // Pour afficher ou cacher le formulaire
      selectedEventId: null, // ID de l'événement sélectionné
      participant: {
        username: "",
      },
      errors: {},
    };
  },
  async created() {
    try {
      // Charge les événements depuis le backend
      const token = localStorage.getItem("access_token");
      const response = await axios.get("http://localhost:8000/api/events/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      this.events = response.data;
    } catch (error) {
      console.error("Erreur lors du chargement des événements :", error);
    }
  },
  methods: {
    openParticipationForm(eventId) {
      this.selectedEventId = eventId;
      this.showParticipationForm = true;
    },
    closeParticipationForm() {
      this.showParticipationForm = false;
      this.errors = {};
      this.participant.username = "";
    },
    validateForm() {
      this.errors = {};
      if (!this.participant.username) {
        this.errors.username = "Le nom d'utilisateur est obligatoire.";
      }
      return Object.keys(this.errors).length === 0;
    },
    async handleParticipation() {
      if (!this.validateForm()) return;

      try {
        const token = localStorage.getItem("access_token");
        await axios.post(
          `http://localhost:8000/api/events/${this.selectedEventId}/join/`,
          this.participant,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        alert("Inscription réussie !");
        this.closeParticipationForm();
      } catch (error) {
        console.error("Erreur lors de la participation :", error);
        alert("Erreur lors de l'inscription à l'événement.");
      }
    },
  },
};
</script>

<style scoped>
.participate-event {
  padding: 2rem;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  margin-bottom: 2rem;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
}

button {
  margin-top: 1rem;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  width: 90%;
  max-width: 500px;
}

.form-title {
  margin-bottom: 1.5rem;
  text-align: center;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-input {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.form-actions {
  display: flex;
  justify-content: space-between;
}

.form-button {
  padding: 0.8rem 1.5rem;
  background-color: #1a6f4b;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.form-button:hover {
  background-color: #145d3c;
}

.cancel-button {
  padding: 0.8rem 1.5rem;
  background-color: #aaa;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.cancel-button:hover {
  background-color: #888;
}

.error-message {
  color: red;
  font-size: 0.9rem;
}
</style>
