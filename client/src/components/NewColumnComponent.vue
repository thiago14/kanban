<script setup lang="ts">
import { reactive } from 'vue';

const emit = defineEmits(['add-column']);
const form = reactive({
    columnName: ''
});

function handleNewColumn() {
    emit('add-column', form.columnName);
    form.columnName = '';
}
</script>

<template>
    <div class="column new-column">
        <h3>Nova coluna</h3>
        <input class="new-column-input" type="text" v-model="form.columnName" placeholder="Nome da coluna"/>
        <button class="add new-column-add" type="button" @click="handleNewColumn">Add</button>
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