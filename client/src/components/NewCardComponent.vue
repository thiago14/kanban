<script setup lang="ts">
import { ref } from 'vue';

let cardTitle = ref('');
defineProps(['board', 'column']);
</script>

<template>
    <div class="card new-card">
        <h4>Novo card</h4>
        <input type="text" v-model="cardTitle" placeholder="Título do card"/>
        <button type="button" class="add" @click="board.addCard(column.name, cardTitle, 0)">Add</button>
    </div>
</template>

<style scoped>
.new-card {
    background: #eee;
    width: 100%;
    height: 80px;
    padding: .2rem;
    border: 1px dashed #c5c5c5;
}
.new-card h4 {
    margin-bottom: 5px;
}
</style>