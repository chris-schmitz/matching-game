<template>
    <div id="app">
        <notification v-if='notification.type'>
            <h2>{{ notification.message }}</h2>
            <button @click="clearNotification">X</button>
        </notification>
        <router-view></router-view>
    </div>
</template>

<script>
    import {mapState, mapMutations} from 'vuex'
    import Notification from './components/Notification.vue'

    export default {
        name: 'app',
        components: {Notification},
        computed: mapState({
            notification: 'notification'
        }),
        methods: {
            ...mapMutations(['clearNotification'])
        }
    }
</script>

<style lang="scss" scoped>
    @import "./style/colors";
    #app {
        width: 100vw;
        margin: 20px;
        border-radius: 5px;
        background-color: $white;
    }
</style>
