import './assets/main.css'
import 'vue-toastification/dist/index.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Toaster from 'vue-toastification'

const app = createApp(App)

app
    .use(router)
    .use(Toaster, {})

app.mount('#app')