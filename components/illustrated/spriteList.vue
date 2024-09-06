<template>
    <div id="illustrated-sprite-list">
        <IllustratedSprite v-for="item in useIllustratedStore.pageLimit" :key="item"
            :className="'illustrated-sprite-1'"
            :id="getSpriteId(item)">
        </IllustratedSprite>
    </div>
</template>

<script setup lang="ts">
const useIllustratedStore = illustratedStore();
const url = ref();

function getSpriteId(num: number){
    return num + useIllustratedStore.pageLimit * (useIllustratedStore.currentPage - 1);
}

/**取得pokemon sprites */
async function getPokemonSprites(id: number){
    return;
    const db = await openDatabase();
    getData(db, id).then(async (value) => {
        console.log('pokemonForm value = ', value);
        console.log('pokemonForm value.sprites = ', value?.sprites);

        if(value?.sprites == undefined){
            await $fetch('/api/pokemonForm', {
                method: 'POST',
                body: {
                    id: id
                },
                onResponse(rs: any){
                    const data = rs.response._data;
                    console.log('data = ', data);
                    url.value = data.sprites.front_default;
                    updateData(db, id, 'sprites', data.sprites);
                }
            });
        }
        else{
            url.value = value.sprites.front_default;
            console.log('url = ', url.value);
        }
    });
    return;
};

// onMounted(() => {
//     getPokemonSprites(useIllustratedStore.currentPokemon);
// });

// watch(useIllustratedStore, (value) => {
//     getPokemonSprites(useIllustratedStore.currentPokemon);
//     console.log('value = ', value);
//     console.log('useIllustratedStore = ', useIllustratedStore);
// });
</script>