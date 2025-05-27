import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Importa estilos de Bootstrap
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'

const app = createApp(App)

app.use(router)

app.mount('#app')
