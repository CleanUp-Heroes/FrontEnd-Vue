<template>
  <div id="app">
    <!-- Affiche l'entête uniquement si l'utilisateur est authentifié -->
    <Header v-if="isAuthenticated" />

    <!-- Navigation conditionnelle : affichée seulement si connecté -->
    <nav v-if="isAuthenticated">
      <ul>
        <li><router-link to="/challenges">Défis</router-link></li>
        <li><router-link to="/form">Formulaire</router-link></li>
        <li><router-link to="/stats">Statistiques</router-link></li>
      </ul>
    </nav>

    <!-- Contenu principal : Affiche le formulaire de signalement et la carte -->
    <div v-if="isAuthenticated">
      <h2>Signaler un problème</h2>
      <ReportForm />  <!-- Le composant du formulaire -->
      <MapComponent />         <!-- Le composant de la carte interactive -->
    </div>

    <!-- Pied de page affiché uniquement si authentifié -->
    <Footer v-if="isAuthenticated" />
  </div>
</template>

<script>
import Header from './components/Header.vue';
import ReportForm from './components/ReportForm.vue';
import MapComponent from './components/MapComponent.vue';
import Footer from './components/Footer.vue';

export default {
  name: 'App',
  components: {
    Header,
    ReportForm,
    MapComponent,
    Footer,
  },
  data() {
    return {
      isAuthenticated: true, // initialisez à false ou récupérez de votre système d'authentification (false pour voir que la personne c'est vriment authentifié)
    };
  },
  created() {
    // Logique d'authentification : vérification de l'existence d'un token (exemple avec localStorage)
    const token = localStorage.getItem('auth_token');  // Récupérer un token depuis le stockage local
    if (token) {
      this.isAuthenticated = true; // Si un token existe, on considère que l'utilisateur est authentifié
    }
  },
};
</script>

<style scoped>
/* Ajoutez vos styles ici */
</style>
