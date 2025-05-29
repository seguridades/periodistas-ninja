<template>
  <section class="home-view">
    <!-- Logo y título -->
    <header class="title-section text-center">
      <img src="../assets/logo_pixel_art.png" alt="Logo" class="logo-image mb-4" />
      <h1 class="game-title">PERIODISTAS NINJA</h1>
    </header>

    <!-- Ninja -->
    <div class="ninja-section text-center">
      <img src="../assets/ninja_pixel_art.png" alt="Ninja" class="ninja-image" />
    </div>

    <!-- Botón iniciar misiones -->
    <div class="button-section text-center">
      <router-link to="/misiones" class="btn-retro btn-lg mt-2"> INICIAR MISIONES </router-link>
    </div>

    <!-- Opciones adicionales -->
    <footer class="options-section text-center">
      <button class="btn btn-sm btn-secondary mx-2">INSTRUCCIONES</button>
      <button class="btn btn-sm btn-secondary mx-2">CRÉDITOS</button>
      <button class="btn btn-sm btn-secondary mx-2">OPCIONES</button>
    </footer>
  </section>
</template>

<script setup></script>

<style scoped>
.home-view {
  min-height: 100vh;
  background-color: #173960;
  color: white;
  font-family: 'Press Start 2P', cursive;
  position: relative;
  background-image: url('../assets/city_background_pixel_art.png');
  background-size: cover;
  background-position: center;
}

/* Título */
.title-section {
  margin-top: 50px;
}

.logo-image {
  width: 80px;
  height: auto;
  transition: transform 0.3s ease;
}

.logo-image:hover {
  transform: scale(1.1);
}

.game-title {
  font-size: 2rem;
  color: #fdd017; /* Amarillo brillante */
  text-shadow: 2px 2px 4px black;
}

/* Ninja */
.ninja-section {
  margin-top: 50px;
}

.ninja-image {
  width: 200px;
  height: auto;
  transition: transform 0.3s ease;
}

.ninja-image:hover {
  transform: scale(1.05);
}

/* Botón iniciar misiones */
.button-section {
  margin-top: 50px;
}

.btn-retro {
  font-size: 1rem;
  padding: 12px 24px;
  border: 3px solid white;
  background-color: #ff6f00;
  color: white;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  font-family: 'Press Start 2P', cursive;
  box-shadow: 0 5px 0 black;
  text-decoration: none;
  display: inline-block;
}

.btn-retro:hover {
  background-color: #e65100;
  border-color: #e65100;
  transform: translateY(2px);
  box-shadow: 0 8px 0 black;
}

.btn-retro:active {
  transform: translateY(4px);
  box-shadow: 0 2px 0 black;
}

/* Opciones adicionales */
.options-section {
  margin-top: 50px;
}

.btn-sm {
  font-size: 0.8rem;
  padding: 6px 12px;
  border: 2px solid white;
  background-color: #333;
  color: white;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  font-family: 'Press Start 2P', cursive;
}

.btn-sm:hover {
  background-color: #555;
  border-color: #fff;
}
</style>
