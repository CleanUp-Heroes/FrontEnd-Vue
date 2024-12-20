<template>
  <div class="form-container">
    <form @submit.prevent="submitForm" class="challenge-form" enctype="multipart/form-data">
      <h2 class="form-title">Participer au défi {{ this.$route.params.challengeName }}</h2>

      <!-- Champ pour saisir la quantité -->
      <div class="form-group">
        <label for="quantity">Quantité</label>
        <input
          type="number"
          v-model.number="form.quantity"
          id="quantity"
          required
          class="form-input"
        />
        <span v-if="errors.quantity" class="error-message">{{ errors.quantity }}</span>
      </div>

      <!-- Champ pour saisir la date -->
      <div class="form-group">
        <label for="date">Date de réalisation</label>
        <input
          type="date"
          v-model="form.date"
          id="date"
          required
          class="form-input"
        />
        <span v-if="errors.date" class="error-message">{{ errors.date }}</span>
      </div>

      <!-- Champ pour ajouter une photo -->
      <div class="form-group">
        <label for="photo">Photo</label>
        <input
          type="file"
          @change="handleFileUpload"
          id="photo"
          class="form-input"
        />
        <span v-if="errors.photo" class="error-message">{{ errors.photo }}</span>
      </div>

      <!-- Bouton de soumission -->
      <button type="submit" class="form-button">Soumettre</button>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
      required: true, // ID du défi pour ajouter au formData
    },
    challengeName: {
      type: String,
      required: true, // Nom du défi transmis comme prop
    },
  },
  data() {
    return {
      form: {
        quantity: null, // Quantité (nombre entier)
        date: '', // Date de réalisation
        photo: null, // Fichier photo
      },
      errors: {}, // Objets pour stocker les erreurs de validation
    };
  },
  methods: {
    validateForm() {
      this.errors = {}; // Réinitialise les erreurs

      if (!this.form.quantity || this.form.quantity <= 0) {
        this.errors.quantity = 'La quantité est obligatoire et doit être un nombre positif.';
      }
      if (!this.form.date) {
        this.errors.date = 'La date de réalisation est obligatoire.';
      }
      if (!this.form.photo) {
        this.errors.photo = 'Une photo est obligatoire.';
      }

      return Object.keys(this.errors).length === 0;
    },
    handleFileUpload(event) {
      this.form.photo = event.target.files[0];
    },
    async submitForm() {
  if (!this.validateForm()) {
    return; // Stoppe la soumission si des erreurs sont présentes
  }

  const formData = new FormData();
  formData.append('quantity', this.form.quantity);
  formData.append('date', this.form.date);
  formData.append('photo', this.form.photo);
  formData.append('challenge_id', this.$route.params.id); // Ajout de l'ID du défi dans le formData

  // Récupération du token depuis le stockage local (ou autre méthode)
  const token = localStorage.getItem('token'); // Remplacez 'auth_token' par le nom exact utilisé

  try {
    const response = await fetch('http://127.0.0.1:8000/challenges/participation/', {
      method: 'POST',
      headers: {
        'Authorization': token,  // Ajout du token dans l'en-tête Authorization
      },
      body: formData,
    });

    if (response.ok) {
      alert('Participation enregistrée avec succès !');
      this.$router.push('/challenges'); // Redirige vers la page des défis après soumission
    } else {
      const errorData = await response.json();
      console.error('Erreur de l’API :', errorData);
      alert('Une erreur est survenue lors de la soumission.');
    }
  } catch (error) {
    console.error('Erreur réseau :', error);
    alert('Impossible de contacter le serveur.');
  }
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

/* Champ affichant le nom du défi (non éditable) */
.form-static {
  background: #f6f6f6;
  padding: 1.2rem;
  border-radius: 8px;
  font-size: 1.1rem;
  color: #3a3a3a;
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
  box-sizing: border-box;
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