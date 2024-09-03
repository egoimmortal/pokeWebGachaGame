<template>
    <div id="illustrated">
        <!-- <font-awesome-icon icon="fa-solid fa-user-secret" /> -->
        <!-- <IllustratedSearch></IllustratedSearch> -->
        <IllustratedTabs></IllustratedTabs>
    </div>
</template>

<script setup lang="ts">
import {openDatabase, addData, getData, getDatabaseCount, updateData} from '~/composables/idb';

const useIllustratedStore = illustratedStore();

/**判斷pokemon資料的快取是否存在 */
async function judgePokemonCache(){
    const db = await openDatabase();
    // console.log('db = ', db);
    getDatabaseCount(db).then((count) => {
        useIllustratedStore.totalAmount = count;
        useIllustratedStore.setPages();
        if(useIllustratedStore.totalAmount == 0) getPokemon();
    });
}

/**取得pokemon id, name */
async function getPokemon(){
    const db = await openDatabase();
    await $fetch('/api/pokemon', {
        method: 'post',
        body:{},
        async onResponse(rs: any){
            const data = rs.response._data;

            // console.log('getPokemon data = ', data);
            // 設定pokemon數量
            useIllustratedStore.totalAmount = data.count;
            useIllustratedStore.setPages();

            // console.log('useIllustratedStore.totalAmount = ', useIllustratedStore.totalAmount);
            // console.log('useIllustratedStore.pages = ', useIllustratedStore.pages);

            // 設定id
            for(let i = 0, max = data.results.length; i < max; i++){
                data.results[i].id = (i + 1).toString();
            }

            try{
                for(let i = 0, max = data.results.length; i < max; i++){
                    const IDBdata = await getData(db, data.results[i].id);
                    // console.log('IDBdata = ', IDBdata);
                    if(IDBdata == undefined) await addData(db, data.results[i]);
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