<template>
    <div class="login-page">
      <h2>Connexion</h2>
      <form @submit.prevent="login">
        <label for="username">Nom d'utilisateur :</label>
        <input type="text" id="username" v-model="username" placeholder="Entrez votre nom" required />
        <button type="submit">Se connecter</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    name: "loginPage",
    data() {
      return {
        username: "",
      };
    },
    methods: {
      login() {
        if (this.username) {
          // Enregistrer le nom de l'utilisateur
          localStorage.setItem("username", this.username);
  
          // Rediriger vers la page d'accueil ou une route par défaut
          this.$router.push("/challenges");
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Styles pour la page de connexion */
  .login-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
  }
  
  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  </style>
  