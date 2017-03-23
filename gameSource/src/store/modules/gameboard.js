// import router from '../../router/index'

const state = {
    currentSelection: [],
    notification: {message: null, type: null},
    lockGameBoard: false,
    deck: []
}

// I can't decide if I like having these helper functions organized into an object
// that is private to this module b/c it's not exported or if I like having them as
// just loose functions in the module (e.g. the `shuffle` and `makeSureWeHaveEnoughCards`
// functions in `home.js`). Build these out, look at each, think about whatcha like, pick
// one and then refactor the other.
const helpers = {
    cardsMatch (state) {
        if (state.currentSelection[0].faceId !== state.currentSelection[1].faceId) {
            return false
        }
        return true
    },

    handleMatchSelection (context) {
        context.state.currentSelection.forEach(card => context.commit('markAsMatchFound', card))
        context.commit('clearSelectionStack')
        context.dispatch('setNotification', {message: 'Match found :D', type: 'success'}, {root: true})
    },

    handleNonMatchSelection (context) {
        // tonight or tomorrow come back and check this out. We need to make sure these notification
        // dispatches are going to the root state, not the local state.
        context.dispatch('setNotification', {message: 'These cards do not match :/', type: 'info'}, {root: true})
        context.commit('lockGameBoard', true)

        setTimeout(() => {
            context.state.currentSelection.forEach(card => context.commit('flipCard', card))
            context.commit('clearSelectionStack')
            context.commit('lockGameBoard', false)

            context.dispatch('clearNotification', null, {root: true})
        }, 1000)
    },

    handleWinState (context) {
        context.commit('setNotification', {message: 'OMG you won!! :D', type: 'success'}, {root: true})
        // and any other stuff we want to hook in here
    }
}

const getters = {
    deck (state) {
        return state.deck
    },
    matchCount (state) {
        return state.deck
                    .filter(card => card.matchFound === true)
                    .reduce((carry, current) => carry + 1, 0)
    },
    matchesLeftToFind (state, getters) {
        return state.deck.length - getters.matchCount
    },
    faceUpCount (state) {
        return state.deck
                    .filter(card => card.faceUp === true)
                    .reduce((carry, current) => carry + 1, 0)
    },
    allCardsHaveBeenMatched (state) {
        let cardsWithoutMatchs = state.deck.filter(card => card.matchFound === false)
        if (cardsWithoutMatchs.length > 0) {
            return false
        }
        return true
    }
}

const actions = {
    flip (context, targetCard) {
        let cardToFlip = context.state.deck
                        .filter(card => card.id === targetCard.id)
                        .reduce((carry, current) => Object.assign(carry, current))

        if (typeof cardToFlip !== 'object' || Array.isArray(cardToFlip)) {
            context.dispatch('notification',
                {type: 'error', message: 'Unable to flip the card. Please restart game.'},
                {root: true}
            )
            return
        }

        context.commit('flipCard', cardToFlip)
        context.commit('pushCardOntoSelectionStack', cardToFlip)

        if (state.currentSelection.length <= 1) {
            return
        }

        if (!helpers.cardsMatch(context.state)) {
            helpers.handleNonMatchSelection(context)
            return
        }

        // note this helper is not going to fire syncronously so we need to
        // decide if we want to:
        // handle this as a promise
        // handle this as a action promise
        // handle this as a regular callback (prob best decision)
        helpers.handleMatchSelection(context)

        if (context.getters.allCardsHaveBeenMatched) {
            helpers.handleWinState(context)
        }
    }
}

const mutations = {
    startNewGame (state, deck) {
        state.deck = deck
    },
    flipCard (state, card) {
        card.faceUp = !card.faceUp
    },
    markAsMatchFound (state, card) {
        card.matchFound = true
    },
    pushCardOntoSelectionStack (state, card) {
        state.currentSelection.push(card)
    },
    clearSelectionStack (state) {
        state.currentSelection = []
    },
    lockGameBoard (state, bool) {
        state.lockGameBoard = bool
    }
}

export default {state, getters, mutations, actions}
