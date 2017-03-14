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
        <h3>come back and add animation to cards</h3>
    </div>
</template>

<script>
    export default {
        name: 'splash',
        data () {
            return {}
        },
        created () {
            // when adding in the animations for the cards, consider whether it would
            // be better to listen for the end of the animation before navigating away
            // or if we could just set the timeout here to be just a bit longer than
            // the animation duration. I think the latter would be easier to reason
            // about considering this is all in one simple component.
            setTimeout(() => {
                this.$router.push('home')
            }, 3000)
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
