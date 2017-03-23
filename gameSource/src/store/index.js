import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import home from './modules/home'
import gameboard from './modules/gameboard'
// import router from '../router/index.js'

const state = {
    cards: [
        {faceId: 0, faceUp: false, matchFound: false, face: 'https://unsplash.it/100/120'},
        {faceId: 1, faceUp: false, matchFound: false, face: 'https://unsplash.it/100/121'},
        {faceId: 2, faceUp: false, matchFound: false, face: 'https://unsplash.it/101/120'},
        {faceId: 3, faceUp: false, matchFound: false, face: 'https://unsplash.it/100/119'},
        {faceId: 4, faceUp: false, matchFound: false, face: 'https://unsplash.it/99/120'}
        // {faceId: 5, faceUp: false, matchFound: false, face: '/dist/assets/200-5.jpg'}
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
    // it seems a bit silly to have actions for these that just hand off to the mutations,
    // but I'm doing this intensionally now so that if I add in extra logic (e.g. auto
    // dismissing notifications) I can add them here without changing code all over the place.
    // I also named the actions the same as the mutations so that if we _do_ decide it's better
    // to just use the mutations directly we can just swap out `dispatch` for `commit` wherever
    // we're calling to notifications.
    setNotification ({commit}, notification) {
        commit('setNotification', notification)
    },
    clearNotification ({commit}) {
        commit('clearNotification')
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
