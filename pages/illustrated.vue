<template>
    <div>
        <!-- <font-awesome-icon icon="fa-solid fa-user-secret" /> -->
        <IllustratedSearch :pokemonAmount="pokemonAmount"></IllustratedSearch>
    </div>
</template>

<script setup lang="ts">
import {openDatabase, addData, getData, updateData} from '~/composables/idb';

const pokemonAmount = ref(0);

/**判斷pokemon資料的快取是否存在 */
async function judgePokemonCache(){
    const db = await openDatabase();
}

/**取得pokemon id, name */
async function getPokemon(){
    const db = await openDatabase();
    await $fetch('/api/pokemon', {
        method: 'post',
        body:{},
        async onResponse(rs: any){
            const data = rs.response._data;

            // 設定pokemon數量
            pokemonAmount.value = data.results.length;

            // 設定id
            for(let i = 0, max = data.results.length; i < max; i++){
                data.results[i].id = (i + 1).toString();
            }

            try{
                for(let i = 0, max = data.results.length; i < max; i++){
                    const IDBdata = await getData(db, data.results[i].id);
                    if(IDBdata == undefined) await addData(db, data.results[i]);
                    // getPokemonSprites(data.results[i].id);
                }
            }
            catch(error){
                console.error('getPokemon database error = ', error);
            }
        }
    });
}

/**取得pokemon sprites */
async function getPokemonSprites(id: number){
    const db = await openDatabase();

    await $fetch('/api/pokemonForm', {
        method: 'POST',
        body: {
            id: id
        },
        onResponse(rs: any){
            const data = rs.response._data;
            updateData(db, id, data.sprites);
        }
    });
}

onMounted(() => {
    judgePokemonCache();
})
</script>