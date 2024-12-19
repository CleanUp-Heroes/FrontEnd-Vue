<template>
  <!-- Conteneur de la carte -->
  <div id="map"></div>
</template>

<script>
import L from "leaflet"; // Importation de Leaflet
import "leaflet/dist/leaflet.css"; // Importation du CSS de Leaflet

export default {
  name: "MapComponent",
  props: {
    reports: {
      type: Array, // Tableau des signalements
      required: true,
    },
    onStatusChange: {
      type: Function, // Callback pour notifier un changement d'état
      required: true,
    },
  },
  data() {
    return {
      map: null, // Instance de la carte
      markers: [], // Liste des marqueurs
    };
  },
  mounted() {
    // Initialisation de la carte
    this.map = L.map("map").setView([51.505, -0.09], 13); // Coordonnées par défaut : Londres

    // Ajout du fond de carte OpenStreetMap
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(this.map);

    // Forcer Leaflet à recalculer la taille de la carte
    setTimeout(() => this.map.invalidateSize(), 300);

    // Événement : cliquer pour ajouter un marqueur (signalement)
    this.map.on("click", (event) => {
      const { lat, lng } = event.latlng;
      const report = {
        id: Date.now(), // Générer un ID unique
        lat,
        lng,
        status: "À traiter", // État initial
      };
      this.$emit("add-report", report); // Notifier le parent
    });

    // Initialisation des marqueurs
    this.updateMarkers();
  },
  watch: {
    // Mettre à jour les marqueurs lorsque les signalements changent
    reports: "updateMarkers",
  },
  methods: {
    updateMarkers() {
      // Supprimer les anciens marqueurs
      this.markers.forEach((marker) => this.map.removeLayer(marker));
      this.markers = [];

      // Ajouter de nouveaux marqueurs
      this.reports.forEach((report) => {
        const marker = L.marker([report.lat, report.lng], {
          icon: L.divIcon({
            className: report.status === "Ramassé" ? "marker-clean" : "marker-trash",
            html: report.status === "Ramassé" ? "✅" : "🗑️",
            iconSize: [30, 30],
          }),
        })
          .addTo(this.map)
          .bindPopup(
            `<strong>Signalement</strong><br>État : ${report.status}<br><button onclick="updateStatus(${report.id})">Changer l'état</button>`
          );

        // Ajouter une action au clic
        marker.on("click", () => {
          this.onStatusChange(report.id); // Callback pour changer l'état
        });

        this.markers.push(marker); // Ajouter à la liste
      });
    },
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

/* Styles pour les icônes de marqueur */
.marker-trash {
  color: red;
  font-size: 20px;
  text-align: center;
}

.marker-clean {
  color: green;
  font-size: 20px;
  text-align: center;
}
</style>
