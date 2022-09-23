import { createRouter, createWebHistory } from 'vue-router';
import LoginViewVue from './views/LoginView.vue';
import BoardViewVue from './views/BoardView.vue';
import BoardsViewVue from './views/BoardsView.vue';

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/boards' },
        { path: "/login", component: LoginViewVue },
        { path: "/boards", component: BoardsViewVue },
        { path: "/boards/:idBoard", component: BoardViewVue }
    ]
});
