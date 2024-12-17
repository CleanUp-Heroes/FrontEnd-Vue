<template>
  <div class="login-page">
    <form @submit.prevent="login" class="login-form">
      <h2 class="form-title">Connexion</h2>
      <div class="form-group">
        <label for="username">Nom d'utilisateur :</label>
        <input 
          type="text" 
          id="username" 
          v-model="username" 
          placeholder="Entrez votre nom" 
          required 
          class="form-input" 
        />
      </div>
      <button type="submit" class="form-button">Se connecter</button>
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
/* Conteneur général pour la page */
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw; /* Occupe toute la largeur de l'écran */
  height: 100vh; /* Occupe toute la hauteur de l'écran */
  background-color: #f0f9f5; /* Vert pâle pour un fond doux */
  padding: 2rem;
  box-sizing: border-box;
  overflow: hidden; /* Évite les débordements */
}

/* Formulaire de connexion */
.login-form {
  background: #ffffff; /* Fond blanc pour contraste */
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 500px; /* Étendre la largeur pour plus de confort */
  box-sizing: border-box;
}

/* Titre du formulaire */
.form-title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 2rem;
  text-align: center;
  color: #1a6f4b; /* Vert foncé inspirant la nature */
}

/* Groupes de champs */
.form-group {
  margin-bottom: 1.5rem;
  width: 100%;
}

/* Labels */
.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: #3a3a3a; /* Gris pour lisibilité */
}

/* Champs de saisie */
.form-input {
  width: 100%; /* Champs prennent toute la largeur */
  max-width: 400px; /* Largeur maximale pour grands écrans */
  height: 3rem; /* Hauteur accrue pour un confort visuel */
  padding: 1rem;
  border: 1px solid #c8dad3; /* Gris clair avec teinte verte */
  border-radius: 8px;
  box-sizing: border-box;
  font-size: 1.1rem; /* Augmenter la taille de la police */
  display: block;
  margin: 0 auto; /* Centrer les champs */
  transition: border-color 0.3s ease;
}

.form-input:focus {
  border-color: #1a6f4b;
  outline: none;
  box-shadow: 0 0 6px rgba(26, 111, 75, 0.25);
}

/* Bouton de connexion */
.form-button {
  display: block;
  width: 100%;
  max-width: 400px; /* Même largeur que les champs */
  margin: 0 auto; /* Centrer le bouton */
  padding: 1rem;
  background-color: #1a6f4b;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  text-transform: uppercase;
  transition: background-color 0.3s ease;
}

.form-button:hover {
  background-color: #145d3c;
}

/* Responsivité */
@media (max-width: 768px) {
  .login-form {
    padding: 2rem;
    max-width: 100%; /* Prendre toute la largeur sur petits écrans */
  }
  .form-input,
  .form-button {
    max-width: 100%; /* S'adapter à la largeur disponible */
  }
}
</style>
