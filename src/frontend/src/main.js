import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import { loadFonts } from './plugins/webfontloader'

loadFonts()

const backend_server = process.env.VUE_APP_BACKEND_SERVER
const backend_port = process.env.VUE_APP_BACKEND_PORT
const app = createApp(App)

app.config.globalProperties.$axios = axios.create({
  baseURL: `http://${backend_server}:${backend_port}/`
});

app
  .use(router)
  .use(store)
  .use(vuetify)
  .mount('#app')
