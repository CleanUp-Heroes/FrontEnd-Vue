<template>
  <div class="forum-page">
    <h2 class="forum-title">Sujets du Forum</h2>
    <div v-if="loading">Chargement des sujets...</div>

    <div v-else-if="topics.length > 0">
      <ul class="forum-list">
        <li v-for="topic in topics" :key="topic.id" class="forum-item">
          <router-link :to="`/forum/topic/${topic.id}`" class="forum-link">
            <h3>{{ topic.title }}</h3>
          </router-link>
          <p class="forum-meta">
            Posté par {{ topic.author }} - {{ formatDate(topic.created_at) }}
          </p>
          <p class="forum-stats">
            👍 {{ topic.like_count }} | 💬 {{ topic.reply_count }}
            <button class="report-button" @click="openReportModal(topic.id)">🚨 Signaler</button>
          </p>
        </li>
      </ul>
    </div>

    <p v-else>Aucun sujet trouvé.</p>

    <!-- Modal de signalement -->
    <div v-if="showReportModal" class="modal-overlay">
      <div class="modal">
        <h3>Signaler un sujet</h3>
        <p>Veuillez indiquer la raison du signalement :</p>
        <textarea v-model="reportReason" placeholder="Entrez la raison ici..."></textarea>
        <div class="modal-actions">
          <button @click="submitReport">Envoyer</button>
          <button @click="closeReportModal">Annuler</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TopicsList",
  data() {
    return {
      topics: [],
      loading: true,
      showReportModal: false,
      reportReason: "",
      selectedTopicId: null,
    };
  },
  mounted() {
    this.fetchTopics();
  },
  methods: {
    async fetchTopics() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Token manquant");
          this.loading = false;
          return;
        }
        const response = await fetch("http://127.0.0.1:8000/forum/topics/", {
          method: "GET",
          headers: {
            "Authorization": token,
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) throw new Error("Erreur lors de la récupération des sujets.");
        this.topics = (await response.json()).topics;
      } catch (error) {
        console.error("Erreur :", error);
      } finally {
        this.loading = false;
      }
    },
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString();
    },
    openReportModal(topicId) {
      this.selectedTopicId = topicId;
      this.reportReason = "";
      this.showReportModal = true;
    },
    closeReportModal() {
      this.showReportModal = false;
    },
    async submitReport() {
      if (!this.reportReason.trim()) {
        alert("Veuillez entrer une raison pour le signalement.");
        return;
      }
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("Vous devez être connecté pour signaler un sujet.");
          return;
        }
        const response = await fetch("http://127.0.0.1:8000/forum/report/subject/", {
          method: "POST",
          headers: {
            "Authorization": token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ sujet_id: this.selectedTopicId, reason: this.reportReason }),
        });
        if (!response.ok) throw new Error("Échec du signalement.");
        alert("Sujet signalé avec succès !");
        this.closeReportModal();
      } catch (error) {
        console.error("Erreur :", error);
        alert("Une erreur s'est produite lors du signalement.");
      }
    },
  },
};
</script>

<style scoped>
.report-button {
  background: #ff6b6b;
  color: white;
  border: none;
  padding: 5px 10px;
  font-size: 0.9rem;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px;
}
.report-button:hover {
  background: #e63946;
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  width: 300px;
  text-align: center;
}
.modal textarea {
  width: 100%;
  height: 80px;
  margin: 10px 0;
}
.modal-actions {
  display: flex;
  justify-content: space-between;
}
.modal-actions button {
  background: #1a6f4b;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}
.modal-actions button:last-child {
  background: #ff6b6b;
}

.report-button {
  background: #ff6b6b;
  color: white;
  border: none;
  padding: 5px 10px;
  font-size: 0.9rem;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px;
}

.report-button:hover {
  background: #e63946;
}

.forum-stats {
  font-size: 0.9rem;
  color: #555;
  margin-top: 0.5rem;
}
.forum-stats {
  font-size: 0.9rem;
  color: #444;
  margin-top: 0.3rem;
}

  .forum-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100%;
    background-color: #f6fdfb;
    padding: 2rem;
    box-sizing: border-box;
  }
  
  .forum-title {
    font-size: 2rem;
    font-weight: bold;
    text-align: center;
    color: #1a6f4b;
    margin-bottom: 2rem;
  }
  
  .forum-list {
    width: 100%;
    max-width: 800px;
    list-style: none;
    padding: 0;
  }
  
  .forum-item {
    background: #ffffff;
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    margin-bottom: 1rem;
    text-align: left;
  }
  
  .forum-link {
    font-size: 1.2rem;
    font-weight: bold;
    color: #1a6f4b;
    text-decoration: none;
  }
  
  .forum-link:hover {
    text-decoration: underline;
  }
  
  .forum-meta {
    font-size: 0.9rem;
    color: #666;
    margin-top: 0.5rem;
  }
  </style>
  