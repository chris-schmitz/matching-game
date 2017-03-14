<template>
    <div class='home-container'>
        <h1>The Matching Game</h1>
        <div v-if="showKickoffButtons" class="kickoff-buttons">
            <button @click='getBoardSize'>New Game</button>
            <button @click='pickFromSavedGame'>Continue</button>
        </div>
        <div v-if="getMoreInformation" class="get-more-detail">
            <button @click='backToKickoff'>Back(icon?)</button>

            <div v-if="getBoardSize" class="get-board-size">
                <p>Board with size:</p>
                <div>
                    <label>
                        Width: <input v-model="boardSize.width" placeholder="10">
                    </label>
                    <label>
                        Height: <input v-model="boardSize.height" placeholder="5">
                    </label>
                    <label>
                        Total Tiles: <span v-text="totalTiles"></span>
                    </label>
                </div>
                <div>
                    Valid board size: {{ validBoardSize }}
                </div>
                <div>
                    <button @click='startGame'>Start!</button>
                </div>
            </div>

            <div v-if="showSavedStates">
                <button v-for="state in savedStates" @click='loadSavedState(state.id)' v-text="state.label"></button>
            </div>
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
            ...mapState({
                boardSize: state => state.home.boardSize,
                showKickoffButtons: state => state.home.showKickoffButtons,
                showBoardSizeSelector: state => state.home.showBoardSizeSelector,
                showSavedStates: state => state.home.showSavedStates,
                savedStates: state => state.home.savedStates
            }),
            ...mapGetters({
                getMoreInformation: 'getMoreInformation',
                totalTiles: 'totalTiles',
                validBoardSize: 'validBoardSize'
            })
        },
        methods: {
            loadSavedState (savedState) {
                this.$store.commit('loadSavedState', savedState)
            },
            startGame () {
                // don't fire if the board isn't valid
                // also go back and make the start button style disabled if the board isn't valid
                console.log('start the game!')
            },
            ...mapMutations([
                'getBoardSize',
                'pickFromSavedGame',
                'backToKickoff',
                'loadSavedState'
            ])
        }
    }
</script>

<style lang='scss' scoped>
    .home-container{
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
    }
</style>
