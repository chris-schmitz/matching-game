<template>
    <div class='game-board-container'>
        <h1>Let's Match!</h1>
        <section>
            <div class="board">
                <card v-for="card in deck" :card="card"></card>
            </div>
            <div class="side-bar">
                <div class="match-status">
                    <div>
                        <span>Matches found:</span><span>{{ matchesFound }}</span>
                    </div>
                    <div>
                        <span>Matches left:</span><span>{{ matchesLeft }}</span>
                    </div>
                </div>
                <div class="current-match">
                    <h3>Current Match</h3>
                    <div>
                        <div class="card"></div>
                        <div class="card"></div>
                    </div>
                </div>
                <div class="actions">
                    <button @click="restart">Restart</button>
                    <button @click="saveAndQuit">Save & Quit</button>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import Card from './Card.vue'

    export default {
        components: {Card},
        data () {
            return {
                matchesFound: 12, // moe these into vuex
                matchesLeft: 15
            }
        },
        computed: {
            ...mapGetters('gameboard', {
                deck: 'deck'
            })
        },
        methods: {
            restart () {

            },
            saveAndQuit () {

            }
        },
        created () {
            if (this.deck.length === 0) {
                this.$router.push('home')
            }
        }
    }
</script>

<style lang='scss' scoped>
    @import '../style/colors';
    @import '../style/mixins';

    .card {
        @include card(120px, 100px, $purple);
    }

    .flip {
        -webkit-animation: flip-2-hor-top-1 0.5s cubic-bezier(0.455, 0.030, 0.515, 0.955) both;
        -moz-animation: flip-2-hor-top-1 0.5s cubic-bezier(0.455, 0.030, 0.515, 0.955) both;
        animation: flip-2-hor-top-1 0.5s cubic-bezier(0.455, 0.030, 0.515, 0.955) both;
    }

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
            }


            .board {
                flex: 5;
                flex-wrap: wrap;
                display: flex;
                justify-content: center;
                align-items: center;
                overflow-x: scroll; // is this the best way to handle it?

                > * {
                    margin: 10px;
                }
            }

            .side-bar {
                // flex: 1;
                flex: 0 0 170px;
                background-color: lighten($hotpink, 20%);
                display: flex;
                flex-direction: column;
                justify-content: space-between;

                > div:nth-child(1), div:nth-child(3) {
                    flex: 1;
                }
                > div:nth-child(2) {
                    flex: 5;
                }

                > * {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                }

                > * + * {
                    border-top: 1px solid $white;
                }

                .match-status {
                    > div {
                        margin: 5px;
                    }
                    > div > span:nth-child(2){
                        font-weight: bold;
                        margin-left: 5px;
                        color: $white;
                    }
                }

                .actions {
                    display: flex;
                    justify-content: space-around;
                    align-items: center;
                    > button {
                        @include button($white, $purple, 15px, 5px, 150px);
                        // width: 150px;
                    }
                }

                .current-match {

                    > * {
                        margin: 10px;
                    }

                    > h3 {
                        color: $white;
                        font-weight: bold;
                    }

                    > div {
                        // background:blue;
                        flex: 1;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: space-around;

                    }

                }
            }
        }
    }

</style>
