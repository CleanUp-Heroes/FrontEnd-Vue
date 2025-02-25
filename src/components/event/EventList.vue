<template>
    <div class="form-container">
      <div class="challenge-form">
        <h2 class="form-title">Liste des événements</h2>
  
        <div v-if="events.length > 0">
          <div
            v-for="event in events"
            :key="event.id"
            class="event-card"
          >
            <h3 class="event-title">{{ event.title }}</h3>
            <p class="event-details">
              <strong>Localisation :</strong> {{ event.location }}
            </p>
            <p class="event-details">
              <strong>Date :</strong> {{ formatDate(event.date_time) }}
            </p>
            <p class="event-details">
              <strong>Participants :</strong> {{ event.current_participants }} / {{ event.max_participants }}
            </p>
            <button
              @click="joinEvent(event.id)"
              class="form-button"
              :disabled="event.current_participants >= event.max_participants"
            >
              Participer
            </button>
          </div>
        </div>
        <p v-else>Aucun événement disponible pour le moment.</p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        events: [],
      };
    },
    methods: {
      async fetchEvents() {
        try {
          const response = await axios.get("http://127.0.0.1:8000/create-event/");
          this.events = response.data;
        } catch (error) {
          console.error(error);
          alert("Erreur lors de la récupération des événements.");
        }
      },
      async joinEvent(eventId) {
        try {
          const token = localStorage.getItem("access_token");
          await axios.post(
            `http://localhost:8000/api/events/${eventId}/join/`,
            {},
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          alert("Vous avez rejoint l'événement avec succès !");
          this.fetchEvents(); // Rafraîchir la liste des événements
        } catch (error) {
          console.error(error);
          alert("Erreur lors de l'inscription à l'événement.");
        }
      },
      formatDate(dateTime) {
        const options = { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" };
        return new Date(dateTime).toLocaleDateString("fr-FR", options);
      },
    },
    created() {
      this.fetchEvents();
    },
  };
  </script>
  
  <style scoped>
  .event-card {
    background: #f9f9f9;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
  }
  .event-card:hover {
    transform: translateY(-5px);
  }
  .event-title {
    font-size: 1.5rem;
    font-weight: bold;
    color: #1a6f4b;
    margin-bottom: 1rem;
  }
  .event-details {
    font-size: 1rem;
    color: #3a3a3a;
    margin: 0.5rem 0;
  }
  </style>
  