import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Importa estilos de Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'

import { gsap } from 'gsap'

const app = createApp(App)

// Hacer GSAP disponible globalmente
app.config.globalProperties.$gsap = gsap

app.use(router)

app.mount('#app')
