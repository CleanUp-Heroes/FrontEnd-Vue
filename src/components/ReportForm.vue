<template>
  <div class="form-container">
    <h2 class="form-title">🚨 Signalez un problème</h2>
    <form @submit.prevent="submitForm" class="report-form">
      <!-- Description du problème -->
      <div class="form-group">
        <label for="description">📝 Description du problème</label>
        <textarea 
          v-model="form.description" 
          id="description" 
          placeholder="Décrivez votre problème ici..." 
          required
        ></textarea>
        <p v-if="!form.description" class="error-message">⚠️ La description est obligatoire.</p>
      </div>

      <!-- Emplacement -->
      <div class="form-group">
        <label for="location">📍 Emplacement</label>
        <input 
          type="text" 
          v-model="form.location" 
          id="location" 
          placeholder="Saisissez l'adresse ou l'emplacement" 
          required
        />
        <p v-if="!form.location" class="error-message">⚠️ L'emplacement est obligatoire.</p>
      </div>

      <!-- Ajouter une photo -->
      <div class="form-group">
        <label for="photo">📸 Ajouter une photo (optionnel)</label>
        <input 
          type="file" 
          @change="handleFileUpload" 
          id="photo" 
        />
        <p v-if="form.photo && !form.photo.type.startsWith('image/')" class="error-message">⚠️ Le fichier doit être une image.</p>
      </div>

      <!-- Bouton Envoyer -->
      <button type="submit" class="submit-button">🚀 Envoyer</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      form: {
        description: '',
        location: '',
        photo: null,
      },
    };
  },
  methods: {
    handleFileUpload(event) {
      this.form.photo = event.target.files[0]; // Récupération du fichier uploadé
    },
    async submitForm() {
      // Vérifier la présence du token d'authentification
      const token = localStorage.getItem('token'); // Ou utilisez Vuex si vous l'avez stocké ailleurs
      if (!token) {
        alert('⚠️ Vous devez être connecté pour signaler un problème.');
        this.$router.push('/login'); // Redirige l'utilisateur vers la page de connexion
        return;
      }

      // Validation simplifiée
      if (!this.form.description || this.form.description.trim() === '') {
        alert('⚠️ La description est obligatoire.');
        return;
      }

      if (!this.form.location || this.form.location.trim() === '') {
        alert('⚠️ L\'emplacement est obligatoire.');
        return;
      }

      if (this.form.photo && !this.form.photo.type.startsWith('image/')) {
        alert('⚠️ Le fichier téléchargé doit être une image.');
        return;
      }

      // Préparer les données
      const formData = new FormData();
      formData.append('description', this.form.description);
      formData.append('location', this.form.location);
      if (this.form.photo) {
        formData.append('photo', this.form.photo);
      }

      try {
        // Envoi des données au backend avec le token dans l'en-tête
        const response = await axios.post(
          'http://127.0.0.1:8000/reports/report/', 
          formData, 
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: token,  // Ajout du token dans l'en-tête
            },
          }
        );
        console.log('Réponse du backend:', response.data);
        console.log('Réponse du token:', token);
        alert('✅ Merci ! Votre problème a été signalé avec succès.');
      } catch (error) {
        console.error('Erreur lors de l\'envoi du formulaire:', error);
        alert('⚠️ Une erreur est survenue lors de l\'envoi du formulaire.');
      }
    },
  },
};
</script>


<style scoped>
/* Styles du formulaire (inchangés) */
.form-container {
  width: 100%;
  max-width: 800px;
  margin: 20px auto;
  padding: 30px;
  background: linear-gradient(145deg, #e6e9f0, #eef2f3);
  border-radius: 10px;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.2);
  text-align: center;
}
.form-title {
  font-size: 32px;
  color: #4a4a4a;
  margin-bottom: 30px;
}
.form-group {
  margin-bottom: 30px;
  text-align: left;
}
label {
  font-weight: bold;
  margin-bottom: 10px;
  display: block;
  color: #333;
}
input[type="text"],
textarea {
  width: 100%;
  padding: 15px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-sizing: border-box;
  transition: border-color 0.3s, box-shadow 0.3s;
}
input[type="text"]:focus,
textarea:focus {
  border-color: #4caf50;
  box-shadow: 0 0 8px rgba(76, 175, 80, 0.2);
}
textarea {
  height: 120px;
  resize: none;
}
.submit-button {
  background: #4caf50;
  color: white;
  padding: 15px 25px;
  font-size: 18px;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s, transform 0.2s ease-in-out;
}
.submit-button:hover {
  background: #45a049;
  transform: scale(1.05);
}
.error-message {
  color: #d32f2f;
  font-size: 14px;
  margin-top: 8px;
}
@media (max-width: 768px) {
  .form-container {
    width: 90%;
    max-width: 100%;
  }
  .form-title {
    font-size: 28px;
  }
  .submit-button {
    width: 100%;
  }
}
</style>
