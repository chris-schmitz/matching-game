import Vue from 'vue'
import Vuex from 'vuex'
// import mutations from './mutations'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        boardSize: {width: null, height: null},
        cards: [],
        cardsInPlay: [],
        currentSelection: [],
        notification: {message: null, type: null},
        lockGameBoard: false
        // , savedGames: []
    }
})

export default store
