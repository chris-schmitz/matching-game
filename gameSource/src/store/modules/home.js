import router from '../../router/index'

const state = {
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
                // So I'm not totally sure why, but we need to create two wholy new
                // card instances from the original card. If don't we won't be able
                // to assign (reassign) the id's further down the pipe for the original
                // `card` instance. It has something to do with how vue assigns and handles
                // internal ids. Really, when we pull the original card objects from the root
                // instance the card instances already have ids assigned even though we didn't
                // add them in. I'll search more through the docs and API to better understand
                // exactly what's going on, but for now the only way that I know that we can
                // "unhook" the cards is by creating fresh duplicates of them that have not
                // yet been added into vue.
                const duplicate1 = Object.assign({}, card)
                const duplicate2 = Object.assign({}, card)
                return [duplicate1, duplicate2]
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
    },

    storeGameState ({commit}, label) {
        return new Promise((resolve, reject) => {
            // grab game state snapshot
            // store it with some from like:
            // {label, state}
            resolve()
        })
    },

    // I don't think I should have to manually reset each part like this.
    // I should be able to do a reset mutation that taks an initial state
    // object, e.g.
    //      const initialState = Object.assign({}, state)
    // and then sets the state for this module to that new object.
    // I tried to do this, but for some
    // reason no matter what combination of object cloning I try
    // the two objects get updated together. It would make sense
    // if we were just referencing the original state in a new var
    // name, but you'd think cloning would "unhook" the two. :/ There
    // has to be an answer for this, but it's an inveistgation to do
    // sometime other than lunch.
    reset ({commit}) {
        commit('setBoardHeight', null)
        commit('setBoardWidth', null)
        commit('backToKickoff')
    }
}

export default {state, getters, mutations, actions}
