<script setup lang="ts">
import { inject, onMounted, reactive, ref } from '@vue/runtime-core';
import Board from '../entities/Board';
import BoardService from '../service/BoardServiceInterface';
import BoardComponent from '../components/BoardComponent.vue';
import DomainEvent from '../events/DomainEvent';

const data: { board: Board | undefined } = reactive({ board: undefined });

onMounted(async () => {
    const boardService = inject('boardService') as BoardService;
    const board = await boardService.getBoard(1);
    data.board = board;

    board.on('addColumn', async function(event: DomainEvent) {
        await boardService.saveColumn(event.data);
    });
});
</script>

<template>
    <BoardComponent :board="data.board" />
</template>
