import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
// const Vue = require('vue')
// const Vuex = require('vuex')

// Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        cards: [
          {id: 1, face: '/dist/assets/logo.png'},
          {id: 2, face: '/dist/assets/200-1.jpg'},
          {id: 3, face: '/dist/assets/200-2.jpg'},
          {id: 4, face: '/dist/assets/200-3.jpg'},
          {id: 5, face: '/dist/assets/200-4.jpg'},
          {id: 6, face: '/dist/assets/200-5.jpg'},
          {id: 7, face: '/dist/assets/200-6.jpg'},
          {id: 8, face: '/dist/assets/200.jpg'},
          {id: 9, face: '/dist/assets/logo.png'},
        ]
    }
})

export default store