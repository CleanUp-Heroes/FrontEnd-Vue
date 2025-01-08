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

<script>
export default {
  name: "AboutPage",
};
</script>

<style scoped>
/* Conteneur principal */
.about {
  padding: 2rem;
  background: linear-gradient(135deg, #e8f5e9, #f1f8e9); /* Dégradé vert */
  color: #333;
  border-radius: 12px;
  max-width: 900px;
  margin: 2rem auto;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  animation: fadeIn 1s ease-out;
}

/* Titre principal */
.title {
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 1.5rem;
}

.highlight {
  color: #4caf50; /* Vert vif */
}

.brand {
  color: #2e7d32;
  font-weight: bold;
}

/* Texte d'introduction */
.intro {
  font-size: 1.2rem;
  text-align: center;
  margin-bottom: 2rem;
  animation: slideIn 1s ease-out;
}

/* Cartes d'information */
.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 1.5rem;
}

.card {
  background: #ffffff;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  flex: 1;
  min-width: 250px;
  max-width: 300px;
  text-align: center;
  animation: zoomIn 1s ease-out;
}

.card h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #388e3c;
}

.card p,
.card ul {
  font-size: 1rem;
  line-height: 1.6;
}

.card ul {
  list-style: none;
  padding: 0;
}

.card li::before {
  content: "✅";
  margin-right: 0.5rem;
  color: #4caf50;
}

/* Appel à l'action */
.cta-container {
  text-align: center;
  margin-top: 2rem;
}

.cta-button {
  background: #4caf50;
  color: white;
  font-size: 1.2rem;
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.cta-button:hover {
  background: #388e3c;
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

@keyframes slideIn {
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes zoomIn {
  from {
    transform: scale(0.8);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

/* Conteneur du bouton CTA */
.cta-container {
  text-align: center;
  margin-top: 2rem;
}
</style>
