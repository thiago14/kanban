<script setup lang="ts">
import CardComponent from './CardComponent.vue';
import NewCardComponent from './NewCardComponent.vue';

defineProps(['board', 'column'])
</script>

<template>
    <div class="column" >
        <h3>{{ column.name }} <span class="column-estimative">{{ column.getEstimative() }}</span></h3>
        <div class="cards">
            <CardComponent
                v-for="card in column.cards"
                :key="card.idCard"
                :card="card"
                :board="board"
            />
            <NewCardComponent :board="board" :column="column" />
        </div>
    </div>
</template>

<style scoped>
.column {
    padding: .5rem;
    width: 210px;
    background: #ebebeb;
    border: 1px solid #6e6e6e;
    border-radius: 7px;
    min-height: 100%;
}
.column h3 {
    margin-bottom: 1rem;
}
</style>