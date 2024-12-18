<template>
  <div id="map" style="height: 400px;"></div>
</template>

<script>
import L from 'leaflet'; // Importation de Leaflet

export default {
  name: 'MapComponent', // Assurez-vous d'avoir un nom de composant valide

  mounted() {
    // Initialisation de la carte
    const map = L.map('map').setView([51.505, -0.09], 13); // Coordonnées par défaut : Londres

    // Ajout du fond de carte avec OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Ajout d'un événement pour cliquer et ajouter un marqueur sur la carte
    map.on('click', (event) => {
      const lat = event.latlng.lat;
      const lng = event.latlng.lng;

      L.marker([lat, lng]).addTo(map); // Ajouter un marqueur sur la carte
    });
  },
};
</script>

<style scoped>
#map {
  width: 100%;
  height: 300px;
}
</style>

