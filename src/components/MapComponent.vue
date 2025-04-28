<template>
<<<<<<< HEAD
    <div class="map-container">
        <button 
      v-if="!isAddingReport" 
      class="add-report-btn" 
      @click="toggleAddingReport"
    >
      Ajouter un signalement
    </button>
    
    <button 
      v-if="isAddingReport" 
      class="add-report-btn active" 
      @click="toggleAddingReport"
    >
      Annuler
    </button>

      <div id="map"></div>
      <div v-if="selectedCoordinates" class="signalement-popup">
        <p>
          <strong>Signalement</strong><br />
          Longitude : <span>{{ selectedCoordinates[0].toFixed(4) }}</span><br />
          Latitude : <span>{{ selectedCoordinates[1].toFixed(4) }}</span>
        </p>
        <div class="popup-actions">
          <button class="confirm-btn" @click="confirmSignalement">Signaler</button>
          <button class="cancel-btn" @click="cancelSignalement">Annuler</button>
        </div>
      </div>
    </div>
  </template>
  
<script>
import mapboxgl from "mapbox-gl";
import "@/assets/css/mapbox-gl.css";
import axios from "axios";

export default {
  name: "MapComponent",
  data() {
    return {
      map: null,
      marker: null,
      userLocationMarker: null,
      selectedCoordinates: null,
      reports: [],
      isPopupOpen: false,
      filterDistance: 10, // Distance filtrable par défaut à 10 km
      isAddingReport: false, // Mode ajout de signalement activé ou non
      isViewingReportPopup: false, // Indique si une popup de signalement existe est ouverte
      currentPopup: null, // Garder la référence de la popup existante
    };
  },
  mounted() {
    mapboxgl.accessToken =
      "pk.eyJ1IjoiaWJ0aXNzZWVtIiwiYSI6ImNtNjI3c3VsYjB5ZzEycXNiZjl1dHcwMWQifQ.PUozdjOht4YlkIFNUXhHUQ";

    // Initialiser la carte
    this.map = new mapboxgl.Map({
      container: "map",
      center: [2.3522, 48.8566], // Coordonnées de Paris par défaut
      zoom: 13,
      style: "mapbox://styles/mapbox/streets-v11",
    });

    // Ajouter des contrôles de navigation
    this.map.addControl(new mapboxgl.NavigationControl());

    // Localiser l'utilisateur
    this.locateUser();

    // Charger les signalements
    this.fetchReports();

    // Gestion des clics sur la carte
    this.map.on("click", this.mapClick);
  },
  methods: {
    toggleAddingReport() {
  this.isAddingReport = !this.isAddingReport; // Toggle le mode ajout signalement
  if (this.isAddingReport) {
    this.isViewingReportPopup = false; // Fermer la popup existante si on veut créer un signalement
    if (this.currentPopup) {
      this.currentPopup.remove(); // Ferme la popup actuelle
      this.currentPopup = null; // Réinitialiser la référence de la popup
    }
  }
},


    locateUser() {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userCoordinates = [
              position.coords.longitude,
              position.coords.latitude,
            ];
            this.map.flyTo({ center: userCoordinates, zoom: 14 });

            if (this.userLocationMarker) {
              this.userLocationMarker.setLngLat(userCoordinates);
            } else {
              this.userLocationMarker = new mapboxgl.Marker({ color: "blue" })
                .setLngLat(userCoordinates)
                .addTo(this.map);
            }
          },
          (error) => {
            console.error("Erreur de géolocalisation :", error.message);
            alert(
              "Impossible d'accéder à votre position. Vérifiez vos paramètres de géolocalisation."
            );
          }
        );
      } else {
        alert("La géolocalisation n'est pas prise en charge par votre navigateur.");
      }
    },

    openReportPopup(report) {
      const popupContent = `
        <div>
          <p><strong>Type de déchet :</strong> ${report.report.dechetType}</p>
          <p><strong>Description :</strong> ${report.report.description || 'Aucune description'}</p>
          <p><strong>État :</strong> ${report.isResolved ? 'Résolu' : 'Non résolu'}</p>
        </div>
      `;
      
      const popup = new mapboxgl.Popup({ offset: 25 })
        .setHTML(popupContent)
        .on('close', () => {
          this.isViewingReportPopup = false;
        });

      this.isViewingReportPopup = true; // L'utilisateur est en train de voir un signalement existant
      this.currentPopup = popup; // Garder une référence de la popup
      this.marker.setPopup(popup);
    },

    async fetchReports() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Token manquant dans localStorage");
          return;
        }

        const response = await axios.get("http://127.0.0.1:8000/reports/get_reports/", {
          headers: {
            Authorization: token,
          },
        });

        this.reports = response.data.reports.map(report => ({
          report,
          isResolved: report.isResolved || false,
        }));

        // Afficher les marqueurs bleus pour chaque signalement
        this.reports.forEach((report) => {
          if (report.report.longitude && report.report.latitude) {
            const marker = new mapboxgl.Marker({ color: report.report.isResolved ? "green" : "red" })
              .setLngLat([report.report.longitude, report.report.latitude])
              .addTo(this.map);

              const popupContent = document.createElement("div");
popupContent.innerHTML = `
  <div>
      <p><strong>Description :</strong> ${report.report.description }</p>
      <p><strong>État :</strong> ${report.report.isResolved ? 'Résolu' : 'Non résolu'}</p>
      <p><strong>Date de création :</strong> ${new Date(report.report.created_at).toLocaleString()}</p>
      ${
  report.report.photo_data
    ? `<img src="${report.report.photo_data}" alt="Photo du déchet" style="max-width: 100%; height: auto;"/>`
    : "<p style='color: gray;'>Aucune photo disponible pour ce signalement.</p>"
}

  </div>
`;

const resolveButton = document.createElement("button");
resolveButton.textContent = "Prendre en charge les déchets signalés.";
resolveButton.className = "resolve-btn";
resolveButton.addEventListener("click", () =>
  this.resolveReport(report.report.id)
);
popupContent.appendChild(resolveButton);

const popup = new mapboxgl.Popup({ offset: 25 }).setDOMContent(popupContent);
marker.setPopup(popup);

          }
        });
      } catch (error) {
        console.error(error);
        alert("Erreur lors du chargement des signalements.");
      }
    },
    async resolveReport(reportId) {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Token manquant, impossible de résoudre le signalement.");
      return;
    }

    const confirmation = confirm(
      "Êtes-vous sûr(e) de vouloir marquer ce signalement comme résolu ?"
    );
    if (!confirmation) return;

    const response = await axios.post(
      "http://127.0.0.1:8000/reports/resolve_report/",
      { report_id: reportId },
      {
        headers: {
          Authorization: token,
        },
      }
    );

    if (response.data.success) {
      alert("Le signalement a été marqué comme résolu.");
      window.location.reload();
    } else {
      alert(response.data.message);
      window.location.reload();
    }
  } catch (error) {
    console.error(error);
    alert("Erreur lors de la résolution du signalement.");
  }
},


    mapClick(event) {
  if (this.isAddingReport) {
    const coordinates = [event.lngLat.lng, event.lngLat.lat];
    this.selectedCoordinates = coordinates;

    // Ajouter ou déplacer le marqueur
    if (this.marker) {
      this.marker.setLngLat(coordinates);
    } else {
      this.marker = new mapboxgl.Marker({ color: "red" })
        .setLngLat(coordinates)
        .addTo(this.map);
    }
  } else {
    // Si on n'est pas en mode ajout, on peut ouvrir la popup du signalement existant
    const features = this.map.queryRenderedFeatures(event.point, { layers: ['marker-layer'] });
    if (features.length) {
      const feature = features[0];
      this.openReportPopup(feature);
    }
  }
},

    closePopup() {
      if (this.currentPopup) {
        this.currentPopup.remove();
      }
      this.isAddingReport = false; // Réinitialiser après fermeture de la popup existante
    },

    confirmSignalement() {
      this.$router.push({
        name: "ReportForm",
        query: {
          longitude: this.selectedCoordinates[0],
          latitude: this.selectedCoordinates[1],
        },
      });
      this.selectedCoordinates = null;
    },

    cancelSignalement() {
      if (this.marker) {
        this.marker.remove();  // Supprimer le marqueur existant
        this.marker = null;
      }
      this.selectedCoordinates = null;
    },

    // Filtrage des signalements selon la distance
    getDistance(lat1, lon1, lat2, lon2) {
      const R = 6371; // Rayon de la Terre en km
      const dLat = this.degreesToRadians(lat2 - lat1);
      const dLon = this.degreesToRadians(lon2 - lon1);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(this.degreesToRadians(lat1)) *
          Math.cos(this.degreesToRadians(lat2)) *
          Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c;
    },

    degreesToRadians(degrees) {
      return degrees * (Math.PI / 180);
    },

    // Calculer les signalements à afficher en fonction de la distance filtrée
    filteredReports() {
      const userCoordinates = [
        this.userLocationMarker ? this.userLocationMarker.getLngLat().lng : 0,
        this.userLocationMarker ? this.userLocationMarker.getLngLat().lat : 0
      ];

      return this.reports.filter((report) => {
        if (report.report.latitude && report.report.longitude) {
          const distance = this.getDistance(
            userCoordinates[1],
            userCoordinates[0],
            report.report.latitude,
            report.report.longitude
          );
          return distance <= this.filterDistance;
        }
        return false;
      });
    }
  }
};
</script>
  
  
  <style>
  .map-container {
    width: 90%;
    height: 500px;
    margin: 20px auto;
    position: relative;
    margin-top: 20px;
  }

  .map-container .map {
  width: 100%; /* Assure que la carte prend toute la largeur disponible */
  height: 600px; /* Augmente la hauteur de la carte */
  border: 1px solid #ddd; /* Optionnel : une bordure pour bien délimiter la carte */
  border-radius: 5px; /* Optionnel : coins arrondis pour un effet moderne */
}
  
#map {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    position: relative;
  }
  
  .signalement-popup {
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    background: #ffffff;
    border: 1px solid #e0e0e0;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 15px 20px;
    border-radius: 8px;
    z-index: 1000;
    max-width: 300px;
    text-align: center;
  }
  
  .signalement-popup p {
    margin: 0 0 10px;
    font-size: 14px;
    color: #333;
    line-height: 1.6;
  }
  
  .signalement-popup p strong {
    font-size: 16px;
    color: #007bff;
  }
  
  .popup-actions {
    display: flex;
    justify-content: center;
    gap: 10px;
  }
  
  .confirm-btn {
    background: #28a745;
    color: #fff;
    padding: 8px 12px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
    transition: background 0.3s ease;
  }
  
  .confirm-btn:hover {
    background: #218838;
  }
  
  .cancel-btn {
    background: #dc3545;
    color: #fff;
    padding: 8px 12px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
    transition: background 0.3s ease;
  }
  
  .cancel-btn:hover {
    background: #c82333;
  }
  
  .mapbox-carousel {
    width: 200px;
    position: relative;
    text-align: center;
  }
  
  .carousel-slides {
    display: flex;
    flex-wrap: nowrap;
    overflow: hidden;
  }
  
  .carousel-slide {  
  flex: 0 0 100%;
  display: none;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 10px;
  background-color: #f7f7f7;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.carousel-slide:first-child {
  display: block;
}

.carousel-prev,
.carousel-next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 16px;
}

.carousel-prev {
  left: -35px;
}

.carousel-next {
  right: -35px;
}

.resolve-btn {
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  cursor: pointer;
  margin-top: 10px;
}

.resolve-btn:hover {
  background-color: #45a049;
}

.add-report-btn {
  background-color: #0d6b1b; /* Bleu primaire */
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.add-report-btn:hover {
  background-color: #08853a; /* Bleu plus foncé */
  transform: scale(1.05); /* Légère mise en avant */
}

.add-report-btn:active {
  transform: scale(1); /* Réinitialisation au clic */
}

.add-report-btn.active {
  background-color: #dc3545; /* Rouge (Annuler) */
}

.add-report-btn.active:hover {
  background-color: #a71d2a; /* Rouge plus foncé */
}


.add-report-btn {
  margin-bottom: 10px; /* Espace entre le bouton et la carte */
}



  </style>
  
=======
  <div id="map" style="height: 500px;"></div>
</template>

<script>
import L from "leaflet";

export default {
  mounted() {
    this.map = L.map("map").setView([48.8566, 2.3522], 13); // Vue par défaut sur Paris
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(this.map);

    this.loadMarkers();
  },
  methods: {
    async loadMarkers() {
      try {
        const response = await fetch("http://127.0.0.1:8000/report/");
        const data = await response.json();
        data.forEach((report) => {
          const marker = L.marker([report.latitude, report.longitude]).addTo(this.map);
          marker.bindPopup(`<b>${report.description}</b><br>${report.location}`);
        });
      } catch (error) {
        console.error("Erreur lors du chargement des signalements :", error);
      }
    },
  },
};
</script>

<style>
#map {
  height: 500px;
}
</style>
>>>>>>> 76aa9f2 ( j 'ai ajouté des dossiers : router, views dans le dossier src (dans l'objectif de mettre des fichiers adequats à l'interieur)/ j'ai aussi installer vue-leaftlet important pour le package.jason)
