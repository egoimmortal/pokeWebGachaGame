<template>
    <div :class="props.className">
        <img :src="url" />
    </div>
</template>

<script setup lang="ts">
const props = defineProps(['className', 'id']);
const url = ref();

/**取得pokemon sprites */
async function getPokemonSprites(id: number){
    const db = await openDatabase();
    getData(db, id).then(async (value) => {
        // console.log('pokemonForm value = ', value);
        // console.log('pokemonForm value.sprites = ', value?.sprites);

        if(value?.sprites == undefined){
            await $fetch('/api/pokemonForm', {
                method: 'POST',
                body: {
                    id: id
                },
                onResponse(rs: any){
                    console.log('getPokemonSprites rs = ', rs);
                    //回應失敗的話重新傳送要求
                    if(rs.response.status == 503){
                        getPokemonSprites(id);
                    }
                    else if(rs.response.status == 200){
                        const data = rs.response._data;
                        url.value = data.sprites.front_default;
                        updateData(db, id, 'sprites', data.sprites);
                    }
                }
            });
        }
        else{
            url.value = value.sprites.front_default;
            // console.log('url = ', url.value);
        }
    });
    return;
};

onMounted(() => {
    // console.log('props.id = ', props.id);
    getPokemonSprites(props.id);
});

watch(() => props.id, () => {
    url.value = '';
    getPokemonSprites(props.id);
})
</script>