<template>
  <div id="app">
    
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
          <button @click="toggleMenu('form')" class="menu-item">
            <span class="icon">📝</span> Formulaire
          </button>
          <ul v-if="activeMenu === 'form'" class="sub-menu">
            <li><router-link to="/form">Soumettre un formulaire</router-link></li>
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

    
    <AppFooter/>
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
  display: flex; /* Passage à un modèle de disposition flexible */
  justify-content: space-around; /* Espacement entre les éléments */
  align-items: center;
}

/* Liste d'éléments du menu (en ligne maintenant) */
.vertical-navigation ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex; /* Disposition horizontale */
}

.vertical-navigation li {
  margin-right: 2rem; /* Espacement entre les éléments du menu */
  position: relative; /* Nécessaire pour que les sous-menus se positionnent correctement */
}

/* Boutons du menu */
.menu-item {
  background-color: #1a6f4b;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  padding: 0.8rem 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
  font-size: 1.2rem; /* Taille de la police augmentée */
}

.menu-item:hover {
  background-color: #145d3c;
  transform: scale(1.05); /* Effet d'agrandissement */
}

.menu-item .icon {
  margin-right: 0.5rem;
}

/* Sous-menu */
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
  top: 100%; /* Positionnement sous le menu parent */
  left: 0;
  z-index: 10;
  width: max-content; /* Ajuste la largeur du sous-menu */
}

/* Liens dans les sous-menus */
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

/* Affichage du sous-menu lorsque l'élément est actif */
.vertical-navigation li:hover .sub-menu {
  display: block;
  opacity: 1;
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
