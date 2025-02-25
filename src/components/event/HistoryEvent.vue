
<template>
    <div class="form-container">
      <div class="challenge-form">
        <h2 class="form-title">Historique des événements</h2>
  
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
            <p class="event-details">
              <strong>Statut :</strong>
              <span :class="{'status-passed': hasPassed(event.date_time), 'status-upcoming': !hasPassed(event.date_time)}">
                {{ hasPassed(event.date_time) ? 'Passé' : 'À venir' }}
              </span>
            </p>
          </div>
        </div>
        <p v-else>Aucun événement trouvé dans l'historique.</p>
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
          const token = localStorage.getItem("access_token");
          const response = await axios.get("http://localhost:8000/api/events/history/", {
            headers: { Authorization: `Bearer ${token}` },
          });
          this.events = response.data;
        } catch (error) {
          console.error(error);
          alert("Erreur lors de la récupération de l'historique des événements.");
        }
      },
      formatDate(dateTime) {
        const options = { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" };
        return new Date(dateTime).toLocaleDateString("fr-FR", options);
      },
      hasPassed(dateTime) {
        return new Date(dateTime) < new Date();
      },
    },
    created() {
      this.fetchEvents();
    },
  };
  </script>
  
  <style scoped>
  .status-passed {
    color: red;
    font-weight: bold;
  }
  .status-upcoming {
    color: green;
    font-weight: bold;
  }





  .form-container {
    display: flex;
    justify-content: center;
    padding: 2rem;
    background-color: #e9f7f6;
    min-height: 100vh;
  }
  
  .challenge-form {
    width: 100%;
    max-width: 800px;
    background: #ffffff;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  }
  
  .form-title {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 1.5rem;
    text-align: center;
    color: #1a6f4b;
  }
  
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
  
  .status-passed {
    color: #d9534f;
    font-weight: bold;
  }
  
  .status-upcoming {
    color: #5cb85c;
    font-weight: bold;
  }
  </style>  

  