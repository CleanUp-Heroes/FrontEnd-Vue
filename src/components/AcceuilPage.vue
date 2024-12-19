<template>
    <div class="home-page">
      <!-- Section Header avec une introduction ludique -->
      <header class="hero-section">
        <h1>Bienvenue sur Cleanup Heroes!</h1>
        <p>Rejoignez-nous pour nettoyer la planète, un défi à la fois!</p>
        <button @click="goToChallenges">Participez aux Défis</button>
      </header>
  
      <!-- Section des Défis -->
      <section class="challenges-section">
        <h2>Nos Défis Écologiques en cours </h2>
        <div class="challenges">
          <div class="challenge-card" v-for="(challenge, index) in challenges" :key="index">
            <h3>{{ challenge.title }}</h3>
            <p>{{ challenge.description }}</p>
            <button @click="goToChallengeDetails(challenge.id)">Voir plus</button>
          </div>
        </div>
      </section>
  
      <!-- Section d'Appel à l'Action -->
      <section class="cta-section">
        <h2>Agissez pour la planète!</h2>
        <p>Rejoignez notre communauté et commencez à participer à des actions concrètes pour un avenir plus propre.</p>
        <button @click="goToSignUp">S'inscrire et Participer</button>
      </section>
    </div>
  </template>
  
  <script>
  export default {
    name: "AcceuilPage",
    data() {
      return {
        // Liste des défis à afficher sur la page d'accueil
        challenges: [
          { id: 1, title: "Nettoyage de Plage", description: "Participez à un nettoyage de plage et collectez des déchets." },
          { id: 2, title: "Nettoyage de Forêt", description: "Contribuez à un nettoyage d'un parc ou d'une forêt locale." },
          { id: 3, title: "Campagne de Sensibilisation", description: "Organisez une campagne pour sensibiliser à la réduction des déchets." }
        ]
      };
    },
    methods: {
      // Redirection vers la page des défis
      goToChallenges() {
        this.$router.push({ name: 'challenges' });
      },
      // Redirection vers la page de détails d'un défi spécifique
      goToChallengeDetails(challengeId) {
        this.$router.push({ name: 'challengeDetails', params: { id: challengeId } });
      },
      // Redirection vers la page d'inscription
      goToSignUp() {
        this.$router.push({ name: 'signUp' });
      }
    }
  };
  </script>
  
  <style scoped>
  /* Styles de la page d'accueil */
  
  .home-page {
    font-family: Arial, sans-serif;
    color: #333;
  }
  
  .hero-section {
    background-color: #38bd94;
    color: white;
    text-align: center;
    padding: 3rem 1rem;
  }
  
  .hero-section h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }
  
  .hero-section p {
    font-size: 1.2rem;
    margin-bottom: 2rem;
  }
  
  .hero-section button {
    background-color: #2c6b50;
    color: white;
    font-size: 1.1rem;
    padding: 1rem 2rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .hero-section button:hover {
    background-color: #145d3c;
  }
  
  .challenges-section {
    padding: 2rem 1rem;
  }
  
  .challenges-section h2 {
    font-size: 2rem;
    text-align: center;
    margin-bottom: 2rem;
  }
  
  .challenges {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  }
  
  .challenge-card {
    background-color: #f4f9f6;
    border-radius: 8px;
    padding: 1.5rem;
    margin: 1rem;
    width: 250px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
  }
  
  .challenge-card h3 {
    font-size: 1.5rem;
    color: #388e3c;
    margin-bottom: 1rem;
  }
  
  .challenge-card p {
    font-size: 1rem;
    margin-bottom: 1rem;
  }
  
  .challenge-card button {
    background-color: #2c6b50;
    color: white;
    padding: 0.8rem 1.5rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .challenge-card button:hover {
    background-color: #145d3c;
  }
  
  .cta-section {
    background-color: #38bd94;
    color: white;
    text-align: center;
    padding: 2rem 1rem;
  }
  
  .cta-section h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
  
  .cta-section p {
    font-size: 1.2rem;
    margin-bottom: 2rem;
  }
  
  .cta-section button {
    background-color: #2c6b50;
    color: white;
    font-size: 1.1rem;
    padding: 1rem 2rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .cta-section button:hover {
    background-color: #145d3c;
  }
  </style>
  