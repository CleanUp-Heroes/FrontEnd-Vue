<template>
  <div class="participations-container">
    <h1>Mes Participations</h1>

    <div class="filters">
      <label for="challenge-filter">Filtrer par défi :</label>
      <select v-model="selectedChallenge" id="challenge-filter">
        <option value="">Tous les défis</option>
        <option v-for="challenge in uniqueChallenges" :key="challenge" :value="challenge">
          {{ challenge }}
        </option>
      </select>
    </div>

    <div v-if="participations.length === 0">
      Aucune participation trouvée.
    </div>

    <ul class="participation-list">
      <li v-for="participation in filteredParticipations" :key="participation.id" class="participation-item">
        <div>
          <strong>Défi :</strong> {{ participation.challenge_name }} <br />
          <strong>Date :</strong> {{ participation.action_date }} <br />
          <strong>Quantité :</strong> {{ participation.action_quantity }} <br />
          <strong>Statut :</strong>
          <span
            :class="{
              valid: participation.status === 'Validé',
              refused: participation.status === 'Refusé',
              pending: participation.status === 'En attente',
            }"
          >
            {{ participation.status }}
          </span>
          <br />
          <div v-if="participation.status === 'Refusé'">
            <strong>Raison :</strong> {{ participation.validation_reason || 'Non précisée' }}
          </div>
        </div>

        <!-- Re-soumission si refusée -->
        <div v-if="participation.status === 'Refusé'" class="resubmit-section">
          <label for="photo-upload">Nouvelle photo :</label>
          <input type="file" @change="handlePhotoChange($event, participation.id)" />
          <button :disabled="isSubmitting[participation.id]" @click="resubmitParticipation(participation.id)">
            {{ isSubmitting[participation.id] ? 'Soumission en cours...' : 'Re-soumettre' }}
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'MesParticipations',
  data() {
    return {
      participations: [],
      selectedChallenge: '',
      newPhotos: {}, // Stockage temporaire des fichiers à soumettre
      isSubmitting: {}, // Gestion de l'état des boutons
    }
  },
  computed: {
    uniqueChallenges() {
      return [...new Set(this.participations.map(p => p.challenge_name))]
    },
    filteredParticipations() {
      if (!this.selectedChallenge) return this.participations
      return this.participations.filter(p => p.challenge_name === this.selectedChallenge)
    }
  },
  methods: {
    async fetchParticipations() {
      try {
        const token = localStorage.getItem('token')
        const response = await axios.get('/api/participations', {
          headers: { Authorization: token }
        })
        this.participations = response.data
      } catch (error) {
        console.error('Erreur lors de la récupération des participations :', error)
      }
    },
    handlePhotoChange(event, participationId) {
      this.newPhotos[participationId] = event.target.files[0]
    },
    async resubmitParticipation(participationId) {
      const photo = this.newPhotos[participationId]
      if (!photo) return alert("Veuillez choisir une photo.")

      this.isSubmitting[participationId] = true
      const formData = new FormData()
      formData.append('photo', photo)

      try {
        const token = localStorage.getItem('token')
        await axios.post(`/api/participations/${participationId}/resubmit`, formData, {
          headers: {
            Authorization: token,
            'Content-Type': 'multipart/form-data'
          }
        })
        alert('Participation re-soumise avec succès.')
        this.fetchParticipations()
      } catch (error) {
        alert('Erreur lors de la re-soumission.')
      } finally {
        this.isSubmitting[participationId] = false
      }
    }
  },
  mounted() {
    this.fetchParticipations()
  }
}
</script>

<style scoped>
.participations-container {
  padding: 20px;
}
.filters {
  margin-bottom: 15px;
}
.participation-list {
  list-style-type: none;
  padding: 0;
}
.participation-item {
  border: 1px solid #ccc;
  padding: 12px;
  margin-bottom: 12px;
  border-radius: 8px;
}
.valid {
  color: green;
}
.refused {
  color: red;
}
.pending {
  color: orange;
}
.resubmit-section {
  margin-top: 10px;
}
</style>
