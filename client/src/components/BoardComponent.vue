<script setup lang="ts">
import Board from '../entities/Board';
import ColumnComponent from './ColumnComponent.vue';
import NewColumnComponent from './NewColumnComponent.vue';
const props = defineProps({
    board: {
        type: Board,
        required: true,
    }
});

function handlerAddColumn(columnName: string):void {
    props.board.addColumn(undefined, columnName, true);
}
</script>

<template>
    <section v-if="board" class="board">
        <header>
            <RouterLink class="back" to="/boards">Boards</RouterLink>
            <h2>{{ board.name }} (<span id="estimative">{{ board.getEstimative() }}</span>)</h2>
        </header>
        <ul class="columns">
            <li
                v-for="column in board.columns"
                :key="column.idColumn"
            >
                <ColumnComponent :board="board" :column="column" ></ColumnComponent>
            </li>
            <NewColumnComponent @add-column="handlerAddColumn" />
        </ul>
    </section>
</template>

<style scoped>
.board {
    padding: 1rem;
}
.board .back {

    display: block;
    margin-bottom: 1rem;
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

</style>