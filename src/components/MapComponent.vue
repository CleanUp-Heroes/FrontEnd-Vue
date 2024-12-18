<template>
  <!-- Conteneur de la carte -->
  <div id="map"></div>
</template>

<script>
import L from 'leaflet'; // Importation de Leaflet
import 'leaflet/dist/leaflet.css'; // Importation du CSS de Leaflet

export default {
  name: 'MapComponent',
  mounted() {
    // Initialisation de la carte
    const map = L.map('map').setView([51.505, -0.09], 13); // Coordonnées par défaut : Londres

    // Ajout du fond de carte OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    // Forcer Leaflet à recalculer la taille de la carte
    setTimeout(() => map.invalidateSize(), 300);

    // Événement : cliquer pour ajouter un marqueur
    map.on('click', (event) => {
      const { lat, lng } = event.latlng; // Récupérer les coordonnées
      L.marker([lat, lng]).addTo(map); // Ajouter un marqueur sur la carte
    });
  },
};
</script>

<style scoped>
/* Style de la carte */
#map {
  width: 100%; /* Prend toute la largeur */
  height: 500px; /* Hauteur fixe */
  background-color: #f0f0f0; /* Fond pour s'assurer que le conteneur est visible */
  border: 1px solid #ccc; /* Bordure pour bien visualiser */
}
</style>
