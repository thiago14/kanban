<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '../stores/AuthStore';

const username = ref('');
const password = ref('');

const authStore = useAuthStore();

</script>

<template>
    <section class="login container-center">
        <form @submit.prevent="authStore.login(username, password)" class="">
            <h2>Login</h2>
            <div>
                <label for="username">Username:</label>
                <input id="username" type="text" v-model="username"/>
            </div>
            <div>
                <label for="password">Password:</label>
                <input id="password" type="password" v-model="password"/>
            </div>
            <button type="submit">Login</button>
        </form>
    </section>
</template>

<style>
.container-center {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.login {
    height: 100%;
    width: 100%;
}
.login form {
    padding: 1.5rem;
    border: 1px solid #eee;
    border-radius: 5px;
}
.login form h2 {
    margin-bottom: 1rem;
}
.login form div {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
}
.login form div input{
    width: 200px;
}
.login form button {
    display: block;
    color: white;
    padding-block: .5rem;
    width: 100%;
    background: rgb(64, 39, 255);
}
</style>