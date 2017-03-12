import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Main = {template: '<h1>main</h1>'}
const Splash = {template: '<h1>splash</h1>'}
const GameBoard = {template: '<h1>board</h1>'}

const routes = [
  {path: '/', component: Main},
  {path: '/splash', component: Splash},
  {path: '/game', component: GameBoard},
]

const router = new VueRouter({routes})

new Vue({
  render: h => {
    return h(App)
  },
  router
}).$mount('#app')
