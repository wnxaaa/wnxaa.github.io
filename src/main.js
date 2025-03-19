import { createApp } from 'vue';
import App from './App.vue';
import routes from "./routes"
import { createWebHashHistory, createRouter } from 'vue-router';

import "./assets/css/style.css";

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

const app = createApp(App);
app.use(router);
app.mount('body')