<template>
    <div id="default-layouts">
        <CommonHeader></CommonHeader>
        <div id="default-content">
            <slot></slot>
        </div>
        <CommonFooter></CommonFooter>
    </div>
</template>

<style lang="scss" scoped>
#default-layouts{
    flex: 1 0 auto;

    #default-content{
        min-height: 90vh;
        padding-left: 5vw;
        padding-right: 5vw;
    }
}
</style>