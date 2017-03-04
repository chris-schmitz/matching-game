<template>
    <div class='splash-container'>
        <h1>splash</h1>
    </div>
</template>

<script>
    module.exports = {
        data(){
            return{}
        },
        created(){
            // consider replacing this with some kind of an
            // trigger for the end of an animation. maybe 
            // some kind of a watch on the transition class?
            setTimeout(() => {
                this.$router.push('/home')
            }, 3000);
        }
    }
</script>

<style lang='scss' scoped>
    .splash-container{

    }
</style>