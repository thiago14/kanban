import { createApp } from 'vue'
import './assets/style.css';
import App from './App.vue'
import BoardService from './service/BoardServiceHttp';
import AxiosAdapter from './infra/http/AxiosAdapter';

const app = createApp(App)
const httpClient = new AxiosAdapter();
const baseUrl = 'http://localhost:3000';
app.provide('boardService', new BoardService(httpClient, baseUrl));
app.mount('#app')
