<template>
    <div>
      <h1>Carte des signalements</h1>
      <p>Cliquez sur la carte pour ajouter un signalement.</p>
      <MapComponent
        :reports="reports"
        :onStatusChange="toggleStatus"
        @add-report="addReport"
      />
    </div>
  </template>
  
  <script>
  import MapComponent from "@/components/MapComponent.vue";
  
  export default {
    name: "MapPage",
    components: { MapComponent },
    data() {
      return {
        reports: [], // Liste des signalements
      };
    },
    methods: {
      // Ajouter un nouveau signalement
      addReport(report) {
        this.reports.push(report);
      },
      // Changer l'état d'un signalement
      toggleStatus(reportId) {
        const report = this.reports.find((r) => r.id === reportId);
        if (report) {
          report.status = report.status === "À traiter" ? "Ramassé" : "À traiter";
        }
      },
    },
  };
  </script>
  