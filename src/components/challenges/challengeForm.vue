<template>
    <form @submit.prevent="submitForm">
      <h2>Participer au défi</h2>
      <div>
        <label for="name">Nom du défi</label>
        <input type="text" v-model="form.name" id="name" required />
      </div>
      <div>
        <label for="quantity">Quantité ou preuve</label>
        <input type="text" v-model="form.quantity" id="quantity" required />
      </div>
      <div>
        <label for="date">Date de réalisation</label>
        <input type="date" v-model="form.date" id="date" required />
      </div>
      <button type="submit">Soumettre</button>
    </form>
  </template>
  
  <script>
  export default {
    data() {
      return {
        form: {
          name: '',
          quantity: '',
          date: '',
        },
      };
    },
    methods: {
      async submitForm() {
        const response = await fetch('/api/challenge', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.form),
        });
        if (response.ok) {
          alert('Participation enregistrée!');
          this.$router.push('/challenges');
        } else {
          alert('Une erreur est survenue.');
        }
      },
    },
  };
  </script>
  