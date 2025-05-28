<template>
  <div class="quiz-container container py-5">
    <!-- Información de la misión -->
    <h2>{{ mision.titulo }}</h2>
    <p class="text-muted">{{ mision.descripcion }}</p>

    <!-- Barra de vidas -->
    <div class="mb-3">
      <strong>Vidas:</strong>
      <span v-for="n in vidas" :key="n"> ❤️ </span>
    </div>

    <!-- Pregunta actual -->
    <div v-if="currentQuestionIndex < totalPreguntas">
      <QuizQuestion
        :pregunta="preguntas[currentQuestionIndex]"
        @respuestaCorrecta="handleRespuestaCorrecta"
        @respuestaIncorrecta="handleRespuestaIncorrecta"
      />
    </div>

    <!-- Jefe final -->
    <div v-else-if="!jefeDerrotado && currentQuestionIndex === totalPreguntas">
      <h4>¡Jefe Final!</h4>
      <QuizQuestion
        :pregunta="mision.jefe"
        @respuestaCorrecta="handleJefeFinalCorrecto(true)"
        @respuestaIncorrecta="handleJefeFinalCorrecto(false)"
      />
    </div>

    <!-- Pantalla de medalla -->
    <div v-if="mostrarMedalla">
      <MedallaDesbloqueada :medalla="mision.recompensa" @continuar="irSelectorMisiones" />
    </div>

    <!-- Pantalla de derrota -->
    <div v-if="vidas <= 0" class="game-over text-center">
      <h3>💀 ¡Te quedaste sin vidas!</h3>
      <p>La misión ha fallado. Inténtalo otra vez.</p>
      <button class="btn btn-danger" @click="resetJuego">Reintentar</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import misionesData from '@/data/misiones.json'
import QuizQuestion from '@/components/QuizQuestion.vue'
import MedallaDesbloqueada from '@/components/MedallaDesbloqueada.vue'

const route = useRoute()
const router = useRouter()

// Datos de la misión actual
const mision = ref(misionesData.misiones.find((m) => m.id === route.params.id))

// Preguntas de la misión
const preguntas = ref(mision.value?.preguntas || [])
const totalPreguntas = ref(preguntas.value.length)

// Estado del juego
const currentQuestionIndex = ref(0)
const vidas = ref(3)
const jefeDerrotado = ref(false)
const mostrarMedalla = ref(false)

// Verificar si ya completó esta misión
const completedMissions = ref(JSON.parse(localStorage.getItem('completedMissions') || '[]'))

// Manejar respuesta correcta en pregunta normal
function handleRespuestaCorrecta() {
  currentQuestionIndex.value++
}

function handleRespuestaIncorrecta() {
  vidas.value--
}

// Manejar respuesta correcta en jefe final
function handleJefeFinalCorrecto(esCorrecta) {
  if (esCorrecta) {
    jefeDerrotado.value = true
    marcarMisionComoCompletada()
  } else {
    // Si falla al jefe final, pierde todas las vidas
    vidas.value = 0
  }
}

// Marcar misión como completada en localStorage
function marcarMisionComoCompletada() {
  const lista = [...completedMissions.value]
  if (!lista.includes(mision.value.id)) {
    lista.push(mision.value.id)
    localStorage.setItem('completedMissions', JSON.stringify(lista))
    completedMissions.value = lista

    // Guardar la medalla obtenida
    const medallasObtenidas = JSON.parse(localStorage.getItem('medallas') || '[]')
    medallasObtenidas.push(mision.value.recompensa)
    localStorage.setItem('medallas', JSON.stringify(medallasObtenidas))
  }

  mostrarMedalla.value = true
}

// Reiniciar juego
function resetJuego() {
  currentQuestionIndex.value = 0
  vidas.value = 3
  jefeDerrotado.value = false
  mostrarMedalla.value = false
}

// Volver al selector
function irSelectorMisiones() {
  router.push('/misiones')
}
</script>

<style scoped>
.quiz-container {
  max-width: 600px;
  margin: auto;
}
.game-over {
  color: red;
}
</style>
