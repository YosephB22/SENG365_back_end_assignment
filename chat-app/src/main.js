import axios from 'axios';
import { createApp } from 'vue';
import { createWebHistory, createRouter } from 'vue-router';
import App from './App.vue';
//import Home from './Home.vue';
import Login  from './Login.vue';
import Events from './Events.vue';
import ElementPlus from 'element-plus'
const routes = [
    {
        path: "/",
        name: "events",
        component: Events
    },
    {
        path: "/search",
        name: "search",
        component: Events
    },
    {
        path: "/login",
        name: "login",
        component: Login
    }
];
const router = createRouter({
    routes,
    history: createWebHistory()
});

const app = createApp(App);
app.use(router);
app.use(ElementPlus);
app.config.globalProperties.axios = axios;
app.mount('#app');
