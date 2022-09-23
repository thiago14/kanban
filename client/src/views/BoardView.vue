<script setup lang="ts">
import { inject, onMounted, reactive } from '@vue/runtime-core';
import Board from '../entities/Board';
import BoardService from '../service/BoardServiceInterface';
import BoardComponent from '../components/BoardComponent.vue';
import DomainEvent from '../events/DomainEvent';
import { useRoute } from 'vue-router';

const data: { board: Board | undefined } = reactive({ board: undefined });
const route = useRoute();
const idBoard: number = Number(route.params.idBoard);

onMounted(async () => {
    const boardService = inject('boardService') as BoardService;
    const board = await boardService.getBoard(idBoard);
    data.board = board;

    board.on('addColumn', async function(event: DomainEvent) {
        await boardService.saveColumn(event.data);
    });
    board.on('addCard', async function(event: DomainEvent) {
        const idCard = await boardService.saveCard(event.data);
        event.data.card.idCard = idCard;
    });
    board.on('deleteColumn', async function(event: DomainEvent) {
        await boardService.deleteColumn(event.data.idBoard, event.data.idColumn);
    });
    board.on('deleteCard', async function(event: DomainEvent) {
        await boardService.deleteCard(event.data.idBoard, event.data.idColumn, event.data.idCard);
    });
    board.on('increaseEstimative', async function(event: DomainEvent) {
        await boardService.updateCard(event.data);
    });
    board.on('decreaseEstimative', async function(event: DomainEvent) {
        await boardService.updateCard(event.data);
    });
});
</script>

<template>
    <BoardComponent :board="data.board" v-if="data.board" />
</template>
