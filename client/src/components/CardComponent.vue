<script setup lang="ts">
import Board from '../entities/Board';
import Card from '../entities/Card';
import Column from '../entities/Column';

defineProps({
    board: {
        type: Board,
        required: true,
    },
    column: {
        type: Column,
        required: true,
    },
    card: {
        type: Card,
        required: true,
    },
});

</script>

<template>
    <li
        class="card"
        draggable="true"
        @dragstart="board.selectCard(column, card)"
        @dragend="board.resetCard()"
        @dragover="board.swap(card)"
    >
        <h4 class="card-title">{{ card.title }} <span class="card-estimative">{{ card.estimative }}</span></h4>
        <div class="buttons">
            <button type="button" class="btn btn-add" @click="board?.increaseEstimative(column, card)">+</button>
            <button type="button" class="btn btn-minus" @click="board?.decreaseEstimative(column, card)">-</button>
            <button type="button" class="btn btn-trash" @click="board?.deleteCard(column, card.idCard)"><img src="../assets/trash.svg" /></button>
        </div>
    </li>
</template>

<style scoped>
.card {
    width: 100%;
    height: 80px;
    text-align: center;
    background: #F3E779;
    border: 1px solid #ecd71a;
    margin-bottom: 10px;
    border-radius: 7px;
    padding: .5rem;
}
.card .buttons {
    gap: 4px;
    margin-top: 15px;
    display: flex;
    justify-content: center;
    align-items: flex-end;
}
.card h4 {
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
}
.btn {
    width: 20px;
    height: 20px;
    color: white;
    border: 0;
    cursor: pointer;
}
.btn-add {
    background: #5ef5d9;
    margin-right: 5px;
}
.btn-minus {
    background: #fb9f6e;
}
.btn-trash {
    width: 17px;
    margin-left: 4px;
    background-color: transparent;
}
</style>