const state = {
    // should this be moved out to the root???
    boardSize: {width: null, height: null},
    showKickoffButtons: true,
    showBoardSizeSelector: false,
    showSavedStates: false,
    savedStates: [
        {id: 1, label: 'almost got it'},
        {id: 2, label: 'my 50 by 50 board'},
        {id: 3, label: 'the one with goofey pics'}
    ]
}

const getters = {
    getMoreInformation (state) {
        return state.showBoardSizeSelector || state.showSavedStates
    },
    totalTiles (state) {
        return (state.boardSize.width * state.boardSize.height)
    },
    validBoardSize (state, getters) {
        return getters.totalTiles % 2 === 0
    }
}

const mutations = {
    getBoardSize (state) {
        state.showKickoffButtons = false
        state.showBoardSizeSelector = true
    },
    pickFromSavedGame (state) {
        state.showKickoffButtons = false
        state.showSavedStates = true
    },
    backToKickoff (state) {
        state.showSavedStates = false
        state.showBoardSizeSelector = false
        state.showKickoffButtons = true
    },
    loadSavedState (state, savedStateId) {
        console.log(`loading saved state: ${savedStateId}`)
    },
    startNewGame (state) {
        console.log('starting new game')
    }
}

export default {state, getters, mutations}
