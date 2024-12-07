<template>
    <header class="app-header">
      <nav>
        <ul class="nav-links">
          <li><router-link to="/">Accueil</router-link></li>
          <li><router-link to="/reports">Carte des signalements</router-link></li>
          <li><router-link to="/about">À propos</router-link></li>
          <li><router-link to="/login">Connexion/Inscription</router-link></li>
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
  .app-header {
    background-color: #4caf50;
    color: white;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .nav-links {
    list-style: none;
    display: flex;
    gap: 1rem;
  }
  .nav-links li {
    display: inline;
  }
  .nav-links a {
    text-decoration: none;
    color: white;
    font-weight: bold;
  }
  .nav-links a:hover {
    text-decoration: underline;
  }
  </style>
  