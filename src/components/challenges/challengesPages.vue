<template>
  <div class="challenges-page">
    <h1 class="page-title">Défis disponibles</h1>
    <div v-if="challenges.length === 0" class="no-challenges">
      <p>Aucun défi disponible</p>
    </div>
    <ul v-else class="challenges-list">
      <li v-for="challenge in challenges" :key="challenge.id" class="challenge-item">
        <h3 class="challenge-name">{{ challenge.name }}</h3>
        <p class="challenge-description">{{ challenge.description }}</p>
        <p class="challenge-info">
          <strong>Dates :</strong> {{ formatDate(challenge.start_date) }} - {{ formatDate(challenge.end_date) }}
        </p>
        <p class="challenge-info">
          <strong>Actions attendues :</strong> {{ challenge.expected_actions }} {{ challenge.unit }}
        </p>
        <p class="challenge-info">
          <strong>Points :</strong> {{ challenge.points }}
        </p>
        <button @click="participate(challenge.id, challenge.name)" class="participate-button">Participer</button>
      </li>
    </ul>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      challenges: [], // Liste des défis disponibles
    };
  },
  methods: {
    async fetchChallenges() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Token manquant dans localStorage");
          return;
        }

        const response = await axios.get("http://127.0.0.1:8000/challenges/unparticipated/", {
          headers: {
            Authorization: token,
          },
        });

        // Récupération des défis non participés
        this.challenges = response.data.unparticipated_challenges;
      } catch (error) {
        console.error("Erreur lors de la récupération des défis :", error);
      }
    },
    participate(challengeId, challengeName) {
      this.$router.push(`/challenges/${challengeId}/participate/${challengeName}`

      
      );
    },
    formatDate(dateString) {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(dateString).toLocaleDateString("fr-FR", options);
    },
  },
  mounted() {
    this.fetchChallenges();
  },
};
</script>
<style scoped>
.challenges-page {
  padding: 2rem;
  background-color: #f9f9f9;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.page-title {
  font-size: 2.5rem;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 1.5rem;
}

.challenges-list {
  list-style-type: none;
  padding: 0;
  width: 100%;
  max-width: 800px;
}

.challenge-item {
  background-color: #ffffff;
  margin-bottom: 1rem;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.challenge-name {
  font-size: 1.5rem;
  font-weight: bold;
  color: #34495e;
  margin-bottom: 0.5rem;
}

.challenge-description {
  font-size: 1rem;
  color: #7f8c8d;
  margin-bottom: 1rem;
}

.challenge-info {
  font-size: 0.9rem;
  color: #555;
  margin-bottom: 0.5rem;
}

.participate-button {
  background-color: #1abc9c;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
  align-self: flex-start;
}

.participate-button:hover {
  background-color: #16a085;
}

.no-challenges {
  font-size: 1.5rem;
  color: #e74c3c;
  font-weight: bold;
  padding: 2rem;
  text-align: center;
}
</style>