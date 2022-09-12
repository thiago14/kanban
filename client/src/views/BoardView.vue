<script setup lang="ts">
import { onMounted, reactive, ref } from '@vue/runtime-core';
import axios from 'axios';
import Board from '../entities/Board';

const data: { board: Board | undefined } = reactive({ board: undefined });
let cardTitle = ref('');
let columnName = ref('');

onMounted(async () => {
    const response = await axios({
        url: 'http://localhost:3000/boards/1',
        headers: {
            Authorization: "Bearer 123456",
        },
        method:'get',
    });
    const boardData = response.data;
    const board = new Board(boardData.idBoard, boardData.name);
    for( const columnData of boardData.columns) {
        board.addColumn(columnData.name, columnData.estimative);
        for (const cardData of columnData.cards) {
            board.addCard(columnData.name, cardData.title, cardData.estimative);
        }
    }
    data.board = board;
});
</script>

<template>
    <section v-if="data.board" class="board">
        <header>
            <h2>{{ data.board.name}}</h2>
        </header>
        <div class="columns">
            <div
                v-for="column in data.board.columns"
                :key="column.idColumn"
                class="column"
            >
                <h3>{{ column.name }}</h3>
                <ul class="cards">
                    <li class="card" v-for="card in column.cards" :key="card.idCard">
                        <h4>{{ card.title }} {{ card.estimative }}</h4>
                        <br>
                        <button @click="data.board?.increaseEstimative(card)">+</button>
                        <button @click="data.board?.decreaseEstimative(card)">-</button>
                    </li>
                    <li class="card new-card">
                        <input type="text" v-model="cardTitle"/>
                        <button type="button" @click="data.board.addCard(column.name, cardTitle, 0)">Add</button>
                    </li>
                </ul>
            </div>
            <div class="column new-column" >
                <input type="text" v-model="columnName"/>
                <button type="button" @click="data.board.addColumn(columnName, true)">Add</button>
            </div>
        </div>
    </section>
</template>

<style scoped>
.board {
    padding: 1rem;
}
.board header {
    margin-bottom: 1rem;
}
.columns {
    display: flex;
    flex: 1;
    gap: 5px;
    text-align: center;
}
.column {
    padding: .5rem;
    width: 200px;
    background: #ccc;
    border: 1px solid #000;
    min-height: 500px;
}
.column h3 {
    margin-bottom: 1rem;
}
.cards {
    list-style: none;
    padding: 0;
}
.card {
    width: 100%;
    height: 80px;
    text-align: center;
    background: #F3E779;
    border: 1px solid #000;
    margin-bottom: 10px;
}
.new-card {
    background: #eee;
    padding: .5rem;
}
.new-column {
    background: #eee;
    padding: .5rem;
    border: 1px dashed #000;
}

</style>