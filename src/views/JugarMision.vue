<template>
  <div class="quiz-container container py-5">
    <!-- Estado: Cargando -->
    <div v-if="estado === 'cargando'" class="text-center">
      <p>🔄 Cargando misión...</p>
    </div>

    <!-- Estado: No encontrada -->
    <div v-else-if="estado === 'no-encontrada'" class="text-center text-danger">
      <h3>⚠️ Misión no encontrada</h3>
      <p>No se pudo encontrar la misión solicitada.</p>
      <button class="btn btn-primary" @click="irSelectorMisiones">Volver al selector</button>
    </div>

    <!-- Estado: Jugar -->
    <div v-else>
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

      <!-- Pantalla de introducción al jefe -->
      <div
        v-if="currentQuestionIndex === totalPreguntas && !jefeDerrotado && !mostrarPantallaJefe"
        class="boss-intro text-center p-4"
      >
        <img v-if="jefeImagen" :src="jefeImagen" alt="Jefe Final" class="boss-image mb-3" />
        <h3 class="mb-3">⚔️ {{ nombreJefe }}</h3>
        <p class="lead">{{ mensajeIntro }}</p>
        <button class="btn btn-primary btn-lg mt-4" @click="mostrarPantallaJefe = true">
          Enfrentar
        </button>
      </div>

      <!-- Jefe final -->
      <div v-if="mostrarPantallaJefe && !jefeDerrotado && currentQuestionIndex === totalPreguntas">
        <h4 class="text-center">⚔️ {{ nombreJefe }}</h4>
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
      <div v-if="vidas <= 0" class="game-over-overlay">
        <div class="game-over-content text-center">
          <h2 v-if="derrotadoPorJefe">
            ❌ El <strong>{{ nombreJefe }}</strong> te ha derrotado.
          </h2>
          <h2 v-else>💀 {{ ultimaPreguntaFallada ? 'Misión fallida' : 'Sin vidas' }}</h2>

          <p class="mt-3">
            {{
              derrotadoPorJefe
                ? 'El jefe final te ha vencido. Vuelve a intentarlo.'
                : 'Te quedaste sin vidas. Elige otra misión o inténtalo otra vez.'
            }}
          </p>

          <button class="btn btn-danger btn-lg mt-3" @click="irSelectorMisiones">
            Volver al selector
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import misionesData from '@/data/misiones.json'
import QuizQuestion from '@/components/QuizQuestion.vue'
import MedallaDesbloqueada from '@/components/MedallaDesbloqueada.vue'

const route = useRoute()
const router = useRouter()

// Datos de la misión
const estado = ref('cargando') // cargando / no-encontrada / lista
const mision = ref(null)

// Preguntas de la misión
const preguntas = computed(() => mision.value?.preguntas || [])
const totalPreguntas = computed(() => preguntas.value.length)

// Estado del juego
const currentQuestionIndex = ref(0)
const vidas = ref(3)
const jefeDerrotado = ref(false)
const mostrarMedalla = ref(false)
const mostrarPantallaJefe = ref(false)
const ultimaPreguntaFallada = ref(null)
const derrotadoPorJefe = ref(false)

// Datos del jefe
const nombreJefe = computed(() => mision.value?.jefe?.nombre || 'Jefe Final')
const mensajeIntro = computed(
  () => mision.value?.jefe?.mensajeIntro || 'Prepárate para el desafío final.',
)

// Imagen del jefe
const jefeImagen = computed(() => {
  if (!mision.value?.jefe?.imagen) return null
  try {
    return new URL(`../assets/jefes/${mision.value.jefe.imagen}`, import.meta.url).href
  } catch (e) {
    console.warn('No se encontró la imagen:', mision.value.jefe.imagen, e.message)
    return null
  }
})

// Verificar si ya completó esta misión
const completedMissions = ref(JSON.parse(localStorage.getItem('completedMissions') || '[]'))

// Manejar respuesta correcta en pregunta normal
function handleRespuestaCorrecta() {
  currentQuestionIndex.value++
}

// Manejar respuesta incorrecta
function handleRespuestaIncorrecta() {
  vidas.value--
  if (vidas.value <= 0) {
    ultimaPreguntaFallada.value = preguntas.value[currentQuestionIndex.value]
  }
}

// Manejar respuesta correcta en jefe final
function handleJefeFinalCorrecto(esCorrecta) {
  if (esCorrecta) {
    jefeDerrotado.value = true
    marcarMisionComoCompletada()
  } else {
    vidas.value = 0
    ultimaPreguntaFallada.value = mision.value.jefe
    derrotadoPorJefe.value = true
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
function irSelectorMisiones() {
  router.push('/misiones')
}

// Inicialización
onMounted(() => {
  const idMision = route.params.id
  const misionEncontrada = misionesData.misiones.find((m) => m.id === idMision)

  if (misionEncontrada) {
    mision.value = misionEncontrada
    estado.value = 'lista'
  } else {
    console.error(`No se encontró una misión con id: ${idMision}`)
    estado.value = 'no-encontrada'
  }
})
</script>

<style scoped>
.quiz-container {
  max-width: 600px;
  margin: auto;
}

.boss-intro {
  max-width: 500px;
  margin: auto;
  background-color: rgba(0, 0, 0, 0.8);
  border: 4px solid white;
  border-radius: 10px;
  padding: 2rem;
  font-family: 'Press Start 2P', cursive;
}

.boss-image {
  width: 150px;
  height: auto;
  border: 2px solid white;
  border-radius: 8px;
  box-shadow: 0 0 10px red;
}

.game-over-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(139, 0, 0, 0.95);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  font-family: 'Press Start 2P', cursive;
}

.game-over-content {
  padding: 2rem;
  border: 4px solid white;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 8px;
  box-shadow: 0 0 20px red;
}
</style>
