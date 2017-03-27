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
                        <span>Cards matched:</span><span>{{ matchCount }}</span>
                    </div>
                    <div>
                        <span>Cards left:</span><span>{{ matchesLeft }}</span>
                    </div>
                    <div>
                        <span>Face up count:</span><span>{{ faceUpCount }}</span>
                    </div>
                </div>
                <div class="current-match">
                    <h3>Current Match</h3>
                    <div>
                        <div>
                            <card v-if="typeof currentSelection[0] !== 'undefined'" :card="currentSelection[0]"></card>
                            <div v-else class="card"></div>
                        </div>
                        <div>
                            <card v-if="typeof currentSelection[1] !== 'undefined'" :card="currentSelection[1]"></card>
                            <div v-else class="card"></div>
                        </div>
                    </div>
                </div>
                <div class="actions">
                    <button @click="restart">Restart</button>
                    <button @click="saveAndQuit">Save & Quit</button>
                </div>
            </div>
        </section>

        <modal v-show="showModal" class="modal">
            <div slot="message">
                {{ message }}
            </div>
            <input slot="captureInput" v-model="captureInput">
            <button @click="cancel" slot="cancel">Cancel</button>
            <button @click="confirm" slot="confirm">Confirm</button>
        </modal>

    </div>
</template>

<script>
    import {mapGetters, mapState} from 'vuex'
    import Card from './Card.vue'
    import Modal from './ModalWindow'

    export default {
        components: {Card, Modal},
        data () {
            return {}
        },
        computed: {
            ...mapState('modal', {
                message: state => state.message
            }),
            ...mapGetters('modal', {
                showModal: 'showModal'
            }),
            captureInput: {
                get () {
                    return this.$store.state.captureInput
                },
                set (input) {
                    this.$store.commit('modal/setInput', input)
                }
            },

            ...mapState('gameboard', {
                currentSelection: state => state.currentSelection
            }),
            ...mapGetters('gameboard', {
                deck: 'deck',
                matchCount: 'matchCount',
                matchesLeft: 'matchesLeftToFind',
                faceUpCount: 'faceUpCount'
            })
        },
        methods: {
            restart () {
                this.$store.dispatch('home/startNewGame', null, {root: true})
            },
            saveAndQuit () {
                this.$store.commit('modal/showModal', {message: 'test'})
                // show a window to get the name of the save state
                // hand off name to save and quit
            },
            confirm () {
                // I shouldn't have to do this since I'm using arrow functions :|
                // come back and figure out why this isn't being used as the promise
                // `then` scope
                let vm = this
                this.$store
                    .dispatch('modal/captureInputAndHideModal')
                    .then((label) => vm.$store.dispatch('home/storeGameState', {label}, {root: true}))
                    .then(() => vm.$store.dispatch('home/reset'))
                    .then(() => vm.$router.push('home'))
            },
            cancel () {
                this.$store.commit('modal/hideModal')
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
                overflow-x: auto; // is this the best way to handle it?

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

                > div:nth-child(1), > div:nth-child(3) {
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
                    display: flex;
                    justify-content: space-around;
                    > div {
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
