import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import home from './modules/home'

const store = new Vuex.Store({
    modules: {
        home
    },
    state: {
        cards: [],
        cardsInPlay: [],
        currentSelection: [],
        notification: {message: null, type: null},
        lockGameBoard: false
        // , savedGames: []
    }
})

export default store
