<template>
    <div class="recrutement-page">
      <h1>Recrutement</h1>
  
      <section class="recrutement-info">
        <h2>Offres de recrutement</h2>
        <p>Découvrez nos offres de recrutement et postulez dès maintenant !</p>
        
        <div class="offre">
          <h3>Offre de recrutement 1</h3>
          <p>Description du poste, compétences requises, et autres détails.</p>
          <button @click="applyForJob(1)">Postuler</button>
        </div>
  
        <div class="offre">
          <h3>Offre de recrutement 2</h3>
          <p>Description du poste, compétences requises, et autres détails.</p>
          <button @click="applyForJob(2)">Postuler</button>
        </div>
  
        <!-- Ajouter d'autres offres si nécessaire -->
      </section>
  
      <!-- Formulaire de candidature -->
      <section class="candidature-form">
        <h2>Postuler à une offre</h2>
        <form @submit.prevent="submitApplication">
          <div>
            <label for="fullName">Nom complet:</label>
            <input type="text" id="fullName" v-model="application.name" required />
          </div>
  
          <div>
            <label for="email">Email:</label>
            <input type="email" id="email" v-model="application.email" required />
          </div>
  
          <div>
            <label for="message">Message:</label>
            <textarea id="message" v-model="application.message" required></textarea>
          </div>
  
          <button type="submit">Envoyer ma candidature</button>
        </form>
      </section>
    </div>
  </template>
  
  <script>
  export default {
    name: "RecrutementPage",
    data() {
      return {
        application: {
          name: '',
          email: '',
          message: '',
        },
      };
    },
    methods: {
      applyForJob(jobId) {
        // Logique pour postuler à un emploi
        console.log(`Postulation pour le poste ${jobId}`);
      },
      submitApplication() {
        // Logique pour soumettre la candidature
        console.log('Candidature envoyée:', this.application);
        // Vous pouvez ici envoyer les données du formulaire à un backend
        alert('Candidature envoyée avec succès');
        this.resetForm();
      },
      resetForm() {
        this.application.name = '';
        this.application.email = '';
        this.application.message = '';
      },
    },
  };
  </script>
  
  <style scoped>
  .recrutement-page {
    padding: 2rem;
  }
  
  .recrutement-info {
    margin-bottom: 2rem;
  }
  
  .offre {
    background-color: #f4f4f4;
    margin-bottom: 1rem;
    padding: 1rem;
    border-radius: 5px;
  }
  
  button {
    background-color: #38bd94;
    color: white;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  button:hover {
    background-color: #145d3c;
  }
  
  .candidature-form {
    background-color: #f4f4f4;
    padding: 2rem;
    border-radius: 5px;
  }
  
  .candidature-form div {
    margin-bottom: 1rem;
  }
  
  .candidature-form label {
    display: block;
    margin-bottom: 0.5rem;
  }
  
  .candidature-form input,
  .candidature-form textarea {
    width: 100%;
    padding: 0.8rem;
    border-radius: 5px;
    border: 1px solid #ccc;
  }
  
  .candidature-form button {
    background-color: #38bd94;
    color: white;
    padding: 0.8rem 1.5rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
  }
  
  .candidature-form button:hover {
    background-color: #145d3c;
  }
  </style>
  