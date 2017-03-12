<template>
    <div class='app-container'>
        <router-view></router-view>
    </div>
</template>

<script>
    module.exports = {
        data(){
            return{}
        }
    }
</script>

<style lang="scss">
    @import "./colors.scss";
    html,body{height:100%;width:100%;box-sizing:border-box;padding:0;margin:0;}
    body{background-color:$gray;font-family:helvetica;}
</style>

<style lang='scss' scoped>
    @import "./colors.scss";
    .app-container{
        box-sizing: border-box;
        height: 100%;
        width:100%;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
    }
</style>