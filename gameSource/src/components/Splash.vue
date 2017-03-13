<template>
    <div class="splash-container">
        <h1>The Matching Game</h1>
        <div class="board">
            <div>
                <div class="card"></div>
                <div class="card"></div>
            </div>
            <div>
                <div class="card"></div>
                <div class="card"></div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'splash',
        data () {
            return {}
        }
    }
</script>

<style lang="scss" scoped>
    @import '../style/colors';
    @import '../style/mixins';

    .splash-container {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .board {
            > div {
                > .card{
                display: inline-block;  
                    margin: 10px;
                }
            }

            // there's prob both a more clever and more simple way
            // of accomplishing this, but sometimes you feel like 
            // doing something goofey ;P
            > div:nth-child(1) {
                .card:nth-child(1){
                    @include card(120px, 100px, $hotpink);
                }
                .card:nth-child(2){
                    @include card(120px, 100px, $purple);
                }
            }
            > div:nth-child(2) {
                .card:nth-child(1){
                    @include card(120px, 100px, $purple);
                }
                .card:nth-child(2){
                    @include card(120px, 100px, $hotpink);
                }
            }
        }
    }

</style>
