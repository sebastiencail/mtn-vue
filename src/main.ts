import '@fontsource/roboto/100.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import '@fontsource/roboto/900.css'

/* optional italic styles */
import '@fontsource/roboto/100-italic.css'
import '@fontsource/roboto/300-italic.css'
import '@fontsource/roboto/400-italic.css'
import '@fontsource/roboto/500-italic.css'
import '@fontsource/roboto/700-italic.css'
import '@fontsource/roboto/900-italic.css'

import { createApp } from 'vue'
import '@mdi/font/css/materialdesignicons.css'
import App from './App.vue'
import { createVuetify } from 'vuetify'
import 'vuetify/styles'
import router from './router'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import './assets/main.css'

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light', // 'light' | 'dark' | 'system'
  },
})

createApp(App).use(vuetify).use(router).mount('#app')
