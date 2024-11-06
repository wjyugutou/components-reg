import { createApp } from 'vue'
import YugutouUI from 'yugutou-ui'
import App from './App.vue'

// import 'yugutou-ui/dist/index.css'

createApp(App)
  .use(YugutouUI)
  .mount('#app')
