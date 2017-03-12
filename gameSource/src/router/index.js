import Vue from 'vue'
import Router from 'vue-router'
import Splash from '@/components/Splash'
import Home from '@/components/Home'
import GameBoard from '@/components/GameBoard'
import Settings from '@/components/Settings'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Splash',
            component: Splash
        },
        {
            path: '/home',
            name: 'Home',
            component: Home
        },
        {
            path: '/game-board',
            name: 'Game Board',
            component: GameBoard
        },
        {
            path: '/settings',
            name: 'Settings',
            component: Settings
        }
    ]
})
