<template>
    <div>
        <!-- <div v-for="item in props.pokemonAmount">1</div> -->
    </div>
</template>

<script setup lang="ts">
interface IllustratedPageList{
    pokemonAmount: number;
}
const props = defineProps<IllustratedPageList>();
const page = ref('0');
</script>