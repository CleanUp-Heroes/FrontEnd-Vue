<template>
  <div class="home-page">
    <!-- Image intégrée à la place des défis -->
    <section class="image-section">
      <img src="@/assets/clean.png" alt="Cleanup Heroes Image" />
    </section>

    <!-- Section d'Appel à l'Action -->
    <section class="cta-section">
      <h2>Agissez pour la planète!</h2>
      <p>Rejoignez notre communauté et commencez à participer à des actions concrètes pour un avenir plus propre.</p>
      <!--<button @click="goToSignUp">S'inscrire et Participer</button>-->
      <button @click="$router.push({ name: 'login' })">S'inscrire et Participer</button>

    </section>
  </div>
</template>

<script>
export default {
  name: "AcceuilPage",
  methods: {
    goToSignUp() {
      this.$router.push({ name: "signUp" });
    },
  },
};
</script>

<style scoped>
/* Styles de la page d'accueil */
.home-page {
  font-family: "Poppins", Arial, sans-serif;
  color: #333;
  animation: fadeIn 1.5s ease-in;
}

/* Image Section */
.image-section {
  text-align: center;
  margin: 2rem 0;
}

.image-section img {
  max-width: 80%;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

/* CTA Section */
.cta-section {
  background-color: #38bd94;
  color: white;
  text-align: center;
  padding: 3rem 1rem;
}

.cta-section h2 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.cta-section p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
}

.cta-section button {
  background-color: #2c6b50;
  color: white;
  font-size: 1.1rem;
  padding: 1rem 2rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.cta-section button:hover {
  background-color: #145d3c;
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
