<template>
    <div class="p-6 max-w-4xl mx-auto">
      <h1 class="text-2xl font-bold mb-4">Mes Participations</h1>
  
      <!-- Filtres -->
      <div class="mb-4">
        <label class="block mb-2 font-medium">Filtrer par défi :</label>
        <select v-model="selectedDefi" class="border p-2 rounded w-full">
          <option value="">Tous les défis</option>
          <option v-for="defi in defis" :key="defi" :value="defi">{{ defi }}</option>
        </select>
      </div>
  
      <!-- Liste des participations -->
      <div v-if="participations.length > 0" class="space-y-4">
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
  
          <div v-if="participation.validation_reason" class="mt-2 text-sm text-red-700">
            💬 Raison du refus : {{ participation.validation_reason }}
          </div>
  
          <!-- Re-soumission -->
          <div v-if="participation.validation_reason" class="mt-4">
            <label class="block mb-2 text-sm font-medium">Re-soumettre une photo :</label>
            <input
              type="file"
              accept="image/*"
              @change="e => handleResubmit(participation.id, e)"
              :disabled="uploadingId === participation.id"
              class="block mb-2"
            />
            <button
              @click="submitPhoto(participation.id)"
              :disabled="!files[participation.id] || uploadingId === participation.id"
              class="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
            >
              {{ uploadingId === participation.id ? "Envoi..." : "Re-soumettre" }}
            </button>
  
            <p v-if="successMsg[participation.id]" class="text-green-600 mt-2">
              📤 Photo envoyée. En attente de validation.
            </p>
          </div>
        </div>
      </div>
  
      <div v-else class="text-gray-500 mt-8">Aucune participation pour l'instant.</div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue'
  import axios from 'axios'
  
  const participations = ref([])
  const defis = ref([])
  const selectedDefi = ref('')
  
  // Pour upload et confirmation
  const files = ref({})
  const uploadingId = ref(null)
  const successMsg = ref({})
  
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
  
  const filteredParticipations = computed(() =>
    selectedDefi.value
      ? participations.value.filter(p => p.defi === selectedDefi.value)
      : participations.value
  )
  
  const handleResubmit = (id, event) => {
    const file = event.target.files[0]
    if (file) {
      files.value[id] = file
    }
  }
  
  const submitPhoto = async (id) => {
    if (!files.value[id]) return
    uploadingId.value = id
  
    const formData = new FormData()
    formData.append('photo', files.value[id])
  
    try {
      await axios.post(`/api/participations/${id}/resubmit`, formData)
      successMsg.value[id] = true
  
      // Optionnel : recharger la liste si souhaité
      setTimeout(() => {
        successMsg.value[id] = false
      }, 5000)
    } catch (err) {
      console.error("Erreur lors de l’envoi de la photo :", err)
    } finally {
      uploadingId.value = null
      files.value[id] = null
    }
  }
  
  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString()
  }
  
  onMounted(fetchParticipations)
  </script>
  
  <style scoped>
  /* Optionnel : custom styles si besoin */
  </style>
  