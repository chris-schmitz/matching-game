<template>
    <div id="app">
        <notification v-show="showNotification">
            <button slot="closeButton" @click="clearNotification">X</button>
        </notification>
        <router-view></router-view>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import Notification from './components/Notification.vue'

    export default {
        name: 'app',
        components: {Notification},
        computed: {
            ...mapGetters('notification', ['showNotification']),
            ...mapGetters('gameboard', ['gameIsActive'])
        },
        methods: {
            // while I'm not _entirely_ wild about putting a method in this component that has
            // this kind of game structure knowledge about the other components I will do it because:
            // - This is the root container and I'm ok with it being a bridge in this case
            // - This is all still being pulled and pushed through the root store
            // - I'd rather put this logic here than directly in the notification component itself
            clearNotification () {
                if (this.gameIsActive) {
                    this.$store
                        .dispatch('gameboard/clearSelectionStack')
                        .then(() => {
                            this.$store.dispatch('notification/clearNotification')
                        })
                }
                this.$store.dispatch('notification/clearNotification')
            }
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
