import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import home from './modules/home'
import gameboard from './modules/gameboard'
import notification from './modules/notification'
import modal from './modules/modal'
import settings from './modules/settings'
// import router from '../router/index.js'

const state = {
    cards: [
        {faceId: 0, faceUp: false, matchFound: false, face: 'https://unsplash.it/100/120'},
        {faceId: 1, faceUp: false, matchFound: false, face: 'https://unsplash.it/100/121'},
        {faceId: 2, faceUp: false, matchFound: false, face: 'https://unsplash.it/101/120'},
        {faceId: 3, faceUp: false, matchFound: false, face: 'https://unsplash.it/100/119'},
        {faceId: 4, faceUp: false, matchFound: false, face: 'https://unsplash.it/99/120'}
        // {faceId: 5, faceUp: false, matchFound: false, face: '/dist/assets/200-5.jpg'}
    ]
}

const mutations = {}

const actions = {}

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
        },
        notification: {
            namespaced: true,
            ...notification
        },
        modal: {
            namespaced: true,
            ...modal
        },
        settings: {
            // namespaced: true,
            ...settings
        }
    }
})

export default store