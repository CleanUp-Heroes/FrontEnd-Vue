<template>
    <div class="container">
      <h1>Validation et Affectation des Candidatures</h1>
  
      <!-- Liste des candidatures en attente -->
      <div class="job-applications">
        <h2>Candidatures en attente</h2>
        <ul v-if="applications.length">
          <li v-for="application in applications" :key="application.id">
            <strong>{{ application.full_name }}</strong> pour l'offre "{{ application.job_offer.title }}"
            <button @click="selectApplication(application)">Valider / Refuser</button>
          </li>
        </ul>
        <p v-else>Aucune candidature en attente.</p>
      </div>
  
      <!-- Formulaire pour valider ou refuser une candidature -->
      <div v-if="selectedApplication" class="application-action">
        <h3>Valider ou Refuser la candidature</h3>
        <form @submit.prevent="submitAction">
          <label for="comment">Commentaire :</label>
          <textarea v-model="comment" required></textarea>
  
          <label for="status">Statut :</label>
          <select v-model="status">
            <option value="validé">Validé</option>
            <option value="refusé">Refusé</option>
          </select>
  
          <button type="submit">Valider</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        applications: [], // Liste des candidatures à afficher
        selectedApplication: null, // Candidature sélectionnée
        comment: '', // Commentaire pour la validation ou le refus
        status: 'validé' // Statut par défaut
      };
    },
    methods: {
      // Charger les candidatures depuis l'API
      async loadApplications() {
        try {
          const response = await fetch('https://votre-api-url/candidatures');
          const data = await response.json();
          this.applications = data;
        } catch (error) {
          console.error('Erreur lors du chargement des candidatures:', error);
        }
      },
      
      // Sélectionner une candidature pour la validation ou le refus
      selectApplication(application) {
        this.selectedApplication = application;
        this.comment = '';
        this.status = 'validé';
      },
      
      // Soumettre la validation ou le refus d'une candidature
      async submitAction() {
        if (!this.selectedApplication) return;
  
        const requestBody = {
          status: this.status,
          comment: this.comment
        };
  
        try {
          const response = await fetch(`https://votre-api-url/candidatures/${this.selectedApplication.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
          });
  
          if (response.ok) {
            alert('Candidature mise à jour avec succès.');
            this.loadApplications(); // Recharger la liste des candidatures
            this.selectedApplication = null; // Réinitialiser la candidature sélectionnée
          } else {
            alert('Erreur lors de la mise à jour de la candidature.');
          }
        } catch (error) {
          console.error('Erreur lors de la mise à jour de la candidature:', error);
        }
      }
    },
    mounted() {
      this.loadApplications(); // Charger les candidatures au démarrage
    }
  };
  </script>
  
  <style scoped>
  /* Styles similaires à ceux précédemment fournis */
  .container {
    width: 80%;
    margin: 0 auto;
    padding-top: 20px;
  }
  
  h1, h2, h3 {
    text-align: center;
  }
  
  .job-applications ul {
    list-style-type: none;
    padding: 0;
  }
  
  .job-applications li {
    background-color: #fff;
    margin: 10px 0;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  }
  
  .application-action {
    margin-top: 30px;
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  }
  
  textarea {
    width: 100%;
    height: 100px;
    margin-bottom: 10px;
  }
  
  select {
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
  }
  
  button {
    background-color: #4CAF50;
    color: white;
    padding: 10px;
    border: none;
    width: 100%;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #45a049;
  }
  </style>
  