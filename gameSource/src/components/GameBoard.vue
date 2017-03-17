<template>
    <div class='game-board-container'>
        <h1>Let's Match!</h1>
        <section>
            <div class="board">
                board
            </div>
            <div class="side-bar">
                <div class="match-status">
                    match status
                </div>
                <div class="current-match">
                    current match
                </div>
                <div class="actions">
                    actions
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    export default {
        data () {
            return {}
        }
    }
</script>

<style lang='scss' scoped>
    @import '../style/colors';
    @import '../style/mixins';

    .game-board-container{
        height: 100%;
        display: flex;
        flex-direction: column;
        text-align: center;

        > h1 {
            padding: 10px;
            background-color: $hotpink;
            color: $white;
            font-weight: bold;
        }

        > section {
            flex: 1;
            display: flex;
            align-items: stretch;

            > * {
                padding: 10px;
            }


            .board {
                flex: 5;
                display: flex;
                justify-content: center;
                align-items: center;
            }

            .side-bar {
                flex: 0 0 170px;
                background-color: lighten($hotpink, 20%);
                display: flex;
                flex-direction: column;
                justify-content: space-between;

                > div:nth-child(1), div:nth-child(3) {
                    flex: 1;
                }
                > div:nth-child(2) {
                    flex: 3;
                }

                > * {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    border: 1px solid $white;
                }
            }
        }
    }

</style>
