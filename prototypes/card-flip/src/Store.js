import Vue from 'vue'
import Vuex from 'vuex'
import co from 'co'

Vue.use(Vuex)

const state = {
    cards: [
        {id: 1, faceId: 0, faceUp: false, matchFound: false, face: '/dist/assets/logo.png'},
        {id: 2, faceId: 1, faceUp: false, matchFound: false, face: '/dist/assets/200-1.jpg'},
        {id: 3, faceId: 2, faceUp: false, matchFound: false, face: '/dist/assets/200-2.jpg'},
        {id: 4, faceId: 3, faceUp: false, matchFound: false, face: '/dist/assets/200-3.jpg'},
        {id: 5, faceId: 4, faceUp: false, matchFound: false, face: '/dist/assets/200-4.jpg'},
        {id: 6, faceId: 5, faceUp: false, matchFound: false, face: '/dist/assets/200-5.jpg'},

        {id: 10, faceId: 3, faceUp: false, matchFound: false, face: '/dist/assets/200-3.jpg'},
        {id: 7, faceId: 0, faceUp: false, matchFound: false, face: '/dist/assets/logo.png'},
        {id: 12, faceId: 5, faceUp: false, matchFound: false, face: '/dist/assets/200-5.jpg'},
        {id: 9, faceId: 2, faceUp: false, matchFound: false, face: '/dist/assets/200-2.jpg'},
        {id: 8, faceId: 1, faceUp: false, matchFound: false, face: '/dist/assets/200-1.jpg'},
        {id: 11, faceId: 4, faceUp: false, matchFound: false, face: '/dist/assets/200-4.jpg'},
    ],
    currentSelection: [],
    notification: {
        message: null,
        type: null
    },
    lockGameBoard: false
}

const getters = {
    matchCount(state) {
        return state.cards
                    .filter(card => card.matchFound === true)
                    .reduce((carry, card) => carry + 1, 0)
    },
    faceUpCount(state) {
        return state.cards
                    .filter(card => card.faceUp === true )
                    .reduce((carry, card) => carry + 1, 0)
    },
    allCardsMatched(state) {
        let cardsWithoutMatches = state.cards.filter(card => card.matchFound === false)
        if(cardsWithoutMatches.length > 0) {
            return false
        }
        return true
    }
}

const actions = {
    flipCard(context, card){
        context.commit('flipCard', card)
        context.commit('pushCardOntoSelectionStack', card)

        // not sure if this is the best conditional to use, seems fine 
        // but not sure. If nothing else it may be worth changing 1 to 
        // a well named constant.
        if(context.state.currentSelection.length <= 1){ 
            return
        }

        if(cardsMatch(context)){
            handleMatchingSelection()
        } else {
            handleNonMatchingSelection()
        }
        

        // Scoped utility functions used above

        // hmm, place it here or somewhere else? I don't really like the idea of this
        // function loose in this file, but if we move all of the actions out into their
        // own file maybe it's not a big deal.
        //
        // Yeah if we break actions out into their own module we could move these out of 
        // scope to essentially be private functions.
        function cardsMatch(context){
            let cardA = context.state.currentSelection[0]
            let cardB = context.state.currentSelection[1]

            if(cardA.faceId === cardB.faceId){
                return true
            }
            return false
        }


        function handleNonMatchingSelection() {
            context.commit('notifyUser', {message: "These cards do not match.", type: 'info'})
            context.commit('lockGameplay', true)
            setTimeout(function() {
                context.state.currentSelection.forEach(card => context.commit('flipCard', card))
                context.commit('clearSelectionStack')
                context.commit('lockGameplay', false)
            }, 3000);
        }

        function handleMatchingSelection() {
            context.state.currentSelection.forEach(card => context.commit('markAsMatchFound', card))
            context.commit('clearSelectionStack')
            context.commit('notifyUser', {message: "These cards match :)", type: 'success'})
            if(context.getters.allCardsMatched) {
                context.commit('notifyUser', {message: "You won!", type: 'success'})
                // we need some kind of an "end game" state that locks everything out
            }
        }
    },

}

const mutations = {

    flipCard(state, card){
        card.faceUp = !card.faceUp
    },

    markAsMatchFound(state, card){
        card.matchFound = true
    },

    lockGameplay(state, shouldBeLocked = false) {
        state.lockGameBoard = shouldBeLocked
    },

    pushCardOntoSelectionStack(state, card){
        state.currentSelection.push(card)
    },

    clearSelectionStack(state){
        state.currentSelection = []
    },

    notifyUser(state, messagePayload){
        state.notification.message = messagePayload.message
        state.notification.type = messagePayload.type
    },

    clearNotification(state) {
        state.notification.message = null
        state.notification.type = null
    }
}

const store = new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})

export default store