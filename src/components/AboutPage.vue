<template>
  <!-- Section À propos -->
  <div class="about">
    <h1 class="title">
      <span class="highlight">🌍 À propos</span> de <span class="brand">Cleanup Heroes</span>
    </h1>
    <p class="intro">
      Cleanup Heroes est une initiative visant à encourager les citoyens à adopter des comportements responsables pour préserver notre environnement.
      Rejoignez-nous pour transformer chaque geste en une action héroïque !
    </p>

    <div class="card-container">
      <div class="card">
        <h2>🎯 Notre mission</h2>
        <p>
          Sensibiliser et accompagner les individus vers une gestion responsable des déchets en utilisant la technologie et la gamification.
        </p>
      </div>

      <div class="card">
        <h2>🔍 Comment ça fonctionne ?</h2>
        <ul>
          <li>Participez à des défis écologiques.</li>
          <li>Enregistrez vos progrès via l'application.</li>
          <li>Accumulez des points et échangez-les contre des récompenses locales.</li>
        </ul>
      </div>

      <div class="card">
        <h2>🤝 Rejoignez-nous !</h2>
        <p>
          Ensemble, nous pouvons faire une réelle différence. Chaque petit geste compte pour un avenir plus propre. Soyez un <strong>Cleanup Hero</strong> !
        </p>
      </div>
    </div>

    <div class="cta-container">
      <button class="cta-button">Commencez dès maintenant ! 🚀</button>
    </div>
  </div>

  <!-- Section Statistiques -->
  <div class="stats-page">
    <h2 class="stats-title">Statistiques des défis</h2>
    <div v-if="loading">Chargement des données...</div>
    <div v-else-if="stats">
      <!-- Résumé des statistiques -->
      <div class="stats-summary">
        <div class="stats-item">
          <h3>Nombre total de défis accomplis :</h3>
          <p>{{ stats.completedChallengesCount }}</p>
        </div>
        <div class="stats-item">
          <h3>Quantité totale réalisée :</h3>
          <ul>
            <li v-for="(quantity, index) in stats.totalQuantity" :key="index">
              {{ quantity }}
            </li>
          </ul>
        </div>
        <div class="stats-item">
          <h3>Score total :</h3>
          <p>{{ stats.totalScore }}</p>
        </div>
      </div>

      <!-- Liste des progressions -->
      <div class="progress-section">
        <h3>Progression des défis en cours :</h3>
        <ul>
          <li v-for="(progressItem, index) in stats.progress" :key="index">
            <strong>{{ progressItem.challengeName }}</strong> : {{ progressItem.realizedQuantity }} ({{ progressItem.progressPercentage }}%)
          </li>
        </ul>
      </div>
    </div>
    <p v-else>Aucune donnée statistique disponible.</p>
  </div>
</template>

<script>
export default {
  name: "AboutPage",
  data() {
    return {
      stats: null, // Contient les statistiques récupérées depuis le backend
      loading: true, // Indique si les données sont en cours de chargement
    };
  },
  mounted() {
    this.fetchStats(); // Récupère les statistiques dès que le composant est monté
  },
  methods: {
    async fetchStats() {
      try {
        const token = localStorage.getItem("token"); // Récupère le token depuis localStorage
        if (!token) {
          console.error("Token manquant dans localStorage");
          this.loading = false;
          return;
        }

        // Ajouter le token dans l'en-tête Authorization
        const response = await fetch("http://127.0.0.1:8000/challenges/statistics/", {
          method: "GET",
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) throw new Error("Erreur lors de la récupération des données.");

        const data = await response.json();

        // Mapper les données directement
        this.stats = {
          completedChallengesCount: data.completedChallengesCount,
          totalQuantity: data.totalQuantity,
          totalScore: data.totalScore,
          progress: data.progress,
        };
      } catch (error) {
        console.error("Erreur :", error);
        this.stats = null; // Si une erreur survient, pas de données
      } finally {
        this.loading = false; // Désactive l'état de chargement
      }
    },
  },
};
</script>

<style scoped>
/* Section À propos */
.about {
  padding: 2rem;
  background: linear-gradient(135deg, #e8f5e9, #f1f8e9);
  color: #333;
  border-radius: 12px;
  max-width: 900px;
  margin: 2rem auto;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  animation: fadeIn 1s ease-out;
}

/* Section Statistiques */
.stats-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f6fdfb;
  padding: 2rem;
  box-sizing: border-box;
}

.stats-title {
  font-size: 2rem;
  color: #1a6f4b;
}

.stats-summary {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: center;
}

.stats-item {
  background: #ffffff;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
  min-width: 250px;
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
