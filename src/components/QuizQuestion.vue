<template>
  <div class="question-card">
    <h5>{{ pregunta.pregunta }}</h5>

    <ul class="list-group">
      <li
        v-for="(opcion, index) in pregunta.opciones"
        :key="index"
        class="list-group-item"
        :class="{
          correct: selectedIndex === index && selectedIndex === pregunta.respuestaCorrecta,
          incorrect: selectedIndex === index && selectedIndex !== pregunta.respuestaCorrecta,
        }"
        style="cursor: pointer"
        @click="seleccionarOpcion(index)"
      >
        {{ opcion }}
      </li>
    </ul>

    <!-- Mensaje de resultado -->
    <div v-if="selectedIndex !== null" class="mt-3">
      <p v-if="esCorrecta" class="text-success">
        ✔️ ¡Correcto!
        <span v-if="pregunta.explicacionCorrecta" class="d-block mt-2">{{
          pregunta.explicacionCorrecta
        }}</span>
      </p>
      <p v-else class="text-danger">
        ❌ Respuesta incorrecta. Inténtalo otra vez.
        <span v-if="pregunta.explicacionIncorrecta" class="d-block mt-2 text-muted">{{
          pregunta.explicacionIncorrecta
        }}</span>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  pregunta: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['respuestaCorrecta', 'respuestaIncorrecta'])

const selectedIndex = ref(null)
const esCorrecta = ref(null)

function seleccionarOpcion(index) {
  selectedIndex.value = index
  esCorrecta.value = index === props.pregunta.respuestaCorrecta

  if (esCorrecta.value) {
    emit('respuestaCorrecta')
  } else {
    emit('respuestaIncorrecta')
  }
}
</script>

<style scoped>
.correct {
  background-color: #d4edda !important;
  color: #155724;
  font-weight: bold;
}

.incorrect {
  background-color: #f8d7da !important;
  color: #721c24;
  font-weight: bold;
}
</style>
