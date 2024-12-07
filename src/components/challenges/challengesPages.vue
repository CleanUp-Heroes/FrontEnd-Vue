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
        challenges: [],
        stats: {},
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
      participate(challengeId) {
        this.$router.push(`/challenges/${challengeId}`);
      },
    },
    mounted() {
      this.fetchChallenges();
      this.fetchStats();
    },
  };
  </script>
  