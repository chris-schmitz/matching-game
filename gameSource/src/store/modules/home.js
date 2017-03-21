import router from '../../router/index'

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
        if (getters.totalTiles === 0) return false

        return getters.totalTiles % 2 === 0
    }
}

const mutations = {
    setBoardWidth (state, width) {
        state.boardSize.width = width
    },
    setBoardHeight (state, height) {
        state.boardSize.height = height
    },
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
        router.push('game-board')
    }
}

// This shuffle algorithm was lifted from:
// https://bost.ocks.org/mike/shuffle/
// (It's late and I didn't feel like working it out on my own :P)
function shuffle (array) {
    let m = array.length
    let t
    let i

    // While there remain elements to shuffle…
    while (m) {
        // Pick a remaining element…
        i = Math.floor(Math.random() * m--)

        // And swap it with the current element.
        t = array[m]
        array[m] = array[i]
        array[i] = t
    }

    return array
}

function makeSureWeHaveEnoughCards (desiredDeckSize, uniqueCards) {
    let protoDeck = []
    const numberOfCardsNeeded = (desiredDeckSize / 2)

    // I love functional pipelines (love'm!), but man does this iteration
    // and accessor loop look better as a for loop (man!)!!
    for (let i = 0, arrayAccessor = 0; i < numberOfCardsNeeded; i++) {
        if (arrayAccessor === uniqueCards.length) arrayAccessor = 0

        protoDeck.push(uniqueCards[arrayAccessor])
        arrayAccessor += 1
    }

    return protoDeck
}

const actions = {
    startNewGame ({commit, getters, state, rootGetters, rootState}) {
        let protoDeck = makeSureWeHaveEnoughCards(getters.totalTiles, rootState.cards)

        let deck = protoDeck
            .map(card => {
                const dup = Object.assign({}, card)
                return [card, dup]
            })
            .reduce((carry, current) => carry.concat(current))
            .map((card, index) => {
                card.id = index
                return card
            })

        router.push('game-board')
        commit('gameboard/startNewGame', shuffle(deck), {root: true})
    },

    saveAndQuit (context, savedState) {
        // note, do these mutations syncronously before pushing home
        // instead of using the on complete callback for router.push.
        // that we we won't end up with a screen flash
        console.log('store saved state')
        console.log('reset home state')
        router.push('home')
    }
}

export default {state, getters, mutations, actions}
