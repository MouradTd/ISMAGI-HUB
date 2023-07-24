import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';
import Menu from 'primevue/menu';
import Sidebar from 'primevue/sidebar';
import axios from 'axios'
import VueAxios from 'vue-axios'



import Toast from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";
//All Sidebar menu are in src/layout/AppMenu.vue
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import '@/assets/styles.scss'
const app = createApp(App)

app.use(PrimeVue,{ripple: true})
app.use(Toast);
app.use(router);
app.use(VueAxios,axios);
app.component('Sidebar', Sidebar);

app.component('Menu', Menu);

app.component('Toast', Toast);

app.mount('#app')
