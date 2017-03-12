<template>
    <div class='game-board-container'>
        board
        <button @click="backToHome">Back</button>
    </div>
</template>

<script>
    module.exports = {
        data(){
            return{}
        },
        methods:{
            backToHome(){
                this.$router.push('home')
            }
        }
    }
</script>

<style lang='scss' scoped>
    .game-board-container{}
</style>