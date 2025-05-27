<template>
  <div class="container-fluid h-100 d-flex flex-column justify-content-between">
    <!-- Encabezado con logo -->
    <header class="text-center mb-5">
      <img src="@/assets/seguridades_logo.png" alt="Seguridades Logo" class="logo-image" />
    </header>

    <!-- Contenido principal -->
    <main class="d-flex flex-column align-items-center justify-content-center">
      <!-- Imagen del personaje -->
      <img src="@/assets/ninja.png" alt="Ninja" class="ninja-image" />

      <!-- Botón de inicio de misión -->
      <button class="btn btn-lg btn-primary start-mission-button mt-4">IMICIAR MISIÓN</button>
    </main>

    <!-- Menús inferiores centrados -->
    <footer class="text-center">
      <nav class="navbar navbar-expand-lg navbar-light bg-light w-100">
        <div class="container-fluid justify-content-center">
          <ul class="navbar-nav mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link" href="#">INSTRUCCIONES</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">CRÉDITOS</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">OPCIONES</a>
            </li>
          </ul>
        </div>
      </nav>
    </footer>
  </div>
</template>

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
