import YugutouUI from '@yugutou/comps'
import { createApp } from 'vue'
import App from './App.vue'
import './style.css'

createApp(App)
  .use(YugutouUI)
  .mount('#app')
