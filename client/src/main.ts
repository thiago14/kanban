import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia';

import './assets/style.css';

import App from './App.vue'
import { router } from './router';
import BoardService from './service/BoardServiceHttp';
import AxiosAdapter from './infra/http/AxiosAdapter';
import AuthServiceHttp from './service/AuthServiceHttp';
import { useAuthStore } from './stores/AuthStore';

const app = createApp(App);

const httpClient = new AxiosAdapter(router);
const baseUrl = 'http://localhost:3000';
const authService = new AuthServiceHttp(httpClient, baseUrl);
const pinia = createPinia();

pinia.use(({ store }) => {
    store.$router = markRaw(router),
    store.authService = authService
});

app.use(router);
app.use(pinia);
useAuthStore().init();
app.provide('boardService', new BoardService(httpClient, baseUrl));
app.mount('#app')
