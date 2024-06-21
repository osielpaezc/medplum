import './assets/main.css'

import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import MedplumVue from './plugins/medplum'

import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
import { useToast } from 'primevue/usetoast';

const app = createApp(App)

app.use(PrimeVue, {
  theme: {
      preset: Aura,
      options: {
          prefix: 'p',
          darkModeSelector: 'system',
          cssLayer: {
            name: 'primevue',
            order: 'tailwind-base, primevue, tailwind-utilities'
        }
      }
  }
});

app.use(createPinia())

app.use(router)

app.use(MedplumVue)

app.mount('#app')
