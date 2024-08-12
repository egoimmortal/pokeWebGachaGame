<template>
    <div>
        <!-- <font-awesome-icon icon="fa-solid fa-user-secret" /> -->
        <button @click.stop="getDitto" class="simple-button1">
            ditto test
        </button>
    </div>
</template>

<script setup lang="ts">
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
</script>