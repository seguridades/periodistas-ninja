<template>
  <section class="text-center my-auto">
    <!-- Logo -->
    <header class="mb-5">
      <img src="../assets/seguridades_logo.png" alt="Seguridades Logo" class="logo-image" />
    </header>

    <!-- Contenido principal -->
    <main class="d-flex flex-column align-items-center">
      <img src="../assets/ninja.png" alt="Ninja" class="ninja-image" />

      <button @click="startMission" class="btn btn-lg start-mission-button mt-4">
        IMICIAR MISIÓN
      </button>
    </main>
  </section>
</template>

<script>
export default {
  methods: {
    startMission() {
      this.$router.push('/mision')
    },
  },
}
</script>

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
