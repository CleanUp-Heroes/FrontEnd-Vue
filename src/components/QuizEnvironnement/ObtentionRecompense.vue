<template>
  <div class="container mx-auto p-6">
    <h1 class="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
      🎁 Obtention de la Récompense
    </h1>

    <!-- Affichage du score et des points disponibles -->
    <div class="p-6 bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-lg shadow-md text-center mb-8">
      <h2 class="text-2xl font-semibold text-blue-800">Votre Score : {{ score }} Points</h2>
      <p class="text-lg text-gray-700">Vous avez <strong class="text-green-600">{{ pointsDisponibles }}</strong> points disponibles.</p>
    </div>

    <!-- Liste des récompenses disponibles -->
    <div v-if="score >= seuil" class="space-y-6">
      <h2 class="text-2xl font-bold text-center mb-6 text-gray-800">Choisissez votre récompense :</h2>

      <div class="grid md:grid-cols-3 gap-6">
        <!-- Récompense 1 : Badge Éco-Responsable -->
        <div class="reward-card border-green-200">
          <h3 class="text-xl font-semibold text-green-700">🏅 Badge Éco-Responsable</h3>
          <p class="text-md text-gray-600 mt-2">Obtenez un badge numérique pour montrer votre engagement écologique.</p>
          <p class="reward-cost text-green-600">Coût : 3 points</p>
          <button @click="choisirRecompense('Badge Éco-Responsable 🏅', 3)" class="reward-btn bg-green-500 hover:bg-green-600">
            Choisir cette récompense
          </button>
        </div>

        <!-- Récompense 2 : Sachets poubelles biodégradables -->
        <div class="reward-card border-purple-200">
          <h3 class="text-xl font-semibold text-purple-700">🗓️ Rendez-vous pour des sachets biodégradables</h3>
          <p class="text-md text-gray-600 mt-2">Recevez un rendez-vous pour récupérer des sachets biodégradables pour le tri.</p>
          <p class="reward-cost text-purple-600">Coût : 5 points</p>
          <button @click="choisirRecompense('Rendez-vous pour des sachets biodégradables 🗓️', 5)" class="reward-btn bg-purple-500 hover:bg-purple-600">
            Choisir cette récompense
          </button>
        </div>

        <!-- Récompense 3 : Argent fictif -->
        <div class="reward-card border-yellow-200">
          <h3 class="text-xl font-semibold text-yellow-700">💰 10 € </h3>
          <p class="text-md text-gray-600 mt-2">Obtenez 10 € à utiliser dans notre boutique en ligne.</p>
          <p class="reward-cost text-yellow-600">Coût : 7 points</p>
          <button @click="choisirRecompense('10 € Fictifs 💰', 7)" class="reward-btn bg-yellow-500 hover:bg-yellow-600">
            Choisir cette récompense
          </button>
        </div>
      </div>
    </div>

    <!-- Message si le score est insuffisant -->
    <div v-else class="p-6 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-lg shadow-md text-center">
      <h2 class="text-xl font-semibold text-red-700">😞 Pas encore...</h2>
      <p class="text-lg text-gray-700">Atteignez <strong class="text-red-600">{{ seuil }}</strong> points pour débloquer une récompense.</p>
      <button @click="rejouer" class="mt-4 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all">
        🔄 Rejouer le Quiz
      </button>
    </div>

    <!-- Confirmation de récompense -->
    <div v-if="recompenseChoisie" class="p-6 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg shadow-md text-center mt-8">
      <h2 class="text-xl font-semibold text-green-700">Félicitations ! 🎉</h2>
      <p class="text-lg text-gray-700">Vous avez choisi la récompense : <strong class="text-green-600">{{ recompenseChoisie }}</strong>.</p>
      <p class="text-md text-gray-600 mt-2">Envoyez un e-mail à <a href="mailto:recompenses@ecoquiz.com" class="text-blue-500 underline hover:text-blue-600">recompenses@ecoquiz.com</a> avec votre badge ou vos points pour la réclamer.</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      score: 0, // Score récupéré du localStorage
      seuil: 3, // Score minimum pour obtenir une récompense
      pointsDisponibles: 0, // Points disponibles pour choisir une récompense
      recompenseChoisie: "", // Récompense choisie par l'utilisateur
    };
  },
  methods: {
    // Méthode pour choisir une récompense
    choisirRecompense(recompense, points) {
      if (this.pointsDisponibles >= points) {
        this.recompenseChoisie = recompense;
        this.pointsDisponibles -= points; // Déduire les points
        alert(`Vous avez choisi : ${recompense}. Envoyez un e-mail pour la réclamer.`);
      } else {
        alert("Vous n'avez pas assez de points pour cette récompense.");
      }
    },
    // Méthode pour rejouer le quiz
    rejouer() {
      localStorage.removeItem("quizScore"); // Réinitialise le score
      this.$router.push("/participer-quiz"); // Redirige vers le quiz
    },
  },
  mounted() {
    this.score = parseInt(localStorage.getItem("quizScore")) || 0;
    this.pointsDisponibles = this.score; // Les points disponibles sont égaux au score
  },
};
</script>

<style scoped>
.container {
  max-width: 900px;
}

/* Style des cartes de récompenses */
.reward-card {
  background: rgb(233, 95, 152);
  border: 2px solid;
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.reward-card:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

/* Style des boutons de récompenses */
.reward-btn {
  display: inline-block;
  margin-top: 10px;
  padding: 10px 16px;
  color: rgb(84, 17, 161);
  border-radius: 8px;
  font-weight: bold;
  transition: all 0.3s ease;
}

.reward-cost {
  margin-top: 8px;
  font-size: 14px;
  font-weight: bold;
}
</style>
