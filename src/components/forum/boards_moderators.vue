<template>
  <div class="moderator-page">
    <h1>Modération des contenus signalés</h1>
    <p>Consultez ci-dessous la liste des signalements effectués par les utilisateurs.</p>

    <!-- Liste des signalements -->
    <div v-if="reports.length">
      <div v-for="report in reports" :key="report.id" class="report-card">
        <h3>Report ID: {{ report.id }} ({{ report.type }})</h3>
        <p><strong>Raison :</strong> {{ report.reason }}</p>
        <p><strong>Date :</strong> {{ formatDate(report.created_at) }}</p>
        <p v-if="report.type === 'sujet'"><strong>Sujet :</strong> {{ report.sujet_title }} (par {{ report.sujet_author }})</p>
        <p v-if="report.type === 'réponse'"><strong>Réponse :</strong> {{ report.reponse_content }} (par {{ report.reponse_author }})</p>
        <button @click="openModerationModal(report)">Modérer ce rapport</button>
      </div>
    </div>
    <div v-else>
      <p>Aucun rapport signalé pour le moment.</p>
    </div>

    <!-- Modal de modération -->
    <div v-if="showModerationModal" class="modal-overlay">
      <div class="modal">
        <h2>Modération du rapport</h2>
        <p><strong>Raison du signalement :</strong> {{ currentReport.reason }}</p>
        <p><strong>Type :</strong> {{ currentReport.type }}</p>
        <p v-if="currentReport.type === 'sujet'">
          <strong>Sujet :</strong> {{ currentReport.sujet_title }} (par {{ currentReport.sujet_author }})
        </p>
        <p v-if="currentReport.type === 'sujet'"><strong>Contenu :</strong> {{ currentReport.sujet_content }}</p>
        <p v-if="currentReport.type === 'réponse'">
          <strong>Réponse :</strong> {{ currentReport.reponse_content }} (par {{ currentReport.reponse_author }})
        </p>

        <label for="action">Action :</label>
        <select v-model="moderationAction" id="action">
          <option value="supprime">Supprimé</option>
          <option value="ignore">Ignoré</option>
        </select>

        <label for="comment">Commentaire :</label>
        <textarea id="comment" v-model="moderationComment" placeholder="Ajouter un commentaire..."></textarea>

        <div class="modal-actions">
          <button @click="submitModeration">Enregistrer l'action</button>
          <button @click="closeModerationModal">Annuler</button>
        </div>
      </div>
    </div>

    <!-- Notification dynamique -->
    <div v-if="notification" :class="['notification', notification.type]">
      {{ notification.message }}
    </div>
  </div>
</template>

  
<script>
export default {
  name: "ModeratorReports",
  data() {
    return {
      reports: [],
      showModerationModal: false,
      currentReport: null,
      moderationAction: "supprime",
      moderationComment: "",
      notification: null,
    };
  },
  created() {
    this.fetchReports();
  },
  methods: {
    async fetchReports() {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:8000/moderation/reports/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": token,
          },
        });

        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const data = await response.json();
        this.reports = data.reports;
      } catch (error) {
        console.error("Erreur :", error);
        this.showNotification("Erreur lors du chargement des rapports", "error");
      }
    },
    openModerationModal(report) {
      this.currentReport = report;
      this.moderationAction = "supprime";
      this.moderationComment = "";
      this.showModerationModal = true;
    },
    closeModerationModal() {
      this.showModerationModal = false;
      this.currentReport = null;
      this.moderationAction = "supprime";
      this.moderationComment = "";
    },
    showNotification(message, type) {
      this.notification = { message, type };
      setTimeout(() => {
        this.notification = null;
      }, 3000);
    },
    formatDate(dateString) {
      return new Date(dateString).toLocaleString();
    },
  },
  async submitModeration() {
  if (!this.currentReport) return;

  try {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:8000/moderation/action/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token,
      },
      body: JSON.stringify({
        report_id: this.currentReport.id,
        type: this.currentReport.type, // 'sujet' ou 'réponse'
        action: this.moderationAction, // 'supprime' ou 'ignore'
        comment: this.moderationComment,
      }),
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    this.showNotification("Action enregistrée avec succès", "success");
    this.closeModerationModal();
    this.fetchReports(); // Rafraîchir la liste après modération
  } catch (error) {
    console.error("Erreur :", error);
    this.showNotification("Erreur lors de l'enregistrement", "error");
  }
}

};
</script>

  
  <style scoped>
  .moderator-page {
    padding: 2rem;
    font-family: Arial, sans-serif;
  }
  
  .report-card {
    background: #fff;
    padding: 1rem;
    margin-bottom: 1rem;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
  
  .report-card h3 {
    margin-top: 0;
  }
  
  .report-card p {
    margin: 0.5rem 0;
  }
  
  button {
    padding: 0.5rem 1rem;
    border: none;
    background: #38bd94;
    color: #fff;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:hover {
    background: #145d3c;
  }
  
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0,0,0,0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal {
    background: #fff;
    padding: 1.5rem;
    border-radius: 10px;
    width: 400px;
  }
  
  .modal label {
    display: block;
    margin-top: 1rem;
  }
  
  .modal textarea {
    width: 100%;
    height: 80px;
  }
  
  .modal-actions {
    margin-top: 1rem;
    display: flex;
    justify-content: flex-end;
  }
  
  .modal-actions button {
    margin-left: 0.5rem;
  }
  
  .notification {
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 1rem;
    background: #38bd94;
    color: #fff;
    border-radius: 5px;
  }
  
  .notification.error {
    background: #ff4d4d;
  }
  </style>
  