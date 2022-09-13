<script setup lang="ts">
import { ref } from 'vue';

defineProps(['board']);
let columnName = ref('');
</script>

<template>
    <div class="column new-column">
        <h3>Nova coluna</h3>
        <input type="text" v-model="columnName" placeholder="Nome da coluna"/>
        <button class="add" type="button" @click="board.addColumn(columnName, true)">Add</button>
    </div>
</template>

<style scoped>
.new-column {
    width: 200px;
    background: #fcfeff;
    border-radius: 7px;
    padding: .5rem;
    border: 1px dashed #000;
}
.new-column h3 {
    margin-bottom: 1rem;
}
</style>