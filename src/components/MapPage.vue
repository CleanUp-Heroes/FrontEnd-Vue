<template>
    <div>
      <h1>Carte des signalements</h1>
      <MapComponent /> <!-- Intégration du MapComponent ici -->
    </div>
  </template>
  
  <script>
  import MapComponent from "@/components/MapComponent.vue"; // chemin
  
  export default {
    name: "MapPage",
    components: {
      MapComponent,
    },
  };
  </script>
  
  <style scoped>
  /* Ajoutez du style spécifique à la page MapPage ici si nécessaire */
  </style>
  