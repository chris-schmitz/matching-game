<template>
    <div class='home-container'>
        <h1>The Matching Game</h1>

        <div v-if="showKickoffButtons" class="kickoff-buttons">
            <button @click='getBoardSize'>New Game</button>
            <button @click='pickFromSavedGame'>Continue</button>
        </div>

        <div v-if="getMoreInformation" class="get-more-detail">

            <div v-if="showBoardSizeSelector" class="get-board-size">

                <table>
                    <tr>
                        <th colspan="2">
                            <p>Board with size</p>
                        </th>
                    <tr>
                        <td>Width:</td><td><input v-model="width" placeholder="10" @keypress="numsOnlyPlz"></td>
                    </tr>
                    <tr>
                        <td>Height:</td><td><input v-model="height" placeholder="5" @keypress="numsOnlyPlz" @keyup.enter="startGame"></td>
                    </tr>
                    <tr>
                        <td>Total Tiles:</td><td><span v-text="totalTiles"></span></td>
                    </tr>
                    </tr>
                        <td>Even number of tiles:</td><td>{{ validBoardSize }}</td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <div class="start-button-container">
                                <button @click='startGame' :disabled="!validBoardSize" :class="{'disabled': !validBoardSize}">Start!</button>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>

            <div class="saved-games" v-if="showSavedStates">
                <table>
                    <tr>
                        <th>
                            <p>Saved Games</p>
                        </th>
                    </tr>
                    <tr v-for="label in savedStates">
                        <td><button @click='loadASavedGame(label)' v-text="label"></button></td>
                    </tr>
                </table>
            </div>
            <button @click='backToKickoff'>Back</button>
        </div>
        <div class="settings">
            <span class="fa fa-gear"></span>
        </div>
    </div>
</template>

<script>
    import {mapState, mapGetters, mapMutations} from 'vuex'

    export default {
        data () {
            return {}
        },
        computed: {
            height: {
                get () {
                    return this.$store.state.home.boardSize.height
                },
                set (height) {
                    this.$store.commit('home/setBoardHeight', height)
                }
            },
            width: {
                get () {
                    return this.$store.state.home.boardSize.width
                },
                set (width) {
                    this.$store.commit('home/setBoardWidth', width)
                }
            },
            ...mapState('home', {
                boardSize: state => state.boardSize,
                showKickoffButtons: state => state.showKickoffButtons,
                showBoardSizeSelector: state => state.showBoardSizeSelector,
                showSavedStates: state => state.showSavedStates,
                savedStates: state => state.savedStates
            }),
            ...mapGetters('home', {
                getMoreInformation: 'getMoreInformation',
                totalTiles: 'totalTiles',
                validBoardSize: 'validBoardSize'
            })
        },
        methods: {
            numsOnlyPlz (event) {
                if ('key' in event && event.key.match(/[0-9]+/) !== null) {
                    return
                }
                event.preventDefault()
            },
            loadASavedGame (savedStateLabel) {
                this.$store.dispatch('home/loadASavedGame', savedStateLabel)
            },
            startGame () {
                if (this.validBoardSize) {
                    this.$store.dispatch('home/startNewGame', {totalCards: this.totalTiles})
                }
            },
            ...mapMutations('home', [
                'getBoardSize',
                'pickFromSavedGame',
                'backToKickoff',
                'loadSavedState'
            ])
        },
        created () {
            this.$store.dispatch('home/loadSavedStates')
        }
    }
</script>

<style lang='scss' scoped>
    @import '../style/colors';
    @import '../style/mixins';

    .kickoff-buttons {
        display: flex;
        flex-direction: column;
        > button {
            margin: 10px;
            @include button($hotpink, $purple, 15pt, 5px);
        }
    }

    .home-container{
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
    }

    .get-board-size, .saved-games {
        table {
            margin-bottom: 10px;
            border: 1px solid lighten($green, 30%);
            th {
                background-color: lighten($green, 30%);
                // color: $white;
            }
            th, td {
                padding: 10px;
            }
            td:nth-child(1) {
                text-align: right;
            }
        }
        button {
            width: 100%;
        }
    }

    .get-more-detail {
        // border: 1px solid $green;
        padding: 20px;
        display: flex;
        flex-direction: column;
        > button {
            margin-top: 40px;
            @include button($hotpink, $purple, 15pt, 5px);
        }
    }

    .disabled {
        color: gray;
        background-color: lightgray;
        border-color: gray;
        opacity: .5;
        cursor: not-allowed;
    }

    .settings {
        position: absolute;
        bottom: 30px;
        right: 30px;
        font-size: 30px;
    }

</style>
