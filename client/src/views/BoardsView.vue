<script setup lang="ts">
import { inject, onMounted, reactive } from 'vue';
import Board from '../entities/Board';
import BoardService from '../service/BoardServiceInterface';

const data: { boards: Board[] | undefined } = reactive({ boards: undefined });

onMounted(async () => {
    const boardService = inject('boardService') as BoardService;
    data.boards = await boardService.getBoards();
});
</script>

<template>
    <section v-if="data.boards" class="boards">
        <header>
            <h2>Boards </h2>
        </header>
        <main>
            <h3>Lista de projetos</h3>
            <router-link
                :to="`/boards/${board.idBoard}`"
                v-for="board in data.boards"
                :key="board.idBoard"
            >{{board.name}}</router-link>
        </main>
    </section>
</template>

<style>
.boards {
    padding: 1rem;
}
.boards header {
    margin-bottom: 1rem;
}
main {
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: 5px;

}
main h3 {
    margin-bottom: 1rem;
}
</style>