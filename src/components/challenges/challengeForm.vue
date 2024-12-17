<template>
  <div class="form-container">
    <form @submit.prevent="submitForm" class="challenge-form" enctype="multipart/form-data">
      <h2 class="form-title">Participer au défi</h2>

      <div class="form-group">
        <label for="name">Nom du défi</label>
        <input type="text" v-model="form.name" id="name" required class="form-input" />
      </div>

      <div class="form-group">
        <label for="quantity">Quantité ou preuve</label>
        <input type="text" v-model="form.quantity" id="quantity" required class="form-input" />
      </div>

      <div class="form-group">
        <label for="date">Date de réalisation</label>
        <input type="date" v-model="form.date" id="date" required class="form-input" />
      </div>

      <div class="form-group">
        <label for="photo">Photo</label>
        <input type="file" @change="handleFileUpload" id="photo" class="form-input" />
      </div>

      <button type="submit" class="form-button">Soumettre</button>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    challengeId: {
      type: String,
      required: true, // L'ID est transmis depuis la route dynamique
    },
  },
  data() {
    return {
      form: {
        name: '',
        quantity: '',
        date: '',
        photo: null,
        challengeId: this.challengeId, // Stocke l'ID du défi pour l'envoyer au back-end
      },
    };
  },
  methods: {
    handleFileUpload(event) {
      this.form.photo = event.target.files[0];
    },
    async submitForm() {
      const formData = new FormData();
      formData.append('name', this.form.name);
      formData.append('quantity', this.form.quantity);
      formData.append('date', this.form.date);
      formData.append('challengeId', this.form.challengeId); // Ajout de l'ID au formulaire

      if (this.form.photo) {
        formData.append('photo', this.form.photo);
      }

      try {
        const response = await fetch('/api/challenge/participate', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          alert('Participation enregistrée avec succès !');
          this.$router.push('/challenges');
        } else {
          alert('Une erreur est survenue.');
        }
      } catch (error) {
        console.error('Erreur réseau :', error);
      }
    },
  },
};
</script>
