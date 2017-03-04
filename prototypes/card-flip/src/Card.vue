<template>
    <div class='card-container' @click="flip">
        <div v-show="!cardData.faceUp" class="card-back">
        </div>
        <div v-show="cardData.faceUp" class="card-face" :style="cardBackground">
        </div>
    </div>
</template>

<script>
    module.exports = {
        props:['cardData'],
        data(){
            return{
            }
        },
        computed:{
            cardBackground(){
                return {
                    "background-image": `url("${this.cardData.face}")`
                }
            }
        },
        methods:{
            flip(){
                this.$store.commit('flipCard', this.cardData)
                // this.faceUp = !this.faceUp
            }
        }
    }
</script>

<style lang='scss' scoped>
    // I don't like this styling much, clean it up in the actual project
    .card-container{
        border: 1px solid red;
        width: 200px;
        height: 200px;
    
        > * {
            height: 100%;
        }
    
        .card-back {
            background-color: orangered;
        }

        .card-face {
            background: no-repeat center center;
            background-size: cover;
        }
    }
</style>