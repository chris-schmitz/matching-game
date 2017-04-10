import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import home from './modules/home'
import gameboard from './modules/gameboard'
import notification from './modules/notification'
import modal from './modules/modal'
import settings from './modules/settings'
import keypad from './modules/keypad'
// import router from '../router/index.js'

const state = {
    cards: [
        {faceId: 1, faceUp: false, matchFound: false, face: 'https://unsplash.it/100/120'},
        {faceId: 2, faceUp: false, matchFound: false, face: 'https://unsplash.it/100/121'},
        {faceId: 3, faceUp: false, matchFound: false, face: 'https://unsplash.it/101/128'},
        {faceId: 4, faceUp: false, matchFound: false, face: 'https://unsplash.it/100/119'},
        {faceId: 5, faceUp: false, matchFound: false, face: 'https://unsplash.it/104/120'},

        {faceId: 6, faceUp: false, matchFound: false, face: 'https://unsplash.it/100/122'},
        {faceId: 7, faceUp: false, matchFound: false, face: 'https://unsplash.it/100/123'},
        {faceId: 8, faceUp: false, matchFound: false, face: 'https://unsplash.it/101/124'},
        {faceId: 9, faceUp: false, matchFound: false, face: 'https://unsplash.it/100/115'},
        {faceId: 10, faceUp: false, matchFound: false, face: 'https://unsplash.it/99/120'},
        {faceId: 11, faceUp: false, matchFound: false, face: 'https://unsplash.it/101/120'},
        {faceId: 12, faceUp: false, matchFound: false, face: 'https://unsplash.it/102/121'},
        {faceId: 13, faceUp: false, matchFound: false, face: 'https://unsplash.it/103/120'},
        {faceId: 14, faceUp: false, matchFound: false, face: 'https://unsplash.it/104/119'},
        {faceId: 15, faceUp: false, matchFound: false, face: 'https://unsplash.it/95/120'},
        {faceId: 16, faceUp: false, matchFound: false, face: 'https://unsplash.it/106/120'},
        {faceId: 17, faceUp: false, matchFound: false, face: 'https://unsplash.it/107/121'},
        {faceId: 18, faceUp: false, matchFound: false, face: 'https://unsplash.it/109/120'},
        {faceId: 19, faceUp: false, matchFound: false, face: 'https://unsplash.it/109/119'},
        {faceId: 20, faceUp: false, matchFound: false, face: 'https://unsplash.it/108/128'}
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
        },
        keypad: {
            namespaced: true,
            ...keypad
        }
    }
})

export default store
