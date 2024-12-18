<template>
  <div id="app">
    <!-- Affiche l'entête uniquement si l'utilisateur est authentifié -->
    <AppHeader v-if="isAuthenticated" />

    <!-- Navigation conditionnelle : affichée seulement si connecté -->
    <nav v-if="isAuthenticated" class="vertical-navigation">
      <ul>
        <li>
          <button @click="toggleMenu('challenges')">Défis</button>
          <ul v-if="activeMenu === 'challenges'">
            <li><router-link to="/challenges">Tous les défis</router-link></li>
          </ul>
        </li>
        <li>
          <button @click="toggleMenu('form')">Formulaire</button>
          <ul v-if="activeMenu === 'form'">
            <li><router-link to="/form">Soumettre un formulaire</router-link></li>
          </ul>
        </li>
        <li>
          <button @click="toggleMenu('stats')">Statistiques</button>
          <ul v-if="activeMenu === 'stats'">
            <li><router-link to="/stats">Voir les statistiques</router-link></li>
          </ul>
        </li>
      </ul>
    </nav>

    <!-- Contenu principal -->
    <main class="main-content">
      <router-view />
    </main>

    <!-- Pied de page affiché uniquement si authentifié -->
    <AppFooter v-if="isAuthenticated" />
  </div>
</template>

<script>
import AppHeader from "./components/Header.vue";
import AppFooter from "./components/Footer.vue";

export default {
  name: "App",
  components: {
    AppHeader,
    AppFooter,
  },
  data() {
    return {
      isAuthenticated: false, // Suivi de l'état de connexion
      activeMenu: null, // Permet de savoir quel menu est ouvert
    };
  },
  created() {
    this.isAuthenticated = !!localStorage.getItem("username");
  },
  methods: {
    updateAuthState() {
      this.isAuthenticated = !!localStorage.getItem("username");
    },
    toggleMenu(menu) {
      this.activeMenu = this.activeMenu === menu ? null : menu;
    },
  },
  mounted() {
    window.addEventListener("storage", this.updateAuthState);
  },
  beforeUnmount() {
    window.removeEventListener("storage", this.updateAuthState);
  },
};
</script>

<style scoped>
/* Conteneur général de la navigation */
.vertical-navigation {
  background-color: #38bd94;
  padding: 1rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  width: 200px;
}

.vertical-navigation ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.vertical-navigation li {
  margin-bottom: 1rem;
}

.vertical-navigation button {
  background-color: #1a6f4b;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  width: 100%;
  text-align: left;
  padding: 0.8rem 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.vertical-navigation button:hover {
  background-color: #145d3c;
}

.vertical-navigation ul ul {
  margin-top: 0.5rem;
  padding-left: 1.5rem;
}

.vertical-navigation ul ul li {
  margin-bottom: 0.5rem;
}

.vertical-navigation ul ul a {
  text-decoration: none;
  color: white;
  padding: 0.5rem;
  display: block;
  border-radius: 3px;
  transition: background-color 0.3s ease;
}

.vertical-navigation ul ul a:hover {
  background-color: #38bd94;
}

/* Contenu principal */
.main-content {
  flex: 1;
  padding: 2rem;
  background-color: #ffffff;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
