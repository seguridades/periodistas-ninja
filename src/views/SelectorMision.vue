<template>
  <div class="container mt-5">
    <h2 class="mb-4">Selecciona una misión</h2>
    <div class="row">
      <div class="col-md-4 mb-3">
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title">
              <div>mision</div>
              <span v-if="completadas.includes(mision.id)" class="badge bg-success ms-2"
                >¡Completada!</span
              >
            </h5>
            <p class="card-text">{{ mision.descripcion }}</p>
            <router-link :to="`/jugar/${mision.id}`" class="btn btn-primary">
              Empezar mision
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>
