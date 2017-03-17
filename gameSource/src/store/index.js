import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import home from './modules/home'
import gameboard from './modules/gameboard'

const store = new Vuex.Store({
    modules: {
        home: {
            namespaced: true,
            ...home
        },
        gameboard
    }
})

export default store
