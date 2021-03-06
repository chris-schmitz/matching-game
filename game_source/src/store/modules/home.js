import router from '../../router/index'
import storage from '../../helpers/BrowserStorage'

function initialState () {
    return {
        boardSize: {width: null, height: null},
        showKickoffButtons: true,
        showBoardSizeSelector: false,
        showSavedStates: false,
        savedStates: [],

        showKeypad: false,
        keypadTargetInput: '',

        showSettings: false
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
    },

    // note if we refactor the board size capture to just ask for the number
    // of cards, this can be cut out.
    selectedInputsCurrentValue (state) {
        if (state.keypadTargetInput === 'width') {
            return state.boardSize.width
        } else if (state.keypadTargetInput === 'height') {
            return state.boardSize.height
        }
        return ''
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
    },
    removeSavedGameLabel (state, label) {
        let altered = state.savedStates.filter(stateLabel => stateLabel !== label)
        state.savedStates = altered
    },
    showKeypad (state, payload = {show: false, for: ''}) {
        state.showKeypad = payload.show
        state.keypadTargetInput = payload.for
    },
    toggleSettings (state) {
        state.showSettings = !state.showSettings
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
    startNewGame ({commit, getters, state, rootGetters, rootState}, payload = {totalCards: null}) {
        // we're passing in a payload with a total number of cards to render instead of pulling it
        // from the state via the totalTiles getter so that we can reuse this action for the restart
        // button on the game board (and not try to reset the whole home state just to restart a game)
        let protoDeck = makeSureWeHaveEnoughCards(payload.totalCards, rootState.cards)

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

    loadASavedGame ({dispatch}, label) {
        // pull the state from local storage by the key
        let state = storage.getaSavedState(label)

        // ba;lksajfl;adkjfaslkj why am I having to do this when I'm using
        // an arrow function!!!!!!!
        let routerr = router
        dispatch('gameboard/loadSavedState', state, {root: true})
            .then(() => {
                routerr.push('/game-board')
            })
    },
    deleteASavedGame ({commit}, label) {
        storage.deleteASavedState(label)
        commit('removeSavedGameLabel', label)
    },

    loadSavedStates ({commit}) {
        return new Promise((resolve, reject) => {
            const savedStates = storage.getSavedStates()
            let savedStateLabels = Object.keys(savedStates)

            commit('setSavedStates', savedStateLabels)
        })
    },

    storeGameState ({commit, state}, payload) {
        return new Promise((resolve, reject) => {
            const stringifiedState = JSON.stringify(payload.state)
            storage.storeaSavedState({label: payload.label, state: stringifiedState})
            resolve()
        })
    },

    reset ({commit}) {
        commit('loadState', initialState())
    },

    closeKeypad ({commit}) {
        commit('showKeypad', {show: false, for: ''})
    },

    setBoardSizeInputByInputName ({commit}, payload = {inputName: null, newValue: null}) {
        return new Promise((resolve, reject) => {
            if (payload.inputName === 'width') {
                commit('setBoardWidth', payload.newValue)
            } else if (payload.inputName === 'height') {
                commit('setBoardHeight', payload.newValue)
            }
            resolve()
        })
    },

    toggleSettings ({commit}) {
        return new Promise((resolve, reject) => {
            commit('toggleSettings')
            resolve()
        })
    }
}

export default {state, getters, mutations, actions}
