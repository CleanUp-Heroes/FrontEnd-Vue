<template>
  <div id="app">
    <!-- Affiche l'entête uniquement si l'utilisateur est authentifié -->
    <AppHeader v-if="isAuthenticated" />

    <!-- Navigation conditionnelle : affichée seulement si connecté -->
    <nav v-if="isAuthenticated">
      <ul>
        <li><router-link to="/challenges">Défis</router-link></li>
        <li><router-link to="/form">Formulaire</router-link></li>
        <li><router-link to="/stats">Statistiques</router-link></li>
      </ul>
    </nav>

    <!-- Contenu principal -->
    <router-view />

    <!-- Pied de page affiché uniquement si authentifié -->
    <AppFooter v-if="isAuthenticated" />
  </div>
</template>

<script>
import AppHeader from "./components/Header.vue"; // Chemin vers Header.vue
import AppFooter from "./components/Footer.vue"; // Chemin vers Footer.vue

export default {
  name: "App",
  components: {
    AppHeader,
    AppFooter,
  },
  data() {
    return {
      isAuthenticated: false, // Suivi de l'état de connexion
    };
  },
  created() {
    // Vérifie si l'utilisateur est connecté
    this.isAuthenticated = !!localStorage.getItem("username");
  },
  methods: {
    updateAuthState() {
      this.isAuthenticated = !!localStorage.getItem("username");
    },
  },
  mounted() {
    // Met à jour l'état si localStorage change (utile pour des déconnexions externes)
    window.addEventListener("storage", this.updateAuthState);
  },
  beforeUnmount() {
    window.removeEventListener("storage", this.updateAuthState);
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
</style>






<!-- <template>

  <div id="app">
    <AppHeader />
    <nav>
      <ul v-if="isAuthenticated">
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

  data() {
    return {
      isAuthenticated: false, // État pour suivre la connexion
    };
  },
  created() {
    // Vérifie si l'utilisateur est connecté
    this.isAuthenticated = !!localStorage.getItem("username");
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
</style> -->
