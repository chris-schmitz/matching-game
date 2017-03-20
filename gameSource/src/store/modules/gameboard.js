const state = {
    currentSelection: [],
    notification: {message: null, type: null},
    lockGameBoard: false,
    deck: []
}

const getters = {
    deck (state) {
        return state.deck
    }
}

const actions = {
    flip ({commit, dispatch, state}, targetCard) {
        let cardToFlip = state.deck
                        .filter(card => card.id === targetCard.id)
                        .reduce((carry, current) => carry.concat(current))

        if (typeof cardToFlip !== 'object' || Array.isArray(cardToFlip)) {
            dispatch('notification',
                {type: 'error', message: 'Unable to flip the card. Please restart game.'},
                {root: true}
            )
            return
        }

        commit('flipCard', cardToFlip)
    }
}

const mutations = {
    startNewGame (state, deck) {
        state.deck = deck
    },
    flipCard (state, card) {
        card.faceUp = true
    }
}

export default {state, getters, mutations, actions}
