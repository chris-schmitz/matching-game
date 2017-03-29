import router from '../../router/index'
import storage from '../helpers/BrowserStorage'
// import _ from 'lodash'

function initialState () {
    return {
        boardSize: {width: null, height: null},
        showKickoffButtons: true,
        showBoardSizeSelector: false,
        showSavedStates: false,
        savedStates: []
    }
}

const state = initialState()

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
    loadState (state, newState) {
        Object.assign(state, newState)
    },
    setSavedStates (state, savedStates) {
        state.savedStates = savedStates
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

    // saveAndQuit (context, savedState) {
    //     // note, do these mutations syncronously before pushing home
    //     // instead of using the on complete callback for router.push.
    //     // that we we won't end up with a screen flash
    //     console.log('store saved state')
    //     console.log('reset home state')
    //     router.push('home')
    // },

    loadSavedStates ({commit}) {
        return new Promise((resolve, reject) => {
            const savedStates = storage.getSavedStates()
            let savedStatesArray = Object.keys(savedStates)
                    .map(stateKey => {
                        return { label: stateKey, state: savedStates[stateKey] }
                    })
                    .map(stateObject => {
                        stateObject.state = JSON.parse(stateObject.state)
                        return stateObject
                    })

            commit('setSavedStates', savedStatesArray)
        })
    },

    storeGameState ({commit, state}, payload) {
        return new Promise((resolve, reject) => {
            const stringifiedState = JSON.stringify(state)
            storage.storeaSavedState({label: payload.label, state: stringifiedState})
            resolve()
        })
    },

    reset ({commit}) {
        commit('loadState', initialState())
    }
}

export default {state, getters, mutations, actions}
