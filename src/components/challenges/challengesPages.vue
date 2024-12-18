<template>
  <div>
    <h1>Défis disponibles</h1>
    <ul>
      <li v-for="challenge in challenges" :key="challenge.id">
        <h3>{{ challenge.name }}</h3>
        <p>{{ challenge.description }}</p>
        <button @click="participate(challenge.id)">Participer</button>
      </li>
    </ul>
    <challengeStats :stats="stats" />
  </div>
</template>

<script>
import challengeStats from './challengeStats.vue';

export default {
  data() {
    return {
      challenges: [], // Liste des défis disponibles
      stats: {}, // Statistiques globales des défis
    };
  },
  components: { challengeStats },
  methods: {
    async fetchChallenges() {
      const response = await fetch('/api/challenge');
      this.challenges = await response.json();
    },
    async fetchStats() {
      const response = await fetch('/api/challenge/stats');
      this.stats = await response.json();
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
