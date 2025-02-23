<template>
    <div class="forum-page">
      <h2 class="forum-title">{{ topic.title }}</h2>
      <p class="forum-meta">
        Posté par <strong>{{ topic.author }}</strong> - {{ formatDate(topic.created_at) }}
      </p>
      
      <!-- Nouvelle div avec fond commun -->
      <div class="forum-topic-container">
        <p class="forum-content">{{ topic.content }}</p>
  
        <div class="forum-actions">
          <button v-if="isAuthenticated" @click="openReportModal('subject', topic.id)" class="report-button">
            Signaler ce sujet
          </button>
          <button v-if="isAuthenticated" @click="toggleLike" class="like-button">
            {{ liked ? "Je n'aime plus" : "J'aime" }} ({{ topic.like_count }})
          </button>
        </div>
      </div>
  
      <div class="forum-section">
        <h3 class="forum-subtitle">Réponses</h3>
        <ul v-if="replies.length > 0" class="forum-list">
          <li v-for="reply in replies" :key="reply.id" class="forum-item">
            <p class="forum-reply-content">{{ reply.content }}</p>
            <span class="forum-meta">Répondu par {{ reply.author }} - {{ formatDate(reply.created_at) }}</span>
            
            <button v-if="isAuthenticated" @click="openReportModal('reply', reply.id)" class="report-button">
              Signaler cette réponse
            </button>
          </li>
        </ul>
        <p v-else class="forum-meta">Aucune réponse pour le moment.</p>
      </div>
  
      <div v-if="isAuthenticated" class="forum-section">
        <h3 class="forum-subtitle">Ajouter une réponse</h3>
        <textarea v-model="newReply" class="forum-textarea" placeholder="Écrivez votre réponse ici..."></textarea>
        <button @click="submitReply" class="forum-button">Envoyer</button>
      </div>
      <p v-else class="forum-meta">Vous devez être connecté pour répondre.</p>
  
      <!-- Modal de signalement -->
      <div v-if="showReportModal" class="modal-overlay">
        <div class="modal">
          <h3>Signaler un {{ reportType === 'subject' ? 'sujet' : 'message' }}</h3>
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
  props: ["id"],
  data() {
    return {
      topic: {},
      replies: [],
      newReply: "",
      isAuthenticated: false,
      liked: false,
      showReportModal: false,
      reportReason: "",
      reportType: "", // 'subject' or 'reply'
      itemIdToReport: null,
    };
  },
  mounted() {
    this.fetchTopicDetails();
    this.fetchReplies();
    this.checkAuthentication();
  },
  methods: {
    async fetchTopicDetails() {
      try {
        const response = await fetch(`http://127.0.0.1:8000/forum/topics/${this.id}/`, {
          method: "GET",
          headers: {
            "Authorization": localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) throw new Error("Erreur lors du chargement du sujet");

        this.topic = await response.json();
        this.liked = this.topic.user_has_liked;
      } catch (error) {
        console.error("Erreur lors du chargement du sujet", error);
      }
    },
    async fetchReplies() {
      try {
        const response = await fetch(`http://127.0.0.1:8000/forum/topics/${this.id}/replies/`, {
          method: "GET",
          headers: {
            "Authorization": localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) throw new Error("Erreur lors du chargement des réponses");

        const data = await response.json();
        this.replies = data.replies;
      } catch (error) {
        console.error("Erreur lors du chargement des réponses", error);
      }
    },
    openReportModal(type, itemId) {
      this.reportType = type;
      this.itemIdToReport = itemId;
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
      const url = this.reportType === "subject"
        ? "http://127.0.0.1:8000/forum/report/subject/"
        : "http://127.0.0.1:8000/forum/report/response/";
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Authorization": localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sujet_id: this.itemIdToReport,
            reason: this.reportReason,
          }),
        });

        if (!response.ok) throw new Error("Erreur lors du signalement");

        alert(`Le ${this.reportType === "subject" ? "sujet" : "message"} a été signalé.`);
        this.closeReportModal();
      } catch (error) {
        console.error("Erreur lors du signalement", error);
      }
    },
    async toggleLike() {
      try {
        const response = await fetch(`http://127.0.0.1:8000/forum/topics/${this.id}/like/`, {
          method: "POST",
          headers: {
            "Authorization": localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) throw new Error("Erreur lors du like");

        const data = await response.json();
        this.topic.like_count = data.like_count;
        this.liked = !this.liked;
      } catch (error) {
        console.error("Erreur lors du like", error);
      }
    },
    checkAuthentication() {
      this.isAuthenticated = !!localStorage.getItem("token");
    },
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString();
    },
  },
};
</script>

<style scoped>
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

.forum-topic-container {
  background: #f5f5f5;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.forum-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.report-button {
  background: #ffcc00;
  color: black;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  font-size: 0.9rem;
  cursor: pointer;
}

.report-button:hover {
  background: #e6b800;
}

.like-button {
  background: #007bff;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  font-size: 0.9rem;
  cursor: pointer;
}

.like-button:hover {
  background: #0056b3;
}

  .report-button {
  background: #ffcc00;
  color: black;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  font-size: 0.9rem;
  cursor: pointer;
  margin-top: 10px;
}

.report-button:hover {
  background: #e6b800;
}

  .forum-likes-container {
    display: flex;
    align-items: center;
    margin-top: 1rem;
  }
  
  .forum-likes {
    font-size: 1rem;
    color: #666;
    margin-right: 10px;
  }
  
  .like-button {
    background: #e63946;
    color: white;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;
  }
  
  .like-button:hover {
    background: #d62839;
  }
  .like-button {
    background: #e63946;
    color: white;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;
    margin-left: 10px;
  }
  
  .like-button:hover {
    background: #d62839;
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
    margin-bottom: 1rem;
  }
  
  .forum-meta {
    font-size: 0.9rem;
    color: #666;
    margin-bottom: 1rem;
  }
  
  .forum-content {
    font-size: 1.1rem;
    color: #333;
    background: #ffffff;
    padding: 1rem;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    max-width: 800px;
    width: 95%;
    margin-bottom: 2rem;
  }
  
  .forum-section {
    width: 100%;
    max-width: 800px;
  }
  
  .forum-subtitle {
    font-size: 1.5rem;
    font-weight: bold;
    color: #1a6f4b;
    margin-bottom: 1rem;
  }
  
  .forum-list {
    list-style: none;
    padding: 0;
  }
  
  .forum-item {
    background: #ffffff;
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    margin-bottom: 1rem;
  }
  
  .forum-reply-content {
    font-size: 1rem;
    color: #333;
    margin-bottom: 0.5rem;
  }
  
  .forum-textarea {
    width: 100%;
    padding: 1rem;
    border-radius: 8px;
    border: 1px solid #ccc;
    font-size: 1rem;
    margin-bottom: 1rem;
  }
  
  .forum-button {
    background: #1a6f4b;
    color: #fff;
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    cursor: pointer;
  }
  
  .forum-button:hover {
    background: #155c3a;
  }
  </style>
  