<template>
  <footer class="app-footer">
    <p class="footer-text">© 2024 Cleanup Heroes - Tous droits réservés.</p>
    <div class="social-icons">
      <a href="https://www.facebook.com" target="_blank" aria-label="Facebook">
        <i class="fab fa-facebook-f"></i>
      </a>
      <a href="https://www.twitter.com" target="_blank" aria-label="Twitter">
        <i class="fab fa-twitter"></i>
      </a>
      <a href="https://www.instagram.com" target="_blank" aria-label="Instagram">
        <i class="fab fa-instagram"></i>
      </a>
    </div>
  </footer>
</template>

<script>
export default {
  name: "AppFooter",
};
</script>

<style scoped>
/* Conteneur du footer */
.app-footer {
  background-color: #1a6f4b; /* Vert foncé */
  color: #ffffff;
  text-align: center;
  padding: 1.5rem 0;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
}

/* Texte du footer */
.footer-text {
  font-size: 1rem;
  margin: 0;
}

/* Section des icônes sociales */
.social-icons {
  margin-top: 0.5rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
}

/* Styles des icônes */
.social-icons a {
  color: #ffffff;
  font-size: 1.2rem;
  transition: color 0.3s ease;
}

.social-icons a:hover {
  color: #38bd94; /* Vert pastel au survol */
}
</style>
