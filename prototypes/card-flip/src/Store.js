import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    cards: [
        {id: 1, faceUp: false, face: '/dist/assets/logo.png'},
        {id: 2, faceUp: false, face: '/dist/assets/200-1.jpg'},
        {id: 3, faceUp: false, face: '/dist/assets/200-2.jpg'},
        {id: 4, faceUp: false, face: '/dist/assets/200-3.jpg'},
        {id: 5, faceUp: false, face: '/dist/assets/200-4.jpg'},
        {id: 6, faceUp: false, face: '/dist/assets/200-5.jpg'},
        {id: 7, faceUp: false, face: '/dist/assets/200-6.jpg'},
        {id: 8, faceUp: false, face: '/dist/assets/200.jpg'},
        {id: 9, faceUp: false, face: '/dist/assets/logo.png'},
    ]
}

const mutations = {
    flipCard(state, card){
        card.faceUp = !card.faceUp
    }
}

const store = new Vuex.Store({
    state,
    mutations
})

export default store