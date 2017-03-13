<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: 'app'
    }
</script>

<style lang="scss" scoped>
    @import "./style/colors";
    #app {
        width: 100vw;
        margin: 20px;
        border-radius: 5px;
        background-color: $white;
    }
</style>
