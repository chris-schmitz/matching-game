<template>
    <div class='settings-container'>
        settings
        Unique Cards:
        <div>
            <card v-for="card in cards" :card="card"></card>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import Card from './Card'

    export default {
        components: {Card},
        data () {
            return {}
        },
        computed: {
            ...mapState({
                cards: state => state.cards
            })
        },
        mounted () {
            this.cards.forEach(card => {
                card.faceUp = true
            })
        }
    }
</script>

<style lang='scss' scoped>
    .settings-container{
        > div {
            display: flex;
            flex-wrap: wrap;
            > div {
                margin: 10px;
            }
        }
    }
</style>
