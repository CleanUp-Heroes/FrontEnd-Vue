<template>
    <div class="container mx-auto p-4">
      <h1 class="text-2xl font-bold text-center">Quizz Environnemental</h1>
  
      <div v-if="!quizCompleted">
        <div v-if="currentQuestion" class="p-6 bg-white rounded shadow-md">
          <h2 class="text-lg font-semibold">{{ currentQuestion.question }}</h2>
  
          <div class="mt-4">
            <button 
              v-for="(option, index) in options" 
              :key="index" 
              @click="checkAnswer(option.key)" 
              class="block w-full p-3 my-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
              {{ option.text }}
            </button>
          </div>
        </div>
      </div>
  
      <div v-else>
        <h2 class="text-xl font-bold text-center text-green-600">Quiz terminé !</h2>
        <p class="text-center text-lg">Votre score : {{ score }} / {{ questions.length }}</p>
        <button @click="restartQuiz" class="mt-4 p-2 bg-green-500 text-white rounded">
          Recommencer
        </button>
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
        if (selectedOption === this.currentQuestion.correct_option) {
          this.score++;
        }
        this.nextQuestion();
      },
      nextQuestion() {
        if (this.currentQuestionIndex < this.questions.length - 1) {
          this.currentQuestionIndex++;
        } else {
          this.quizCompleted = true;
          localStorage.setItem("quizScore", this.score);
        }
      },
      restartQuiz() {
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.quizCompleted = false;
      }
    },
    mounted() {
      this.fetchQuestions();
    }
  };
  </script>
  