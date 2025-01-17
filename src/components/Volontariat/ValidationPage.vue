<template>
    <div class="validation-page">
      <h1>Validation des Candidatures</h1>
  
      <section class="candidatures-list">
        <h2>Candidatures en attente</h2>
        <div v-if="loading">Chargement des candidatures...</div>
        <div v-else-if="candidatures.length === 0">Aucune candidature en attente.</div>
        <div v-else>
          <div v-for="candidature in candidatures" :key="candidature.id" class="candidature-item">
            <h3>{{ candidature.name }} - {{ candidature.email }}</h3>
            <p>{{ candidature.message }}</p>
            
            <div class="actions">
              <button @click="validateCandidature(candidature.id, true)">Valider</button>
              <button @click="validateCandidature(candidature.id, false)">Refuser</button>
            </div>
  
            <div v-if="candidature.status !== 'pending'">
              <p>Status: {{ candidature.status }}</p>
              <p>Commentaire: {{ candidature.commentaire }}</p>
            </div>
  
            <div v-if="showCommentForm === candidature.id">
              <textarea v-model="commentaire" placeholder="Ajouter un commentaire"></textarea>
              <button @click="submitComment(candidature.id)">Envoyer le commentaire</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ValidationPage',
    data() {
      return {
        candidatures: [],
        loading: true,
        commentaire: '',
        showCommentForm: null,
      };
    },
    methods: {
      // Récupérer les candidatures en attente
      async fetchCandidatures() {
        try {
          const response = await fetch('/api/candidatures');  // Modifier l'URL si nécessaire
          const data = await response.json();
          this.candidatures = data.filter(c => c.status === 'pending');
          this.loading = false;
        } catch (error) {
          console.error('Erreur lors du chargement des candidatures:', error);
        }
      },
      
      // Valider ou refuser une candidature
      async validateCandidature(candidatureId, isAccepted) {
        try {
          const response = await fetch(`/api/candidatures/${candidatureId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              status: isAccepted ? 'accepted' : 'rejected',
              commentaire: this.commentaire,
            }),
          });
          
          const data = await response.json();
          this.showCommentForm = null;
          this.fetchCandidatures(); // Recharger les candidatures après mise à jour
          alert(data.message || 'Candidature mise à jour avec succès');
        } catch (error) {
          console.error('Erreur lors de la validation de la candidature:', error);
        }
      },
      
      // Afficher ou masquer le formulaire de commentaire
      toggleCommentForm(candidatureId) {
        this.showCommentForm = this.showCommentForm === candidatureId ? null : candidatureId;
      },
  
      // Soumettre le commentaire
      submitComment(candidatureId) {
        if (!this.commentaire) {
          alert('Veuillez ajouter un commentaire.');
          return;
        }
        this.validateCandidature(candidatureId, true); // Valider par défaut avec commentaire
      },
    },
    mounted() {
      this.fetchCandidatures();
    },
  };
  </script>
  
  <style scoped>
  .validation-page {
    padding: 2rem;
  }
  
  .candidatures-list {
    margin-top: 2rem;
  }
  
  .candidature-item {
    background-color: #f4f4f4;
    margin-bottom: 1rem;
    padding: 1rem;
    border-radius: 5px;
  }
  
  .actions {
    margin-top: 1rem;
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
  
  textarea {
    width: 100%;
    padding: 0.8rem;
    border-radius: 5px;
    border: 1px solid #ccc;
  }
  
  textarea:focus {
    border-color: #38bd94;
  }
  </style>
  