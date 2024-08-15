<template>
    <div>
        <!-- <font-awesome-icon icon="fa-solid fa-user-secret" /> -->
        <button @click.stop="getDitto" class="simple-button1">
            ditto test
        </button>

        <button @click.stop="IDBtest" class="simple-button1">
            IDB test
        </button>
    </div>
</template>

<script setup lang="ts">
import {type MyData, openDatabase, addData, getData} from '~/composables/idb';
async function getDitto(){
    await $fetch('/api/ditto', {
        method: 'post',
        body:{
            id: '01'
        },
        onResponse(rs: any){
            const data = rs.response._data;
            console.log('data = ', data);
        }
    });
}

async function IDBtest(){
    try{
        const db = await openDatabase();
        const data: MyData = {id: 1, name: 'pemo test'};

        await addData(db, data);
        console.log('Data added');

        const retrievedData = await getData(db, 1);
        console.log('Retrieved Data = ', retrievedData);
    }
    catch(error){
        console.error('IDBtest error = ', error);
    }
}
</script>