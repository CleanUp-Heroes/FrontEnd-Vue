<template>
  <div>
    <h1>Signalement</h1>
    <form @submit.prevent="submitReport">
      <label>Description :</label>
      <textarea v-model="form.description" required></textarea>

      <label>Localisation :</label>
      <input type="text" v-model="form.location" placeholder="Ex: Paris, France" required />

      <label>Photo :</label>
      <input type="file" @change="handleFileUpload" />

      <button type="submit">Soumettre</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        description: "",
        location: "",
        photo: null,
      },
    };
  },
  methods: {
    handleFileUpload(event) {
      this.form.photo = event.target.files[0];
    },
    async submitReport() {
      const formData = new FormData();
      formData.append("description", this.form.description);
      formData.append("location", this.form.location);
      if (this.form.photo) {
        formData.append("photo", this.form.photo);
      }

      try {
        const response = await fetch("http://127.0.0.1:8000/report/", {
          method: "POST",
          body: formData,
        });
        if (response.ok) {
          alert("Signalement soumis avec succès !");
        } else {
          alert("Erreur lors de l'envoi du signalement.");
        }
      } catch (error) {
        console.error("Erreur :", error);
      }
    },
  },
};
</script>
