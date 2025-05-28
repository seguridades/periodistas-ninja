<template>
  <div class="medalla-desbloqueada text-center p-4">
    <h2>🏆 ¡Has desbloqueado una nueva medalla!</h2>

    <div class="medal-card my-4 p-3 d-inline-block">
      <h4>{{ medalla.nombre }}</h4>
      <p class="text-muted">{{ medalla.descripcion }}</p>
    </div>

    <div class="mt-4">
      <button class="btn btn-primary" @click="$emit('continuar')">Continuar</button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  medalla: {
    type: Object,
    required: true,
  },
})

defineEmits(['continuar'])
</script>

<style scoped>
.medalla-desbloqueada {
  max-width: 600px;
  margin: auto;
}

.medal-card {
  background-color: #fff8dc;
  border: 2px solid #ffd700;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  font-family: 'Press Start 2P', cursive;
}
</style>
