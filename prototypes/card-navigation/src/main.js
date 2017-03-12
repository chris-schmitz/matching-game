import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import GameBoard from './GameBoard.vue'
import Home from './Home.vue'
import Splash from './Splash.vue'

Vue.use(VueRouter)

const routes = [
  {path: '/', component: Home},
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
