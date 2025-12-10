import { createApp } from 'vue'
import './style.css' 
import App from "./App.vue"; 
import { createPinia } from "pinia"; 
import router from './router';
import Vue3Toastify from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const app = createApp(App); 

app.use(router); 
app.use(Vue3Toastify, { 
    position: "bottom-right",
    autoClose: 3000,
    pauseOnHover: true,
    hideProgressBar: false,
    newestOnTop: true,
    theme: "dark",
    clearOnUrlChange: false
}); 
app.use(createPinia());
app.mount("#app");

