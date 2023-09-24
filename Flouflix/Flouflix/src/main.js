import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { Chart } from 'chart.js';
import ElementPlus from 'element-plus'; // Importation de la librairie
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import 'element-plus/dist/index.css'; // Importation du fichier CSS
import piniaPersist from 'pinia-plugin-persist';
import App from '@/App.vue';
import router from '@/router';
import '@/assets/scss/main.css';


const app = createApp(App);
const pinia = createPinia();



pinia.use(piniaPersist);
app.provide('Chart', Chart);
app.use(pinia);
app.use(ElementPlusIconsVue);
app.use(ElementPlus);
app.use(router);
app.mount('#app');
