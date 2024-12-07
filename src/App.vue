<template>

  <div id="app">
    <AppHeader />
    <nav>
      <ul>
        <li><router-link to="/challenges">Défis</router-link></li>
        <li><router-link to="/form">Formulaire</router-link></li>
        <li><router-link to="/stats">Statistiques</router-link></li>
      </ul>
    </nav>
    <router-view />
    <AppFooter />
  </div>
  
</template>

<script>

import AppHeader from "./components/Header.vue"; // Chemin vers votre fichier Header.vue
import AppFooter from "./components/Footer.vue"; // Chemin vers votre fichier Footer.vue


export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter,
  },
};
</script>

<style>
/* Styles globaux pour l'application */
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* Facultatif : ajouter un style de base pour router-view */
router-view {
  flex: 1;
}

/* Ajout d’un espace de style global si nécessaire */
</style>
