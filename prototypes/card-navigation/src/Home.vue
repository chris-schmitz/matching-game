<template>
    <div class='home-container'>
        <h1>The Matching Game</h1>
        <div class="controls">
            <div v-if="showControls">
                <button @click="getBoardSize">New Game</button>
                <button @click="pickFromSavedGames">Continue</button>
            </div>
            <div v-if="showBoardSize">
                <div class="board-size-container">
                    Board Size: <div>
                        <input v-model="xsize"> by <input v-model="ysize">
                        </div>
                    <button @click="gotToGameBoard">Start</button>
                </div>
            </div>
            <div>
                <div class="saved-games-container" v-if="showSavedGames">
                    <h2>Saved Games</h2>
                    <button v-for="slot in savedSlots" @click="gotToGameBoard(slot.id)">{{slot.label}}</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    module.exports = {
        data(){
            return{
                xsize: '',
                ysize: '',
                showControls: true,
                showBoardSize: false,
                showSavedGames: false,
                savedSlots: [
                    {id: 1, label: 'mycoolgame'},
                    {id: 2, label: 'almost solved'},
                    {id: 3, label: 'another test name'}
                ]
            }
        },
        methods:{
            getBoardSize(){
                this.showControls = false
                this.showBoardSize = true
            },
            pickFromSavedGames(){
                this.showControls = false
                this.showSavedGames = true
            },

            startNewGame(){
                // logic for game setup
                this.gotToGameBoard()
            },
            continueGame(){
                // logic for game setup
                this.gotToGameBoard()
            },

            gotToGameBoard(){
                this.$router.push('game')
            }
        }
    }
</script>

<style lang='scss' scoped>
    @import "colors";
    
    button {
        // handle this with a @mixin 
        font-size: 15px;
        width: 150px;
        margin-bottom: 10px;
    }

    .home-container{
        // border: 1px solid $red;

        > .controls {
            height: 200px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-around;

            > div {
                display: flex;
                flex-direction: column;

                > .saved-games-container {
                    display:flex;
                    flex-direction: column;
                    align-items: center;
                }

                > .board-size-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: space-between;
                    height: 100px;

                    > * {
                    }

                    > div {
                        display: flex;
                        justify-content: space-between;
                        > input {
                            width: 30px;
                        }
                    }
                }
            }
        }
    }
</style>