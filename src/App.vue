<template>
  <div id="app">
    <AppHeader />

    <!-- Navigation conditionnelle : affichée seulement si connecté -->
    <nav v-if="isAuthenticated" class="vertical-navigation"> 
      <ul> 
        <!-- Menu des défis -->
        <li>
          <button @click="toggleMenu('challenges')" class="menu-item">
            <span class="icon">🎯</span> Défis
          </button>
          <ul v-if="activeMenu === 'challenges'" class="sub-menu">
            <li><router-link to="/challenges">Tous les défis</router-link></li>
            <li><router-link to="/challenges">MesParticipations</router-link></li>
          </ul>
        </li>

        <!-- Menu des statistiques -->
        <li>
          <button @click="toggleMenu('stats')" class="menu-item">
            <span class="icon">📊</span> Statistiques
          </button>
          <ul v-if="activeMenu === 'stats'" class="sub-menu">
            <li><router-link to="/stats">Voir les statistiques</router-link></li>
          </ul>
        </li>

        <!-- Menu du signalement -->
        <li>
          <button @click="toggleMenu('reportForm')" class="menu-item">
            <span class="icon">⚠️</span> Signalement
          </button>
          <ul v-if="activeMenu === 'reportForm'" class="sub-menu">
            <li><router-link to="/reports">Carte des signalements</router-link></li>
          </ul>
        </li>
        <li>
          <button @click="toggleMenu('classements')" class="menu-item">
            <span class="icon">🏆</span> Classements
          </button>
          <ul v-if="activeMenu === 'classements'" class="sub-menu">
            <li><router-link to="/classement">Classement global</router-link></li>
          </ul>
        </li>

        <!-- Menu des événements -->
        <li>
          <button @click="toggleMenu('events')" class="menu-item">
            <span class="icon">📅</span> Événements
          </button>
          <ul v-if="activeMenu === 'events'" class="sub-menu">
            <li><router-link to="/events">Liste des événements</router-link></li>
            <li><router-link to="/events/create">Créer un événement</router-link></li>
            <li><router-link :to="`/events/1/participate`">Participer à un événement</router-link></li>
            <li><router-link to="/events/history">Historique des événements</router-link></li>
          </ul>
        </li>
      
        <!-- Menu du volontariat -->
<!-- Menu du volontariat -->
<li>
  <button @click="toggleMenu('Volontariat')" class="menu-item">
    <span class="icon">🤝</span> Volontariat
  </button>
  <ul :class="{'sub-menu': true, 'active': activeMenu === 'Volontariat'}">
    <li><router-link to="/recrutement">Offres de Recrutement</router-link></li>
    <li><router-link to="/candidatures">Liste des Candidatures</router-link></li>
    <li><router-link to="/validation">Validation et Affectation</router-link></li>
    <li><router-link to="/formation">Formation</router-link></li>
    <li><router-link to="/suivi-missions">Suivi des Missions</router-link></li>
  </ul>
</li>
<!-- Menu du Quiz -->
<li>
  <button @click="toggleMenu('QuizEnvironnementaux')" class="menu-item">
    <span class="icon">🌍</span> Quiz Environnementaux
  </button>
  <ul :class="{'sub-menu': true, 'active': activeMenu === 'QuizEnvironnementaux'}">
    <li><router-link to="/participer-quiz">Participer au Quiz</router-link></li>
    <li><router-link to="/obtention-recompense">Obtention de la Récompense</router-link></li>
  </ul>
</li>

      </ul>
    </nav>


    <!--</ul> -->

    <!-- Contenu principal -->
    <main class="main-content">
      <router-view />
    </main>

    <AppFooter />
  </div>
</template>

<script>
import AppHeader from "./components/Header.vue";
import AppFooter from "./components/Footer.vue";
import { authState, updateAuthState } from "./authState";

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

/* Empêche que le lien actif change de couleur */
.router-link-active {
  color: white !important; /* Force la couleur du texte à rester blanche */
  background-color: #1a6f4b; /* Assure que le fond reste de la même couleur que les autres éléments */
  text-decoration: none; /* Enlève le soulignement */
}

.router-link-active:hover {
  background-color: #145d3c; /* Garder un effet de survol sur le lien actif */
}

.sub-menu {
  list-style: none;
  margin-top: 0.5rem;
  padding-left: 1.5rem;
  display: none;  /* Le sous-menu est caché par défaut */
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

.sub-menu.active {
  display: block;    /* Le sous-menu devient visible lorsque 'active' est ajouté */
  opacity: 1;        /* L'animation d'opacité se déclenche */
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
