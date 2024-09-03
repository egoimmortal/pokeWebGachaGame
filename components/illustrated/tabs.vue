<template>
    <div id="illustrated-tabs">
        <button v-for="item in useIllustratedStore.pages" :key="item"
            class="illustrated-tab-bar-1"
            :class="{
                'hidden': !(item < 3) && btnHidden(useIllustratedStore.currentPage, item)
            }"
            @click="changePage(item)">
            {{ item }}
        </button>
    </div>
</template>

<script setup lang="ts">
const useIllustratedStore = illustratedStore();

function changePage(num: number){
    useIllustratedStore.currentPage = num;
}

function btnHidden(currentPage: number, item: number){
    // console.log('currentPage = ', currentPage);
    // console.log('item = ', item);
    return item < (currentPage + 5) && item > (currentPage - 5);
}

watch(useIllustratedStore, (value) => {
    console.log('value = ', value);
    console.log('useIllustratedStore = ', useIllustratedStore);
});
</script>