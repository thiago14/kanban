<script setup lang="ts">
import { inject, onMounted, reactive, ref } from '@vue/runtime-core';
import Board from '../entities/Board';
import BoardService from '../service/BoardServiceInterface';
import BoardComponent from '../components/BoardComponent.vue';

const data: { board: Board | undefined } = reactive({ board: undefined });

onMounted(async () => {
    const boarService = inject('boardService') as BoardService;
    const board = await boarService.getBoard(1);

    data.board = board;
});
</script>

<template>
    <BoardComponent :board="data.board" />
</template>
