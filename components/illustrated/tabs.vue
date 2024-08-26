<template>
    <div id="illustrated-tabs">
        <button v-for="item in useIllustratedStore.pages">
            {{ item }}
        </button>
    </div>
</template>

<script setup lang="ts">
const useIllustratedStore = illustratedStore();

function changeTab(num: number){
    useIllustratedStore.currentPage = num;
}
</script>