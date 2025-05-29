<template>
  <section class="text-center my-auto">
    <!-- Logo -->
    <header class="mb-5">
      <img src="../assets/seguridades_logo.png" alt="Seguridades Logo" class="logo-image" />
    </header>

    <!-- Contenido principal -->
    <main class="d-flex flex-column align-items-center">
      <img src="../assets/ninja.png" alt="Ninja" class="ninja-image" />
      <router-link to="/misiones" class="btn btn-success btn-lg mt-4">
        INICIAR MISIONES
      </router-link>
    </main>
  </section>
</template>

<script setup></script>

<style scoped>
.logo-image {
  width: 200px;
  height: auto;
}

.ninja-image {
  width: 300px;
  height: auto;
}

.start-mission-button {
  background-color: #ff6f00;
  border-color: #ff6f00;
  color: white;
  font-size: 1.5rem;
  padding: 10px 20px;
}

.start-mission-button:hover {
  background-color: #e65100;
  border-color: #e65100;
}
</style>
