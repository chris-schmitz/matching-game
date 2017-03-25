<template>
    <div class="card-container">
        <div v-show="!card.faceUp" class="card back" @click="flip"></div>
        <div
            v-show="card.faceUp"
            class="front"
            :style="cardBackground"
        ></div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        props: ['card'],
        data () {
            return {}
        },
        computed: {
            ...mapState('gameboard', {
                lockGameBoard: 'lockGameBoard'
            }),
            cardBackground () {
                return {'background-image': `url("${this.card.face}")`}
            }
        },
        methods: {
            flip () {
                this.$store.commit('notification/clearNotificationTimeout')
                this.$store.commit('notification/setData', {message: null, type: null, timeoutId: null})
                this.$store.dispatch('gameboard/flip', this.card)
            }
        }
    }
</script>

<style lang='scss' scoped>
    @import '../style/colors';
    @import '../style/mixins';

    .card-container {}

    .card {
        @include card(120px, 100px, $purple);
    }
    .front {
        @include card(120px, 100px, $green, true);
    }
</style>
