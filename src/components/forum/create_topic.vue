<template>
    <!-- Formulaire de création de sujet -->
    <div class="create-topic">
      <h1 class="title">Créer un nouveau sujet</h1>
      
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="title">Titre :</label>
          <input type="text" id="title" v-model="title" required />
        </div>
        
        <div class="form-group">
          <label for="content">Contenu :</label>
          <textarea id="content" v-model="content" required></textarea>
        </div>
  
        <button type="submit" class="submit-button">Créer le sujet</button>
      </form>
  
      <div v-if="message" :class="messageType">{{ message }}</div>
    </div>
  </template>
  
  <script>
  export default {
    name:"CreateSubject",
    data() {
      return {
        title: '',
        content: '',
        categories: [], // Categories for the select dropdown
        message: '',
        messageType: '', // Success or error message class
      };
    },
    mounted() {
      this.fetchCategories();
    },
    methods: {
      async fetchCategories() {
        try {
          const response = await fetch('/forum/categories/', {
            method: 'GET',
            headers: {
              Authorization: localStorage.getItem('token'), // Assuming JWT token is stored
            },
          });
          const data = await response.json();
          this.categories = data; // Assuming the response is an array of categories
        } catch (error) {
          this.showMessage('Erreur lors du chargement des catégories.', 'error');
        }
      },
      async submitForm() {
        try {
          const response = await fetch('/forum/create_topic/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: localStorage.getItem('token'), // Assuming JWT token is stored
            },
            body: JSON.stringify({
              title: this.title,
              content: this.content,
            }),
          });
  
          const result = await response.json();
          if (response.ok) {
            this.showMessage('Sujet créé avec succès !', 'success');
            this.resetForm();
          } else {
            this.showMessage(result.error, 'error');
          }
        } catch (error) {
          this.showMessage('Erreur lors de la création du sujet.', 'error');
        }
      },
      showMessage(message, type) {
        this.message = message;
        this.messageType = type;
      },
      resetForm() {
        this.title = '';
        this.content = '';
      }
    }
  };
  </script>
  
  <style scoped>
  /* Style du formulaire de création de sujet */
  .create-topic {
    padding: 2rem;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    max-width: 600px;
    margin: 0 auto;
  }
  
  .title {
    font-size: 2rem;
    text-align: center;
    margin-bottom: 1rem;
  }
  
  .form-group {
    margin-bottom: 1rem;
  }
  
  label {
    font-size: 1.1rem;
    display: block;
    margin-bottom: 0.5rem;
  }
  
  input,
  textarea,
  select {
    width: 100%;
    padding: 0.8rem;
    font-size: 1rem;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  textarea {
    resize: vertical;
    min-height: 150px;
  }
  
  button.submit-button {
    background-color: #4caf50;
    color: white;
    padding: 0.8rem 1.5rem;
    font-size: 1.2rem;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    width: 100%;
  }
  
  button.submit-button:hover {
    background-color: #388e3c;
  }
  
  .message {
    text-align: center;
    margin-top: 1rem;
    padding: 1rem;
    border-radius: 8px;
  }
  
  .message.success {
    background-color: #dff0d8;
    color: #3c763d;
  }
  
  .message.error {
    background-color: #f2dede;
    color: #a94442;
  }
  </style>
  