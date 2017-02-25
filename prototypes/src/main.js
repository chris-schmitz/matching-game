const Vue = require('vue')
const VueRouter = require('vue-router')

const App = require('./App.vue')
const Splash = require('./Splash.vue')
const Home = require('./Home.vue')
// so we could do the config here as a whole screen component, or
// we could do it as a subroute of home. The deciding factor to think
// about would be "do we want to be able to access the config screen from
// anywhere other than the home screen (i.e. while in game)". I kind of 
// think we'll only need it from the home screen so consider moving this
// to a subroute of home. 
// const Config = require('./Config.vue')
const GameBoard = require('./GameBoard.vue')

Vue.use(VueRouter)


const routes = [
  {path: '/', component: Home},
  {path: '/splash', component: Splash},
  {path: '/board', component: GameBoard}
]

const router = new VueRouter({ routes })

new Vue({
  router
}).$mount('#app')
