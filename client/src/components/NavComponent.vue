<script setup lang="ts">
import { useAuthStore } from '../stores/AuthStore';

const authStore = useAuthStore();
</script>

<template>
    <div class="nav" v-if="authStore.session.token">
        {{ authStore.session.token }}
        <button @click="authStore.logout()">Logout</button>
    </div>
</template>

<style>
    .nav {
        padding-top: 1rem;
        padding-inline: 1.2rem;
        text-align: right;
        margin-bottom: 20px;
    }
</style>