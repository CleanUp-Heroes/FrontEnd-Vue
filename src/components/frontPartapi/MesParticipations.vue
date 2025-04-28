<template>
    <div class="p-6 max-w-4xl mx-auto">
      <h1 class="text-2xl font-bold mb-4">Mes Participations</h1>
  
      <!-- Filtres -->
      <div class="mb-6 flex flex-wrap gap-4">
        <div class="flex-1 min-w-[200px]">
          <label class="block mb-2 font-medium">Filtrer par défi :</label>
          <select v-model="selectedDefi" class="border p-2 rounded w-full">
            <option value="">Tous les défis</option>
            <option v-for="defi in defis" :key="defi" :value="defi">{{ defi }}</option>
          </select>
        </div>
  
        <div class="flex-1 min-w-[200px]">
          <label class="block mb-2 font-medium">Filtrer par statut :</label>
          <select v-model="selectedStatus" class="border p-2 rounded w-full">
            <option value="">Tous les statuts</option>
            <option value="validated">Validées ✅</option>
            <option value="rejected">Refusées ❌</option>
            <option value="pending">En cours ⏳</option>
          </select>
        </div>
      </div>
  
      <!-- Liste des participations -->
      <div v-if="filteredParticipations.length > 0" class="space-y-4">
        <div
          v-for="participation in filteredParticipations"
          :key="participation.id"
          class="border p-4 rounded shadow bg-white"
        >
          <div class="flex justify-between items-center">
            <div>
              <h2 class="font-semibold text-lg">{{ participation.defi }}</h2>
              <p class="text-sm text-gray-500">Soumis le : {{ formatDate(participation.date) }}</p>
            </div>
            <span
              class="text-sm font-semibold px-3 py-1 rounded"
              :class="{
                'bg-green-100 text-green-800': participation.is_validated,
                'bg-red-100 text-red-800': participation.is_validated === false && participation.validation_reason,
                'bg-yellow-100 text-yellow-800': participation.is_validated === false && !participation.validation_reason,
              }"
            >
              {{
                participation.is_validated
                  ? 'Validée ✅'
                  : participation.validation_reason
                  ? 'Refusée ❌'
                  : 'En cours ⏳'
              }}
            </span>
          </div>
  
          <div v-if="participation.validation_reason" class="mt-3 p-3 bg-red-50 rounded">
            <p class="text-sm font-medium text-red-700">
              <span class="font-bold">Raison du refus :</span> {{ participation.validation_reason }}
            </p>
          </div>
  
          <!-- Actions selon le statut -->
          <div class="mt-4 flex flex-wrap gap-3">
            <!-- Bouton Voir la photo -->
            <button
              @click="viewPhoto(participation.id)"
              class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              👁️ Voir ma photo
            </button>
  
            <!-- Bouton Re-soumettre (visible seulement si refusée) -->
            <button
              v-if="participation.validation_reason"
              @click="showResubmitForm(participation.id)"
              class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
            >
              🔄 Re-soumettre
            </button>
  
            <!-- Bouton Annuler participation (visible seulement si en cours) -->
            <button
              v-if="!participation.is_validated && !participation.validation_reason"
              @click="cancelParticipation(participation.id)"
              class="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
            >
              ❌ Annuler
            </button>
          </div>
  
          <!-- Formulaire de re-soumission (visible seulement quand activé) -->
          <div v-if="resubmitFormVisible === participation.id" class="mt-4 p-4 bg-gray-50 rounded">
            <label class="block mb-2 text-sm font-medium">Nouvelle photo pour ce défi :</label>
            <input
              type="file"
              accept="image/*"
              @change="e => handleResubmit(participation.id, e)"
              :disabled="uploadingId === participation.id"
              class="block w-full mb-3 p-2 border rounded"
            />
            <div class="flex gap-3">
              <button
                @click="submitPhoto(participation.id)"
                :disabled="!files[participation.id] || uploadingId === participation.id"
                class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded disabled:opacity-50"
              >
                {{ uploadingId === participation.id ? "Envoi en cours..." : "Confirmer la re-soumission" }}
              </button>
              <button
                @click="resubmitFormVisible = null"
                class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
              >
                Annuler
              </button>
            </div>
            <p v-if="successMsg[participation.id]" class="text-green-600 mt-2 text-sm">
              📤 Photo envoyée avec succès. En attente de validation.
            </p>
          </div>
        </div>
      </div>
  
      <div v-else class="text-center p-8 bg-gray-50 rounded">
        <p class="text-gray-500 text-lg">Aucune participation trouvée.</p>
        <p v-if="selectedDefi || selectedStatus" class="text-sm mt-2">
          Essayez de modifier vos critères de filtre.
        </p>
      </div>
  
      <!-- Modal pour voir la photo -->
      <div v-if="photoModalVisible" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white p-6 rounded-lg max-w-2xl max-h-[90vh] overflow-auto">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-xl font-bold">Ma participation</h3>
            <button @click="photoModalVisible = false" class="text-gray-500 hover:text-gray-700">
              ✕
            </button>
          </div>
          <img :src="currentPhotoUrl" alt="Ma participation" class="w-full h-auto rounded" />
          <div class="mt-4 text-sm text-gray-600">
            <p><span class="font-semibold">Défi :</span> {{ currentPhotoDefi }}</p>
            <p><span class="font-semibold">Date :</span> {{ formatDate(currentPhotoDate) }}</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue'
  import axios from 'axios'
  
  const participations = ref([])
  const defis = ref([])
  const selectedDefi = ref('')
  const selectedStatus = ref('')
  
  // Pour upload et confirmation
  const files = ref({})
  const uploadingId = ref(null)
  const successMsg = ref({})
  const resubmitFormVisible = ref(null)
  
  // Pour la modal photo
  const photoModalVisible = ref(false)
  const currentPhotoUrl = ref('')
  const currentPhotoDefi = ref('')
  const currentPhotoDate = ref('')
  
  const fetchParticipations = async () => {
    try {
      const res = await axios.get('/api/mes-participations')
      participations.value = res.data
  
      // Construire la liste unique des défis
      defis.value = [...new Set(res.data.map(p => p.defi))]
    } catch (err) {
      console.error("Erreur lors du chargement des participations :", err)
    }
  }
  
  const filteredParticipations = computed(() => {
    let filtered = participations.value
    
    if (selectedDefi.value) {
      filtered = filtered.filter(p => p.defi === selectedDefi.value)
    }
    
    if (selectedStatus.value) {
      if (selectedStatus.value === 'validated') {
        filtered = filtered.filter(p => p.is_validated)
      } else if (selectedStatus.value === 'rejected') {
        filtered = filtered.filter(p => p.is_validated === false && p.validation_reason)
      } else if (selectedStatus.value === 'pending') {
        filtered = filtered.filter(p => p.is_validated === false && !p.validation_reason)
      }
    }
    
    return filtered
  })
  
  const handleResubmit = (id, event) => {
    const file = event.target.files[0]
    if (file) {
      files.value[id] = file
    }
  }
  
  const showResubmitForm = (id) => {
    resubmitFormVisible.value = id
    files.value[id] = null
    successMsg.value[id] = false
  }
  
  const submitPhoto = async (id) => {
    if (!files.value[id]) return
    uploadingId.value = id
  
    const formData = new FormData()
    formData.append('photo', files.value[id])
  
    try {
      await axios.post(`/api/participations/${id}/resubmit`, formData)
      successMsg.value[id] = true
      resubmitFormVisible.value = null
      
      // Recharger les participations après un délai
      setTimeout(fetchParticipations, 2000)
    } catch (err) {
      console.error("Erreur lors de l'envoi de la photo :", err)
    } finally {
      uploadingId.value = null
      files.value[id] = null
    }
  }
  
  const cancelParticipation = async (id) => {
    if (!confirm("Voulez-vous vraiment annuler cette participation ?")) return
    
    try {
      await axios.delete(`/api/participations/${id}`)
      fetchParticipations()
    } catch (err) {
      console.error("Erreur lors de l'annulation :", err)
    }
  }
  
  const viewPhoto = (id) => {
    const participation = participations.value.find(p => p.id === id)
    if (participation) {
      currentPhotoUrl.value = participation.photo_url
      currentPhotoDefi.value = participation.defi
      currentPhotoDate.value = participation.date
      photoModalVisible.value = true
    }
  }
  
  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }
  
  onMounted(fetchParticipations)
  </script>
  
  <style scoped>
  /* Styles de base */
  .p-6 {
    padding: 1.5rem;
  }
  
  .max-w-4xl {
    max-width: 56rem;
  }
  
  .mx-auto {
    margin-left: auto;
    margin-right: auto;
  }
  
  /* En-tête */
  h1 {
    color: #1a365d;
    font-size: 1.75rem;
    margin-bottom: 1.5rem;
    position: relative;
    padding-bottom: 0.5rem;
  }
  
  h1:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 3rem;
    height: 0.25rem;
    background-color: #4299e1;
    border-radius: 0.25rem;
  }
  
  /* Filtres */
  .mb-6 {
    margin-bottom: 1.5rem;
  }
  
  select {
    border: 1px solid #e2e8f0;
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    width: 100%;
    transition: all 0.2s;
    color: #2d3748;
    background-color: #f8fafc;
  }
  
  select:hover {
    border-color: #cbd5e0;
  }
  
  select:focus {
    outline: none;
    border-color: #4299e1;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.2);
  }
  
  /* Cartes de participation */
  .border {
    border: 1px solid #e2e8f0;
    border-radius: 0.5rem;
    padding: 1.25rem;
    background-color: white;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.05);
    transition: transform 0.2s, box-shadow 0.2s;
  }
  
  .border:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }
  
  /* Badges de statut */
  .text-sm.font-semibold {
    font-size: 0.75rem;
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
  }
  
  .bg-green-100 {
    background-color: #f0fff4;
  }
  
  .text-green-800 {
    color: #276749;
  }
  
  .bg-red-100 {
    background-color: #fff5f5;
  }
  
  .text-red-800 {
    color: #9b2c2c;
  }
  
  .bg-yellow-100 {
    background-color: #fffff0;
  }
  
  .text-yellow-800 {
    color: #975a16;
  }
  
  /* Boutons */
  button {
    transition: all 0.2s;
    cursor: pointer;
  }
  
  button:hover:not(:disabled) {
    transform: translateY(-1px);
  }
  
  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  /* Formulaire de re-soumission */
  .bg-gray-50 {
    background-color: #f8fafc;
  }
  
  input[type="file"] {
    border: 1px dashed #cbd5e0;
    border-radius: 0.375rem;
    padding: 0.5rem;
  }
  
  /* Message d'absence de participation */
  .bg-gray-50 {
    background-color: #f8fafc;
  }
  
  /* Modal */
  .fixed {
    position: fixed;
  }
  
  .inset-0 {
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
  
  .bg-opacity-50 {
    background-color: rgba(0, 0, 0, 0.5);
  }
  
  .z-50 {
    z-index: 50;
  }
  
  .max-h-[90vh] {
    max-height: 90vh;
  }
  
  /* Responsive */
  @media (max-width: 640px) {
    .p-6 {
      padding: 1rem;
    }
    
    .flex-wrap {
      flex-direction: column;
      gap: 1rem;
    }
    
    .min-w-[200px] {
      min-width: 100%;
    }
  }
  </style>