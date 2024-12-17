<template>
    <div class="about">
      <h1>À propos de Cleanup Heroes</h1>
      <p>
        Cleanup Heroes est une initiative visant à encourager les citoyens à adopter des comportements responsables pour préserver notre environnement. 
        Grâce à des défis motivants et des récompenses locales, nous créons une communauté active engagée dans la réduction des déchets et la protection de la nature.
      </p>
  
      <h2>Notre mission</h2>
      <p>
        Sensibiliser et accompagner les individus vers une gestion responsable des déchets en utilisant la technologie et la gamification.
      </p>
  
      <h2>Comment ça fonctionne ?</h2>
      <ul>
        <li>Participez à des défis écologiques.</li>
        <li>Enregistrez vos progrès via l'application.</li>
        <li>Accumulez des points et échangez-les contre des récompenses locales.</li>
      </ul>
  
      <h2>Rejoignez-nous !</h2>
      <p>
        Ensemble, nous pouvons faire une réelle différence. Chaque petit geste compte pour un avenir plus propre.
      </p>
    </div>
  </template>
  
  <script>
  export default {
    name: "AboutPage",
  };
  </script>
  
  <style scoped>
  .about {
    padding: 2rem;
    background-color: #f4f9f6; /* Vert clair apaisant */
    color: #333; /* Texte sombre pour un bon contraste */
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    max-width: 800px;
    margin: 2rem auto;
    line-height: 1.6;
  }
  
  .about h1 {
    font-size: 2rem;
    color: #2e7d32; /* Vert foncé */
    margin-bottom: 1rem;
  }
  
  .about h2 {
    font-size: 1.5rem;
    color: #388e3c; /* Vert intermédiaire */
    margin-top: 1.5rem;
    margin-bottom: 0.5rem;
  }
  
  .about p {
    font-size: 1rem;
    margin-bottom: 1rem;
  }
  
  .about ul {
    list-style-type: disc;
    padding-left: 1.5rem;
    margin-bottom: 1rem;
  }
  
  .about li {
    margin-bottom: 0.5rem;
  }
  </style>
  