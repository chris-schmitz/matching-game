import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import home from './modules/home'
import gameboard from './modules/gameboard'
// import router from '../router/index.js'

const state = {
    cards: [
        {faceId: 0, faceUp: false, matchFound: false, face: '/dist/assets/logo.png'},
        {faceId: 1, faceUp: false, matchFound: false, face: '/dist/assets/200-1.jpg'},
        {faceId: 2, faceUp: false, matchFound: false, face: '/dist/assets/200-2.jpg'},
        {faceId: 3, faceUp: false, matchFound: false, face: '/dist/assets/200-3.jpg'},
        {faceId: 4, faceUp: false, matchFound: false, face: '/dist/assets/200-4.jpg'},
        {faceId: 5, faceUp: false, matchFound: false, face: '/dist/assets/200-5.jpg'}
    ],
    notification: {
        type: null,
        message: null
    }
}

const mutations = {
    setNotification (state, notification) {
        state.notification.type = notification.type
        state.notification.message = notification.message
    },
    clearNotification (state) {
        state.notification.type = null
        state.notification.message = null
    }
}

const actions = {
    notification (context, notification) {
        debugger
    }
}

const store = new Vuex.Store({
    state,
    mutations,
    actions,
    modules: {
        home: {
            namespaced: true,
            ...home
        },
        gameboard: {
            namespaced: true,
            ...gameboard
        }
    }
})

export default store
