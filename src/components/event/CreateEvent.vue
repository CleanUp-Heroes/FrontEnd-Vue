
<template>
    <div class="form-container">
      <form @submit.prevent="handleSubmit" class="challenge-form">
        <h2 class="form-title">Créer un événement</h2>
  
        /*Titre de l'événement */
        <div class="form-group">
          <label for="title">Titre de l'événement</label>
          <input
            type="text"
            id="title"
            v-model="event.title"
            class="form-input"
            required
          />
          <span v-if="errors.title" class="error-message">{{ errors.title }}</span>
        </div>
  
        /* Localisation */
        <div class="form-group">
          <label for="location">Localisation</label>
          <input
            type="text"
            id="location"
            v-model="event.location"
            class="form-input"
            required
          />
          <span v-if="errors.location" class="error-message">{{ errors.location }}</span>
        </div>
  
        /* Date et Heure */
        <div class="form-group">
          <label for="dateTime">Date et Heure</label>
          <input
            type="datetime-local"
            id="dateTime"
            v-model="event.date_time"
            class="form-input"
            required
          />
          <span v-if="errors.date_time" class="error-message">{{ errors.date_time }}</span>
        </div>
  
        /* Nombre maximum de participants  */
        <div class="form-group">
          <label for="maxParticipants">Nombre maximum de participants</label>
          <input
            type="number"
            id="maxParticipants"
            v-model="event.max_participants"
            class="form-input"
            required
          />
          <span v-if="errors.max_participants" class="error-message">{{ errors.max_participants }}</span>
        </div>
  
        /* Description */
        <div class="form-group">
          <label for="description">Description</label>
          <textarea
            id="description"
            v-model="event.description"
            class="form-input"
          ></textarea>
          <span v-if="errors.description" class="error-message">{{ errors.description }}</span>
        </div>
  
        /* Bouton de soumission */
        <button type="submit" class="form-button">Créer l'événement</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        event: {
          title: "",
          location: "",
          date_time: "",
          max_participants: "",
          description: "",
        },
        errors: {},
      };
    },
    methods: {
      validateForm() {
        this.errors = {};
        if (!this.event.title) this.errors.title = "Le titre est obligatoire.";
        if (!this.event.location) this.errors.location = "La localisation est obligatoire.";
        if (!this.event.date_time) this.errors.date_time = "La date et l'heure sont obligatoires.";
        if (!this.event.max_participants || this.event.max_participants <= 0)
          this.errors.max_participants = "Le nombre maximum de participants est obligatoire.";
        return Object.keys(this.errors).length === 0;
      },
      async handleSubmit() {
        if (!this.validateForm()) return;
        try {
          const token = localStorage.getItem('token');
          await axios.post("http://127.0.0.1:8000/create-event/", this.event, {
            headers: { 'Authorization': token, },
          });
          alert("Événement créé avec succès !");
          this.$router.push("/participate-event");
        } catch (error) {
          console.error(error);
          alert("Une erreur est survenue lors de la création de l'événement.");
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Conteneur principal du formulaire */
  .form-container {
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
  
  /* Style du formulaire */
  .challenge-form {
    background: #ffffff;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
    width: 100%;
    max-width: 800px;
    box-sizing: border-box;
    overflow-y: auto; /* Ajoute un défilement si nécessaire */
    max-height: 90vh; /* Limite la hauteur du formulaire */
  }
  
  /* Titre du formulaire */
  .form-title {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 1.5rem;
    text-align: center;
    color: #1a6f4b;
  }
  
  /* Groupes de champs */
  .form-group {
    margin-bottom: 1.5rem;
    width: 100%;
  }
  
  /* Labels des champs */
  .form-group label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: bold;
    color: #3a3a3a;
  }
  
  /* Champs de saisie */
  .form-input {
    width: 100%;
    height: 2.8rem; /* Taille réduite pour économiser de l'espace */
    padding: 0.8rem;
    border: 1px solid #c8dad3;
    border-radius: 8px;
    font-size: 1rem;
    display: block;
    margin: 0 auto;
  }
  
  /* Effet au focus */
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
  }
  
  /* Bouton de soumission */
  .form-button {
    width: 100%;
    padding: 1rem;
    background-color: #1a6f4b;
    color: #fff;
    border: none;
    border-radius: 8px;
    font-size: 1.2rem;
    font-weight: bold;
    cursor: pointer;
    text-transform: uppercase;
  }
  
  /* Hover sur le bouton */
  .form-button:hover {
    background-color: #145d3c;
  }
  </style> 
  


 