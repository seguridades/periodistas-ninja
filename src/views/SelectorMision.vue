<template>
  <div class="mission-selector container py-5">
    <h1 class="text-center mb-4">Selecciona tu Misión</h1>

    <div class="list-group">
      <router-link
        v-for="mision in misiones"
        :key="mision.id"
        :to="`/mision/${mision.id}`"
        class="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
        :class="{ completed: isMissionCompleted(mision.id) }"
      >
        <div>
          <h5 class="mb-1">{{ mision.titulo }}</h5>
          <p class="mb-1 text-muted">{{ mision.descripcion }}</p>
        </div>
        <span class="badge" :class="isMissionCompleted(mision.id) ? 'bg-success' : 'bg-secondary'">
          {{ isMissionCompleted(mision.id) ? 'Completada' : 'Pendiente' }}
        </span>
      </router-link>
    </div>
  </div>
  <div v-if="medallas.length > 0" class="mt-5">
    <h4>Tus medallas obtenidas</h4>
    <div class="d-flex flex-wrap gap-3">
      <div v-for="(medalla, index) in medallas" :key="index" class="medalla-card p-3 text-center">
        <h5>{{ medalla.nombre }}</h5>
        <p class="text-muted small">{{ medalla.descripcion }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import misionesData from '@/data/misiones.json'
const medallas = ref(JSON.parse(localStorage.getItem('medallas') || '[]'))

const misiones = misionesData.misiones

// Usamos localStorage para guardar qué misiones están completadas
const completedMissions = ref(JSON.parse(localStorage.getItem('completedMissions') || '[]'))

// Función para saber si una misión está completada
function isMissionCompleted(id) {
  return completedMissions.value.includes(id)
}
</script>

<style scoped>
.completed {
  background-color: #d4edda !important;
  border-color: #c3e6cb !important;
}

.badge {
  font-size: 0.85rem;
  padding: 0.5em 0.7em;
}
.medalla-card {
  background-color: #fff8dc;
  border: 2px solid #ffd700;
  border-radius: 10px;
  width: 200px;
  font-family: 'Press Start 2P', cursive;
}
</style>
