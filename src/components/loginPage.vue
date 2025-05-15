<template>
  <div class="auth-page">
    <!-- Formulaire de Connexion -->
    <form v-if="!isSignup" @submit.prevent="login" class="form-container">
      <h2 class="form-title">Connexion</h2>
      <div class="form-group">
        <label for="username">Nom d'utilisateur :</label>
        <input 
          type="text" 
          id="username" 
          v-model="username" 
          placeholder="Entrez votre nom d'utilisateur :  votre Prenom.Nom" 
          required 
          class="form-input" 
        />
      </div>
      <!-- Champ Mot de Passe -->
      <div class="form-group">
        <label for="password">Mot de passe :</label>
        <input 
          type="password" 
          id="password" 
          v-model="password" 
          placeholder="Entrez votre mot de passe" 
          required 
          class="form-input" 
        />
      </div>
      <button type="submit" class="form-button">Se connecter</button>
      <p class="switch-form-text">Pas encore de compte ? <span @click="toggleForm" class="link">S'inscrire</span></p>
    </form>

    <!-- Formulaire d'Inscription -->
    <form v-if="isSignup" @submit.prevent="signup" class="form-container">
      <h2 class="form-title">Inscription</h2>
      <div class="form-group">
        <label for="first-name">Prénom :</label>
        <input 
          type="text" 
          id="first-name" 
          v-model="firstName" 
          placeholder="Entrez votre prénom" 
          required 
          class="form-input" 
        />
      </div>
      <div class="form-group">
        <label for="last-name">Nom :</label>
        <input 
          type="text" 
          id="last-name" 
          v-model="lastName" 
          placeholder="Entrez votre nom" 
          required 
          class="form-input" 
        />
      </div>
      <div class="form-group">
        <label for="email">Adresse E-mail :</label>
        <input 
          type="email" 
          id="email" 
          v-model="email" 
          placeholder="Entrez votre adresse e-mail" 
          required 
          class="form-input" 
        />
      </div>
      <!-- Champ Mot de passe pour l'inscription -->
      <div class="form-group">
        <label for="password">Mot de passe :</label>
        <input 
          type="password" 
          id="password" 
          v-model="password" 
          required 
          class="form-input" 
        />
      </div>
      <button type="submit" class="form-button">S'inscrire</button>
      <p class="switch-form-text">Vous avez déjà un compte ? <span @click="toggleForm" class="link">Se connecter</span></p>
    </form>
  </div>
</template>

<script>
import { updateAuthState } from "../authState"; // Importation directe de updateAuthState
import axios from "axios";

export default {
  name: "authPage",
  data() {
    return {
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      isSignup: false,
      errorMessage: "",
    };
  },
  methods: {
    async login() {
      if (this.username && this.password) {
        try {
          const response = await axios.post("http://127.0.0.1:8000/login/", {
            username: this.username,
            password: this.password,
          });

          if (response.status === 200) {
            localStorage.setItem("token", response.data.token); // Sauvegarde du token
            localStorage.setItem("isModerator", response.data.is_moderator); // Sauvegarde du statut de modérateur
            localStorage.setItem("username", response.data.username); // Sauvegarde du nom d'utilisateur
            updateAuthState(); // Met à jour l'état d'authentification
            this.$router.push("/challenges");
          }
        } catch (error) {
          alert("Échec de la connexion. Vérifiez vos identifiants.");
          console.error("Erreur lors de la connexion :", error.response || error);
        }
      } else {
        alert("Veuillez remplir tous les champs.");
      }
    },
    async signup() {
      if (this.firstName && this.lastName && this.email && this.password) {
        try {
          const response = await axios.post("http://127.0.0.1:8000/register/", {
            first_name: this.firstName,
            last_name: this.lastName,
            email: this.email,
            password: this.password,
          });

          if (response.status === 201) {
            alert("Votre compte a été créé avec succès.");
            this.toggleForm(); // Bascule vers la connexion
          }
        } catch (error) {
          this.errorMessage = "Échec de l'inscription. Veuillez réessayer.";
          console.error("Erreur lors de l'inscription :", error.response || error);
        }
      }
    },
    toggleForm() {
      this.isSignup = !this.isSignup;
    },
  },
  created() {
    updateAuthState(); // Vérification de l'état d'authentification lors du chargement du composant
  },
};
</script>

<style scoped>
/* Conteneur général pour centrer le formulaire */
.auth-page {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: #e3f2f5;
  padding: 2rem;
  box-sizing: border-box;
  overflow: hidden;
}

/* Style global pour le formulaire */
.form-container {
  background: #ffffff;
  padding: 3rem;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  width: 90%;
  max-width: 800px;
  box-sizing: border-box;
}

/* Titre du formulaire */
.form-title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 2rem;
  text-align: center;
  color: #1a6f4b;
}

/* Groupes de champs */
.form-group {
  margin-bottom: 2rem;
  width: 100%;
}

/* Labels */
.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: #3a3a3a;
}

/* Champs de saisie */
.form-input {
  width: 100%;
  max-width: 700px;
  height: 3rem;
  padding: 1.2rem;
  border: 1px solid #c8dad3;
  border-radius: 8px;
  box-sizing: border-box;
  font-size: 1.1rem;
  transition: border-color 0.3s ease;
  display: block;
  margin: 0 auto;
}

.form-input:focus {
  border-color: #1a6f4b;
  outline: none;
  box-shadow: 0 0 6px rgba(26, 111, 75, 0.25);
}

/* Messages d'erreur */
.error-message {
  color: red;
  font-size: 0.9rem;
  margin-top: 0.5rem;
  display: block;
}

/* Bouton de soumission */
.form-button {
  display: block;
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
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
</style>
