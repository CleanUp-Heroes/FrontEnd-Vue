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
      this.form.photo = event.target.files[0]; // Sauvegarde la photo téléchargée
    },
    submitForm() {
      // Validation simplifiée avec des alertes colorées
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

      alert('✅ Merci ! Votre problème a été signalé avec succès.');
      console.log('Formulaire soumis:', this.form);
      // Logique pour envoyer les données à votre API backend
    },
  },
};
</script>

<style scoped>
/* Conteneur principal */
.form-container {
  width: 100%;
  max-width: 500px;
  margin: 20px auto;
  padding: 20px;
  background: linear-gradient(145deg, #e6e9f0, #eef2f3);
  border-radius: 10px;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.2);
  text-align: center;
}

/* Titre du formulaire */
.form-title {
  font-size: 24px;
  color: #4a4a4a;
  margin-bottom: 20px;
}

/* Champs de formulaire */
.form-group {
  margin-bottom: 20px;
  text-align: left;
}

label {
  font-weight: bold;
  margin-bottom: 8px;
  display: block;
  color: #333;
}

input[type="text"],
textarea {
  width: 100%;
  padding: 12px;
  font-size: 14px;
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
  height: 100px;
  resize: none;
}

/* Bouton Envoyer */
.submit-button {
  background: #4caf50;
  color: white;
  padding: 12px 20px;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s;
}

.submit-button:hover {
  background: #45a049;
  transform: scale(1.05);
}

/* Messages d'erreur */
.error-message {
  color: #d32f2f;
  font-size: 12px;
  margin-top: 5px;
}
</style>
