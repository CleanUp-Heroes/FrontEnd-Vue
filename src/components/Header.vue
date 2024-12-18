<template>
  <header class="app-header">
    <div class="logo">
      <!-- Inclure le logo -->
      <img src="@/assets/cleanup.png" alt="Cleanup Heroes Logo" class="logo-image" />
      <h1>Cleanup Heroes</h1>
    </div>
    <nav>
      <ul class="nav-links">
        <li><router-link to="/Acceuil">Accueil</router-link></li>
        <li><router-link to="/reports">Carte des signalements</router-link></li>
        <li><router-link to="/login">Connexion/Inscription</router-link></li>
        <li><router-link to="/About">À propos</router-link></li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: "AppHeader",
};
</script>

<style scoped>
/* Conteneur principal du header */
.app-header {
  background-color: #1a6f4b;
  color: #ffffff;
  padding: 2rem 2rem; /* Augmenter la hauteur via le padding */
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
  height: 100px; /* Contrôle précis de la hauteur */
}

.logo {
  display: flex;
  align-items: center;
  gap: 2rem; /* Plus d'espace entre le logo et le titre */
}

.logo h1 {
  margin: 0;
  font-size: 2rem;
  font-weight: bold;
  color: #f4f9f6;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
}

.logo-image {
  height: 80px; /* Taille du logo agrandie */
  width: auto;
  background-color: white;
  padding: 8px;
  border-radius: 50%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.nav-links {
  list-style: none;
  display: flex;
  gap: 2rem; /* Espacement entre les liens */
  margin: 0;
  padding: 0;
}

.nav-links li {
  display: inline;
}

.nav-links a {
  text-decoration: none;
  color: #ffffff;
  font-weight: bold;
  font-size: 1rem;
  transition: color 0.3s ease, background-color 0.3s ease;
  padding: 0.5rem 1rem;
  border-radius: 4px;
}

.nav-links a:hover {
  background-color: #6dbd38;
  color: #ffffff;
}

@media (max-width: 768px) {
  .nav-links {
    flex-direction: column;
    gap: 1rem;
  }

  .nav-links a {
    text-align: center;
    display: block;
  }
}
</style>
