<script setup lang="ts">
import Board from '../entities/Board';
import Column from '../entities/Column';
import CardComponent from './CardComponent.vue';
import NewCardComponent from './NewCardComponent.vue';

const props = defineProps({
    board: {
        type: Board,
        required: true,
    },
    column: {
        type: Column,
        required: true,
    },
});

function handlerNewCar(cardTitle: string):void {
    props.board.addCard(props.column.name, undefined, cardTitle, 0);
}
</script>

<template>
    <div class="column">
        <header>
            <h3>{{ column.name }}</h3>
            <div>
                (<span class="column-estimative">{{ column.getEstimative() }}</span>)
                <button class="trash" @click="board.deleteColumn(column.idColumn)">
                    <img src="../assets/trash.svg" />
                </button>
            </div>
        </header>
        <div class="cards">
            <CardComponent
                v-for="card in column.cards"
                :key="card.idCard"
                :card="card"
                :column="column"
                :board="board"
            />
            <NewCardComponent @add-card="handlerNewCar" />
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
.column header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    padding-bottom: .5rem;
    border-bottom: 1px solid #6e6e6e;
}
.column header div {
    display: flex;
    align-items: center;
    font-weight: bold;
    font-size: 18px;
}
.column header .trash {
    width: 15px;
    border: none;
    margin-left: 5px;
    cursor: pointer;
}
</style>