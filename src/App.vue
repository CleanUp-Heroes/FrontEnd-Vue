<template>
  <div id="app">
    <!-- Affiche l'entête uniquement si l'utilisateur est authentifié -->
    <AppHeader/>

    <!-- Navigation conditionnelle : affichée seulement si connecté -->
    <nav v-if="isAuthenticated" class="vertical-navigation">
      <ul>
        <li>
          <button @click="toggleMenu('challenges')" class="menu-item">
            <span class="icon">🎯</span> Défis
          </button>
          <ul v-if="activeMenu === 'challenges'" class="sub-menu">
            <li><router-link to="/challenges">Tous les défis</router-link></li>
          </ul>
        </li>
        <li>
          <button @click="toggleMenu('stats')" class="menu-item">
            <span class="icon">📊</span> Statistiques
          </button>
          <ul v-if="activeMenu === 'stats'" class="sub-menu">
            <li><router-link to="/stats">Voir les statistiques</router-link></li>
          </ul>
        </li>
        <li>
          <button @click="toggleMenu('reportForm')" class="menu-item">
            <span class="icon">⚠️</span> Signalement
          </button>
          <ul v-if="activeMenu === 'reportForm'" class="sub-menu">
            <li><router-link to="/reportForm">Formulaire</router-link></li>
          </ul>
        </li>
      </ul>
    </nav>

    <!-- Contenu principal -->
    <main class="main-content">
      <router-view />
    </main>

    <!-- Pied de page affiché uniquement si authentifié -->
    <AppFooter />
  </div>
</template>

<script>
import AppHeader from "./components/Header.vue";
import AppFooter from "./components/Footer.vue";
import { authState, updateAuthState } from './authState';  

export default {
  name: "App",
  components: {
    AppHeader,
    AppFooter,
  },
  data() {
    return {
      activeMenu: null, // Permet de savoir quel menu est ouvert
    };
  },
  computed: {
    // Computed pour accéder à authState depuis le template
    isAuthenticated() {
      return authState.isAuthenticated;
    },
  },
  methods: {
    toggleMenu(menu) {
      this.activeMenu = this.activeMenu === menu ? null : menu;
    },
  },
  mounted() {
    window.addEventListener("storage", updateAuthState);
  },
  beforeUnmount() {
    window.removeEventListener("storage", updateAuthState);
  },
};
</script>

<style scoped>
.vertical-navigation {
  background-color: #38bd94;
  padding: 1rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.vertical-navigation ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
}

.vertical-navigation li {
  margin-right: 2rem;
  position: relative;
}

.menu-item {
  background-color: #1a6f4b;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  padding: 0.8rem 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
  font-size: 1.2rem;
}

.menu-item:hover {
  background-color: #145d3c;
  transform: scale(1.05);
}

.menu-item .icon {
  margin-right: 0.5rem;
}

.sub-menu {
  list-style: none;
  margin-top: 0.5rem;
  padding-left: 1.5rem;
  display: none;
  opacity: 0;
  transition: opacity 0.3s ease;
  position: absolute;
  background-color: #38bd94;
  border-radius: 5px;
  top: 100%;
  left: 0;
  z-index: 10;
  width: max-content;
}

.sub-menu li {
  margin-bottom: 0.5rem;
}

.sub-menu a {
  text-decoration: none;
  color: white;
  padding: 0.5rem;
  display: block;
  border-radius: 3px;
  transition: background-color 0.3s ease;
}

.sub-menu a:hover {
  background-color: #145d3c;
}

.vertical-navigation li:hover .sub-menu {
  display: block;
  opacity: 1;
}

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
