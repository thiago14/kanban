<script setup lang="ts">

defineProps(['board', 'card']);
</script>

<template>
    <li class="card">
        <h4 class="card-title">{{ card.title }} <span class="card-estimative">{{ card.estimative }}</span></h4>
        <button type="button" class="btn btn-add" @click="board?.increaseEstimative(card)">+</button>
        <button type="button" class="btn btn-minus" @click="board?.decreaseEstimative(card)">-</button>
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
}
.btn-add {
    background: #5ef5d9;
    margin-right: 5px;
}
.btn-minus {
    background: #fb9f6e;
}
</style>