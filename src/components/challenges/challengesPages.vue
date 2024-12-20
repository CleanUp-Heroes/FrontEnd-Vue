<template>
  <div>
    <h1>Défis disponibles</h1>
    <!-- Section des défis -->
    <ul v-if="challenges.length > 0">
      <li v-for="challenge in challenges" :key="challenge.id">
        <h3>{{ challenge.name }}</h3>
        <p>{{ challenge.description }}</p>
        <p><strong>Dates :</strong> {{ challenge.start_date }} - {{ challenge.end_date }}</p>
        <p><strong>Actions attendues :</strong> {{ challenge.expected_actions }}</p>
        <p><strong>Unité :</strong> {{ challenge.unit }}</p>
        <p><strong>Points :</strong> {{ challenge.points }}</p>
        <button @click="participate(challenge.id)">Participer</button>
      </li>
    </ul>
    <p v-else-if="!loadingChallenges">Aucun défi disponible pour l'instant.</p>
    <p v-else>Chargement des défis...</p>

    <!-- Section des statistiques -->
    <h2>Statistiques des défis</h2>
    <challengeStats v-if="stats && !loadingStats" :stats="stats" />
    <p v-else-if="!stats && !loadingStats">Aucune statistique disponible pour l'instant.</p>
    <p v-else>Chargement des statistiques...</p>
  </div>
</template>

<script>
import challengeStats from "./challengeStats.vue";

export default {
  data() {
    return {
      challenges: [], // Liste des défis disponibles
      stats: null, // Statistiques globales des défis
      username: "votre_username", // À remplacer par le username réel de l'utilisateur connecté
      loadingChallenges: true, // Indicateur de chargement des défis
      loadingStats: true, // Indicateur de chargement des statistiques
    };
  },
  components: { challengeStats },
  methods: {
    // Récupère les défis auxquels l'utilisateur n'a pas participé
    async fetchChallenges() {
      this.loadingChallenges = true; // Début du chargement
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/challenges/unparticipated?username=${this.username}`
        );
        if (!response.ok) throw new Error("Erreur lors de la récupération des défis");
        const data = await response.json();

        // Récupérer chaque défi avec les données requises
        this.challenges = data.map(challenge => ({
          id: challenge.id,
          name: challenge.name,
          description: challenge.description,
          start_date: challenge.start_date,
          end_date: challenge.end_date,
          expected_actions: challenge.expected_actions,
          unit: challenge.unit.name,
          points: challenge.points,
        }));
      } catch (error) {
        console.error(error.message);
      } finally {
        this.loadingChallenges = false; // Fin du chargement
      }
    },

    // Récupère les statistiques des défis pour l'utilisateur
    async fetchStats() {
      this.loadingStats = true; // Début du chargement
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/challenges/statistics?username=${this.username}`
        );
        if (!response.ok) throw new Error("Erreur lors de la récupération des statistiques");
        const data = await response.json();
        this.stats = data || {};
      } catch (error) {
        console.error(error.message);
      } finally {
        this.loadingStats = false; // Fin du chargement
      }
    },

    // Redirection vers le formulaire avec l'ID du défi dans l'URL
    participate(challengeId) {
      this.$router.push(`/challenges/${challengeId}/participate`);
    },
  },
  mounted() {
    this.fetchChallenges();
    this.fetchStats();
  },
};
</script>

<style scoped>
/* Ajout de styles pour améliorer l'affichage */
h1,
h2 {
  color: #1a6f4b; /* Vert foncé */
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 1rem;
  padding: 1rem;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  background-color: #f9f9f9;
}

button {
  background-color: #38bd94; /* Vert pastel */
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #1a6f4b; /* Vert foncé */
}

p {
  color: #555;
}
</style>
