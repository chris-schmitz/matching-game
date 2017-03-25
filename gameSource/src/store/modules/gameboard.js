const state = {
    currentSelection: [],
    notification: {message: null, type: null},
    lockGameBoard: false,
    deck: []
}

const helpers = {
    cardsMatch (state) {
        if (state.currentSelection[0].faceId !== state.currentSelection[1].faceId) {
            return false
        }
        return true
    }
}

const getters = {
    deck (state) {
        return state.deck
    },
    gameIsActive (state) {
        return state.deck.length > 0
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
    flip (context, cardToFlip) {
        // if we have more than one card on the selection stack right as a card is being flipped
        // it means we've already had two in the stack, compared them, and determined that it wasn't
        // a match and we're just waiting for the self dismissing notification callback to fire. If the
        // player is clicking another card that's fine, we just need to clear the stack so we can start
        // comparing agian.
        if (context.state.currentSelection.length > 1) {
            context.dispatch('clearSelectionStack')
        }

        context.commit('flipCard', cardToFlip)
        context.commit('pushCardOntoSelectionStack', cardToFlip)

        // we need two cards before we need to do a comparison so stop for now.
        if (state.currentSelection.length <= 1) {
            return
        }

        if (!helpers.cardsMatch(context.state)) {
            const message = 'These cards do not match :/'
            const type = 'info'
            const selfDismissing = true

            const resetSelection = () => {
                context.state.currentSelection.forEach(card => context.commit('flipCard', card))
                context.commit('clearSelectionStack')
            }

            context.dispatch('notification/triggerNotification', {callback: resetSelection, message, type, selfDismissing}, {root: true})
            return
        }

        context.dispatch('handleMatchSelection')
            .then(() => {
                if (!context.getters.allCardsHaveBeenMatched) {
                    const message = 'Match found :D'
                    const type = 'success'
                    const selfDismissing = true
                    context.dispatch('notification/triggerNotification', {callback: () => {}, message, type, selfDismissing}, {root: true})
                } else {
                    const message = 'You won!!'
                    const type = 'success'
                    context.dispatch('notification/triggerNotification', {callback: () => {}, message, type}, {root: true})
                }
            })
    },

    clearSelectionStack (context) {
        return new Promise((resolve, reject) => {
            context.state.currentSelection.forEach(card => context.commit('flipCard', card))
            context.commit('clearSelectionStack')
            resolve()
        })
    },

    handleMatchSelection (context) {
        return new Promise((resolve, reject) => {
            context.commit('lockGameBoard', true)
            context.state.currentSelection.forEach(card => context.commit('markAsMatchFound', card))
            context.commit('clearSelectionStack')
            resolve()
        })
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
