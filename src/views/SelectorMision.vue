<template>
  <section class="selector-misiones py-5">
    <div class="container">
      <!-- Título -->
      <h1 class="text-center mb-5 title">SELECCIONA TU MISIÓN</h1>

      <!-- Lista de misiones -->
      <div class="row justify-content-center g-4">
        <div v-for="mision in misiones" :key="mision.id" class="col-md-6 col-lg-4">
          <router-link
            :to="`/mision/${mision.id}`"
            class="mission-card d-flex align-items-center text-decoration-none"
            :class="{ completed: isMissionCompleted(mision.id) }"
          >
            <div class="mission-icon me-3">
              <i
                :class="isMissionCompleted(mision.id) ? 'bi bi-check-circle-fill' : 'bi bi-lock'"
                style="font-size: 32px"
              ></i>
            </div>
            <div class="mission-info">
              <h5 class="mission-title">{{ mision.titulo }}</h5>
              <p class="mission-desc">{{ mision.descripcion }}</p>
            </div>
          </router-link>
        </div>
      </div>

      <!-- Items de poder obtenidos -->
      <div v-if="itemsDePoder.length > 0" class="mt-5">
        <h2 class="text-center mb-4">TUS ITEMS DE PODER OBTENIDOS</h2>
        <div class="d-flex flex-wrap justify-content-center gap-3">
          <div
            v-for="(item, index) in itemsDePoder"
            :key="index"
            class="item-poder-card p-3 text-center position-relative"
            @mouseenter="showTooltip[index] = true"
            @mouseleave="showTooltip[index] = false"
          >
            <i :class="item.icono" style="font-size: 64px; color: #ff6f00" class="mb-2"></i>
            <h5>{{ item.nombre }}</h5>

            <!-- Tooltip -->
            <div v-if="showTooltip[index]" class="tooltip-box bg-dark text-white p-2 rounded">
              {{ item.descripcion }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import misionesData from '@/data/misiones.json'

// Cargar misiones
const misiones = misionesData.misiones

// Comprobar si la misión está completada
const completedMissions = ref(JSON.parse(localStorage.getItem('completedMissions') || '[]'))

function isMissionCompleted(id) {
  return completedMissions.value.includes(id)
}

// Cargar items de poder desde localStorage
const itemsDePoder = ref(JSON.parse(localStorage.getItem('medallas') || '[]'))

// Estado para mostrar tooltip
const showTooltip = ref(Array(itemsDePoder.value.length).fill(false))
</script>

<style scoped>
.selector-misiones {
  min-height: 100vh;
  background-color: #173960;
  color: white;
  font-family: 'Press Start 2P', cursive;
}

.title {
  font-size: 1.5rem;
  color: #fdd017;
  text-shadow: 2px 2px 4px black;
}

/* Tarjeta de misión */
.mission-card {
  background-color: rgba(255, 255, 255, 0.1);
  border: 2px solid #ff6f00;
  padding: 15px;
  border-radius: 8px;
  transition: all 0.2s ease-in-out;
  color: white;
  display: flex;
  align-items: center;
}

.mission-card:hover {
  background-color: rgba(255, 111, 0, 0.2);
  transform: scale(1.02);
  box-shadow: 0 0 10px #ff6f00;
}

.completed {
  background-color: rgba(0, 128, 0, 0.2) !important;
  border-color: #008000 !important;
  color: #ccffcc !important;
}

.mission-title {
  font-size: 1rem;
  margin-bottom: 0;
}

.mission-desc {
  font-size: 0.8rem;
  margin-bottom: 0;
  color: #ccc;
}

/* Icono de estado */
.mission-icon i {
  transition: transform 0.3s ease;
}

.mission-card:hover .mission-icon i {
  transform: scale(1.1);
}

/* Sección de items de poder */
.item-poder-card {
  background-color: rgba(255, 255, 255, 0.1);
  border: 2px solid #fff;
  border-radius: 8px;
  width: 200px;
  color: white;
  font-size: 0.8rem;
  position: relative;
  cursor: pointer;
}

.item-poder-card:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.tooltip-box {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  opacity: 0.9;
  white-space: nowrap;
  font-size: 0.75rem;
  transition: all 0.3s ease;
}
</style>
