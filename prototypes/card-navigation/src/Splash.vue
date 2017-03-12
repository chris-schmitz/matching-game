<template>
    <div class='splash-container'>
        <h1>The Magic Game</h1>
        <div>
            (grid of cards goes heres)
        </div>
    </div>
</template>

<script>
    module.exports = {
        data(){
            return{}
        },
        created(){
            setTimeout(() => {
                this.$router.push('home')
            }, 3000);
        }
    }
</script>

<style lang='scss' scoped>
    .splash-container{}
</style>