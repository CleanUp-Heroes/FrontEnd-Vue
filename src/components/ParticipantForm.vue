<template>
    <div class="form-container">
      <form @submit.prevent="handleSubmit" class="challenge-form">
        <h2 class="form-title">Participer à un événement</h2>
  
        <!-- Nom de l'utilisateur -->
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
  
        <!-- Bouton de soumission -->
        <button type="submit" class="form-button">Rejoindre l'événement</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    props: {
      eventId: {
        type: Number,
        required: true,
      },
    },
    data() {
      return {
        participant: {
          username: "",
        },
        errors: {},
      };
    },
    methods: {
      validateForm() {
        this.errors = {};
        if (!this.participant.username) {
          this.errors.username = "Le nom d'utilisateur est obligatoire.";
        }
        return Object.keys(this.errors).length === 0;
      },
      async handleSubmit() {
        if (!this.validateForm()) return;
  
        try {
          const token = localStorage.getItem("access_token");
          await axios.post(
            `http://localhost:8000/api/events/${this.eventId}/join/`,
            this.participant,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          alert("Inscription réussie !");
          this.$router.push("/events");
        } catch (error) {
          console.error(error);
          alert("Erreur lors de l'inscription à l'événement.");
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Styles réutilisés */
  </style>
  