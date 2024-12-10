<template>
  <div>
    <h2>Signaler un problème</h2>
    <form @submit.prevent="submitForm">
      <div>
        <label for="description">Description du problème</label>
        <textarea v-model="form.description" id="description" required></textarea>
      </div>

      <div>
        <label for="location">Emplacement</label>
        <input type="text" v-model="form.location" id="location" placeholder="Saisir une adresse" required />
      </div>

      <div>
        <label for="photo">Ajouter une photo</label>
        <input type="file" @change="handleFileUpload" id="photo" />
      </div>

      <button type="submit">Envoyer</button>
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
      console.log('Formulaire soumis:', this.form);
      // Ajoutez la logique pour envoyer les données à l'API backend
    },
  },
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}
</style>
