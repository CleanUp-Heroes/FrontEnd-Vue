<template>
    <div class="container mx-auto p-6">
      <h1 class="text-3xl font-bold text-center mb-6 text-green-700">🌱 Quizz Environnemental 🌍</h1>
  
      <div class="w-full bg-gray-200 rounded-full h-4 mb-4">
        <div class="bg-green-500 h-4 rounded-full transition-all" :style="{ width: progress }"></div>
      </div>
  
      <div v-if="!quizCompleted">
        <transition name="fade" mode="out-in">
          <div v-if="currentQuestion" :key="currentQuestionIndex" class="p-6 bg-white rounded-lg shadow-md">
            <h2 class="text-xl font-semibold text-center">{{ currentQuestion.question }}</h2>
            <div class="mt-4">
              <button v-for="(option, index) in options" :key="index" @click="checkAnswer(option.key)" class="block w-full p-3 my-2 rounded transition duration-300 text-left"
                :class="{
                  'bg-blue-100 hover:bg-blue-200 text-gray-800': !answered,
                  'bg-green-500 text-white': answered && option.key === currentQuestion.correct_option,
                  'bg-red-500 text-white': answered && option.key !== currentQuestion.correct_option
                }"
                :disabled="answered">
                <span class="font-bold">{{ option.key }}.</span> {{ option.text }}
              </button>
            </div>
            <p v-if="answered" class="text-center text-lg font-semibold mt-3" :class="isCorrect ? 'text-green-600' : 'text-red-600'">
              {{ isCorrect ? '✅ Bonne réponse !' : '❌ Mauvaise réponse !' }}
            </p>
            <button v-if="answered" @click="nextQuestion" class="mt-4 p-2 bg-gray-700 text-white rounded w-full hover:bg-gray-900">Question suivante →</button>
          </div>
        </transition>
      </div>
  
      <div v-else class="text-center">
        <h2 class="text-2xl font-bold text-green-700">🎉 Quiz terminé !</h2>
        <p class="text-lg mt-2">Votre score : <span class="font-bold">{{ score }}</span> / {{ questions.length }}</p>
        <div class="mt-4">
          <p v-if="score === questions.length" class="text-xl font-bold text-green-600">🏆 Félicitations ! Vous avez obtenu un score parfait ! Vous gagnez un badge expert en environnement !</p>
          <p v-else-if="score >= questions.length * 0.7" class="text-lg text-blue-600">🎖️ Bravo ! Vous recevez un certificat de participation !</p>
          <p v-else class="text-lg text-gray-600">📚 Continuez à apprendre et retentez votre chance pour obtenir une meilleure récompense !</p>
        </div>
        <button @click="restartQuiz" class="mt-4 p-2 bg-green-500 text-white rounded hover:bg-green-700">🔄 Recommencer</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        questions: [],
        currentQuestionIndex: 0,
        score: 0,
        quizCompleted: false,
        answered: false,
        isCorrect: false,
      };
    },
    computed: {
      currentQuestion() {
        return this.questions[this.currentQuestionIndex];
      },
      options() {
        return [
          { key: "A", text: this.currentQuestion.option_a },
          { key: "B", text: this.currentQuestion.option_b },
          { key: "C", text: this.currentQuestion.option_c },
          { key: "D", text: this.currentQuestion.option_d },
        ];
      },
      progress() {
        return ((this.currentQuestionIndex / this.questions.length) * 100) + "%";
      }
    },
    methods: {
      async fetchQuestions() {
        try {
          const response = await fetch("/quizzes.json");
          this.questions = await response.json();
        } catch (error) {
          console.error("Erreur de chargement des questions :", error);
        }
      },
      checkAnswer(selectedOption) {
        this.answered = true;
        this.isCorrect = selectedOption === this.currentQuestion.correct_option;
        if (this.isCorrect) this.score++;
      },
      nextQuestion() {
        if (this.currentQuestionIndex < this.questions.length - 1) {
          this.currentQuestionIndex++;
          this.answered = false;
        } else {
          this.quizCompleted = true;
          localStorage.setItem("quizScore", this.score);
        }
      },
      restartQuiz() {
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.quizCompleted = false;
        this.answered = false;
      }
    },
    mounted() {
      this.fetchQuestions();
    }
  };
  </script>
  
  <style>
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
  
  /* Styles pour les boutons de réponse */
  button {
    display: block; /* Chaque bouton occupe une ligne entière */
    width: 100%;
    margin: 8px 0; /* Espacement entre les boutons */
    padding: 12px 16px; /* Taille du padding */
    border-radius: 8px; /* Coins arrondis */
    font-size: 1rem; /* Taille de la police */
    text-align: left; /* Alignement du texte à gauche */
    transition: background-color 0.3s ease, transform 0.2s ease;
  }
  
  button:hover:not(:disabled) {
    transform: scale(1.02); /* Effet de zoom au survol */
  }
  
  /* Couleurs par défaut des boutons */
  button:not(:disabled) {
    background-color: #f0f4f8; /* Couleur de fond par défaut */
    color: #2d3748; /* Couleur du texte par défaut */
  }
  
  /* Couleurs pour les réponses correctes et incorrectes */
  button.bg-green-500 {
    background-color: #6deb25; /* Vert pour les bonnes réponses */
  }
  
  button.bg-red-500 {
    background-color: #f56565; /* Rouge pour les mauvaises réponses */
  }
  
  /* Bouton de question suivante */
  button.bg-gray-700 {
    background-color: #48bb78; /* Gris foncé */
  }
  
  button.bg-gray-700:hover {
    background-color: #eff2f7; /* Gris plus foncé au survol */
  }
  
  /* Bouton de réinitialisation */
  button.bg-green-500 {
    background-color: #48bb78; /* Vert */
  }
  
  button.bg-green-500:hover {
    background-color: #38a169; /* Vert plus foncé au survol */
  }
  </style>