<template>
    <div class="form-container">
      <CreateEventForm @eventCreated="redirectToEventList" />
    </div>
  </template>
  
  <script>
  import CreateEventForm from "@/components/CreateEventForm.vue";
  
  export default {
    components: {
      CreateEventForm,
    },
    methods: {
      redirectToEventList() {
        alert("Événement créé avec succès !");
        this.$router.push("/events");
      },
    },
  };
  </script>
  
  <style scoped>
  /* Conteneur général pour centrer le formulaire */
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
  
  /* Style global pour le formulaire */
  .challenge-form {
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
  