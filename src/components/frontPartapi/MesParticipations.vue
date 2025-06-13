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


           <!-- ====================  début du bloc ajouté pour la dèrnière feature ==================== -->
          
          <!-- On affiche cette section SEULEMENT si le statut est "Validé" -->
          <div v-if="participation.status === 'Validé'" class="impact-display">
            
            <!-- CAS 1 : On a reçu un chiffre pour l'impact -->
            <div v-if="participation.impact && participation.impact.value !== null" class="impact-success">
              <strong>Impact :</strong>
              <span>-{{ participation.impact.value }} {{ participation.impact.unit }} CO₂</span>
            </div>
            
            <!-- CAS 2 : Le statut est validé, mais le calcul est en attente (impact est null) -->
            <div v-else class="impact-pending">
              <span>⏳ Calcul de l'impact en cours...</span>
            </div>

          </div>
          <!-- ================= FIN DU BLOC AJOUTÉ pour la dèrnière feature ======================= -->



          <div v-if="participation.status === 'Refusé'">
            <strong>Raison :</strong> {{ participation.validation_reason || 'Non précisée' }}
          </div>
        </div>

        <!-- Re-soumission si refusée -->
        <div v-if="participation.status === 'Refusé'" class="resubmit-section">
          <p><strong>Date :</strong> {{ participation.action_date }}</p>

          <label for="quantity">Nouvelle quantité :</label>
          <input type="number"
                 v-model="resubmitQuantities[participation.id]"
                 min="1"
                 required />

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
      resubmitQuantities: {}, // Stockage des nouvelles quantités
      isSubmitting: {}, // État des boutons de soumission
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
        const response = await axios.get('http://127.0.0.1:8000/challenges/mes_participations', {
          headers: { Authorization: token }
        })
        this.participations = response.data

        // Pré-remplir les quantités si statut = Refusé
        this.participations.forEach(p => {
          if (p.status === 'Refusé') {
            this.resubmitQuantities[p.id] = p.action_quantity
          }
        })
      } catch (error) {
        console.error('Erreur lors de la récupération des participations :', error)
      }
    },
    handlePhotoChange(event, participationId) {
      this.newPhotos[participationId] = event.target.files[0]
    },
    async resubmitParticipation(participationId) {
      const photo = this.newPhotos[participationId]
      const quantity = this.resubmitQuantities[participationId]

      if (!photo || !quantity) {
        return alert("Veuillez remplir la quantité et choisir une photo.")
      }

      this.isSubmitting[participationId] = true
      const formData = new FormData()
      formData.append('photo', photo)
      formData.append('quantity', quantity)

      try {
        const token = localStorage.getItem('token')

        // TODO : Remplacer cette URL par celle que Mariama te donnera
        await axios.post(
          'http://127.0.0.1:8000/challenges/ressoumision/',
          formData,
          {
            headers: {
              Authorization: token,
              'Content-Type': 'multipart/form-data'
            }
          }
        )
        alert('Participation re-soumise avec succès.')
        this.fetchParticipations()
      } catch (error) {
        console.error('Erreur re-soumission :', error)
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

/* BLOC POUR LA RE-SOUMISSION */
.resubmit-section {
  margin-top: 20px;
  padding: 15px;
  border: 2px dashed #ffcccc;
  background-color: #fff5f5;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(255, 0, 0, 0.1);
}

.resubmit-section input[type="number"],
.resubmit-section input[type="file"] {
  display: block;
  margin-bottom: 10px;
  width: 100%;
  padding: 6px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.resubmit-section button {
  background-color: #e53935;
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.resubmit-section button:hover {
  background-color: #c62828;
}


/*  LES NOUVEAUX STYLES pour impact  */

.impact-display {
  margin-top: 8px; /* Un peu d'espace */
}

.impact-success span {
  color: #27ae60; /* Un joli vert pour la réussite */
  font-weight: bold;
}

.impact-pending span {
  color: #e67e22; /* Un orange pour l'attente */
  font-style: italic;
}

</style>
